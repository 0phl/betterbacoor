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
import { getLanguage, setLanguage, translate } from './index';
import { findGuides, guides } from '../data/guides';
import { findDirectoryEntries } from '../data/directory';
import { filterResources, resources } from '../data/resources';
import { emergency, emergencyCardText } from '../data/emergency';

describe('English and Filipino', () => {
  beforeEach(() => {
    localStorage.clear();
    setLanguage('en');
    window.history.replaceState({}, '', '/');
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
  it('switches text, page metadata, and screen-reader language without navigating', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Filipino' }));
    expect(document.documentElement.lang).toBe('fil');
    expect(document.title).toContain('Gabay ng Komunidad');
    expect(localStorage.getItem('betterbacoor:language')).toBe('fil');
    expect(
      screen.getByRole('heading', { name: 'Bacoor, mas madali.' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('searchbox', {
        name: 'Hanapin ang impormasyong sinuri para sa Bacoor',
      })
    ).toBeInTheDocument();
    expect(window.location.pathname).toBe('/');
    expect(window.scrollTo).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'English' }));
    expect(
      screen.getByRole('heading', { name: 'Bacoor, made easier.' })
    ).toBeInTheDocument();
  });
  it('preserves checked items and the selected application variant across languages', () => {
    window.history.replaceState({}, '', '/services/business-permit');
    render(<App />);
    fireEvent.click(screen.getByRole('radio', { name: 'Renewal' }));
    fireEvent.click(screen.getAllByRole('checkbox')[0]);
    fireEvent.click(screen.getByRole('button', { name: 'Filipino' }));
    expect(screen.getByRole('radio', { name: 'Renewal' })).toBeChecked();
    expect(
      screen.getByRole('checkbox', {
        name: 'Dating business permit o Statement of Account (SOA).',
      })
    ).toBeChecked();
    fireEvent.click(screen.getByRole('button', { name: 'English' }));
    expect(
      screen.getByRole('checkbox', {
        name: 'Your previous business permit or Statement of Account (SOA).',
      })
    ).toBeChecked();
  });
  it('searches English and Filipino regardless of the interface language', () => {
    for (const language of ['en', 'fil'] as const) {
      setLanguage(language);
      expect(findGuides('sertipiko kapanganakan').map(g => g.slug)).toContain(
        'civil-registry'
      );
      expect(findGuides('birth certificate').map(g => g.slug)).toContain(
        'civil-registry'
      );
      expect(findGuides('permit negosyo').map(g => g.slug)).toContain(
        'business-permit'
      );
      expect(findDirectoryEntries('ospital')).toHaveLength(10);
      expect(findDirectoryEntries('sentro ng kalusugan')).toHaveLength(7);
      expect(findDirectoryEntries('Molino 3', 'barangay')[0].name).toBe(
        'Molino III'
      );
      expect(filterResources(resources, 'panahon').map(r => r.id)).toContain(
        'pagasa-weather'
      );
    }
  });
  it('keeps fees and hotline destinations intact and downloads a Filipino contact card', () => {
    setLanguage('fil');
    window.history.replaceState({}, '', '/emergency');
    render(<App />);
    for (const contact of emergency.contacts)
      expect(
        screen.getByRole('link', {
          name: `Tumawag ${translate(contact.name, 'fil')}: ${contact.number}`,
        })
      ).toHaveAttribute('href', `tel:${contact.dial}`);
    const download = screen.getByRole('link', {
      name: 'I-download ang contact card',
    });
    const text = decodeURIComponent(
      download.getAttribute('href')!.split(',')[1]
    );
    expect(text).toBe(emergencyCardText('fil'));
    expect(text).toContain('Petsa ng impormasyon: 2026-09-16');
    for (const contact of emergency.contacts)
      expect(text).toContain(contact.number);
    for (const guide of guides)
      expect(translate(guide.fee, 'fil').match(/\d+/g)).toEqual(
        guide.fee.match(/\d+/g)
      );
    fireEvent.click(screen.getByRole('button', { name: 'Sunog' }));
    expect(
      screen.getByRole('heading', { name: 'Lumabas at manatili sa labas.' })
    ).toBeInTheDocument();
  });
  it('retains search filters on switching and uses Filipino when printing the guide', () => {
    window.history.replaceState({}, '', '/directories?type=hospital&q=Molino');
    const view = render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Filipino' }));
    expect(window.location.search).toBe('?type=hospital&q=Molino');
    expect(
      screen.getByRole('searchbox', { name: 'Maghanap ng lokal na lugar' })
    ).toHaveValue('Molino');
    view.unmount();
    window.history.replaceState({}, '', '/services/civil-registry');
    render(<App />);
    const print = vi.spyOn(window, 'print').mockImplementation(() => {});
    fireEvent.click(
      screen.getByRole('button', { name: 'I-print ang gabay at checklist' })
    );
    expect(print).toHaveBeenCalledOnce();
    expect(
      screen.getByRole('checkbox', {
        name: 'Valid na ID na inisyu ng pamahalaan.',
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/hindi sertipikong inisyu ng PSA/)
    ).toBeInTheDocument();
  });
  it('works when preferences cannot be stored and responds to another tab’s preference', () => {
    render(<App />);
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Denied');
    });
    fireEvent.click(screen.getByRole('button', { name: 'Filipino' }));
    expect(getLanguage()).toBe('fil');
    expect(
      screen.getByRole('heading', { name: 'Bacoor, mas madali.' })
    ).toBeInTheDocument();
    vi.restoreAllMocks();
    localStorage.setItem('betterbacoor:language', 'en');
    act(() =>
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: 'betterbacoor:language',
          newValue: 'en',
        })
      )
    );
    expect(document.documentElement.lang).toBe('en');
  });
  it('keeps Filipino navigation and controls accessible', async () => {
    setLanguage('fil');
    const { container } = render(<App />);
    const nav = within(
      screen.getByRole('navigation', { name: 'Pangunahing nabigasyon' })
    );
    expect(nav.getByRole('link', { name: 'Mga serbisyo' })).toHaveAttribute(
      'href',
      '/services'
    );
    expect(
      (
        await axe.run(container, {
          rules: { 'color-contrast': { enabled: false } },
        })
      ).violations
    ).toEqual([]);
  });
});
