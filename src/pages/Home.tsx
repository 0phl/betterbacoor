import {
  ArrowRight,
  CalendarCheck2,
  CheckCircle2,
  ExternalLink,
  FileSearch,
  Landmark,
  ListChecks,
  MessageSquareWarning,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { HomeSearch } from '../components/HomeSearch';
import { PageMeta } from '../components/PageMeta';
import { ResourceCard } from '../components/ResourceCard';
import { resources } from '../data/resources';

const pathways = [
  {
    number: '01',
    title: 'Services and online systems',
    description:
      'Start with the current Citizen’s Charter or continue to a government transaction portal.',
    to: '/services',
    categories: ['service', 'official-system'],
    icon: ListChecks,
  },
  {
    number: '02',
    title: 'Offices and local directories',
    description:
      'Find published office, barangay hall, and hospital directory information.',
    to: '/directories',
    categories: ['directory'],
    icon: Landmark,
  },
  {
    number: '03',
    title: 'Transparency and public records',
    description:
      'Go directly to procurement notices and full-disclosure documents.',
    to: '/transparency',
    categories: ['transparency'],
    icon: FileSearch,
  },
] as const;

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-PH', {
    dateStyle: 'medium',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`));
}

export function Home() {
  const featured = resources.slice(0, 4);
  const latestCheck = resources.reduce(
    (latest, resource) =>
      resource.last_verified > latest ? resource.last_verified : latest,
    resources[0]?.last_verified ?? ''
  );

  return (
    <>
      <PageMeta
        title="Community civic wayfinding"
        description="Search checked links to Bacoor services, offices, directories, systems, and public records."
      />

      <section className="relative overflow-hidden bg-civic-950 text-white">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 h-full w-[62rem] max-w-[72%] opacity-25"
          viewBox="0 0 992 620"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M88 52v118h174v104h154v-77h216v143h147v139h155"
            stroke="#74d4ff"
            strokeWidth="2"
          />
          <path
            d="M31 492h226v-91h186V286h149V108h273"
            stroke="#4777df"
            strokeWidth="2"
          />
          <path
            d="M220 0v111h211v63h186v113h211"
            stroke="#ffffff"
            strokeOpacity=".28"
            strokeWidth="1"
          />
          {[
            [262, 170],
            [416, 274],
            [632, 340],
            [257, 401],
            [592, 108],
            [779, 479],
          ].map(([cx, cy]) => (
            <circle
              key={`${cx}-${cy}`}
              cx={cx}
              cy={cy}
              r="7"
              fill="#071a36"
              stroke="#74d4ff"
              strokeWidth="3"
            />
          ))}
        </svg>

        <div className="page-shell relative grid gap-8 py-12 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12 lg:py-24">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-sky-200">
              <span className="h-2 w-2 rounded-full bg-sky-300" />
              Community civic guide · Bacoor, Cavite
            </p>
            <h1 className="mt-6 max-w-2xl text-5xl font-black leading-[0.98] tracking-[-0.055em] text-white sm:text-7xl sm:leading-[0.95]">
              Know where to go in Bacoor.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-civic-100 sm:text-xl">
              Find the right service, office, requirement, or public record
              without opening ten tabs or guessing which department handles it.
            </p>
            <div className="mt-8 hidden flex-wrap items-center gap-4 sm:flex">
              <Link
                to="/services"
                className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-white px-5 py-3 font-black text-civic-900 transition hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-civic-950"
              >
                Browse services
                <ArrowRight aria-hidden="true" className="h-5 w-5" />
              </Link>
              <a
                href="https://bacoor.gov.ph/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-white/25 px-5 py-3 font-bold text-white transition hover:border-white/50 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
              >
                Official city portal
                <ExternalLink aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
          </div>

          <HomeSearch />
        </div>
      </section>

      <section
        aria-label="How BetterBacoor records are checked"
        className="border-b border-slate-200 bg-white"
      >
        <div className="page-shell grid divide-y divide-slate-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <div className="flex gap-3 py-5 sm:px-5 sm:first:pl-0">
            <CheckCircle2
              aria-hidden="true"
              className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700"
            />
            <p className="text-sm leading-6 text-slate-600">
              <strong className="block text-slate-950">
                Government source
              </strong>
              Every published record links to its authority.
            </p>
          </div>
          <div className="flex gap-3 py-5 sm:px-5">
            <CalendarCheck2
              aria-hidden="true"
              className="mt-0.5 h-5 w-5 shrink-0 text-civic-700"
            />
            <p className="text-sm leading-6 text-slate-600">
              <strong className="block text-slate-950">Recently checked</strong>
              Latest foundation check: {formatDate(latestCheck)}.
            </p>
          </div>
          <div className="flex gap-3 py-5 sm:px-5 sm:last:pr-0">
            <MessageSquareWarning
              aria-hidden="true"
              className="mt-0.5 h-5 w-5 shrink-0 text-civic-700"
            />
            <p className="text-sm leading-6 text-slate-600">
              <strong className="block text-slate-950">Open corrections</strong>
              Each record includes its reviewer and correction route.
            </p>
          </div>
        </div>
      </section>

      <section className="page-shell py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-civic-700">
              Civic wayfinding
            </p>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-[-0.04em] text-slate-950">
              Start with the task, not the department.
            </h2>
            <p className="mt-5 max-w-md leading-7 text-slate-600">
              BetterBacoor groups official starting points around what residents
              are trying to accomplish.
            </p>
          </div>

          <div className="border-y border-slate-300">
            {pathways.map(pathway => {
              const Icon = pathway.icon;
              const count = resources.filter(resource =>
                pathway.categories.some(
                  category => category === resource.category
                )
              ).length;

              return (
                <Link
                  key={pathway.to}
                  to={pathway.to}
                  className="group grid gap-4 border-b border-slate-200 px-1 py-7 transition last:border-0 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-600 sm:grid-cols-[3.5rem_1fr_auto] sm:items-center sm:px-5"
                >
                  <span className="text-sm font-black tracking-[0.16em] text-civic-700">
                    {pathway.number}
                  </span>
                  <span>
                    <span className="flex items-center gap-3">
                      <Icon
                        aria-hidden="true"
                        className="h-5 w-5 text-civic-700"
                      />
                      <span className="text-xl font-black tracking-tight text-slate-950">
                        {pathway.title}
                      </span>
                    </span>
                    <span className="mt-2 block max-w-xl text-sm leading-6 text-slate-600">
                      {pathway.description}
                    </span>
                  </span>
                  <span className="flex items-center justify-between gap-5 sm:block sm:text-right">
                    <span className="block text-xs font-bold uppercase tracking-[0.1em] text-slate-500">
                      {count}{' '}
                      {count === 1 ? 'starting point' : 'starting points'}
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="mt-2 h-5 w-5 text-civic-700 transition group-hover:translate-x-1 sm:ml-auto"
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="page-shell py-16 sm:py-20">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-civic-700">
                Checked starting points
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-[-0.035em] text-slate-950 sm:text-4xl">
                Useful Bacoor links available now
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                Start with direct, reviewed government links. Deeper
                plain-language service guides are added only after page-level
                verification.
              </p>
            </div>
            <Link
              to="/search"
              className="inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-lg font-black text-civic-700 hover:text-civic-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-600 sm:self-auto"
            >
              View all {resources.length}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-9 grid gap-5 md:grid-cols-2">
            {featured.map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell py-16 sm:py-20">
        <div className="overflow-hidden rounded-[2rem] bg-civic-800 text-white">
          <div className="grid gap-8 px-6 py-10 sm:px-10 lg:grid-cols-[1fr_auto] lg:items-center lg:px-12">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-200">
                Community maintained
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.035em]">
                Found something stale or unclear?
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-civic-100">
                Corrections stay linked to the affected record so residents can
                see what changed and why.
              </p>
            </div>
            <a
              href="https://github.com/0phl/betterbacoor/issues/new?template=correction.yml"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-black text-civic-900 transition hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-civic-800"
            >
              Suggest a correction
              <ExternalLink aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
