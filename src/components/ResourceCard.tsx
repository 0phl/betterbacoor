import { t, useLanguage } from '../i18n';
import { ArrowUpRight, FileText, Globe, Landmark, Users } from 'lucide-react';
import { categoryLabels, getReviewStatus } from '../data/resources';
import type { CivicResource } from '../types';
const icons = {
  service: FileText,
  directory: Users,
  transparency: Landmark,
  'official-system': Globe,
};
interface ResourceCardProps {
  resource: CivicResource;
  headingLevel?: 2 | 3;
}
export function ResourceCard({
  resource,
  headingLevel = 3,
}: ResourceCardProps) {
  useLanguage();
  const Heading = headingLevel === 2 ? 'h2' : 'h3';
  const Icon = icons[resource.category];
  const { overdue } = getReviewStatus(resource);
  return (
    <article className="resource-card">
      <div className="resource-topline">
        <span className="resource-type">
          <Icon size={16} aria-hidden="true" />
          {t(categoryLabels[resource.category])}
        </span>
        <span className="source-domain">
          {new URL(resource.official_url).hostname}
        </span>
      </div>
      <Heading>{t(resource.title)}</Heading>
      <p className="resource-summary">{t(resource.summary)}</p>
      {overdue && (
        <p className="resource-notice">
          {t(
            'Details may have changed. Confirm with the linked government office.'
          )}
        </p>
      )}
      <div className="resource-bottom">
        <a
          href={resource.official_url}
          target="_blank"
          rel="noreferrer"
          className="text-link"
          aria-label={`${t('Open official page')}: ${t(resource.title)}`}
        >
          {t('Open official page ')}
          <ArrowUpRight size={17} aria-hidden="true" />
        </a>
        <details className="source-details">
          <summary>{t('Source')}</summary>
          <div>
            <a href={resource.source_url} target="_blank" rel="noreferrer">
              <span lang="en">{resource.source_title}</span>
            </a>
            <p lang="en">{resource.source_page}</p>
          </div>
        </details>
      </div>
    </article>
  );
}
