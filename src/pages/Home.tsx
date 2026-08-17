import {
  ArrowRight,
  CalendarCheck2,
  CheckCircle2,
  ExternalLink,
  FileSearch,
  Landmark,
  ListChecks,
  MapPin,
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
    title: 'Services',
    description:
      'Start with the current Citizen’s Charter or continue to an official transaction system.',
    to: '/services',
    categories: ['service', 'official-system'],
    icon: ListChecks,
  },
  {
    number: '02',
    title: 'Directories',
    description:
      'Find published city offices, barangay halls, and hospital contact information.',
    to: '/directories',
    categories: ['directory'],
    icon: Landmark,
  },
  {
    number: '03',
    title: 'Public records',
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

      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[-18rem] h-[34rem] w-[58rem] -translate-x-1/2 rounded-full bg-civic-100/65 blur-3xl"
        />
        <div className="page-shell relative py-14 text-center sm:py-20 lg:py-24">
          <p className="inline-flex items-center gap-2 rounded-full border border-civic-200 bg-civic-50 px-3 py-1.5 text-xs font-semibold text-civic-800">
            <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
            Bacoor, Cavite · Community civic guide
          </p>
          <h1 className="mx-auto mt-7 max-w-4xl text-4xl font-bold leading-[1.04] tracking-[-0.05em] text-slate-950 sm:text-6xl lg:text-7xl">
            Know where to go in Bacoor.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Find the right service, office, requirement, or public record—then
            continue safely on the official government source.
          </p>

          <div className="mt-10 sm:mt-12">
            <HomeSearch />
          </div>

          <a
            href="https://bacoor.gov.ph/"
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex items-center gap-1.5 rounded text-sm font-semibold text-slate-600 hover:text-civic-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-600"
          >
            Visit the official Bacoor city portal
            <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
          </a>
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
              className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700"
            />
            <p className="text-xs leading-5 text-slate-500">
              <strong className="block text-sm font-semibold text-slate-800">
                Government source
              </strong>
              Every record links to its authority.
            </p>
          </div>
          <div className="flex gap-3 py-5 sm:px-5">
            <CalendarCheck2
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 shrink-0 text-civic-700"
            />
            <p className="text-xs leading-5 text-slate-500">
              <strong className="block text-sm font-semibold text-slate-800">
                Recently checked
              </strong>
              Latest check: {formatDate(latestCheck)}.
            </p>
          </div>
          <div className="flex gap-3 py-5 sm:px-5 sm:last:pr-0">
            <MessageSquareWarning
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 shrink-0 text-civic-700"
            />
            <p className="text-xs leading-5 text-slate-500">
              <strong className="block text-sm font-semibold text-slate-800">
                Open corrections
              </strong>
              Each record has a public correction route.
            </p>
          </div>
        </div>
      </section>

      <section className="page-shell py-14 sm:py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-civic-700">
            Browse by task
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-[-0.035em] text-slate-950 sm:text-4xl">
            Start with what you need to do.
          </h2>
          <p className="mt-4 leading-7 text-slate-600">
            Official starting points organized around resident needs, not city
            department structure.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
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
                className="group flex min-h-64 flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-civic-300 hover:shadow-[0_14px_36px_rgba(15,23,42,0.07)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-600"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-civic-50 text-civic-700">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    {pathway.number}
                  </span>
                </div>
                <h3 className="mt-7 text-xl font-bold tracking-tight text-slate-950">
                  {pathway.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                  {pathway.description}
                </p>
                <span className="mt-6 inline-flex items-center justify-between text-sm font-semibold text-civic-800">
                  {count} {count === 1 ? 'starting point' : 'starting points'}
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
        <div className="page-shell py-14 sm:py-20">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-civic-700">
                Verified starting points
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.035em] text-slate-950 sm:text-4xl">
                Useful Bacoor links
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                Direct routes to public information, with the source and last
                review date kept visible.
              </p>
            </div>
            <Link
              to="/search"
              className="inline-flex min-h-10 shrink-0 items-center gap-2 self-start rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-civic-300 hover:text-civic-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-600 sm:self-auto"
            >
              View all {resources.length}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {featured.map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell py-14 sm:py-20">
        <div className="flex flex-col gap-6 rounded-2xl border border-civic-200 bg-civic-50 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-civic-700">
              Community maintained
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-[-0.025em] text-slate-950 sm:text-3xl">
              Found something stale or unclear?
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-600">
              Corrections stay linked to the affected record so residents can
              see what changed and why.
            </p>
          </div>
          <a
            href="https://github.com/0phl/betterbacoor/issues/new?template=correction.yml"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-civic-700 px-5 text-sm font-bold text-white transition hover:bg-civic-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-600 focus-visible:ring-offset-2"
          >
            Suggest a correction on GitHub (account required)
            <ExternalLink aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
      </section>
    </>
  );
}
