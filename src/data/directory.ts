import data from '../../content/local-directory.json';
import { bilingualSearch } from './search';

export const directory = data;
export type DirectoryEntry = (typeof data.entries)[number];
export const directoryCategories = [
  { id: 'all', label: 'All places' },
  { id: 'barangay', label: 'Barangays' },
  { id: 'hospital', label: 'Hospitals' },
  { id: 'health', label: 'Health centers' },
] as const;
export type DirectoryCategory = (typeof directoryCategories)[number]['id'];

export function directoryCategory(value: string | null): DirectoryCategory {
  return directoryCategories.find(item => item.id === value)?.id ?? 'all';
}

export function normalizeDirectoryQuery(value: string) {
  const roman: Record<string, string> = {
    i: '1',
    ii: '2',
    iii: '3',
    iv: '4',
    v: '5',
    vi: '6',
    vii: '7',
    viii: '8',
  };
  return bilingualSearch(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\./g, '')
    .replace(/\b(i|ii|iii|iv|v|vi|vii|viii)\b/g, match => roman[match])
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

export function findDirectoryEntries(
  query = '',
  category: DirectoryCategory = 'all'
) {
  const tokens = normalizeDirectoryQuery(query).split(' ').filter(Boolean);
  return data.entries.filter(entry => {
    if (category !== 'all' && entry.category !== category) return false;
    const text = normalizeDirectoryQuery(
      [
        entry.name,
        ...entry.includes,
        entry.address,
        entry.category,
        entry.category === 'health' ? 'health center clinic' : '',
        ...entry.phones.map(phone => phone.number),
      ].join(' ')
    );
    const words = text.split(' ');
    return tokens.every(token =>
      /^\d+$/.test(token) ? words.includes(token) : text.includes(token)
    );
  });
}

export function directorySource(id: string) {
  return data.sources.find(source => source.id === id)!;
}

export function directoryNeedsReview(id: string, now = new Date()) {
  const source = directorySource(id);
  return (
    now.getTime() - new Date(`${source.last_verified}T00:00:00Z`).getTime() >
    source.review_interval_days * 86_400_000
  );
}
