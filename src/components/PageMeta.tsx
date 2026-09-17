import { useEffect } from 'react';
import { t, useLanguage } from '../i18n';

interface PageMetaProps {
  title: string;
  description: string;
}

const defaultDescription =
  'BetterBacoor is an unofficial, community-run guide to verified Bacoor services, directories, systems, and public records.';

export function PageMeta({ title, description }: PageMetaProps) {
  const language = useLanguage();
  useEffect(() => {
    document.title = `${t(title)} | ${language === 'fil' ? 'Gabay ng Komunidad sa Bacoor' : 'Community-civic Guide to Bacoor'}`;
    document.documentElement.lang = language;

    let meta = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]'
    );
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.append(meta);
    }
    meta.content = t(description || defaultDescription);
  }, [description, title, language]);

  return null;
}
