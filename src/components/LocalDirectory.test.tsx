import { fireEvent, render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import axe from 'axe-core';
import App from '../App';
import {
  directory,
  directoryNeedsReview,
  findDirectoryEntries,
} from '../data/directory';

describe('Local directory', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/directories');
    Object.defineProperty(window, 'scrollTo', {
      configurable: true,
      value: vi.fn(),
    });
  });
  it('matches former names and Roman or Arabic numbers without matching other numbered barangays', () => {
    expect(
      findDirectoryEntries('molino 3', 'barangay').map(item => item.name)
    ).toEqual(['Molino III']);
    expect(
      findDirectoryEntries('Molino III', 'barangay').map(item => item.name)
    ).toEqual(['Molino III']);
    expect(
      findDirectoryEntries('alima', 'barangay').map(item => item.name)
    ).toEqual(['Sinbanali']);
    expect(
      findDirectoryEntries('PF Espiritu 8', 'barangay').map(item => item.name)
    ).toEqual(['P.F. Espiritu VI']);
    expect(
      findDirectoryEntries('Ligas II', 'barangay').map(item => item.name)
    ).toEqual(['Ligas I', 'Ligas II']);
  });
  it('shares filters in the URL and resets pagination when searching', () => {
    render(<App />);
    expect(screen.getByRole('status')).toHaveTextContent('64 places found');
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(window.location.search).toContain('page=2');
    fireEvent.change(
      screen.getByRole('searchbox', { name: 'Search local places' }),
      { target: { value: 'Alima' } }
    );
    expect(window.location.search).toBe('?q=Alima');
    expect(screen.getByRole('status')).toHaveTextContent('1 place found');
    expect(
      screen.getByRole('heading', { name: 'Sinbanali' })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Hospitals' }));
    expect(
      screen.getByRole('heading', { name: 'No places match those filters.' })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Clear filters' }));
    expect(window.location.search).toBe('');
    expect(window.scrollTo).not.toHaveBeenCalled();
  });
  it('never fabricates callable area codes or missing addresses', () => {
    window.history.replaceState({}, '', '/directories?q=Aniban+1');
    render(<App />);
    const card = screen
      .getByRole('heading', { name: 'Aniban I' })
      .closest('article')!;
    expect(within(card).getByText('417-7024')).toBeInTheDocument();
    expect(card.querySelector('a[href^="tel:"]')).toBeNull();
    expect(within(card).queryByRole('link', { name: /Maps/ })).toBeNull();
    expect(
      within(card).getByText(/Area code not provided/)
    ).toBeInTheDocument();
  });
  it('shows all ten hospitals with exact phone destinations, addresses, and sources', async () => {
    window.history.replaceState({}, '', '/directories?type=hospital');
    const { container } = render(<App />);
    expect(screen.getByRole('status')).toHaveTextContent('10 places found');
    expect(
      screen.getByRole('link', {
        name: 'Call South City Hospital and Medical Center: (02) 8249 9100',
      })
    ).toHaveAttribute('href', 'tel:+63282499100');
    for (const item of directory.entries.filter(
      item => item.category === 'hospital'
    )) {
      const card = screen
        .getByRole('heading', { name: item.name })
        .closest('article')!;
      expect(within(card).getByText(item.address)).toBeInTheDocument();
      expect(
        within(card).getByRole('link', { name: `City source for ${item.name}` })
      ).toHaveAttribute(
        'href',
        'https://bacoor.gov.ph/bacoor-hospital-directory/'
      );
    }
    expect(
      (
        await axe.run(container, {
          rules: { 'color-contrast': { enabled: false } },
        })
      ).violations
    ).toEqual([]);
  });
  it('flags overdue source snapshots and handles invalid URL filters', () => {
    expect(
      directoryNeedsReview('hospitals', new Date('2026-12-16T00:00:00Z'))
    ).toBe(true);
    window.history.replaceState({}, '', '/directories?type=invalid&page=-5');
    render(<App />);
    expect(screen.getByRole('status')).toHaveTextContent('Page 1 of 6');
  });
});
