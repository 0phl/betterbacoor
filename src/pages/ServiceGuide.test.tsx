import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import axe from 'axe-core';
import App from '../App';
vi.mock('../components/PDFDocument', () => ({
  default: ({ page }: { page: number }) => (
    <section aria-label="Citizen’s Charter document viewer">
      PDF page {page}
    </section>
  ),
}));

describe('Resident service guides', () => {
  beforeEach(() => {
    localStorage.clear();
    window.history.replaceState({}, '', '/services/business-permit');
    Object.defineProperty(window, 'scrollTo', {
      configurable: true,
      value: vi.fn(),
    });
  });

  it('keeps preparation progress across visits and separates renewal from new applications', () => {
    const first = render(<App />);
    fireEvent.click(screen.getAllByRole('checkbox')[0]);
    expect(screen.getByText('1 of 5 ready')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('radio', { name: 'Renewal' }));
    expect(screen.getByText('0 of 4 ready')).toBeInTheDocument();
    expect(
      screen.getByRole('checkbox', { name: /previous business permit/ })
    ).not.toBeChecked();
    fireEvent.click(screen.getByRole('radio', { name: 'New business' }));
    expect(screen.getAllByRole('checkbox')[0]).toBeChecked();
    first.unmount();
    render(<App />);
    expect(screen.getAllByRole('checkbox')[0]).toBeChecked();
    fireEvent.click(screen.getByRole('button', { name: 'Reset checklist' }));
    expect(screen.getByText('0 of 5 ready')).toBeInTheDocument();
    expect(localStorage.length).toBe(0);
  });

  it('remains usable when browser storage is unavailable', () => {
    const spy = vi
      .spyOn(Storage.prototype, 'setItem')
      .mockImplementation(() => {
        throw new Error('Blocked');
      });
    render(<App />);
    fireEvent.click(screen.getAllByRole('checkbox')[0]);
    expect(screen.getAllByRole('checkbox')[0]).toBeChecked();
    expect(screen.getByRole('status')).toHaveTextContent('could not save');
    spy.mockRestore();
  });

  it('ignores corrupt stored progress and prints the guide on request', () => {
    localStorage.setItem(
      'betterbacoor:checklist:business-permit:new:2026-09-16',
      'not valid JSON'
    );
    const print = vi.spyOn(window, 'print').mockImplementation(() => {});
    render(<App />);
    expect(screen.getByText('0 of 5 ready')).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole('button', { name: 'Print guide & checklist' })
    );
    expect(print).toHaveBeenCalledOnce();
    print.mockRestore();
  });

  it('routes the business shortcut directly to useful on-site content', () => {
    window.history.replaceState({}, '', '/');
    render(<App />);
    fireEvent.click(
      screen.getByRole('link', { name: 'Business permit guide' })
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Business permits, made clearer.'
    );
    expect(screen.getAllByRole('checkbox')).toHaveLength(5);
    expect(
      screen.getByRole('link', { name: 'Read these pages here' })
    ).toHaveAttribute('href', '/charter?page=162');
  });

  it('finds the on-site guide when someone searches business permits', () => {
    window.history.replaceState({}, '', '/search?q=business%20permits');
    render(<App />);
    expect(
      screen.getByRole('link', { name: /ON BETTERBACOOR Business permits/ })
    ).toHaveAttribute('href', '/services/business-permit');
  });

  it('loads the preserved Charter only on request and keeps original-source access', async () => {
    window.history.replaceState({}, '', '/charter?page=318');
    const { container } = render(<App />);
    expect(container.querySelector('.pdf-reader')).toBeNull();
    expect(screen.getByRole('combobox')).toHaveValue('318');
    fireEvent.click(
      screen.getByRole('button', { name: 'Load the city’s PDF' })
    );
    expect(
      await screen.findByRole('region', {
        name: 'Citizen’s Charter document viewer',
      })
    ).toHaveTextContent('PDF page 318');
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: '162' },
    });
    expect(
      screen.getByRole('link', { name: 'Open original PDF' })
    ).toHaveAttribute(
      'href',
      'https://bacoor.gov.ph/downloads/arta/CitizensCharter2026.pdf#page=162'
    );
  });

  it('shows creator attribution only in the footer and links the configured Facebook page', () => {
    const { container } = render(<App />);
    expect(
      container.querySelector('footer a[href="https://github.com/0phl"]')
    ).not.toBeNull();
    expect(container.querySelector('main a[href*="github.com"]')).toBeNull();
    expect(
      screen.getByRole('link', { name: 'BetterBacoor on Facebook' })
    ).toHaveAttribute(
      'href',
      'https://www.facebook.com/people/BetterBacoororg/61594400221717/'
    );
    expect(screen.queryByText('Coming soon')).not.toBeInTheDocument();
  });

  it.each([
    '/services/business-permit',
    '/services/civil-registry',
    '/services/working-permit',
    '/charter',
  ])('has no detectable accessibility violations on %s', async path => {
    window.history.replaceState({}, '', path);
    const { container } = render(<App />);
    expect(
      (
        await axe.run(container, {
          rules: { 'color-contrast': { enabled: false } },
        })
      ).violations
    ).toEqual([]);
  });
});
