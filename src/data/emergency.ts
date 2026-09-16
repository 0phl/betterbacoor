import data from '../../content/emergency.json';

export const emergency = data;
export type EmergencyContact = (typeof data.contacts)[number];
export const emergencySource = (id: string) =>
  data.sources.find(source => source.id === id)!;

export function emergencyNeedsReview(now = new Date()) {
  const age =
    now.getTime() - new Date(`${data.last_verified}T00:00:00Z`).getTime();
  return age > data.review_interval_days * 86_400_000;
}

export function emergencyCardText() {
  return [
    'BETTERBACOOR · EMERGENCY CONTACT CARD',
    'Independent community reference. BetterBacoor does not dispatch help.',
    `Information snapshot: ${data.last_verified}. Recheck with the linked sources within ${data.review_interval_days} days.`,
    'If a local number does not connect, try 911. Availability and network routing may vary.',
    '',
    ...data.contacts.map(
      contact => `${contact.name}: ${contact.number}\n${contact.description}`
    ),
    '',
    'Tell the dispatcher your location, a nearby landmark, and what happened. Follow their instructions.',
    '',
    'PUBLISHED SOURCES',
    ...data.sources
      .filter(source =>
        data.contacts.some(contact => contact.sources.includes(source.id))
      )
      .map(source => `${source.name}: ${source.url}`),
  ].join('\n');
}
