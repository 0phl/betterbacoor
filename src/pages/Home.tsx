import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  FileSearch,
  Landmark,
  ListChecks,
  ShieldCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageMeta } from '../components/PageMeta';
import { ResourceCard } from '../components/ResourceCard';
import { resources } from '../data/resources';

const pathways = [
  {
    title: 'Services and systems',
    description:
      'Start with the current Citizen’s Charter or continue to a government transaction system.',
    to: '/services',
    icon: ListChecks,
  },
  {
    title: 'Offices and directories',
    description:
      'Find the city, barangay, or hospital directory published by the City of Bacoor.',
    to: '/directories',
    icon: Landmark,
  },
  {
    title: 'Public records',
    description:
      'Reach procurement and disclosure pages without searching through unrelated posts.',
    to: '/transparency',
    icon: FileSearch,
  },
];

export function Home() {
  const featured = resources.slice(0, 4);

  return (
    <>
      <PageMeta
        title="Community civic information"
        description="Find verified links to Bacoor services, offices, directories, systems, and public records."
      />

      <section className="border-b border-slate-200 bg-white">
        <div className="page-shell grid gap-10 py-16 lg:grid-cols-[1.35fr_0.65fr] lg:items-center lg:py-24">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">
              Bacoor civic information
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[1.08] tracking-tight text-slate-950 sm:text-6xl sm:leading-[1.05]">
              Find the right Bacoor source without the runaround.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-650 sm:text-xl">
              BetterBacoor organizes verified government links so residents can
              reach the right service, office, requirement, or public record in
              under one minute.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/services"
                className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-bold text-white transition hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                Browse verified resources
                <ArrowRight aria-hidden="true" className="h-5 w-5" />
              </Link>
              <a
                href="https://bacoor.gov.ph/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-bold text-slate-800 transition hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                City of Bacoor portal
                <ExternalLink aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
          </div>

          <aside className="rounded-3xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
            <ShieldCheck aria-hidden="true" className="h-9 w-9 text-blue-700" />
            <h2 className="mt-5 text-xl font-black text-slate-950">
              Trust is part of every record
            </h2>
            <ul className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              {[
                'A direct government source link',
                'The date it was last checked',
                'A named content reviewer',
                'A public correction route',
              ].map(item => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="page-shell py-16">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">
            Start here
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
            What do you need to find?
          </h2>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {pathways.map(pathway => {
            const Icon = pathway.icon;
            return (
              <Link
                key={pathway.to}
                to={pathway.to}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                <Icon aria-hidden="true" className="h-7 w-7 text-blue-700" />
                <h3 className="mt-5 text-xl font-bold text-slate-950">
                  {pathway.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-650">
                  {pathway.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-blue-700">
                  Open section
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition group-hover:translate-x-1"
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="page-shell py-16">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">
              Checked starting points
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
              Useful Bacoor resources available now
            </h2>
            <p className="mt-4 leading-7 text-slate-650">
              The foundation begins with direct links rather than copied
              requirements. Plain-language guides will follow after source-page
              review.
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {featured.map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
