import { useSearchParams } from 'react-router-dom';
import { PageIntro } from '../components/PageIntro';
import { PageMeta } from '../components/PageMeta';
import { ResourceExplorer } from '../components/ResourceExplorer';
import type { ResourceCategory } from '../types';

interface ResourcesPageProps {
  eyebrow: string;
  title: string;
  description: string;
  categories?: ResourceCategory[];
  searchLabel?: string;
}

export function ResourcesPage({
  eyebrow,
  title,
  description,
  categories,
  searchLabel,
}: ResourcesPageProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';

  function updateRouteQuery(value: string) {
    const next = new URLSearchParams(searchParams);
    const normalizedValue = value.trim();

    if (normalizedValue) next.set('q', value);
    else next.delete('q');

    setSearchParams(next, { replace: true });
  }

  return (
    <div className="page-shell py-12 sm:py-16 lg:py-20">
      <PageMeta title={title} description={description} />
      <PageIntro eyebrow={eyebrow} title={title} description={description} />
      <div className="mt-10 border-t border-slate-200 pt-8">
        <ResourceExplorer
          categories={categories}
          label={searchLabel}
          initialQuery={query}
          onQueryChange={updateRouteQuery}
        />
      </div>
    </div>
  );
}
