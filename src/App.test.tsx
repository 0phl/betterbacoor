import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import axe from 'axe-core';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';

describe('BetterBacoor application shell', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/');
  });

  it('makes the unofficial status visible', () => {
    render(<App />);
    expect(
      screen.getByText(/Unofficial and community-run/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Find the right Bacoor source/i,
      })
    ).toBeInTheDocument();
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
    const scrollTo = vi
      .spyOn(window, 'scrollTo')
      .mockImplementation(() => undefined);
    render(<App />);

    fireEvent.click(screen.getByRole('link', { name: 'Services' }));

    await waitFor(() => {
      expect(document.activeElement).toBe(screen.getByRole('main'));
    });
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, left: 0 });
  });
});
