import { describe, expect, it } from 'vitest';
import { guides, findGuides, charterUrl } from './guides';
import documents from '../../content/documents.json';

describe('Guide publication integrity', () => {
  it('keeps source citations current, government-hosted, and within the preserved document', () => {
    expect(new Set(guides.map(guide => guide.slug)).size).toBe(guides.length);
    for (const guide of guides) {
      const age =
        (Date.now() - new Date(`${guide.verified}T00:00:00Z`).getTime()) /
        86400000;
      expect(age).toBeGreaterThanOrEqual(0);
      expect(age).toBeLessThanOrEqual(90);
      expect(new URL(guide.sourceUrl).protocol).toBe('https:');
      expect(new URL(guide.sourceUrl).hostname).toMatch(/\.gov\.ph$/);
      expect(guide.email).toMatch(/@bacoor\.gov\.ph$/);
      expect(guide.sourceLabel.length).toBeGreaterThan(0);
      expect(new Set(guide.variants.map(variant => variant.id)).size).toBe(
        guide.variants.length
      );
      for (const variant of guide.variants) {
        expect(variant.requirements.length).toBeGreaterThan(0);
        expect(variant.steps.length).toBeGreaterThan(0);
        if (guide.sourceUrl === charterUrl) {
          expect(variant.sourcePage).toBeGreaterThanOrEqual(1);
          expect(variant.sourcePage).toBeLessThanOrEqual(
            documents.documents[0].pages
          );
        }
      }
    }
  });

  it('handles common service searches without sending residents to an irrelevant guide', () => {
    expect(findGuides('business permits').map(guide => guide.slug)).toEqual([
      'business-permit',
    ]);
    expect(findGuides('birth certificate').map(guide => guide.slug)).toEqual([
      'civil-registry',
    ]);
    expect(findGuides('working permit').map(guide => guide.slug)).toEqual([
      'working-permit',
    ]);
    expect(findGuides('hospital')).toHaveLength(0);
  });
});
