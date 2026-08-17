import { CalendarCheck, ExternalLink, ShieldCheck } from 'lucide-react';
import { categoryLabels } from '../data/resources';
import type { CivicResource } from '../types';

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-PH', {
    dateStyle: 'medium',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`));
}

interface ResourceCardProps {
  resource: CivicResource;
  headingLevel?: 2 | 3;
}

function getCorrectionUrl(resource: CivicResource) {
  const url = new URL(resource.correction_url);
  url.searchParams.set(
    'title',
    `Correction: ${resource.title} [${resource.id}]`
  );
  return url.toString();
}

export function ResourceCard({
  resource,
  headingLevel = 3,
}: ResourceCardProps) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3';

  return (
    <article className="h-full rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex h-full flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-800">
            {categoryLabels[resource.category]}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-800">
            <ShieldCheck aria-hidden="true" className="h-4 w-4" /> Source
            checked
          </span>
        </div>

        <Heading className="mt-4 text-xl font-bold tracking-tight text-slate-950">
          {resource.title}
        </Heading>
        <p className="mt-3 flex-1 text-sm leading-6 text-slate-650">
          {resource.summary}
        </p>

        <dl className="mt-5 border-t border-slate-100 pt-4 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <CalendarCheck aria-hidden="true" className="h-4 w-4" />
            <dt className="sr-only">Last checked</dt>
            <dd>Checked {formatDate(resource.last_verified)}</dd>
          </div>
          <div className="mt-1">
            <dt className="inline font-semibold">Source: </dt>
            <dd className="inline">
              <a
                href={resource.source_url}
                target="_blank"
                rel="noreferrer"
                className="rounded underline decoration-slate-300 underline-offset-2 hover:text-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                {resource.source_title}
              </a>{' '}
              ({resource.source_page})
            </dd>
          </div>
          <div className="mt-1">
            <dt className="inline font-semibold">Reviewer: </dt>
            <dd className="inline">@{resource.reviewer}</dd>
          </div>
        </dl>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
          <a
            href={resource.official_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-blue-700 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            Open government source
            <ExternalLink aria-hidden="true" className="h-4 w-4" />
          </a>
          <a
            href={getCorrectionUrl(resource)}
            target="_blank"
            rel="noreferrer"
            className="rounded text-sm font-semibold text-slate-700 underline decoration-slate-300 underline-offset-4 hover:text-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            Suggest a correction on GitHub (account required)
          </a>
        </div>
      </div>
    </article>
  );
}
