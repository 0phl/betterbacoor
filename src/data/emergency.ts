import data from '../../content/emergency.json';
import { getLanguage, translate, type Language } from '../i18n';

export const emergency = data;
export type EmergencyContact = (typeof data.contacts)[number];
export const emergencySource = (id: string) =>
  data.sources.find(source => source.id === id)!;

export function emergencyNeedsReview(now = new Date()) {
  const age =
    now.getTime() - new Date(`${data.last_verified}T00:00:00Z`).getTime();
  return age > data.review_interval_days * 86_400_000;
}

export function emergencyCardText(language: Language = getLanguage()) {
  const tr = (value: string) => translate(value, language);
  return [
    tr('BETTERBACOOR · EMERGENCY CONTACT CARD'),
    tr('Independent community reference. BetterBacoor does not dispatch help.'),
    language === 'fil'
      ? `Petsa ng impormasyon: ${data.last_verified}. Suriin muli sa mga sanggunian sa loob ng ${data.review_interval_days} araw.`
      : `Information snapshot: ${data.last_verified}. Recheck with the linked sources within ${data.review_interval_days} days.`,
    tr(
      'If a local number does not connect, try 911. Availability and network routing may vary.'
    ),
    '',
    ...data.contacts.map(
      contact =>
        `${tr(contact.name)}: ${contact.number}\n${tr(contact.description)}`
    ),
    '',
    tr(
      'Tell the dispatcher your location, a nearby landmark, and what happened. Follow their instructions.'
    ),
    '',
    tr('PUBLISHED SOURCES'),
    ...data.sources
      .filter(source =>
        data.contacts.some(contact => contact.sources.includes(source.id))
      )
      .map(source => `${source.name}: ${source.url}`),
  ].join('\n');
}
