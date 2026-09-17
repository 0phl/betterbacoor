import { t, useLanguage } from '../i18n';
import { Link, useSearchParams } from 'react-router-dom';
import { PageIntro } from '../components/PageIntro';
import { PageMeta } from '../components/PageMeta';
import { ResourceExplorer } from '../components/ResourceExplorer';
import { CommunityTools } from '../components/CommunityTools';
import { OfficeContacts } from '../components/OfficeContacts';
import { LocalDirectory } from '../components/LocalDirectory';
import { GuideCards } from '../components/GuideCards';
import { findGuides } from '../data/guides';
import type { ResourceCategory } from '../types';
import { LocalTopicLinks } from '../components/LocalTopicLinks';

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
  useLanguage();
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
      {categories?.includes('directory') && (
        <Link className="finder-entry" to="/my-barangay">
          <span>
            <strong>{t('Your neighborhood, within reach.')}</strong>
            <span>
              {t(
                'Explore local health services, schools and collection schedules.'
              )}
            </span>
          </span>
          <span>{t('My Barangay')} →</span>
        </Link>
      )}
      {categories && <LocalTopicLinks categories={categories} />}
      {categories?.includes('service') && (
        <Link className="finder-entry" to="/services/find">
          <span>
            <strong>{t('Not sure where to start?')}</strong>
            <span>
              {t(
                'Answer a few questions and get a checklist for your situation.'
              )}
            </span>
          </span>
          <span>{t('Find my service')} →</span>
        </Link>
      )}
      {categories?.includes('service') && findGuides(query).length > 0 && (
        <section
          className="mt-10"
          aria-label={t('Guides you can use on BetterBacoor')}
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">{t('READ & PREPARE HERE')}</p>
              <h2>{t('Guides for your next step')}</h2>
            </div>
          </div>
          <GuideCards query={query} />
        </section>
      )}
      {categories?.includes('directory') && (
        <>
          <LocalDirectory />
          <OfficeContacts />
        </>
      )}
      <div className="mt-10 border-t border-slate-200 pt-8">
        <ResourceExplorer
          includeLocal={!categories}
          categories={categories}
          label={searchLabel}
          initialQuery={categories?.includes('directory') ? '' : query}
          onQueryChange={
            categories?.includes('directory') ? undefined : updateRouteQuery
          }
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
