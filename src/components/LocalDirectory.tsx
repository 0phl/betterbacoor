import { t, useLanguage } from '../i18n';
import {
  ArrowUpRight,
  Building2,
  HeartPulse,
  MapPin,
  Phone,
  Search,
  X,
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  directoryCategories,
  directoryCategory,
  directoryNeedsReview,
  directorySource,
  findDirectoryEntries,
  type DirectoryEntry,
} from '../data/directory';

export function Place({ entry }: { entry: DirectoryEntry }) {
  useLanguage();
  const source = directorySource(entry.source_id);
  const Icon = entry.category === 'barangay' ? Building2 : HeartPulse;
  return (
    <article className="directory-place">
      <div className="directory-place-heading">
        <span className="directory-place-icon">
          <Icon size={21} aria-hidden="true" />
        </span>
        <div>
          <p className="directory-kind">
            {t(
              directoryCategories.find(item => item.id === entry.category)
                ?.label
            )}
          </p>
          <h3>{entry.name}</h3>
        </div>
      </div>
      {entry.includes.length > 0 && (
        <p className="directory-includes">
          {t('Listed together in the city directory: ')}
          {entry.includes.join(', ')}.
        </p>
      )}
      {entry.address ? (
        <p className="directory-address">
          <MapPin size={16} aria-hidden="true" />
          {entry.address}
        </p>
      ) : null}
      <div className="directory-phones">
        {entry.phones.length ? (
          entry.phones.map(phone =>
            phone.dial ? (
              <a
                key={phone.number}
                href={`tel:${phone.dial}`}
                aria-label={`${t('Call')} ${entry.name}: ${phone.number}`}
              >
                <Phone size={16} aria-hidden="true" />
                {phone.number}
              </a>
            ) : (
              <span key={phone.number}>
                <Phone size={16} aria-hidden="true" />
                {phone.number}
              </span>
            )
          )
        ) : (
          <p>{t('No contact number listed in the source.')}</p>
        )}
      </div>
      {entry.phones.some(phone => !phone.dial) && (
        <p className="directory-detail-note">
          {t(
            'Area code not provided in the source. Confirm it before dialing.'
          )}
        </p>
      )}
      {directoryNeedsReview(entry.source_id) && (
        <p className="directory-detail-note">
          {t(
            'These details are due for another review. Check the city source for changes.'
          )}
        </p>
      )}
      <div className="directory-place-footer">
        {entry.address && (
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${entry.name}, ${entry.address}, Bacoor Philippines`)}`}
            target="_blank"
            rel="noreferrer"
          >
            {t('Search Maps ')}
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        )}
        <a
          href={source.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`${t('City source for')} ${entry.name}`}
        >
          {t('City source ')}
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

export function LocalDirectory() {
  useLanguage();
  const [params, setParams] = useSearchParams();
  const query = params.get('q') ?? '';
  const category = directoryCategory(params.get('type'));
  const entries = findDirectoryEntries(query, category);
  const rawPage = Number(params.get('page') ?? 1);
  const pages = Math.max(1, Math.ceil(entries.length / 12));
  const page = Math.min(
    pages,
    Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1
  );
  function update(key: string, value: string) {
    const next = new URLSearchParams(params);
    if (value && value !== 'all') next.set(key, value);
    else next.delete(key);
    if (key !== 'page') next.delete('page');
    setParams(next, { replace: key === 'q' });
  }
  return (
    <section
      className="local-directory"
      aria-labelledby="local-directory-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">{t('CLOSER TO HOME')}</p>
          <h2 id="local-directory-title">
            {t('Find a place. Find your next step.')}
          </h2>
          <p>
            {t(
              'Search city-published barangays, hospitals, and health centers right here.'
            )}
          </p>
        </div>
        <Link className="text-link" to="/emergency">
          {t('Need emergency help? ')}
          <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
      <div className="directory-controls">
        <label className="directory-search">
          <Search size={20} aria-hidden="true" />
          <span className="sr-only">{t('Search local places')}</span>
          <input
            type="search"
            value={query}
            onChange={event => update('q', event.target.value)}
            placeholder={t('Try Molino 3, a hospital, or an old barangay name')}
          />
        </label>
        <div
          className="directory-filters"
          role="group"
          aria-label={t('Place type')}
        >
          {directoryCategories.map(item => (
            <button
              type="button"
              key={item.id}
              aria-pressed={category === item.id}
              onClick={() => update('type', item.id)}
            >
              {t(item.label)}
            </button>
          ))}
        </div>
      </div>
      <div className="directory-result-summary">
        <p role="status">
          {entries.length} {entries.length === 1 ? t('place') : t('places')}
          {t(' found')}
          {pages > 1 ? ` · ${t('Page')} ${page} ${t('of')} ${pages}` : ''}
        </p>
        {(query || category !== 'all') && (
          <button
            type="button"
            onClick={() => {
              const next = new URLSearchParams(params);
              ['q', 'type', 'page'].forEach(key => next.delete(key));
              setParams(next, { replace: true });
            }}
          >
            <X size={14} aria-hidden="true" />
            {t(' Clear filters')}
          </button>
        )}
      </div>
      {category === 'barangay' && (
        <p className="directory-context">
          {t(
            'Names follow the city’s published groupings. Search also matches the names listed in parentheses; a name may appear in more than one grouping.'
          )}
        </p>
      )}
      {(category === 'hospital' || category === 'health') && (
        <p className="directory-context">
          {t(
            'Call ahead to confirm services, hours, and availability. These are directory contacts, not ambulance dispatch lines. Maps opens a search, not a verified location pin.'
          )}
        </p>
      )}
      {entries.length ? (
        <div className="directory-grid">
          {entries.slice((page - 1) * 12, page * 12).map(entry => (
            <Place key={entry.id} entry={entry} />
          ))}
        </div>
      ) : (
        <div className="directory-empty">
          <h3>{t('No places match those filters.')}</h3>
          <p>
            {t(
              'Try a shorter name, a former barangay name, or choose another place type.'
            )}
          </p>
        </div>
      )}
      {pages > 1 && (
        <nav
          className="directory-pagination"
          aria-label={t('Directory results pages')}
        >
          <button
            type="button"
            disabled={page === 1}
            onClick={() => update('page', String(page - 1))}
          >
            {t('Previous')}
          </button>
          <span>
            {t('Page ')}
            {page}
            {t(' of ')}
            {pages}
          </span>
          <button
            type="button"
            disabled={page === pages}
            onClick={() => update('page', String(page + 1))}
          >
            {t('Next')}
          </button>
        </nav>
      )}
      <p className="directory-footnote">
        {t(
          'Details are transcribed from the linked city directories. Missing addresses, area codes, and opening hours are left unspecified. Hospital listings do not confirm emergency capacity.'
        )}
      </p>
    </section>
  );
}
