import { describe, expect, it } from 'vitest';
import { filterResources, resources } from './resources';

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
});
