import { directory } from './directory';

export const barangays = directory.entries.filter(
  entry => entry.category === 'barangay'
);
export const barangayStorageKey = 'betterbacoor:my-barangay:v1';

export function readBarangay() {
  try {
    const id = localStorage.getItem(barangayStorageKey);
    return {
      id: barangays.find(entry => entry.id === id)?.id ?? '',
      unavailable: false,
    };
  } catch {
    return { id: '', unavailable: true };
  }
}
