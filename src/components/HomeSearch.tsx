import { ArrowRight, Search } from 'lucide-react';
import { type FormEvent, useId, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { resources } from '../data/resources';

const searchShortcuts = [
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
      className="mx-auto w-full max-w-4xl"
    >
      <h2 id="home-search-title" className="sr-only">
        What do you need today?
      </h2>
      <form role="search" onSubmit={submitSearch}>
        <label
          htmlFor={inputId}
          className="mb-2 block text-left text-sm font-semibold text-slate-700"
        >
          What do you need today?
        </label>
        <div className="flex items-center rounded-2xl border border-slate-300 bg-white p-1.5 shadow-[0_14px_40px_rgba(15,23,42,0.08)] transition focus-within:border-civic-500 focus-within:ring-4 focus-within:ring-civic-100">
          <Search
            aria-hidden="true"
            className="ml-3 h-5 w-5 shrink-0 text-civic-600"
          />
          <input
            id={inputId}
            type="search"
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Find services, offices, directories…"
            className="min-h-12 min-w-0 flex-1 bg-transparent px-3 text-base text-slate-950 outline-none placeholder:text-slate-400"
            aria-label="Search all verified Bacoor resources"
          />
          <button
            type="submit"
            aria-label="Search"
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-civic-700 px-4 text-sm font-bold text-white transition hover:bg-civic-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-600 focus-visible:ring-offset-2 sm:px-5"
          >
            <span className="hidden sm:inline">Search</span>
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
      </form>

      <div className="mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
          <span className="text-slate-500">Popular:</span>
          {searchShortcuts.map(item => (
            <Link
              key={item.query}
              to={`/search?q=${encodeURIComponent(item.query)}`}
              className="rounded-full bg-civic-50 px-3 py-1.5 font-medium text-civic-800 transition hover:bg-civic-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-600"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <span className="shrink-0 text-xs text-slate-500">
          {resources.length} checked starting points
        </span>
      </div>
    </section>
  );
}
