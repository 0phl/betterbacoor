import {
  ArrowUpRight,
  CalendarCheck2,
  ExternalLink,
  ShieldCheck,
  TriangleAlert,
} from 'lucide-react';
import { categoryLabels, getReviewStatus } from '../data/resources';
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
  const reviewStatus = getReviewStatus(resource);

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-civic-300 hover:shadow-[0_14px_36px_rgba(15,23,42,0.07)] sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="rounded-full bg-civic-50 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.08em] text-civic-800">
          {categoryLabels[resource.category]}
        </span>
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
            reviewStatus.overdue ? 'text-amber-800' : 'text-emerald-700'
          }`}
        >
          {reviewStatus.overdue ? (
            <TriangleAlert aria-hidden="true" className="h-3.5 w-3.5" />
          ) : (
            <ShieldCheck aria-hidden="true" className="h-3.5 w-3.5" />
          )}
          {reviewStatus.overdue ? 'Review overdue' : 'Verified'}
        </span>
      </div>

      <Heading className="mt-5 text-xl font-bold leading-snug tracking-[-0.02em] text-slate-950 sm:text-2xl">
        {resource.title}
      </Heading>
      <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
        {resource.summary}
      </p>

      {reviewStatus.overdue ? (
        <p className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900">
          Review was due {formatDate(reviewStatus.dueDate)}. Confirm details on
          the government page.
        </p>
      ) : null}

      <dl className="mt-6 space-y-2 border-t border-slate-200 pt-5 text-xs leading-5 text-slate-500">
        <div className="flex items-start gap-2.5">
          <CalendarCheck2
            aria-hidden="true"
            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-civic-700"
          />
          <dt className="sr-only">Last checked</dt>
          <dd>
            Checked{' '}
            <strong className="font-semibold text-slate-700">
              {formatDate(resource.last_verified)}
            </strong>{' '}
            by{' '}
            <strong className="font-semibold text-slate-700">
              @{resource.reviewer}
            </strong>
          </dd>
        </div>
        <div className="flex items-start gap-2.5">
          <ArrowUpRight
            aria-hidden="true"
            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-civic-700"
          />
          <dt className="sr-only">Source</dt>
          <dd>
            Source:{' '}
            <a
              href={resource.source_url}
              target="_blank"
              rel="noreferrer"
              className="rounded font-semibold text-slate-700 underline decoration-slate-300 underline-offset-2 hover:text-civic-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-600"
            >
              {resource.source_title}
            </a>
          </dd>
        </div>
      </dl>

      <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <a
          href={resource.official_url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-civic-700 px-4 text-sm font-bold text-white transition hover:bg-civic-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-600 focus-visible:ring-offset-2"
        >
          Open official page
          <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
        </a>
        <a
          href={getCorrectionUrl(resource)}
          target="_blank"
          rel="noreferrer"
          className="rounded text-xs font-semibold leading-5 text-slate-500 underline decoration-slate-300 underline-offset-4 hover:text-civic-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-600"
        >
          Suggest a correction on GitHub (account required)
        </a>
      </div>
    </article>
  );
}
