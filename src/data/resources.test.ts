import { describe, expect, it } from 'vitest';
import { filterResources, getReviewStatus, resources } from './resources';

describe('civic resource search', () => {
  it('loads the checked foundation resources', () => {
    expect(resources.length).toBeGreaterThan(0);
    expect(resources.every(resource => resource.last_verified)).toBe(true);
  });

  it('matches titles, summaries, and tags without case sensitivity', () => {
    expect(filterResources(resources, 'BARANGAY')).toHaveLength(1);
    expect(filterResources(resources, 'requirements')).toHaveLength(1);
    expect(
      filterResources(resources, 'public documents').length
    ).toBeGreaterThan(0);
  });

  it('limits results to requested categories', () => {
    const directories = filterResources(resources, '', ['directory']);
    expect(directories.length).toBeGreaterThan(0);
    expect(
      directories.every(resource => resource.category === 'directory')
    ).toBe(true);
  });

  it('marks a record overdue only after its review due date', () => {
    const resource = {
      ...resources[0],
      last_verified: '2026-01-01',
      review_interval_days: 90,
    };

    expect(getReviewStatus(resource, new Date('2026-04-01T23:59:59Z'))).toEqual(
      {
        overdue: false,
        dueDate: '2026-04-01',
      }
    );
    expect(getReviewStatus(resource, new Date('2026-04-02T00:00:00Z'))).toEqual(
      {
        overdue: true,
        dueDate: '2026-04-01',
      }
    );
  });
});
