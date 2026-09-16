import { Link, useSearchParams } from 'react-router-dom';
import { PageIntro } from '../components/PageIntro';
import { PageMeta } from '../components/PageMeta';
import { ResourceExplorer } from '../components/ResourceExplorer';
import { CommunityTools } from '../components/CommunityTools';
import { OfficeContacts } from '../components/OfficeContacts';
import { GuideCards } from '../components/GuideCards';
import { findGuides } from '../data/guides';
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
      {!categories &&
        (!query.trim() ||
          /emergency|hotline|flood|fire|rescue|disaster|police|ambulance|typhoon|earthquake|tsunami|baha|sunog|saklolo|911|161/i.test(
            query
          )) && (
          <Link to="/emergency" className="search-emergency-result">
            <span className="eyebrow">ON BETTERBACOOR</span>
            <strong>Emergency help & hotlines</strong>
            <span>
              Bacoor 161, national 911, local responders, and flood, fire, and
              disaster guidance.
            </span>
          </Link>
        )}
      {(!categories || categories.includes('service')) &&
        findGuides(query).length > 0 && (
          <section
            className="mt-10"
            aria-label="Guides you can use on BetterBacoor"
          >
            <div className="section-heading">
              <div>
                <p className="eyebrow">READ & PREPARE HERE</p>
                <h2>Guides for your next step</h2>
              </div>
            </div>
            <GuideCards query={query} />
          </section>
        )}
      {categories?.includes('directory') && <OfficeContacts />}
      <div className="mt-10 border-t border-slate-200 pt-8">
        <ResourceExplorer
          categories={categories}
          label={searchLabel}
          initialQuery={query}
          onQueryChange={updateRouteQuery}
        />
      </div>
      {categories?.includes('transparency') && (
        <div className="mt-14 border-t border-slate-200 pt-10">
          <CommunityTools />
        </div>
      )}
    </div>
  );
}
