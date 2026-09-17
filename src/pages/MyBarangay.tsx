import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  HeartPulse,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import { t, useLanguage } from '../i18n';
import { PageMeta } from '../components/PageMeta';
import { Place } from '../components/LocalDirectory';
import {
  BarangayInformation,
  BarangayProfile,
} from '../components/BarangayInformation';
import {
  barangays,
  barangayStorageKey,
  readBarangay,
} from '../data/my-barangay';
import { readSavedChecklists } from '../data/checklists';
import {
  emergency,
  emergencyNeedsReview,
  emergencySource,
} from '../data/emergency';

const contacts = emergency.contacts.filter(contact =>
  ['bacoor', 'national', 'disaster', 'fire', 'police'].includes(contact.id)
);

export function MyBarangay() {
  useLanguage();
  const [selection, setSelection] = useState(readBarangay);
  const [saved, setSaved] = useState(readSavedChecklists);
  const [changed, setChanged] = useState(false);
  const entry = barangays.find(item => item.id === selection.id);

  useEffect(() => {
    function refresh(event: Event) {
      if (
        event instanceof StorageEvent &&
        event.key !== null &&
        event.key !== barangayStorageKey &&
        !event.key?.startsWith('betterbacoor:checklist:')
      )
        return;
      const stored = readBarangay();
      setSelection(current =>
        stored.unavailable ? { ...current, unavailable: true } : stored
      );
      setSaved(readSavedChecklists());
      setChanged(false);
    }
    window.addEventListener('storage', refresh);
    window.addEventListener('focus', refresh);
    return () => {
      window.removeEventListener('storage', refresh);
      window.removeEventListener('focus', refresh);
    };
  }, []);

  function choose(id: string) {
    if (id && !barangays.some(item => item.id === id)) return;
    let unavailable = false;
    try {
      if (id) localStorage.setItem(barangayStorageKey, id);
      else localStorage.removeItem(barangayStorageKey);
    } catch {
      unavailable = true;
    }
    setSelection({ id, unavailable });
    setChanged(true);
  }

  return (
    <div className="page-shell barangay-page">
      <PageMeta
        title={t('My Barangay')}
        description={t(
          'Your barangay, local services, collection schedules and saved checklists in one place.'
        )}
      />
      <header className="barangay-intro">
        <p className="eyebrow">{t('CLOSER TO HOME')}</p>
        <h1>{t('My Barangay')}</h1>
        <p>
          {t(
            'Your barangay, local services, collection schedules and saved checklists in one place.'
          )}
        </p>
      </header>

      <section
        className="barangay-picker"
        aria-labelledby="barangay-picker-title"
      >
        <div>
          <h2 id="barangay-picker-title">{t('Make yourself at home.')}</h2>
          <p id="barangay-privacy">
            {t(
              'Choose a barangay to keep its details handy. Your choice stays in this browser; no account or location access needed.'
            )}
          </p>
        </div>
        <div className="barangay-picker-controls">
          <label htmlFor="barangay-choice">{t('Your barangay')}</label>
          <select
            id="barangay-choice"
            value={selection.id}
            onChange={event => choose(event.target.value)}
            aria-describedby="barangay-names barangay-privacy"
          >
            <option value="">{t('Choose your barangay')}</option>
            {barangays.map(item => (
              <option key={item.id} value={item.id}>
                {item.name}
                {item.includes.length ? ` (${item.includes.join(', ')})` : ''}
              </option>
            ))}
          </select>
          <div className="barangay-save-state">
            <span role="status">
              {selection.unavailable ? (
                t(
                  'Your browser could not save this choice. You can still use this page during this visit.'
                )
              ) : entry ? (
                <>
                  <Check size={14} aria-hidden="true" />{' '}
                  {t('Saved on this device')}
                </>
              ) : changed ? (
                t('Barangay choice cleared.')
              ) : (
                t('You can change or clear your choice anytime.')
              )}
            </span>
            {entry && (
              <button type="button" onClick={() => choose('')}>
                {t('Clear choice')}
              </button>
            )}
          </div>
        </div>
        <p id="barangay-names" className="barangay-names-note">
          {t(
            'Names in parentheses are the city directory’s groupings. If a name appears in more than one listing, check the full grouping before choosing.'
          )}
        </p>
      </section>

      <BarangayProfile id={selection.id} />
      <div className="barangay-grid">
        <section
          className="barangay-local"
          aria-labelledby="barangay-local-title"
        >
          <div className="barangay-section-heading">
            <Building2 size={20} aria-hidden="true" />
            <h2 id="barangay-local-title">{t('Your barangay contact')}</h2>
          </div>
          {entry ? (
            <Place entry={entry} />
          ) : (
            <div className="barangay-empty">
              <Building2 size={30} aria-hidden="true" />
              <h3>{t('Start with your barangay.')}</h3>
              <p>
                {t(
                  'Choose from the city directory above to see its published contact details here.'
                )}
              </p>
            </div>
          )}
          {entry && (
            <p className="barangay-detail-note">
              {t(
                'Hall address and office hours are not listed in this source. Confirm them with the barangay before visiting.'
              )}
            </p>
          )}
          <div className="barangay-directory-links">
            <Link to="/directories?type=hospital">
              <HeartPulse size={18} aria-hidden="true" />
              <span>{t('Hospitals in Bacoor')}</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link to="/directories?type=health">
              <Building2 size={18} aria-hidden="true" />
              <span>{t('Health centers')}</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link to="/directories">
              <span>{t('Browse all local contacts')}</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section
          className="barangay-help"
          aria-labelledby="barangay-help-title"
        >
          <div className="barangay-section-heading">
            <ShieldCheck size={20} aria-hidden="true" />
            <h2 id="barangay-help-title">{t('Help across Bacoor')}</h2>
          </div>
          <p>
            {t(
              'Citywide and national hotlines, available regardless of your barangay choice.'
            )}
          </p>
          <div className="barangay-hotlines">
            {contacts.map(contact => (
              <a
                key={contact.id}
                href={`tel:${contact.dial}`}
                aria-label={`${t('Call')} ${t(contact.name)}: ${contact.number}`}
              >
                <span>{t(contact.name)}</span>
                <strong>
                  <Phone size={15} aria-hidden="true" />
                  {contact.number}
                </strong>
              </a>
            ))}
          </div>
          <p className="barangay-detail-note">
            {t(
              'If a local number does not connect, try 911. Availability and network routing may vary.'
            )}
          </p>
          {emergencyNeedsReview() && (
            <p className="barangay-detail-note">
              {t(
                'These details are due for another review. Check the city source for changes.'
              )}
            </p>
          )}
          <div className="guide-links barangay-help-sources">
            <a
              href={emergencySource('city').url}
              target="_blank"
              rel="noreferrer"
            >
              {t('City hotline source')}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            <a
              href={emergencySource('national').url}
              target="_blank"
              rel="noreferrer"
            >
              {t('National hotline source')}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
          <Link className="barangay-safety-link" to="/emergency">
            <span>{t('Flood, fire & emergency guidance')}</span>
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
          <p className="barangay-detail-note">
            {t(
              'For an open evacuation center and safe route, contact BDRRMO or your barangay. BetterBacoor does not monitor live conditions or dispatch help.'
            )}
          </p>
        </section>
      </div>

      <BarangayInformation id={selection.id} />

      <section
        className="barangay-checklists"
        aria-labelledby="barangay-checklists-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">{t('PICK UP WHERE YOU LEFT OFF')}</p>
            <h2 id="barangay-checklists-title">{t('Your saved checklists')}</h2>
            <p>
              {t(
                'Preparation progress saved in this browser. These are your ticks, not an application status.'
              )}
            </p>
          </div>
          <Link className="text-link" to="/services/find">
            {t('Find my service')}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        {saved.unavailable && (
          <p role="status">
            {t(
              'Your browser could not read saved checklists. You can still open a guide and prepare during this visit.'
            )}
          </p>
        )}
        {saved.items.length ? (
          <div className="barangay-checklist-grid">
            {saved.items.map(({ guide, variant, checked }) => (
              <Link
                className="barangay-checklist"
                key={`${guide.slug}:${variant.id}`}
                to={`/services/${guide.slug}?variant=${encodeURIComponent(variant.id)}`}
              >
                <span className="eyebrow">{t(guide.category)}</span>
                <h3>{t(guide.title)}</h3>
                <p>{t(variant.label)}</p>
                <progress
                  aria-label={`${t('Checklist progress')}: ${t(variant.label)}`}
                  max={variant.requirements.length}
                  value={checked.length}
                />
                <span className="barangay-progress-label">
                  {checked.length}
                  {t(' of ')}
                  {variant.requirements.length}
                  {t(' ready')}
                  <ArrowRight size={17} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        ) : (
          !saved.unavailable && (
            <div className="barangay-checklists-empty">
              <h3>{t('Your next visit starts with a little preparation.')}</h3>
              <p>
                {t(
                  'Tick an item in any service guide and your checklist will appear here. Your progress stays available when you change barangays.'
                )}
              </p>
              <Link className="text-link" to="/services/find">
                {t('Start a checklist')}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          )
        )}
      </section>
    </div>
  );
}
