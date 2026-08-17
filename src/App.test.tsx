import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import axe from 'axe-core';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';

describe('BetterBacoor application shell', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/');
    Object.defineProperty(window, 'scrollTo', {
      configurable: true,
      value: vi.fn(),
    });
  });

  it('makes the unofficial status visible', () => {
    render(<App />);

    const banner = screen.getByRole('banner');
    expect(
      within(banner).getByText(/Unofficial and community-run/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Know where to go in Bacoor/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'BetterLocalGov starter' })
    ).toHaveAttribute('href', 'https://github.com/iyanski/betterlocalgov');
    expect(
      screen.getByRole('link', { name: 'BetterGov.ph community' })
    ).toHaveAttribute('href', 'https://bettergov.ph/');
    expect(
      within(screen.getByRole('contentinfo')).getByRole('link', {
        name: /Report incorrect or outdated information on GitHub \(account required\)/i,
      })
    ).toBeInTheDocument();

    const correctionLinks = screen
      .getAllByRole('link')
      .filter(link => link.getAttribute('href')?.includes('correction.yml'));
    expect(correctionLinks.length).toBeGreaterThan(0);
    correctionLinks.forEach(link => {
      expect(link).toHaveAccessibleName(/account required/i);
    });
  });

  it('uses the approved logo and domain lockup in the navbar', () => {
    render(<App />);

    const brandLink = screen.getByRole('link', {
      name: /BetterBacoor\.org Civic guide/i,
    });
    expect(brandLink).toHaveAttribute('href', '/');
    expect(brandLink.querySelector('img')).toHaveAttribute(
      'src',
      '/logo-mark.svg'
    );
  });

  it('searches every verified resource from the homepage', async () => {
    render(<App />);

    fireEvent.change(
      screen.getByRole('searchbox', {
        name: 'Search all verified Bacoor resources',
      }),
      { target: { value: 'barangay' } }
    );
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));

    expect(
      await screen.findByRole('heading', {
        level: 1,
        name: 'Search all verified Bacoor resources',
      })
    ).toBeInTheDocument();
    expect(screen.getByText('1 resource found')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Barangay hall directory',
      })
    ).toBeInTheDocument();
    expect(window.location.search).toBe('?q=barangay');
  });

  it('exposes an accessible mobile navigation toggle', () => {
    render(<App />);

    const toggle = screen.getByRole('button', { name: 'Open navigation' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(toggle);
    expect(
      screen.getByRole('button', { name: 'Close navigation' })
    ).toHaveAttribute('aria-expanded', 'true');
  });

  it('has no detectable axe violations on the home page', async () => {
    const { container } = render(<App />);
    const result = await axe.run(container, {
      rules: {
        // jsdom has no layout engine or canvas; contrast is checked in-browser.
        'color-contrast': { enabled: false },
      },
    });
    expect(result.violations).toEqual([]);
  });

  it('moves focus to new page content after client-side navigation', async () => {
    render(<App />);

    fireEvent.click(
      within(
        screen.getByRole('navigation', { name: 'Primary navigation' })
      ).getByRole('link', { name: 'Services' })
    );

    await waitFor(() => {
      expect(document.activeElement).toBe(screen.getByRole('main'));
    });
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, left: 0 });
  });
});
