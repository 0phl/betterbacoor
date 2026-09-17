import {
  census,
  health,
  schools,
  waste,
  actionCenters,
  matchesLocalSearch,
} from './barangay-information';
import { directory } from './directory';
import { guides } from './guides';
import { translate } from '../i18n';
import type { ResourceCategory } from '../types';

export const localTopics = [
  {
    id: 'schools',
    label: 'Schools',
    summary: 'Find schools, published emails and school Facebook pages.',
    category: 'directory',
  },
  {
    id: 'health',
    label: 'Health services',
    summary: 'Find primary care, animal bite and dental services in Bacoor.',
    category: 'directory',
  },
  {
    id: 'barangays',
    label: 'Barangay profiles',
    summary: 'Explore barangay contacts and dated population figures.',
    category: 'directory',
  },
  {
    id: 'garbage',
    label: 'Garbage collection',
    summary: 'Read collection tables and checked subdivision schedules.',
    category: 'service',
  },
  {
    id: 'assistance',
    label: 'Assistance centers',
    summary:
      'Find published assistance-center locations and preparation guides.',
    category: 'service',
  },
] as const;

export function localInformationUrl(
  section: string,
  params: Record<string, string> = {}
) {
  return `/local-services?${new URLSearchParams({ section, ...params })}`;
}

export interface LocalSearchResult {
  id: string;
  title: string;
  summary: string;
  category: ResourceCategory;
  href: string;
  keywords: string;
}

const topicKeywords: Record<string, string> = {
  schools:
    'school schools education elementary junior senior high paaralan eskwelahan edukasyon',
  health:
    'health healthcare hospital clinic YAKAP animal bite dental kalusugan klinika kagat ng hayop ngipin',
  barangays: 'barangay barangays population census populasyon senso PSGC',
  garbage:
    'garbage waste trash rubbish collection schedule basura koleksiyon koleksyon hakot iskedyul',
  assistance: 'assistance action center social help aid tulong ayuda sentro',
};

const localSearchResults: LocalSearchResult[] = [
  ...localTopics.map(topic => ({
    ...topic,
    title: topic.label,
    href: localInformationUrl(topic.id),
    keywords: topicKeywords[topic.id],
    id: `topic-${topic.id}`,
  })),
  ...schools.entries.map(row => ({
    id: `school-${row.id}`,
    title: row.name,
    summary: row.email || 'School Facebook page',
    category: 'directory' as const,
    href: localInformationUrl('schools', { q: row.id }),
    keywords: `${topicKeywords.schools} ${row.level} ${row.id} ${row.email}`,
  })),
  ...health.entries.map(row => ({
    id: `health-${row.id}`,
    title: row.name,
    summary: row.address,
    category: 'directory' as const,
    href: localInformationUrl('health', { service: row.service, q: row.name }),
    keywords: `${row.sector} ${row.service === 'yakap' ? 'primary care YAKAP' : row.service === 'animal-bite' ? 'animal bite kagat hayop' : 'dental ngipin'} health clinic kalusugan ${row.email} ${row.phones.map(phone => phone.number).join(' ')}`,
  })),
  ...census.barangays.map(row => ({
    id: `profile-${row.psgc}`,
    title: row.name,
    summary: 'Explore barangay contacts and dated population figures.',
    category: 'directory' as const,
    href: localInformationUrl('barangays', { barangay: row.directory_id }),
    keywords: `${topicKeywords.barangays} ${row.psgc} ${directory.entries.find(entry => entry.id === row.directory_id)?.includes.join(' ') ?? ''}`,
  })),
  ...waste.routes.map(row => ({
    id: `route-${row.barangay_id}-${row.area}`,
    title: row.area,
    summary: 'Read collection tables and checked subdivision schedules.',
    category: 'service' as const,
    href: localInformationUrl('garbage', {
      barangay: row.barangay_id,
      q: row.area,
    }),
    keywords: `${topicKeywords.garbage} ${census.barangays.find(profile => profile.directory_id === row.barangay_id)?.name}`,
  })),
  ...census.barangays
    .filter(row =>
      waste.images.some(image => image.barangay_ids.includes(row.directory_id))
    )
    .map(row => ({
      id: `waste-${row.directory_id}`,
      title: row.name,
      summary: 'Read the original collection tables',
      category: 'service' as const,
      href: localInformationUrl('garbage', { barangay: row.directory_id }),
      keywords: topicKeywords.garbage,
    })),
  ...actionCenters.map((row, index) => ({
    id: `center-${index}`,
    title: row.location,
    summary:
      'Find published assistance-center locations and preparation guides.',
    category: 'service' as const,
    href: localInformationUrl('assistance'),
    keywords: `${topicKeywords.assistance} ${row.number}`,
  })),
  ...guides.map(guide => ({
    id: `guide-${guide.slug}`,
    title: guide.title,
    summary: guide.summary,
    category: 'service' as const,
    href: `/services/${guide.slug}`,
    keywords: guide.keywords,
  })),
  ...directory.entries
    .filter(row => row.category !== 'barangay')
    .map(row => ({
      id: `place-${row.id}`,
      title: row.name,
      summary: row.address || 'Browse all local contacts',
      category: 'directory' as const,
      href: `/directories?${new URLSearchParams({ q: row.name, type: row.category })}`,
      keywords: `${row.category} ${row.phones.map(phone => phone.number).join(' ')}`,
    })),
  {
    id: 'emergency',
    title: 'Emergency help & hotlines',
    summary:
      'Bacoor 161, national 911, local responders, and flood, fire, and disaster guidance.',
    category: 'service',
    href: '/emergency',
    keywords:
      'emergency hotline flood fire rescue disaster police ambulance typhoon earthquake tsunami baha sunog saklolo lindol bagyo pulis ambulansiya sakuna 911 161',
  },
];

export function findLocalInformation(
  query: string,
  categories?: ResourceCategory[]
) {
  return localSearchResults.filter(
    row =>
      (!categories || categories.includes(row.category)) &&
      matchesLocalSearch(query, [
        row.title,
        row.summary,
        translate(row.title, 'fil'),
        translate(row.summary, 'fil'),
        row.keywords,
      ])
  );
}
