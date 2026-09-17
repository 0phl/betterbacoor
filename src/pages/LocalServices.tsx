import { Link, useSearchParams } from 'react-router-dom';
import { t, useLanguage } from '../i18n';
import { PageMeta } from '../components/PageMeta';
import { PageIntro } from '../components/PageIntro';
import {
  AssistanceCenters,
  BarangayProfile,
  GarbageSchedule,
  HealthServices,
  Schools,
} from '../components/BarangayInformation';
import { Place } from '../components/LocalDirectory';
import { barangays } from '../data/my-barangay';
import { localInformationUrl, localTopics } from '../data/local-discovery';

export function LocalServices() {
  useLanguage();
  const [params, setParams] = useSearchParams();
  const section =
    localTopics.find(topic => topic.id === params.get('section')) ??
    localTopics[0];
  const entry = barangays.find(row => row.id === params.get('barangay'));
  const query = params.get('q') ?? '';
  return (
    <div className="page-shell py-12 sm:py-16">
      <PageMeta title={t(section.label)} description={t(section.summary)} />
      <Link
        className="text-link mb-6"
        to={section.category === 'directory' ? '/directories' : '/services'}
      >
        {section.category === 'directory' ? t('Directories') : t('Services')}
      </Link>
      <PageIntro
        eyebrow={t('ON BETTERBACOOR')}
        title={t(section.label)}
        description={t(section.summary)}
      />
      <nav
        className="local-browse-topics"
        aria-label={t('Browse local information')}
      >
        {localTopics.map(topic => (
          <Link
            key={topic.id}
            to={localInformationUrl(topic.id)}
            aria-current={section.id === topic.id ? 'page' : undefined}
          >
            {t(topic.label)}
          </Link>
        ))}
      </nav>
      <section className="local-info-body" aria-label={t(section.label)}>
        <h2 className="sr-only">{t(section.label)}</h2>
        {(section.id === 'garbage' || section.id === 'barangays') && (
          <div className="barangay-picker-controls local-browse-picker">
            <label htmlFor="browse-barangay">{t('Choose your barangay')}</label>
            <select
              id="browse-barangay"
              value={entry?.id ?? ''}
              onChange={event => {
                const next = new URLSearchParams(params);
                if (event.target.value)
                  next.set('barangay', event.target.value);
                else next.delete('barangay');
                next.delete('q');
                setParams(next, { replace: true });
              }}
            >
              <option value="">{t('Choose your barangay')}</option>
              {barangays.map(row => (
                <option key={row.id} value={row.id}>
                  {row.name}
                  {row.includes.length ? ` (${row.includes.join(', ')})` : ''}
                </option>
              ))}
            </select>
            <p className="local-info-note">
              {t(
                'Browsing here does not change your saved My Barangay choice.'
              )}
            </p>
          </div>
        )}
        {section.id === 'schools' && (
          <Schools key={`schools-${query}`} initialQuery={query} />
        )}
        {section.id === 'health' && (
          <HealthServices
            key={`health-${params.get('service')}-${query}`}
            initialQuery={query}
            initialService={params.get('service') ?? 'yakap'}
          />
        )}
        {section.id === 'garbage' && (
          <GarbageSchedule
            key={`garbage-${entry?.id}-${query}`}
            id={entry?.id ?? ''}
            initialQuery={query}
          />
        )}
        {section.id === 'assistance' && <AssistanceCenters />}
        {section.id === 'barangays' &&
          (entry ? (
            <>
              <BarangayProfile id={entry.id} />
              <Place entry={entry} />
              <p className="local-info-note">
                {t(
                  'Hall address and office hours are not listed in this source. Confirm them with the barangay before visiting.'
                )}
              </p>
            </>
          ) : (
            <p className="local-info-empty">
              {t(
                'Choose a barangay to see its population and published contacts.'
              )}
            </p>
          ))}
      </section>
    </div>
  );
}
