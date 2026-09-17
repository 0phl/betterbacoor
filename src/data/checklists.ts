import { guides, type GuideVariant, type ServiceGuide } from './guides';

export function checklistKey(guide: ServiceGuide, variant: GuideVariant) {
  return `betterbacoor:checklist:${guide.slug}:${variant.id}:${guide.verified}`;
}

export function readChecklist(guide: ServiceGuide, variant: GuideVariant) {
  try {
    const stored: unknown = JSON.parse(
      localStorage.getItem(checklistKey(guide, variant)) ?? '[]'
    );
    const checked = Array.isArray(stored)
      ? [
          ...new Set(
            stored.filter(
              (n): n is number =>
                Number.isInteger(n) && n >= 0 && n < variant.requirements.length
            )
          ),
        ]
      : [];
    return { checked, unavailable: false };
  } catch (error) {
    return {
      checked: [] as number[],
      unavailable: !(error instanceof SyntaxError),
    };
  }
}

export function readSavedChecklists() {
  const all = guides.flatMap(guide =>
    guide.variants.map(variant => ({
      guide,
      variant,
      ...readChecklist(guide, variant),
    }))
  );
  return {
    items: all.filter(item => item.checked.length > 0),
    unavailable: all.some(item => item.unavailable),
  };
}
