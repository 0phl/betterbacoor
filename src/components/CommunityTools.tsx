import { t, useLanguage } from '../i18n';
import { ArrowUpRight, Database, FileSearch, Landmark } from 'lucide-react';
const tools = [
  {
    name: 'Transparency Portal',
    description:
      'Explore public spending and infrastructure records. Search for Bacoor or Cavite.',
    url: 'https://transparency.bettergov.ph/',
    icon: Landmark,
  },
  {
    name: 'Procurement Browser',
    description:
      'Explore PhilGEPS procurement records from 2000–2025 through BetterGov’s searchable archive.',
    url: 'https://transparency.bettergov.ph/procurement',
    icon: FileSearch,
  },
  {
    name: 'Open Data Portal',
    description:
      'Find public datasets for your research, school project, or community initiative.',
    url: 'https://data.bettergov.ph/',
    icon: Database,
  },
];
export function CommunityTools({ compact = false }: { compact?: boolean }) {
  useLanguage();
  return (
    <section aria-labelledby="community-tools-title">
      <div className="section-heading">
        <div>
          {!compact && (
            <p className="eyebrow">{t('PART OF A BIGGER MOVEMENT')}</p>
          )}
          <h2 id="community-tools-title">
            {compact
              ? t('More help from the BetterGov community.')
              : t('Better tools. More informed communities.')}
          </h2>
          <p>
            {t(
              'Independent, community-built tools from BetterGov. These open on a separate website.'
            )}
          </p>
        </div>
        <a
          className="text-link"
          href="https://about.bettergov.ph/projects/"
          target="_blank"
          rel="noreferrer"
        >
          {t('All BetterGov projects ')}
          <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      </div>
      <div
        className={`community-tools${compact ? ' community-tools-compact' : ''}`}
      >
        {tools.map(({ name, description, url, icon: Icon }) => (
          <a
            key={url}
            href={url}
            target="_blank"
            rel="noreferrer"
            className="community-tool"
          >
            <div>
              <Icon size={25} strokeWidth={1.5} aria-hidden="true" />
              <ArrowUpRight size={18} aria-hidden="true" />
            </div>
            <h3>{t(name)}</h3>
            <p>{t(description)}</p>
            <span>{t('BETTERGOV.PH')}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
