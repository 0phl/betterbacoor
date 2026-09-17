import census from '../../content/barangay-profiles.json';
import health from '../../content/barangay-health.json';
import schools from '../../content/barangay-schools.json';
import waste from '../../content/barangay-waste.json';
import { normalizeDirectoryQuery } from './directory';

export { census, health, schools, waste };

export function barangayProfile(id: string) {
  return census.barangays.find(row => row.directory_id === id);
}

export function matchesLocalSearch(query: string, values: string[]) {
  const words = normalizeDirectoryQuery(values.join(' ')).split(' ');
  return normalizeDirectoryQuery(query)
    .split(' ')
    .filter(Boolean)
    .every(token =>
      /^\d+$/.test(token)
        ? words.includes(token)
        : words.some(word => word.includes(token))
    );
}

export function accreditationExpired(date: string, now = new Date()) {
  return (
    now.getTime() >= new Date(`${date}T00:00:00+08:00`).getTime() + 86_400_000
  );
}

export const actionCenterSource =
  'https://bacoorcitysp.com/wp-content/PDF/ORD/2025/459-2025.pdf#page=2';
export const actionCenters = [
  { number: '1', location: "Women's Center, Alima" },
  { number: '2', location: 'Old Panapaan 2 Barangay Hall' },
  { number: '3', location: 'Old Zapote 1 Barangay Hall' },
  { number: '4', location: 'Mambog 3 Barangay Hall' },
  { number: '5', location: 'Molino 1 Multi-Purpose Hall' },
  { number: '6', location: 'Molino 4 Barangay Hall' },
  { number: '', location: 'Old Queen’s Row West Barangay Hall' },
];
