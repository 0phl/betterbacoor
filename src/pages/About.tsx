import {
  CheckCircle2,
  CircleOff,
  ExternalLink,
  GitPullRequest,
  ShieldCheck,
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

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <section className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-emerald-50 text-emerald-700">
            <CheckCircle2 aria-hidden="true" className="h-5 w-5" />
          </span>
          <h2 className="mt-5 text-2xl font-black tracking-tight text-slate-950">
            What BetterBacoor does
          </h2>
          <ul className="mt-6 space-y-4 text-sm leading-6 text-slate-700">
            {projectDoes.map(item => (
              <li key={item} className="flex gap-3">
                <ShieldCheck
                  aria-hidden="true"
                  className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-[1.5rem] bg-civic-950 p-6 text-white shadow-sm sm:p-8">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-sky-200">
            <CircleOff aria-hidden="true" className="h-5 w-5" />
          </span>
          <h2 className="mt-5 text-2xl font-black tracking-tight">
            What it does not do
          </h2>
          <ul className="mt-6 space-y-4 text-sm leading-6 text-civic-100">
            {projectDoesNot.map(item => (
              <li key={item} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-300"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-6 overflow-hidden rounded-[1.5rem] border border-civic-200 bg-civic-50">
        <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-civic-700">
              <GitPullRequest aria-hidden="true" className="h-4 w-4" />
              Open corrections
            </span>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950">
              Correct something
            </h2>
            <p className="mt-3 max-w-3xl leading-7 text-slate-700">
              Government pages and contact information change. If a record is
              stale, unclear, or points to the wrong destination, open a
              correction report with the source that supports the change. The
              current prelaunch form requires a GitHub account. A non-GitHub
              route must be available before public launch.
            </p>
          </div>
          <a
            href="https://github.com/0phl/betterbacoor/issues/new?template=correction.yml"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-civic-700 px-5 py-3 text-sm font-black text-white transition hover:bg-civic-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-600 focus-visible:ring-offset-2"
          >
            Open correction form (GitHub account required)
            <ExternalLink aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
        <p className="border-t border-civic-200 px-6 py-3 text-xs leading-5 text-civic-900 sm:px-8">
          GitHub account required during prelaunch. A privacy-safe public route
          remains a launch requirement.
        </p>
      </section>
    </div>
  );
}
