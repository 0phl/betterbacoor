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
import { findLocalInformation } from '../data/local-discovery';
import { barangayStorageKey } from '../data/my-barangay';

describe('citywide local-information discovery', () => {
  beforeEach(() => {
    localStorage.clear();
    setLanguage('en');
    window.history.replaceState({}, '', '/search?q=school');
    Object.defineProperty(window, 'scrollTo', {
      configurable: true,
      value: vi.fn(),
    });
  });
  afterEach(() => {
    cleanup();
    setLanguage('en');
    vi.restoreAllMocks();
  });

  it('counts school records, paginates them and opens the exact school on-site', () => {
    render(<App />);
    expect(screen.getByText('45 resources found')).toBeInTheDocument();
    expect(screen.queryByText('No matching resource')).not.toBeInTheDocument();
    expect(document.querySelectorAll('.resource-card')).toHaveLength(12);
    fireEvent.click(screen.getByRole('button', { name: 'Show more' }));
    expect(document.querySelectorAll('.resource-card')).toHaveLength(24);
    fireEvent.click(
      screen.getByRole('link', {
        name: 'View on BetterBacoor: Bayanan Elementary School',
      })
    );
    expect(window.location.pathname).toBe('/local-services');
    expect(
      screen.getByRole('heading', { name: 'Schools', level: 1 })
    ).toBeInTheDocument();
    expect(screen.getByText('1 of 1 listings shown')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: '107878@deped.gov.ph' })
    ).toHaveAttribute('href', 'mailto:107878@deped.gov.ph');
  });

  it('combines resource categories with local results and keeps one accessible clear control', () => {
    render(<App />);
    const input = screen.getByRole('searchbox');
    expect(input).toHaveClass('managed-search');
    expect(
      screen.getAllByRole('button', { name: 'Clear search' })
    ).toHaveLength(1);
    fireEvent.click(screen.getByRole('button', { name: 'Public record' }));
    expect(screen.getByText('0 resources found')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Directory' }));
    expect(screen.getByText('45 resources found')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Clear search' }));
    expect(input).toHaveValue('');
    expect(input).toHaveFocus();
    expect(new URLSearchParams(window.location.search).has('q')).toBe(false);
  });

  it('finds Filipino terms, facility names, profiles and checked waste routes', () => {
    expect(findLocalInformation('paaralan')).toHaveLength(45);
    expect(findLocalInformation('klinika')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 'health-yakap-1614' }),
      ])
    );
    expect(findLocalInformation('basura Molino 6')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 'waste-molino-vi' }),
      ])
    );
    expect(findLocalInformation('Astroville')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          href: expect.stringContaining('barangay=queens-row-west'),
        }),
      ])
    );
    expect(findLocalInformation('populasyon Bayanan')).toEqual([
      expect.objectContaining({ id: 'profile-0402103004' }),
    ]);
    expect(findLocalInformation('animal bite Habay')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          href: expect.stringContaining('service=animal-bite'),
        }),
      ])
    );
    expect(findLocalInformation('Old Zapote')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ href: '/local-services?section=assistance' }),
      ])
    );
  });

  it('opens a health search result in the correct service filter', () => {
    window.history.replaceState({}, '', '/search?q=IVAX+Molino');
    render(<App />);
    fireEvent.click(
      screen.getByRole('link', {
        name: 'View on BetterBacoor: IVAX Animal Bite and Vaccination Center — Molino Branch',
      })
    );
    expect(
      screen.getByRole('button', { name: 'Animal bite care' })
    ).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('1 of 1 listings shown')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'PhilHealth source' })
    ).toHaveAttribute('href', expect.stringContaining('#page=26'));
  });

  it('opens a route without overwriting My Barangay and resets it when the browsing barangay changes', () => {
    localStorage.setItem(barangayStorageKey, 'bayanan');
    window.history.replaceState({}, '', '/search?q=Astroville');
    render(<App />);
    fireEvent.click(
      screen.getByRole('link', { name: 'View on BetterBacoor: Astroville HOA' })
    );
    expect(screen.getByRole('combobox')).toHaveValue('queens-row-west');
    expect(screen.getByText('Thursday / Sunday')).toBeInTheDocument();
    expect(screen.getByRole('searchbox')).toHaveValue('Astroville HOA');
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'molino-vi' },
    });
    expect(screen.getByRole('searchbox')).toHaveValue('');
    expect(screen.queryByText('Astroville HOA')).not.toBeInTheDocument();
    expect(localStorage.getItem(barangayStorageKey)).toBe('bayanan');
    expect(window.scrollTo).toHaveBeenCalledTimes(1);
  });

  it('exposes browse entry points from Directories and Services', () => {
    window.history.replaceState({}, '', '/directories');
    const view = render(<App />);
    const browse = screen.getByRole('navigation', {
      name: 'Browse local information',
    });
    fireEvent.click(within(browse).getByRole('link', { name: /Schools/ }));
    expect(
      screen.getByRole('heading', { name: 'Schools', level: 1 })
    ).toBeInTheDocument();
    expect(screen.getByText('6 of 44 listings shown')).toBeInTheDocument();
    view.unmount();
    window.history.replaceState({}, '', '/services');
    render(<App />);
    expect(
      within(
        screen.getByRole('navigation', { name: 'Browse local information' })
      ).getByRole('link', { name: /Garbage collection/ })
    ).toHaveAttribute('href', '/local-services?section=garbage');
  });

  it('handles unknown URL values and keeps Filipino search and browsing accessible', async () => {
    window.history.replaceState(
      {},
      '',
      '/local-services?section=barangays&barangay=unknown'
    );
    const view = render(<App />);
    expect(screen.getByRole('combobox')).toHaveValue('');
    expect(
      screen.getByText(/Choose a barangay to see its population/)
    ).toBeInTheDocument();
    act(() => setLanguage('fil'));
    expect(
      (
        await axe.run(view.container, {
          rules: { 'color-contrast': { enabled: false } },
        })
      ).violations
    ).toEqual([]);
    view.unmount();
    window.history.replaceState({}, '', '/search?q=paaralan');
    const search = render(<App />);
    expect(screen.queryByText('No matching resource')).not.toBeInTheDocument();
    expect(
      (
        await axe.run(search.container, {
          rules: { 'color-contrast': { enabled: false } },
        })
      ).violations
    ).toEqual([]);
  });
});
