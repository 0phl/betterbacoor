import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import axe from 'axe-core';
import { BarangayInformation, BarangayProfile } from './BarangayInformation';
import {
  accreditationExpired,
  barangayProfile,
  census,
  health,
  schools,
  waste,
} from '../data/barangay-information';
import { barangays } from '../data/my-barangay';
import { setLanguage } from '../i18n';

function Information({ id = 'molino-vi' }: { id?: string }) {
  return (
    <MemoryRouter>
      <BarangayInformation id={id} />
    </MemoryRouter>
  );
}

describe('researched barangay information', () => {
  beforeEach(() => setLanguage('en'));
  afterEach(() => {
    cleanup();
    setLanguage('en');
  });

  it('joins all 47 current headings exactly once and keeps census totals consistent', () => {
    expect(census.barangays).toHaveLength(47);
    expect(new Set(census.barangays.map(row => row.psgc)).size).toBe(47);
    expect(new Set(census.barangays.map(row => row.directory_id))).toEqual(
      new Set(barangays.map(row => row.id))
    );
    expect(
      census.barangays.reduce((sum, row) => sum + row.population_2024, 0)
    ).toBe(661381);
    expect(barangayProfile('bayanan')?.population_2024).toBe(12552);
    expect(barangayProfile('sinbanali')?.population_2024).toBe(7023);
    expect(barangayProfile('invalid')).toBeUndefined();
    const view = render(<BarangayProfile id="bayanan" />);
    expect(screen.getByText('12,552')).toBeInTheDocument();
    view.rerender(<BarangayProfile id="sinbanali" />);
    expect(screen.queryByText('12,552')).not.toBeInTheDocument();
    expect(screen.getByText('7,023')).toBeInTheDocument();
    expect(screen.getByText('Population · 2024 census')).toBeInTheDocument();
  });

  it('retains evidence and excludes disputed records and malformed contacts', () => {
    expect(health.entries).toHaveLength(19);
    expect(health.entries.some(row => /Green Valley/i.test(row.name))).toBe(
      false
    );
    expect(
      health.entries.find(row => row.id === 'animal-bite-587')?.phones
    ).toEqual([]);
    expect(health.entries.find(row => row.id === 'dental-352')?.phones).toEqual(
      []
    );
    expect(schools.entries).toHaveLength(44);
    expect(schools.entries.find(row => row.id === '342602')?.email).toBe('');
    expect(new Set(waste.images.flatMap(row => row.barangay_ids)).size).toBe(
      33
    );
    for (const row of waste.routes) {
      expect(
        waste.images.find(image => image.url === row.image_url)?.barangay_ids
      ).toContain(row.barangay_id);
    }
  });

  it('expires accreditation only after the last listed day in Philippine time', () => {
    expect(
      accreditationExpired('2026-12-31', new Date('2026-12-31T15:59:59Z'))
    ).toBe(false);
    expect(
      accreditationExpired('2026-12-31', new Date('2026-12-31T16:00:00Z'))
    ).toBe(true);
  });

  it('filters care by service, searches areas, and provides exact source-backed call links', () => {
    render(<Information />);
    expect(screen.getByText('6 of 13 listings shown')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Show more' }));
    expect(screen.getByText('12 of 13 listings shown')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Animal bite care' }));
    expect(screen.getByText('4 of 4 listings shown')).toBeInTheDocument();
    expect(
      screen.getByRole('link', {
        name: 'Call City of Bacoor Animal Bite Treatment Center: (046) 435-3420',
      })
    ).toHaveAttribute('href', 'tel:+63464353420');
    fireEvent.change(screen.getByRole('searchbox'), {
      target: { value: 'Molino 3' },
    });
    expect(screen.getByText('1 of 1 listings shown')).toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: /^Call / })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'PhilHealth source' })
    ).toHaveAttribute(
      'href',
      expect.stringContaining('ABPP_073126.pdf#page=26')
    );
  });

  it('searches schools and never creates an email link for the source typo', () => {
    render(<Information />);
    fireEvent.click(screen.getByRole('button', { name: 'Schools' }));
    fireEvent.click(screen.getByRole('button', { name: 'Senior high' }));
    expect(screen.getByText('5 of 5 listings shown')).toBeInTheDocument();
    fireEvent.change(screen.getByRole('searchbox'), {
      target: { value: 'Bacoor Elementary' },
    });
    expect(screen.getByText('1 of 1 listings shown')).toBeInTheDocument();
    expect(document.querySelector('a[href^="mailto:"]')).toBeNull();
    expect(
      screen.getByRole('link', { name: 'School Facebook page' })
    ).toHaveAttribute(
      'href',
      'https://www.facebook.com/DepEdTayoSHSwithinBES342602'
    );
    fireEvent.change(screen.getByRole('searchbox'), {
      target: { value: 'does not exist' },
    });
    expect(screen.getByText(/No listings match/)).toBeInTheDocument();
  });

  it('does not carry one barangay’s collection schedule into another selection', async () => {
    const view = render(<Information />);
    fireEvent.click(screen.getByRole('button', { name: 'Garbage collection' }));
    fireEvent.change(screen.getByRole('searchbox'), {
      target: { value: 'Phase 1' },
    });
    expect(screen.getByText('Tuesday / Friday')).toBeInTheDocument();
    expect(screen.queryByText('Monday / Thursday')).not.toBeInTheDocument();
    view.rerender(<Information id="queens-row-west" />);
    expect(screen.getByRole('searchbox')).toHaveValue('');
    expect(
      screen.queryByText('Soldiers Hills 4, Phase 1')
    ).not.toBeInTheDocument();
    expect(screen.getByText('Astroville HOA')).toBeInTheDocument();
    const details = document.querySelector('details')!;
    details.open = true;
    fireEvent(details, new Event('toggle'));
    await waitFor(() => expect(screen.getByRole('img')).toBeInTheDocument());
    fireEvent.error(screen.getByRole('img'));
    expect(
      screen.getByText(/schedule image could not load/)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Open full-size city table/ })
    ).toHaveAttribute('href', expect.stringContaining('605878383_'));
    view.rerender(<Information id="bayanan" />);
    expect(
      screen.getByText(/do not yet have a verified collection table/)
    ).toBeInTheDocument();
    expect(screen.queryByText('Astroville HOA')).not.toBeInTheDocument();
    view.rerender(<Information id="queens-row-east" />);
    expect(
      screen.getByText(/two day-pairs without assigning/)
    ).toBeInTheDocument();
    expect(screen.queryByRole('searchbox')).not.toBeInTheDocument();
  });

  it('shows assistance locations without selecting a disputed Bayanan assignment', () => {
    render(<Information id="bayanan" />);
    fireEvent.click(screen.getByRole('button', { name: 'Assistance centers' }));
    expect(
      screen.getByText(/Bayanan appears under both centers 4 and 5/)
    ).toBeInTheDocument();
    expect(
      screen.getByText('Old Panapaan 2 Barangay Hall')
    ).toBeInTheDocument();
    expect(
      screen.queryByText('Old Salinas 4 Barangay Hall')
    ).not.toBeInTheDocument();
  });

  it('keeps all information views accessible in Filipino', async () => {
    const { container } = render(<Information id="queens-row-east" />);
    act(() => setLanguage('fil'));
    const group = screen.getByRole('group', {
      name: 'Uri ng lokal na impormasyon',
    });
    for (const button of within(group).getAllByRole('button')) {
      fireEvent.click(button);
      expect(
        (
          await axe.run(container, {
            rules: { 'color-contrast': { enabled: false } },
          })
        ).violations
      ).toEqual([]);
    }
  });
});
