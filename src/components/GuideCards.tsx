import { t, useLanguage } from '../i18n';
import { ArrowRight, BriefcaseBusiness, FileText, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { findGuides } from '../data/guides';

const icons = {
  'business-permit': BriefcaseBusiness,
  'civil-registry': FileText,
  'working-permit': Users,
};

export function GuideCards({ query = '' }: { query?: string }) {
  useLanguage();
  const matches = findGuides(query);
  if (!matches.length) return null;
  return (
    <div className="guide-cards">
      {matches.map(guide => {
        const Icon = icons[guide.slug as keyof typeof icons];
        return (
          <Link
            className="guide-card"
            key={guide.slug}
            to={`/services/${guide.slug}`}
          >
            <span className="guide-card-top">
              <Icon size={26} strokeWidth={1.6} aria-hidden="true" />
              <span>{t('ON BETTERBACOOR')}</span>
            </span>
            <h3>{t(guide.title)}</h3>
            <p>{t(guide.summary)}</p>
            <span className="guide-card-action">
              {t('Read guide & make a checklist')}{' '}
              <ArrowRight size={17} aria-hidden="true" />
            </span>
          </Link>
        );
      })}
    </div>
  );
}
