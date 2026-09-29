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
import { guides } from '../data/guides';
import { checklistKey } from '../data/checklists';
import { finderQuestions, finderStorageKey } from '../data/service-finder';
import { setLanguage, translate } from '../i18n';

const services = [
  ['pwd', 'pwd-id'],
  ['solo-parent', 'solo-parent-id'],
  ['medical-assistance', 'medical-assistance'],
  ['burial-assistance', 'burial-assistance'],
  ['education', 'education-support'],
  ['employment', 'peso-employment'],
];

describe('Expanded citizen service access', () => {
  beforeEach(() => {
    localStorage.clear();
    setLanguage('en');
    window.scrollTo = vi.fn();
  });
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    setLanguage('en');
  });

  it.each(services)(
    'keeps %s preparation usable through language changes, printing, and saved checklists',
    (choice, slug) => {
      const guide = guides.find(item => item.slug === slug)!;
      localStorage.setItem(finderStorageKey, JSON.stringify([choice]));
      window.history.replaceState({}, '', '/services/find');
      const view = render(<App />);
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        guide.title
      );
      expect(
        screen.getByRole('link', { name: 'Original government source' })
      ).toHaveAttribute(
        'href',
        guide.sourceUrl +
          (guide.variants[0].sourcePage
            ? `#page=${guide.variants[0].sourcePage}`
            : '')
      );
      expect(screen.getByText(guide.verified)).toBeInTheDocument();
      fireEvent.click(screen.getAllByRole('checkbox')[0]);
      act(() => setLanguage('fil'));
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        translate(guide.title, 'fil')
      );
      expect(screen.getAllByRole('checkbox')[0]).toBeChecked();
      const print = vi.spyOn(window, 'print').mockImplementation(() => {});
      fireEvent.click(
        screen.getByRole('button', { name: 'I-print ang gabay at checklist' })
      );
      expect(print).toHaveBeenCalledOnce();
      expect(localStorage.getItem(checklistKey(guide, guide.variants[0]))).toBe(
        '[0]'
      );
      view.unmount();
      window.history.replaceState({}, '', '/my-barangay');
      render(<App />);
      expect(
        screen.getByRole('link', {
          name: new RegExp(
            translate(guide.title, 'fil').replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
          ),
        })
      ).toHaveAttribute('href', `/services/${slug}?variant=prepare`);
    }
  );

  it.each(services)(
    'discovers %s through cards, bilingual search, and finder clicks',
    (choice, slug) => {
      const guide = guides.find(item => item.slug === slug)!;
      for (const language of ['en', 'fil'] as const) {
        setLanguage(language);
        window.history.replaceState({}, '', '/services');
        let view = render(<App />);
        expect(
          view.container.querySelectorAll(`main a[href="/services/${slug}"]`)
        ).toHaveLength(1);
        view.unmount();
        window.history.replaceState(
          {},
          '',
          `/search?q=${encodeURIComponent(translate(guide.title, language))}`
        );
        view = render(<App />);
        const links = view.container.querySelectorAll(
          `main a[href="/services/${slug}"]`
        );
        expect(links).toHaveLength(1);
        fireEvent.click(links[0]);
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
          translate(guide.title, language)
        );
        view.unmount();
        localStorage.removeItem(finderStorageKey);
        window.history.replaceState({}, '', '/services/find');
        view = render(<App />);
        const option = finderQuestions.start.options.find(
          item => item.id === choice
        )!;
        fireEvent.click(
          screen.getByRole('button', {
            name: name => name.startsWith(translate(option.label, language)),
          })
        );
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
          translate(guide.title, language)
        );
        expect(screen.getByRole('heading', { level: 1 })).toHaveFocus();
        view.unmount();
      }
    }
  );

  it.each(services)(
    'keeps %s direct links, reload, reset, and storage failures accessible',
    async (_choice, slug) => {
      const guide = guides.find(item => item.slug === slug)!;
      const key = checklistKey(guide, guide.variants[0]);
      window.history.replaceState({}, '', `/services/${slug}?variant=prepare`);
      localStorage.setItem(key, 'broken JSON');
      let view = render(<App />);
      expect(
        screen
          .getAllByRole('checkbox')
          .every(box => !(box as HTMLInputElement).checked)
      ).toBe(true);
      fireEvent.click(screen.getAllByRole('checkbox')[0]);
      view.unmount();
      view = render(<App />);
      expect(screen.getAllByRole('checkbox')[0]).toBeChecked();
      fireEvent.click(screen.getByRole('button', { name: 'Reset checklist' }));
      expect(localStorage.getItem(key)).toBeNull();
      const blocked = vi
        .spyOn(Storage.prototype, 'setItem')
        .mockImplementation(() => {
          throw new Error('Blocked storage');
        });
      fireEvent.click(screen.getAllByRole('checkbox')[0]);
      expect(screen.getAllByRole('checkbox')[0]).toBeChecked();
      expect(screen.getByRole('status')).toHaveTextContent('could not save');
      act(() => setLanguage('fil'));
      expect(screen.getAllByRole('checkbox')[0]).toBeChecked();
      expect(screen.getByRole('status')).toHaveTextContent(
        translate(
          'Your browser could not save these ticks. You can still use and print this checklist during this visit.',
          'fil'
        )
      );
      blocked.mockRestore();
      expect(
        (
          await axe.run(view.container, {
            rules: { 'color-contrast': { enabled: false } },
          })
        ).violations
      ).toEqual([]);
    }
  );

  it('has an official PWD handoff without an invented email or full-checklist claim', async () => {
    window.history.replaceState({}, '', '/services/pwd-id');
    const { container } = render(<App />);
    expect(container.querySelector('main a[href^="mailto:"]')).toBeNull();
    expect(
      screen.getByRole('link', { name: 'Open the official Citizen Portal' })
    ).toHaveAttribute('href', 'https://portal.bacoor.gov.ph/');
    expect(
      screen.getByText(/complete PWD ID document checklist/)
    ).toBeInTheDocument();
    expect(
      (
        await axe.run(container, {
          rules: { 'color-contrast': { enabled: false } },
        })
      ).violations
    ).toEqual([]);
  });
});
