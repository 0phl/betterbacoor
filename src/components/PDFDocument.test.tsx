import { act, cleanup, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import PDFDocument from './PDFDocument';
import { setLanguage } from '../i18n';

const pdf = vi.hoisted(() => ({ getPage: vi.fn() }));
vi.mock('pdfjs-dist', () => ({
  GlobalWorkerOptions: {},
  getDocument: () => ({
    promise: Promise.resolve({ numPages: 1202, getPage: pdf.getPage }),
    destroy: () => Promise.resolve(),
  }),
}));

function pendingRender() {
  let resolve!: () => void;
  let reject!: (error: Error) => void;
  const promise = new Promise<void>((done, fail) => {
    resolve = done;
    reject = fail;
  });
  return { promise, resolve, reject, cancel: vi.fn() };
}

describe('PDF page transitions', () => {
  const tasks = new Map<number, ReturnType<typeof pendingRender>>();

  beforeEach(() => {
    setLanguage('en');
    tasks.clear();
    vi.stubGlobal(
      'ResizeObserver',
      class {
        observe() {}
        disconnect() {}
      }
    );
    pdf.getPage.mockReset();
    pdf.getPage.mockImplementation((page: number) => {
      const task = pendingRender();
      tasks.set(page, task);
      return Promise.resolve({
        getViewport: ({ scale }: { scale: number }) => ({
          width: 600 * scale,
          height: 800 * scale,
        }),
        render: () => task,
        getTextContent: async () => ({
          items: [{ str: `Content of page ${page}`, hasEOL: true }],
        }),
      });
    });
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  async function finish(page: number) {
    await waitFor(() => expect(tasks.has(page)).toBe(true));
    await act(async () => tasks.get(page)!.resolve());
  }

  it('keeps the current canvas and expanded text mounted until the next page is ready', async () => {
    const change = vi.fn();
    const view = render(<PDFDocument page={1} onPageChange={change} />);
    await finish(1);
    const canvas = screen.getByRole('img', { name: /^Charter PDF page 1\./ });
    const host = canvas.parentElement!;
    const text = screen.getByText('Content of page 1');
    const details = text.closest('details')!;
    details.open = true;

    view.rerender(<PDFDocument page={2} onPageChange={change} />);
    await waitFor(() => expect(tasks.has(2)).toBe(true));

    expect(screen.getByRole('status')).toHaveTextContent('Loading PDF page 2');
    expect(host).toHaveAttribute('aria-busy', 'true');
    expect(host.firstElementChild).toBe(canvas);
    expect(canvas).toHaveAttribute('height', '1200');
    expect(text).toBeVisible();
    expect(details.open).toBe(true);
    expect(details).toHaveTextContent('Text version of this page — PDF page 1');

    await finish(2);
    expect(canvas).not.toBeInTheDocument();
    expect(host).toHaveAttribute('aria-busy', 'false');
    expect(host.children).toHaveLength(1);
    expect(
      screen.getByRole('img', { name: /^Charter PDF page 2\./ })
    ).toBeVisible();
    expect(screen.getByText('Content of page 2')).toBeVisible();
    expect(details.open).toBe(true);
    expect(details).toHaveTextContent('Text version of this page — PDF page 2');
  });

  it('does not let an outdated render replace a newer page after rapid navigation', async () => {
    const change = vi.fn();
    const view = render(<PDFDocument page={1} onPageChange={change} />);
    await finish(1);
    view.rerender(<PDFDocument page={2} onPageChange={change} />);
    await waitFor(() => expect(tasks.has(2)).toBe(true));
    view.rerender(<PDFDocument page={3} onPageChange={change} />);
    await finish(3);
    await finish(2);

    expect(tasks.get(2)!.cancel).toHaveBeenCalled();
    expect(
      screen.getByRole('img', { name: /^Charter PDF page 3\./ })
    ).toBeVisible();
    expect(screen.getAllByRole('img')).toHaveLength(1);
    expect(screen.getByRole('status')).toHaveTextContent('PDF page 3 of 1202');
    expect(screen.queryByText('Content of page 2')).not.toBeInTheDocument();
  });

  it('preserves the last readable page and its label if the next page fails', async () => {
    const change = vi.fn();
    const view = render(<PDFDocument page={1} onPageChange={change} />);
    await finish(1);
    const canvas = screen.getByRole('img', { name: /^Charter PDF page 1\./ });
    view.rerender(<PDFDocument page={2} onPageChange={change} />);
    await waitFor(() => expect(tasks.has(2)).toBe(true));
    await act(async () => tasks.get(2)!.reject(new Error('Render failed')));

    expect(screen.getByRole('status')).toHaveTextContent(
      'This page could not be rendered'
    );
    expect(canvas).toBeInTheDocument();
    expect(canvas.parentElement).toHaveAttribute('aria-busy', 'false');
    expect(
      screen.getByText('Text version of this page — PDF page 1')
    ).toBeInTheDocument();
  });
});
