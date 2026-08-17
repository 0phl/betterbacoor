import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BrandMark } from '../components/BrandMark';
import { PageMeta } from '../components/PageMeta';

export function NotFound() {
  return (
    <div className="page-shell grid min-h-[65vh] place-items-center py-16 text-center">
      <PageMeta
        title="Page not found"
        description="The requested BetterBacoor page could not be found."
      />
      <section aria-labelledby="not-found-title" className="max-w-2xl">
        <BrandMark className="mx-auto h-14 w-14 text-civic-700" />
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-civic-700">
          Error 404 · Wrong turn
        </p>
        <h1
          id="not-found-title"
          className="mt-4 text-4xl font-bold tracking-[-0.045em] text-slate-950 sm:text-6xl"
        >
          This route is not in the guide.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-600">
          The address may have changed, or the resource may not have been
          published yet.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-civic-700 px-5 text-sm font-bold text-white transition hover:bg-civic-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-600 focus-visible:ring-offset-2"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" /> Return home
        </Link>
      </section>
    </div>
  );
}
