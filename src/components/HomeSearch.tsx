import { ArrowRight, Search } from 'lucide-react';
import { type FormEvent, useId, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { resources } from '../data/resources';

const popularSearches = [
  { label: 'Citizen’s Charter', query: 'requirements' },
  { label: 'Business permits', query: 'business' },
  { label: 'Barangay directory', query: 'barangay' },
];

export function HomeSearch() {
  const [query, setQuery] = useState('');
  const inputId = useId();
  const navigate = useNavigate();

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedQuery = query.trim();
    navigate(
      normalizedQuery
        ? `/search?q=${encodeURIComponent(normalizedQuery)}`
        : '/search'
    );
  }

  return (
    <section
      aria-labelledby="home-search-title"
      className="relative rounded-[1.75rem] border border-white/15 bg-white p-5 text-slate-950 shadow-2xl shadow-black/20 sm:p-7"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-civic-700">
            Search the guide
          </p>
          <h2
            id="home-search-title"
            className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl"
          >
            What do you need today?
          </h2>
        </div>
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-civic-50 text-civic-700">
          <Search aria-hidden="true" className="h-5 w-5" />
        </span>
      </div>

      <form className="mt-6" role="search" onSubmit={submitSearch}>
        <label htmlFor={inputId} className="sr-only">
          Search all verified Bacoor resources
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            id={inputId}
            type="search"
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Try permits, barangay, hospital…"
            className="min-h-14 min-w-0 flex-1 rounded-xl border border-slate-300 bg-slate-50 px-4 text-base text-slate-950 outline-none transition placeholder:text-slate-500 focus:border-civic-600 focus:bg-white focus:ring-4 focus:ring-civic-100"
          />
          <button
            type="submit"
            className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-civic-700 px-5 font-black text-white transition hover:bg-civic-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-600 focus-visible:ring-offset-2"
          >
            Search
            <ArrowRight aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
      </form>

      <div className="mt-5 border-t border-slate-200 pt-4">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
          Popular starting points
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {popularSearches.map(item => (
            <Link
              key={item.query}
              to={`/search?q=${encodeURIComponent(item.query)}`}
              className="inline-flex min-h-9 items-center rounded-full border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-700 transition hover:border-civic-300 hover:bg-civic-50 hover:text-civic-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-600"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <p className="mt-5 text-xs leading-5 text-slate-500">
        Searching {resources.length} checked starting points. Applications and
        payments remain on linked government systems.
      </p>
    </section>
  );
}
