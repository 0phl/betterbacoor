import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { t, useLanguage } from '../i18n';
import { localInformationUrl, localTopics } from '../data/local-discovery';
import type { ResourceCategory } from '../types';

export function LocalTopicLinks({
  categories,
}: {
  categories: ResourceCategory[];
}) {
  useLanguage();
  const topics = localTopics.filter(topic =>
    categories.includes(topic.category)
  );
  if (!topics.length) return null;
  return (
    <nav
      className="local-topic-links"
      aria-label={t('Browse local information')}
    >
      {topics.map(topic => (
        <Link key={topic.id} to={localInformationUrl(topic.id)}>
          <strong>
            {t(topic.label)}
            <ArrowRight size={16} aria-hidden="true" />
          </strong>
          <span>{t(topic.summary)}</span>
        </Link>
      ))}
    </nav>
  );
}
