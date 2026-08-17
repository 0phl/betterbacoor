import {
  ArrowUpRight,
  CalendarCheck2,
  ExternalLink,
  ShieldCheck,
  TriangleAlert,
  UserRoundCheck,
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
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-civic-200 hover:shadow-lg hover:shadow-slate-200/70">
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="rounded-full bg-civic-50 px-3 py-1 text-xs font-black uppercase tracking-[0.08em] text-civic-800">
            {categoryLabels[resource.category]}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-bold ${
              reviewStatus.overdue ? 'text-amber-800' : 'text-emerald-800'
            }`}
          >
            {reviewStatus.overdue ? (
              <TriangleAlert aria-hidden="true" className="h-4 w-4" />
            ) : (
              <ShieldCheck aria-hidden="true" className="h-4 w-4" />
            )}
            {reviewStatus.overdue ? 'Review overdue' : 'Checked'}
          </span>
        </div>

        <Heading className="mt-5 text-2xl font-black leading-tight tracking-[-0.025em] text-slate-950">
          {resource.title}
        </Heading>
        <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
          {resource.summary}
        </p>

        <dl className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs leading-5 text-slate-600">
          {reviewStatus.overdue ? (
            <div className="mb-3 flex items-start gap-2.5 rounded-lg border border-amber-200 bg-amber-50 p-3 text-amber-900">
              <TriangleAlert
                aria-hidden="true"
                className="mt-0.5 h-4 w-4 shrink-0"
              />
              <dt className="sr-only">Review status</dt>
              <dd>
                <strong>Review overdue—confirm on the government page.</strong>{' '}
                Review was due {formatDate(reviewStatus.dueDate)}.
              </dd>
            </div>
          ) : null}
          <div className="flex items-start gap-2.5">
            <CalendarCheck2
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 shrink-0 text-civic-700"
            />
            <dt className="sr-only">Last checked</dt>
            <dd>
              Checked{' '}
              <strong className="text-slate-800">
                {formatDate(resource.last_verified)}
              </strong>
            </dd>
          </div>
          <div className="mt-2 flex items-start gap-2.5">
            <ArrowUpRight
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 shrink-0 text-civic-700"
            />
            <dt className="sr-only">Source</dt>
            <dd>
              Source:{' '}
              <a
                href={resource.source_url}
                target="_blank"
                rel="noreferrer"
                className="rounded font-bold text-slate-800 underline decoration-slate-300 underline-offset-2 hover:text-civic-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-600"
              >
                {resource.source_title}
              </a>{' '}
              · {resource.source_page}
            </dd>
          </div>
          <div className="mt-2 flex items-start gap-2.5">
            <UserRoundCheck
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 shrink-0 text-civic-700"
            />
            <dt className="sr-only">Reviewer</dt>
            <dd>
              Reviewed by{' '}
              <strong className="text-slate-800">@{resource.reviewer}</strong>
            </dd>
          </div>
        </dl>
      </div>

      <div className="border-t border-slate-200 bg-slate-50 px-6 py-4 sm:px-7">
        <div className="flex flex-col items-start gap-3">
          <a
            href={resource.official_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-civic-700 px-4 py-2 text-sm font-black text-white transition-colors hover:bg-civic-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-600 focus-visible:ring-offset-2"
          >
            Open official page
            <ExternalLink aria-hidden="true" className="h-4 w-4" />
          </a>
          <a
            href={getCorrectionUrl(resource)}
            target="_blank"
            rel="noreferrer"
            className="rounded text-xs font-bold leading-5 text-slate-600 underline decoration-slate-300 underline-offset-4 hover:text-civic-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-600"
          >
            Suggest a correction on GitHub (account required)
          </a>
        </div>
      </div>
    </article>
  );
}
