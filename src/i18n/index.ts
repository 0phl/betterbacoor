import { useSyncExternalStore } from 'react';
import filipino from './fil.json';

export type Language = 'en' | 'fil';
const key = 'betterbacoor:language';
const listeners = new Set<() => void>();
function storedLanguage(): Language {
  try {
    return localStorage.getItem(key) === 'fil' ? 'fil' : 'en';
  } catch {
    return 'en';
  }
}
let language = storedLanguage();
export function getLanguage() {
  return language;
}
export function setLanguage(next: Language) {
  language = next;
  try {
    localStorage.setItem(key, next);
  } catch {
    /* The choice still works for this visit. */
  }
  document.documentElement.lang = next;
  listeners.forEach(listener => listener());
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
export function useLanguage() {
  return useSyncExternalStore(subscribe, getLanguage, () => 'en' as Language);
}
export function translate(text: string | undefined, locale: Language): string {
  if (!text || locale === 'en') return text ?? '';
  const translated = (filipino as Record<string, string>)[
    text.trim().replace(/\s+/g, ' ')
  ];
  return translated === undefined
    ? text
    : text.replace(/\S[\s\S]*\S|\S/, translated);
}
export function t(text: string | undefined) {
  return translate(text, language);
}
export function phrase(en: string, fil: string) {
  return language === 'fil' ? fil : en;
}

if (typeof window !== 'undefined') {
  window.addEventListener('storage', event => {
    if (event.key === key || event.key === null) {
      language = storedLanguage();
      document.documentElement.lang = language;
      listeners.forEach(listener => listener());
    }
  });
}
