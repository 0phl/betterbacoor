import { fireEvent, render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import axe from 'axe-core';
import App from '../App';
import {
  emergency,
  emergencyCardText,
  emergencyNeedsReview,
} from '../data/emergency';

describe('Emergency help', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/emergency');
    Object.defineProperty(window, 'scrollTo', {
      configurable: true,
      value: vi.fn(),
    });
  });

  it('keeps printed numbers and callable destinations consistent', () => {
    render(<App />);
    const expected = [
      '161',
      '911',
      '+63464170727',
      '+63464176060',
      '+63464176366',
      '+63468400774',
      '143',
    ];
    for (const [index, contact] of emergency.contacts.entries()) {
      expect(contact.dial).toBe(expected[index]);
      expect(
        screen.getByRole('link', {
          name: `Call ${contact.name}: ${contact.number}`,
        })
      ).toHaveAttribute('href', `tel:${expected[index]}`);
    }
  });

  it('changes guidance and relevant contacts without navigating or moving focus', () => {
    render(<App />);
    const fireButton = screen.getByRole('button', {
      name: 'Fire',
    });
    fireButton.focus();
    fireEvent.click(fireButton);
    expect(fireButton).toHaveAttribute('aria-pressed', 'true');
    expect(fireButton).toHaveFocus();
    expect(
      screen.getByRole('heading', { name: 'Leave the fire. Stay outside.' })
    ).toBeInTheDocument();
    expect(
      within(
        screen.getByRole('complementary', {
          name: 'Contacts for this situation',
        })
      ).getByRole('link', { name: /Bacoor fire station/ })
    ).toHaveAttribute('href', 'tel:+63464176060');
    expect(window.scrollTo).not.toHaveBeenCalled();
    fireEvent.change(
      screen.getByRole('combobox', { name: 'Choose a situation' }),
      { target: { value: 'earthquake' } }
    );
    expect(
      screen.getByRole('heading', {
        name: 'Protect yourself during the shaking',
      })
    ).toBeInTheDocument();
  });

  it('saves a complete offline contact card with a snapshot and sources', () => {
    render(<App />);
    const save = screen.getByRole('link', { name: 'Save contact card' });
    const text = decodeURIComponent(save.getAttribute('href')!.split(',')[1]);
    expect(text).toBe(emergencyCardText());
    expect(save).toHaveAttribute(
      'download',
      'betterbacoor-emergency-contacts.txt'
    );
    expect(text).toContain(`Information snapshot: ${emergency.last_verified}`);
    expect(text).toContain('Recheck');
    for (const contact of emergency.contacts)
      expect(text).toContain(contact.number);
    expect(text).toContain(
      'https://bacoor.gov.ph/announcement/in-case-of-emergencies-dial-161/'
    );
  });

  it('flags a stale snapshot without hiding emergency phone access', () => {
    expect(emergencyNeedsReview(new Date('2026-09-16T00:00:00Z'))).toBe(false);
    expect(emergencyNeedsReview(new Date('2026-10-17T00:00:00Z'))).toBe(true);
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-10-17T00:00:00Z'));
    try {
      render(<App />);
      expect(screen.getByRole('status')).toHaveTextContent(
        'due for another source review'
      );
      expect(
        screen.getByRole('link', {
          name: 'Call National emergency hotline: 911',
        })
      ).toHaveAttribute('href', 'tel:911');
    } finally {
      vi.useRealTimers();
    }
  });

  it('finds on-site emergency help from a resident search', () => {
    window.history.replaceState({}, '', '/search?q=baha');
    render(<App />);
    fireEvent.click(
      screen.getByRole('link', { name: /ON BETTERBACOOR Emergency help/ })
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Help when it matters.'
    );
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  });

  it('prints on request and exposes accessible emergency controls', async () => {
    const print = vi.spyOn(window, 'print').mockImplementation(() => {});
    const { container } = render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Print this page' }));
    expect(print).toHaveBeenCalledOnce();
    print.mockRestore();
    expect(
      (
        await axe.run(container, {
          rules: { 'color-contrast': { enabled: false } },
        })
      ).violations
    ).toEqual([]);
  });
});
