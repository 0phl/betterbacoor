import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Building2,
  GraduationCap,
  HeartPulse,
  Mail,
  Phone,
  Search,
  Trash2,
} from 'lucide-react';
import { t, useLanguage } from '../i18n';
import {
  accreditationExpired,
  actionCenters,
  actionCenterSource,
  barangayProfile,
  census,
  health,
  matchesLocalSearch,
  schools,
  waste,
} from '../data/barangay-information';

function SourceLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
      <ArrowUpRight size={14} aria-hidden="true" />
    </a>
  );
}

export function BarangayProfile({ id }: { id: string }) {
  useLanguage();
  const profile = barangayProfile(id);
  if (!profile) return null;
  return (
    <section
      className="barangay-profile"
      aria-label={t('Barangay at a glance')}
    >
      <div>
        <span>{t('Population · 2024 census')}</span>
        <strong>{profile.population_2024.toLocaleString('en-PH')}</strong>
      </div>
      <div>
        <span>{t('Official geographic code (PSGC)')}</span>
        <strong className="barangay-code">{profile.psgc}</strong>
      </div>
      <div className="barangay-profile-source">
        <p>{t('Census figures, not a live population estimate.')}</p>
        <SourceLink href={census.source_url}>{t('PSA source')}</SourceLink>
      </div>
    </section>
  );
}

function SearchBox({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (value: string) => void;
  label: string;
}) {
  return (
    <label className="local-info-search">
      <Search size={18} aria-hidden="true" />
      <span className="sr-only">{label}</span>
      <input
        type="search"
        value={value}
        onChange={event => onChange(event.target.value)}
        placeholder={label}
      />
    </label>
  );
}

function Filters({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { id: string; label: string }[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="local-info-filters" role="group" aria-label={label}>
      {options.map(option => (
        <button
          key={option.id}
          type="button"
          aria-pressed={value === option.id}
          onClick={() => onChange(option.id)}
        >
          {t(option.label)}
        </button>
      ))}
    </div>
  );
}

function Results({
  total,
  visible,
  onMore,
  children,
}: {
  total: number;
  visible: number;
  onMore: () => void;
  children: ReactNode;
}) {
  return (
    <>
      <p className="local-info-count" role="status">
        {Math.min(total, visible)} {t('of')} {total} {t('listings shown')}
      </p>
      {total ? (
        <div className="local-info-cards">{children}</div>
      ) : (
        <p className="local-info-empty">
          {t('No listings match. Try another name or filter.')}
        </p>
      )}
      {total > visible && (
        <button type="button" className="local-info-more" onClick={onMore}>
          {t('Show more')}
        </button>
      )}
    </>
  );
}

export function HealthServices({
  initialQuery = '',
  initialService = 'yakap',
}: {
  initialQuery?: string;
  initialService?: string;
}) {
  const language = useLanguage();
  const [query, setQuery] = useState(initialQuery);
  const [service, setService] = useState(
    ['yakap', 'animal-bite', 'dental'].includes(initialService)
      ? initialService
      : 'yakap'
  );
  const [visible, setVisible] = useState(6);
  const entries = health.entries.filter(
    item =>
      item.service === service &&
      matchesLocalSearch(query, [
        item.name,
        item.address,
        item.sector,
        t(item.sector),
      ])
  );
  return (
    <>
      <div className="local-info-heading">
        <h3>{t('Find care in Bacoor')}</h3>
        <p>
          {t(
            'PhilHealth-listed facilities across the city. Confirm hours, fees, registration and available services before visiting.'
          )}
        </p>
      </div>
      <Filters
        label={t('Health service')}
        value={service}
        onChange={id => {
          setService(id);
          setVisible(6);
        }}
        options={[
          { id: 'yakap', label: 'Primary care · YAKAP' },
          { id: 'animal-bite', label: 'Animal bite care' },
          { id: 'dental', label: 'Dental care' },
        ]}
      />
      <SearchBox
        value={query}
        onChange={value => {
          setQuery(value);
          setVisible(6);
        }}
        label={t('Search a clinic, area or hospital')}
      />
      <p className="local-info-note">
        {t(
          'PhilHealth list: July 31, 2026. Addresses retain the source’s barangay names. These listings do not assign you to a clinic or guarantee free treatment or medicine stock.'
        )}
      </p>
      <Results
        total={entries.length}
        visible={visible}
        onMore={() => setVisible(visible + 6)}
      >
        {entries.slice(0, visible).map(item => (
          <article key={item.id} className="local-info-card">
            <span className="local-info-kicker">{t(item.sector)}</span>
            <h4>{item.name}</h4>
            <p>{item.address}, Bacoor</p>
            <p className="local-info-note">
              {accreditationExpired(item.expires_on) ? (
                t(
                  'Listed accreditation has expired. Check the latest PhilHealth list.'
                )
              ) : (
                <>
                  {t('Listed accreditation through')}{' '}
                  {new Date(
                    `${item.expires_on}T12:00:00+08:00`
                  ).toLocaleDateString(
                    language === 'fil' ? 'fil-PH' : 'en-PH',
                    {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      timeZone: 'Asia/Manila',
                    }
                  )}
                </>
              )}
            </p>
            <div className="local-info-links">
              {item.phones.map(phone => (
                <a
                  key={phone.dial}
                  href={`tel:${phone.dial}`}
                  aria-label={`${t('Call')} ${item.name}: ${phone.number}`}
                >
                  <Phone size={14} aria-hidden="true" />
                  {phone.number}
                </a>
              ))}
              {item.email && (
                <a href={`mailto:${item.email}`}>
                  <Mail size={14} aria-hidden="true" />
                  {item.email}
                </a>
              )}
              <SourceLink href={item.source_url}>
                {t('PhilHealth source')}
              </SourceLink>
            </div>
          </article>
        ))}
      </Results>
      <p className="local-info-note">
        {t(
          'This is a partial facility directory. Unresolved locations and contact details are omitted.'
        )}
      </p>
      <Link className="text-link" to="/emergency">
        {t('Need emergency help? ')}
      </Link>
    </>
  );
}

export function Schools({ initialQuery = '' }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [level, setLevel] = useState('all');
  const [visible, setVisible] = useState(6);
  const levels = [
    { id: 'all', label: 'All levels' },
    { id: 'elementary', label: 'Elementary' },
    { id: 'junior-high', label: 'Junior high' },
    { id: 'senior-high', label: 'Senior high' },
  ];
  const entries = schools.entries.filter(
    item =>
      (level === 'all' || item.level === level) &&
      matchesLocalSearch(query, [item.name, item.id])
  );
  return (
    <>
      <div className="local-info-heading">
        <h3>{t('Find a school')}</h3>
        <p>
          {t(
            'Search DepEd Bacoor’s published school listings. Facebook links come directly from its directories.'
          )}
        </p>
      </div>
      <Filters
        label={t('School level')}
        options={levels}
        value={level}
        onChange={id => {
          setLevel(id);
          setVisible(6);
        }}
      />
      <SearchBox
        label={t('Search a school name or school ID')}
        value={query}
        onChange={value => {
          setQuery(value);
          setVisible(6);
        }}
      />
      <p className="local-info-note">
        {t(
          'Citywide directory, reviewed September 17, 2026. Confirm the campus address, enrollment dates and admission requirements with the school. Your barangay choice does not determine enrollment eligibility.'
        )}
      </p>
      <Results
        total={entries.length}
        visible={visible}
        onMore={() => setVisible(visible + 6)}
      >
        {entries.slice(0, visible).map(item => (
          <article key={item.id} className="local-info-card">
            <span className="local-info-kicker">
              {t(levels.find(option => option.id === item.level)?.label)}
            </span>
            <h4>{item.name}</h4>
            <p>
              {t('School ID')}: {item.id}
            </p>
            <div className="local-info-links">
              {item.email && (
                <a href={`mailto:${item.email}`}>
                  <Mail size={14} aria-hidden="true" />
                  {item.email}
                </a>
              )}
              <SourceLink href={item.facebook_url}>
                {t('School Facebook page')}
              </SourceLink>
              <SourceLink href={item.source_url}>
                {t('DepEd directory')}
              </SourceLink>
            </div>
          </article>
        ))}
      </Results>
    </>
  );
}

function ScheduleImage({ url, number }: { url: string; number: number }) {
  const [failed, setFailed] = useState(false);
  return (
    <figure className="local-schedule-image">
      {failed ? (
        <p role="status">
          {t(
            'The city’s schedule image could not load. Open the original table below.'
          )}
        </p>
      ) : (
        <img
          src={url}
          alt={`${t('City garbage collection table')} ${number}`}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
        />
      )}
      <figcaption>
        <SourceLink href={url}>
          {t('Open full-size city table')} {number}
        </SourceLink>
      </figcaption>
    </figure>
  );
}

export function GarbageSchedule({
  id,
  initialQuery = '',
}: {
  id: string;
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [tablesOpen, setTablesOpen] = useState(false);
  const images = waste.images.filter(image => image.barangay_ids.includes(id));
  const routes = waste.routes.filter(row => row.barangay_id === id);
  const filtered = routes.filter(row => matchesLocalSearch(query, [row.area]));
  const days = [
    t('Sunday'),
    t('Monday'),
    t('Tuesday'),
    t('Wednesday'),
    t('Thursday'),
    t('Friday'),
    t('Saturday'),
  ];
  function time(value: string) {
    const [hour, minute] = value.split(':').map(Number);
    return `${hour % 12 || 12}:${String(minute).padStart(2, '0')} ${hour < 12 ? 'AM' : 'PM'}`;
  }
  return (
    <>
      <div className="local-info-heading">
        <h3>{t('Your collection schedule')}</h3>
        <p>
          {t(
            'Schedules depend on your subdivision, street and phase. City master schedule effective January 5, 2026; later changes may apply.'
          )}
        </p>
      </div>
      {!id ? (
        <p className="local-info-empty">
          {t('Choose your barangay above to see available collection tables.')}
        </p>
      ) : !images.length ? (
        <p className="local-info-empty">
          {t(
            'We do not yet have a verified collection table for this barangay. Ask your barangay for your street’s schedule; this does not mean there is no collection service.'
          )}
        </p>
      ) : (
        <>
          {routes.length > 0 && (
            <>
              <SearchBox
                value={query}
                onChange={setQuery}
                label={t('Search the transcribed subdivision or phase')}
              />
              <p className="local-info-note">
                {t(
                  'Only the checked rows below are searchable. For other streets, read the original tables further down.'
                )}
              </p>
              <div className="local-route-list">
                {filtered.map(row => (
                  <article key={row.area}>
                    <h4>{row.area}</h4>
                    <p>{row.days.map(day => days[day]).join(' / ')}</p>
                    <strong>
                      {time(row.start)}–{time(row.end)}
                    </strong>
                    <SourceLink href={row.image_url}>
                      {t('Original schedule row')}
                    </SourceLink>
                  </article>
                ))}
              </div>
              {!filtered.length && (
                <p className="local-info-empty">
                  {t(
                    'No transcribed row matches. Check the original tables or confirm with your barangay.'
                  )}
                </p>
              )}
            </>
          )}
          <p className="local-info-note">
            {t(
              'The original tables may cover several barangays. Read the barangay heading and exact route; roadside pickup points do not imply door-to-door collection.'
            )}
          </p>
          {id === 'queens-row-east' && (
            <p className="local-info-empty">
              {t(
                'The Queens Row East table lists two day-pairs without assigning them to specific routes. Confirm which pair applies to your street.'
              )}
            </p>
          )}
          {id === 'mambog-iii' && (
            <p className="local-info-empty">
              {t(
                'The Citta Italia tables repeat phase 14 and do not establish phase 15. Confirm that phase directly with the barangay.'
              )}
            </p>
          )}
          <details
            className="local-schedule-tables"
            onToggle={event => setTablesOpen(event.currentTarget.open)}
          >
            <summary>
              {t('Read the original collection tables')}{' '}
              <span>({images.length})</span>
            </summary>
            {tablesOpen && (
              <>
                <p className="local-info-note">
                  {t(
                    'Published as images by the city. The tables need an internet connection and may be easier to read at full size.'
                  )}
                </p>
                {images.map((image, index) => (
                  <ScheduleImage
                    key={image.url}
                    url={image.url}
                    number={index + 1}
                  />
                ))}
                <div className="local-info-links">
                  {[...new Set(images.map(image => image.source_url))].map(
                    url => (
                      <SourceLink key={url} href={url}>
                        {t('City schedule announcement')}
                      </SourceLink>
                    )
                  )}
                </div>
              </>
            )}
          </details>
        </>
      )}
      <div className="local-info-links">
        <SourceLink href="https://www.facebook.com/CityGovtBacoor">
          {t('City announcements on Facebook')}
        </SourceLink>
      </div>
    </>
  );
}

export function AssistanceCenters() {
  return (
    <>
      <div className="local-info-heading">
        <h3>{t('Where to ask about assistance')}</h3>
        <p>
          {t(
            'R.E.V.I.L.L.A. Action Center locations listed in Ordinance 459-2025. Confirm the correct center for your program, requirements and office hours before visiting.'
          )}
        </p>
      </div>
      <p className="local-info-empty">
        {t(
          'Bayanan appears under both centers 4 and 5 in the ordinance. Confirm your assigned center; we do not automatically route residents from this list.'
        )}
      </p>
      <div className="local-center-list">
        {actionCenters.map(center => (
          <div key={center.location}>
            <span>
              {center.number
                ? `${t('Center')} ${center.number}`
                : t('Sub-office')}
            </span>
            <strong>{center.location}</strong>
          </div>
        ))}
      </div>
      <div className="local-info-links">
        <SourceLink href={actionCenterSource}>
          {t('2025 ordinance · pages 2–3')}
        </SourceLink>
        <Link to="/services/find">{t('Find my service')}</Link>
      </div>
    </>
  );
}

export function BarangayInformation({ id }: { id: string }) {
  useLanguage();
  const [section, setSection] = useState('health');
  const sections = [
    { id: 'health', label: 'Health services', icon: HeartPulse },
    { id: 'schools', label: 'Schools', icon: GraduationCap },
    { id: 'garbage', label: 'Garbage collection', icon: Trash2 },
    { id: 'assistance', label: 'Assistance centers', icon: Building2 },
  ];
  return (
    <section
      className="local-information"
      aria-labelledby="local-information-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">{t('EVERYDAY LIFE, CLOSE TO HOME')}</p>
          <h2 id="local-information-title">
            {t('More of what you need, right here.')}
          </h2>
          <p>
            {t(
              'Local services and practical information, with the sources within reach.'
            )}
          </p>
        </div>
      </div>
      <div
        className="local-info-sections"
        role="group"
        aria-label={t('Local information category')}
      >
        {sections.map(({ id, label, icon: Icon }) => (
          <button
            type="button"
            key={id}
            aria-pressed={section === id}
            onClick={() => setSection(id)}
          >
            <Icon size={18} aria-hidden="true" />
            {t(label)}
          </button>
        ))}
      </div>
      <div className="local-info-body">
        {section === 'health' && <HealthServices />}
        {section === 'schools' && <Schools />}
        {section === 'garbage' && <GarbageSchedule key={id} id={id} />}
        {section === 'assistance' && <AssistanceCenters />}
      </div>
    </section>
  );
}
