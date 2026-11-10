// @vitest-environment node
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { guides } from '../src/data/guides.ts';

const read = path =>
  readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

const vercelRoutes = JSON.parse(read('vercel.json')).rewrites.map(rewrite => {
  expect(rewrite.destination).toBe('/index.html');
  return rewrite.source;
});

const redirectRoutes = read('public/_redirects')
  .split('\n')
  .filter(line => line.trim())
  .map(line => {
    const [source, destination, status] = line.trim().split(/\s+/);
    expect([destination, status]).toEqual(['/index.html', '200']);
    return source;
  });

// Static app routes, excluding the `:slug` and `*` patterns.
const appRoutes = [
  ...read('src/App.tsx').matchAll(/<Route\s+path="([a-z][a-z/-]*)"/g),
].map(([, path]) => `/${path}`);

describe('hosting rewrites', () => {
  it('lists the same page routes for Vercel and _redirects hosts', () => {
    expect([...redirectRoutes].sort()).toEqual([...vercelRoutes].sort());
  });

  it('serves every static app route on direct navigation', () => {
    expect(appRoutes.length).toBeGreaterThan(0);
    for (const route of appRoutes) {
      expect(vercelRoutes).toContain(route);
      expect(redirectRoutes).toContain(route);
    }
  });

  it('serves every service guide on direct navigation', () => {
    for (const { slug } of guides) {
      expect(vercelRoutes).toContain(`/services/${slug}`);
      expect(redirectRoutes).toContain(`/services/${slug}`);
    }
  });
});
