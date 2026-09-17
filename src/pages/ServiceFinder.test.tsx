import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import axe from 'axe-core';
import App from '../App';
import {
  finderQuestions,
  finderStorageKey,
  resolveFinder,
} from '../data/service-finder';
import { setLanguage, translate } from '../i18n';
import { findGuides } from '../data/guides';
import { seniorGuide } from '../data/senior-guide';

describe('Guided service finder', () => {
  beforeEach(() => {
    localStorage.clear();
    setLanguage('en');
    window.history.replaceState({}, '', '/services/find');
    Object.defineProperty(window, 'scrollTo', {
      configurable: true,
      value: vi.fn(),
    });
  });
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    setLanguage('en');
  });

  it('resolves every reachable answer path to a published, translated checklist', () => {
    const paths: string[][] = [];
    function visit(node: string, path: string[]) {
      for (const choice of finderQuestions[node].options) {
        const next = [...path, choice.id];
        if (choice.next) visit(choice.next, next);
        else paths.push(next);
      }
    }
    visit('start', []);
    expect(paths).toHaveLength(8);
    for (const path of paths) {
      const result = resolveFinder(path);
      expect(result.question).toBeNull();
      expect(result.guide).toBeDefined();
      expect(result.variant!.requirements.length).toBeGreaterThan(0);
      for (const requirement of result.variant!.requirements) {
        expect(translate(requirement, 'fil')).not.toBe(requirement);
      }
    }
    expect(resolveFinder(['business', 'lost']).answers).toEqual(['business']);
    expect(resolveFinder({ service: 'senior' }).answers).toEqual([]);
    expect(findGuides('senior citizen').map(g => g.slug)).toContain(
      'senior-citizen-id'
    );
    expect(findGuides('nakatatanda').map(g => g.slug)).toContain(
      'senior-citizen-id'
    );
  });

  it('selects renewal requirements, focuses the result, and preserves checklist progress across visits', () => {
    const view = render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /^A business permit/ }));
    expect(document.activeElement).toBe(
      screen.getByRole('heading', { level: 1 })
    );
    fireEvent.click(screen.getByRole('button', { name: /^Renewal/ }));
    expect(screen.getAllByRole('checkbox')).toHaveLength(4);
    const checkbox = screen.getByRole('checkbox', {
      name: /previous business permit/,
    });
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(document.activeElement).toBe(
      screen.getByRole('heading', { level: 1 })
    );
    expect(localStorage.getItem(finderStorageKey)).toBe(
      '["business","renewal"]'
    );
    expect(
      screen.getByRole('link', { name: 'Read these pages here' })
    ).toHaveAttribute('href', '/charter?page=163');
    view.unmount();
    render(<App />);
    expect(
      screen.getByRole('checkbox', { name: /previous business permit/ })
    ).toBeChecked();
    fireEvent.click(screen.getByRole('button', { name: 'Start over' }));
    expect(localStorage.getItem(finderStorageKey)).toBeNull();
    expect(
      localStorage.getItem(
        'betterbacoor:checklist:business-permit:renewal:2026-09-16'
      )
    ).toBe('[0]');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'What do you need help with?'
    );
  });

  it('shows only the selected senior-transfer route and allows correcting an answer', () => {
    render(<App />);
    fireEvent.click(
      screen.getByRole('button', { name: /^A Senior Citizen ID/ })
    );
    fireEvent.click(screen.getByRole('button', { name: /^Transfer my ID/ }));
    fireEvent.click(screen.getByRole('button', { name: /^No, I do not/ }));
    expect(
      screen.getByRole('checkbox', { name: /Three photocopies/ })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('checkbox', { name: /^A Certificate of Cancellation/ })
    ).not.toBeInTheDocument();
    fireEvent.click(
      screen.getByRole('button', { name: 'Change my last answer' })
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Certificate of Cancellation'
    );
    fireEvent.click(screen.getByRole('button', { name: /^Yes, I have/ }));
    expect(
      screen.getByRole('checkbox', { name: /^A Certificate of Cancellation/ })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('checkbox', { name: /Three photocopies/ })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Read these pages here' })
    ).toHaveAttribute('href', '/charter?page=658');
  });

  it('keeps a lost-ID result in Filipino and prints the selected preparation guide', () => {
    render(<App />);
    fireEvent.click(
      screen.getByRole('button', { name: /^A Senior Citizen ID/ })
    );
    act(() => setLanguage('fil'));
    fireEvent.click(
      screen.getByRole('button', { name: /^Palitan ang nawalang ID/ })
    );
    expect(screen.getAllByRole('checkbox')).toHaveLength(3);
    expect(
      screen.getByRole('checkbox', { name: 'Notaryadong Affidavit of Loss.' })
    ).toBeInTheDocument();
    expect(screen.getByText(/35 minuto/)).toHaveTextContent(
      'MIS processing time'
    );
    expect(
      screen.getByRole('link', { name: 'osca@bacoor.gov.ph' })
    ).toHaveAttribute('href', 'mailto:osca@bacoor.gov.ph');
    const print = vi.spyOn(window, 'print').mockImplementation(() => {});
    fireEvent.click(
      screen.getByRole('button', { name: 'I-print ang gabay at checklist' })
    );
    expect(print).toHaveBeenCalledOnce();
    expect(screen.getByText('Pinili mo:', { exact: false })).toHaveTextContent(
      'Palitan ang nawalang ID'
    );
    expect(document.documentElement.lang).toBe('fil');
  });

  it('discards corrupt saved choices and stays usable when storage is blocked', () => {
    localStorage.setItem(finderStorageKey, 'not-json');
    render(<App />);
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Blocked');
    });
    fireEvent.click(screen.getByRole('button', { name: /^A business permit/ }));
    expect(screen.getByRole('status')).toHaveTextContent('could not save');
    fireEvent.click(screen.getByRole('button', { name: /^New business/ }));
    expect(screen.getAllByRole('checkbox')).toHaveLength(5);
    expect(screen.getByRole('status')).toHaveTextContent('could not save');
  });

  it('uses the published senior requirements and preserves timing qualifications', () => {
    window.history.replaceState({}, '', '/services/senior-citizen-id');
    render(<App />);
    expect(screen.getByText(/aged 60/)).toHaveTextContent('six months');
    expect(screen.getByText(/35 minutes/)).toHaveTextContent(
      'not a guaranteed'
    );
    expect(screen.getByText(/no fee for the ID service/)).toHaveTextContent(
      'separate costs'
    );
    expect(
      screen.getByRole('link', { name: 'Original government source' })
    ).toHaveAttribute('href', `${seniorGuide.sourceUrl}#page=657`);
    expect(
      screen.getByText(/For dual citizens naturalized abroad/)
    ).toHaveTextContent('representative');
    fireEvent.click(screen.getByRole('radio', { name: 'Replace a lost ID' }));
    expect(
      screen.getByRole('checkbox', { name: 'A notarized Affidavit of Loss.' })
    ).toBeInTheDocument();
  });

  it.each([
    { answers: [] },
    { answers: ['senior'] },
    { answers: ['senior', 'transfer'] },
    { answers: ['senior', 'lost'] },
  ])(
    'has accessible questions and results for $answers',
    async ({ answers }) => {
      localStorage.setItem(finderStorageKey, JSON.stringify(answers));
      setLanguage('fil');
      const { container } = render(<App />);
      expect(
        (
          await axe.run(container, {
            rules: { 'color-contrast': { enabled: false } },
          })
        ).violations
      ).toEqual([]);
    }
  );
});
