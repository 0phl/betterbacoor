import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ResourceExplorer } from './ResourceExplorer';

describe('ResourceExplorer', () => {
  it('filters rendered resources and updates the result count', () => {
    render(<ResourceExplorer />);

    fireEvent.change(screen.getByRole('searchbox'), {
      target: { value: 'barangay' },
    });

    expect(screen.getByText('1 resource found')).toBeInTheDocument();
    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Barangay hall directory',
    });
    expect(heading).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'Bacoor One Stop Shop System' })
    ).not.toBeInTheDocument();

    const correctionLink = screen.getByRole('link', {
      name: 'Suggest a correction on GitHub (account required)',
    });
    const correctionUrl = new URL(correctionLink.getAttribute('href') ?? '');
    expect(correctionUrl.searchParams.get('title')).toBe(
      'Correction: Barangay hall directory [bacoor-barangay-directory]'
    );
  });

  it('shows a useful empty state and can clear the search', () => {
    render(<ResourceExplorer />);

    fireEvent.change(screen.getByRole('searchbox'), {
      target: { value: 'not-a-real-resource' },
    });
    expect(
      screen.getByRole('heading', { name: 'No matching resource' })
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Clear search' }));
    expect(screen.getByRole('searchbox')).toHaveValue('');
    expect(screen.queryByText('No matching resource')).not.toBeInTheDocument();
  });

  it('starts from a query supplied by the route', () => {
    render(<ResourceExplorer initialQuery="hospital" />);

    expect(screen.getByRole('searchbox')).toHaveValue('hospital');
    expect(screen.getByText('1 resource found')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Hospital directory' })
    ).toBeInTheDocument();
  });
});
