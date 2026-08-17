import { PageIntro } from '../components/PageIntro';
import { PageMeta } from '../components/PageMeta';
import { ResourceExplorer } from '../components/ResourceExplorer';
import type { ResourceCategory } from '../types';

interface ResourcesPageProps {
  eyebrow: string;
  title: string;
  description: string;
  categories: ResourceCategory[];
}

export function ResourcesPage({
  eyebrow,
  title,
  description,
  categories,
}: ResourcesPageProps) {
  return (
    <div className="page-shell py-12 sm:py-16">
      <PageMeta title={title} description={description} />
      <PageIntro eyebrow={eyebrow} title={title} description={description} />
      <div className="mt-10">
        <ResourceExplorer categories={categories} />
      </div>
    </div>
  );
}
