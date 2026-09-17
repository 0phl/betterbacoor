import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import axe from 'axe-core';
import App from '../App';
import { setLanguage } from '../i18n';
import { barangays, barangayStorageKey } from '../data/my-barangay';
import { checklistKey, readSavedChecklists } from '../data/checklists';
import { guides } from '../data/guides';

describe('My Barangay', () => {
  beforeEach(() => {
    localStorage.clear();
    setLanguage('en');
    window.history.replaceState({}, '', '/my-barangay');
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

  it('remembers a published barangay, preserves groupings, and clears only that choice', () => {
    const guide = guides[0],
      variant = guide.variants[1];
    const key = checklistKey(guide, variant);
    localStorage.setItem(key, '[0]');
    const view = render(<App />);
    expect(
      screen
        .getByRole('combobox', { name: 'Your barangay' })
        .querySelectorAll('option')
    ).toHaveLength(barangays.length + 1);
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'aniban-i' },
    });
    expect(
      screen.getByRole('heading', { name: 'Aniban I' })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Listed together.*Aniban I, Aniban III, Aniban V/)
    ).toBeInTheDocument();
    expect(screen.getByText('417-7024').closest('a')).toBeNull();
    expect(screen.getByText(/Area code not provided/)).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'City source for Aniban I' })
    ).toHaveAttribute('href', 'https://bacoor.gov.ph/barangay-hall-directory/');
    view.unmount();
    render(<App />);
    expect(screen.getByRole('combobox')).toHaveValue('aniban-i');
    fireEvent.click(screen.getByRole('button', { name: 'Clear choice' }));
    expect(localStorage.getItem(barangayStorageKey)).toBeNull();
    expect(localStorage.getItem(key)).toBe('[0]');
    expect(screen.getByText('Barangay choice cleared.')).toBeInTheDocument();
  });

  it('does not invent missing contacts, hours, or local responders', () => {
    localStorage.setItem(barangayStorageKey, 'aniban-ii');
    const { container } = render(<App />);
    expect(
      screen.getByText('No contact number listed in the source.')
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Hall address and office hours are not listed/)
    ).toBeInTheDocument();
    const help = screen.getByRole('region', { name: 'Help across Bacoor' });
    expect(
      within(help).getByRole('link', {
        name: 'Call Bacoor disaster response: (046) 417-0727',
      })
    ).toHaveAttribute('href', 'tel:+63464170727');
    expect(
      within(help).getByRole('link', {
        name: 'Call Bacoor fire station: (046) 417-6060',
      })
    ).toHaveAttribute('href', 'tel:+63464176060');
    expect(
      within(help).getByRole('link', {
        name: 'Call National emergency hotline: 911',
      })
    ).toHaveAttribute('href', 'tel:911');
    expect(container.querySelector('a[href*="maps"]')).toBeNull();
    expect(
      screen.getByText(/does not monitor live conditions or dispatch help/)
    ).toBeInTheDocument();
  });

  it('resumes the exact saved variant and existing checklist ticks', () => {
    const guide = guides[0],
      variant = guide.variants[1];
    localStorage.setItem(checklistKey(guide, variant), '[0,0,-1,999,"1",1.5]');
    localStorage.setItem(
      `betterbacoor:checklist:${guide.slug}:${variant.id}:2000-01-01`,
      '[0,1]'
    );
    render(<App />);
    const progress = screen.getByRole('progressbar');
    expect(progress).toHaveAttribute('value', '1');
    fireEvent.click(
      screen.getByRole('link', { name: new RegExp(guide.title) })
    );
    expect(screen.getByRole('radio', { name: variant.label })).toBeChecked();
    expect(screen.getAllByRole('checkbox')[0]).toBeChecked();
    expect(screen.getAllByRole('checkbox')[1]).not.toBeChecked();
  });

  it('ignores unknown selections and malformed or outdated checklists', () => {
    localStorage.setItem(barangayStorageKey, '<invalid>');
    for (const guide of guides)
      for (const variant of guide.variants) {
        localStorage.setItem(checklistKey(guide, variant), '{broken');
      }
    expect(readSavedChecklists().items).toHaveLength(0);
    render(<App />);
    expect(screen.getByRole('combobox')).toHaveValue('');
    expect(screen.getByText('Start with your barangay.')).toBeInTheDocument();
  });

  it('keeps the page usable when browser storage is blocked', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new DOMException('Blocked', 'SecurityError');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('Blocked', 'SecurityError');
    });
    vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
      throw new DOMException('Blocked', 'SecurityError');
    });
    render(<App />);
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'molino-iii' },
    });
    expect(
      screen.getByRole('heading', { name: 'Molino III' })
    ).toBeInTheDocument();
    expect(screen.getByText(/could not save this choice/)).toBeInTheDocument();
    expect(
      screen.getByText(/could not read saved checklists/)
    ).toBeInTheDocument();
    act(() => window.dispatchEvent(new Event('focus')));
    expect(screen.getByRole('combobox')).toHaveValue('molino-iii');
    fireEvent.click(screen.getByRole('button', { name: 'Clear choice' }));
    expect(screen.getByRole('combobox')).toHaveValue('');
  });

  it('refreshes state changed in another tab and translates without losing the selection', () => {
    render(<App />);
    localStorage.setItem(barangayStorageKey, 'molino-vi');
    act(() =>
      window.dispatchEvent(
        new StorageEvent('storage', { key: barangayStorageKey })
      )
    );
    expect(screen.getByRole('combobox')).toHaveValue('molino-vi');
    const guide = guides[0],
      variant = guide.variants[0];
    localStorage.setItem(checklistKey(guide, variant), '[0]');
    act(() =>
      window.dispatchEvent(
        new StorageEvent('storage', { key: checklistKey(guide, variant) })
      )
    );
    expect(screen.getByRole('progressbar')).toHaveAttribute('value', '1');
    act(() => setLanguage('fil'));
    expect(
      screen.getByRole('heading', { name: 'Aking Barangay', level: 1 })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('combobox', { name: 'Iyong barangay' })
    ).toHaveValue('molino-vi');
    expect(screen.getByText('476-0461')).toBeInTheDocument();
    expect(screen.getByText('572-0455')).toBeInTheDocument();
  });

  it('falls back safely for an invalid variant link', () => {
    window.history.replaceState(
      {},
      '',
      '/services/business-permit?variant=invalid'
    );
    render(<App />);
    expect(
      screen.getByRole('radio', { name: guides[0].variants[0].label })
    ).toBeChecked();
  });

  it.each(['en', 'fil'] as const)(
    'has accessible empty and selected views in %s',
    async language => {
      setLanguage(language);
      const { container } = render(<App />);
      expect(
        (
          await axe.run(container, {
            rules: { 'color-contrast': { enabled: false } },
          })
        ).violations
      ).toEqual([]);
      fireEvent.change(screen.getByRole('combobox'), {
        target: { value: 'molino-vi' },
      });
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
