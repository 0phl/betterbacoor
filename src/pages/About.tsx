import {
  CheckCircle2,
  CircleOff,
  ExternalLink,
  GitPullRequest,
} from 'lucide-react';
import { PageIntro } from '../components/PageIntro';
import { PageMeta } from '../components/PageMeta';

const projectDoes = [
  'Organizes links around resident needs instead of agency structure.',
  'Records the source, verification date, and reviewer.',
  'Explains services only when an authoritative source supports it.',
  'Keeps prelaunch corrections public and traceable through GitHub.',
];

const projectDoesNot = [
  'Represent or speak for the City Government of Bacoor.',
  'Accept payments, applications, IDs, or documents.',
  'Provide an unofficial application-status checker.',
  'Replace emergency services or professional advice.',
];

export function About() {
  return (
    <div className="page-shell py-12 sm:py-16 lg:py-20">
      <PageMeta
        title="About"
        description="How BetterBacoor sources, reviews, and corrects community civic information."
      />
      <PageIntro
        eyebrow="About the project"
        title="A community guide, not another government system"
        description="BetterBacoor helps residents discover and understand public information while keeping official transactions and records on government-owned systems."
      />

      <div className="mt-10 grid overflow-hidden rounded-2xl border border-slate-200 bg-white lg:grid-cols-2">
        <section className="p-6 sm:p-8 lg:border-r lg:border-slate-200">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
            <CheckCircle2 aria-hidden="true" className="h-5 w-5" />
          </span>
          <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-950">
            What BetterBacoor does
          </h2>
          <ul className="mt-6 space-y-4 text-sm leading-6 text-slate-600">
            {projectDoes.map(item => (
              <li key={item} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-t border-slate-200 bg-slate-50 p-6 sm:p-8 lg:border-t-0">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-200 text-slate-700">
            <CircleOff aria-hidden="true" className="h-5 w-5" />
          </span>
          <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-950">
            What it does not do
          </h2>
          <ul className="mt-6 space-y-4 text-sm leading-6 text-slate-600">
            {projectDoesNot.map(item => (
              <li key={item} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-6 flex flex-col gap-6 rounded-2xl border border-civic-200 bg-civic-50 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-civic-700">
            <GitPullRequest aria-hidden="true" className="h-4 w-4" />
            Open corrections
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950">
            Correct something
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            If a record is stale, unclear, or points to the wrong destination,
            open a correction report with the source that supports the change.
            The current prelaunch form requires a GitHub account.
          </p>
        </div>
        <a
          href="https://github.com/0phl/betterbacoor/issues/new?template=correction.yml"
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-civic-700 px-5 text-sm font-bold text-white transition hover:bg-civic-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-600 focus-visible:ring-offset-2"
        >
          Open correction form (GitHub account required)
          <ExternalLink aria-hidden="true" className="h-4 w-4" />
        </a>
      </section>
    </div>
  );
}
