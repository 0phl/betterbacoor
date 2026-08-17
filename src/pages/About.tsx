import { ExternalLink } from 'lucide-react';
import { PageIntro } from '../components/PageIntro';
import { PageMeta } from '../components/PageMeta';

export function About() {
  return (
    <div className="page-shell py-12 sm:py-16">
      <PageMeta
        title="About"
        description="How BetterBacoor sources, reviews, and corrects community civic information."
      />
      <PageIntro
        eyebrow="About the project"
        title="A community guide, not another government system"
        description="BetterBacoor helps residents discover and understand public information while keeping official transactions and records on government-owned systems."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-black tracking-tight text-slate-950">
            What BetterBacoor does
          </h2>
          <ul className="mt-5 space-y-3 text-slate-700">
            <li>
              Organizes links around resident needs instead of agency structure.
            </li>
            <li>Records the source, verification date, and reviewer.</li>
            <li>
              Explains services only when an authoritative source supports it.
            </li>
            <li>
              Keeps prelaunch corrections public and traceable through GitHub.
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-black tracking-tight text-slate-950">
            What it does not do
          </h2>
          <ul className="mt-5 space-y-3 text-slate-700">
            <li>
              It does not represent or speak for the City Government of Bacoor.
            </li>
            <li>
              It does not accept payments, applications, IDs, or documents.
            </li>
            <li>
              It does not provide an unofficial application-status checker.
            </li>
            <li>It does not replace emergency or professional advice.</li>
          </ul>
        </section>
      </div>

      <section className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
        <h2 className="text-2xl font-black tracking-tight text-slate-950">
          Correct something
        </h2>
        <p className="mt-3 max-w-3xl leading-7 text-slate-700">
          Government pages and contact information change. If a record is stale,
          unclear, or points to the wrong destination, open a correction report
          with the source that supports the change. The current prelaunch form
          requires a GitHub account. A non-GitHub route must be available before
          public launch.
        </p>
        <a
          href="https://github.com/0phl/betterbacoor/issues/new?template=correction.yml"
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg bg-blue-700 px-4 py-2 text-sm font-bold text-white hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        >
          Open GitHub correction form (account required)
          <ExternalLink aria-hidden="true" className="h-4 w-4" />
        </a>
      </section>
    </div>
  );
}
