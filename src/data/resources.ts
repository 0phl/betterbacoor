import resourceData from '../../content/resources.json';
import type { CivicResource, ResourceCategory } from '../types';

export const resources = resourceData.resources as CivicResource[];

export const categoryLabels: Record<ResourceCategory, string> = {
  service: 'Service guide',
  directory: 'Directory',
  transparency: 'Public record',
  'official-system': 'Official system',
};

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
