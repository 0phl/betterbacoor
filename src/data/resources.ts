import resourceData from '../../content/resources.json';
import type { CivicResource, ResourceCategory } from '../types';

export const resources = resourceData.resources as CivicResource[];

export const categoryLabels: Record<ResourceCategory, string> = {
  service: 'Service guide',
  directory: 'Directory',
  transparency: 'Public record',
  'official-system': 'Official system',
};

export interface ReviewStatus {
  overdue: boolean;
  dueDate: string;
}

export function getReviewStatus(
  resource: CivicResource,
  today = new Date()
): ReviewStatus {
  const dueDate = new Date(`${resource.last_verified}T00:00:00Z`);
  dueDate.setUTCDate(dueDate.getUTCDate() + resource.review_interval_days);

  const dueDateIso = dueDate.toISOString().slice(0, 10);
  const todayIso = today.toISOString().slice(0, 10);

  return {
    overdue: todayIso > dueDateIso,
    dueDate: dueDateIso,
  };
}

export function filterResources(
  items: CivicResource[],
  query: string,
  categories?: ResourceCategory[]
): CivicResource[] {
  const normalizedQuery = query.trim().toLocaleLowerCase('en-PH');

  return items.filter(resource => {
    if (categories && !categories.includes(resource.category)) return false;
    if (!normalizedQuery) return true;

    const searchable = [
      resource.title,
      resource.summary,
      resource.category,
      ...resource.tags,
    ]
      .join(' ')
      .toLocaleLowerCase('en-PH');

    return searchable.includes(normalizedQuery);
  });
}
