import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageMeta } from '../components/PageMeta';

export function NotFound() {
  return (
    <div className="page-shell py-20 text-center">
      <PageMeta
        title="Page not found"
        description="The requested BetterBacoor page could not be found."
      />
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">
        Error 404
      </p>
      <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950">
        This page is not here
      </h1>
      <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-650">
        The address may have changed, or the resource may not have been
        published yet.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-lg bg-blue-700 px-4 py-2 font-bold text-white hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
      >
        <ArrowLeft aria-hidden="true" className="h-4 w-4" /> Return home
      </Link>
    </div>
  );
}
