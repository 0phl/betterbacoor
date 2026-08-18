import { useEffect } from 'react';

interface PageMetaProps {
  title: string;
  description: string;
}

const defaultDescription =
  'BetterBacoor is an unofficial, community-run guide to verified Bacoor services, directories, systems, and public records.';

export function PageMeta({ title, description }: PageMetaProps) {
  useEffect(() => {
    document.title = `${title} | Community-civic Guide to Bacoor`;

    let meta = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]'
    );
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.append(meta);
    }
    meta.content = description || defaultDescription;
  }, [description, title]);

  return null;
}
