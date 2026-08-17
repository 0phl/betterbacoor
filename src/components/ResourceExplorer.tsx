import { Search, X } from 'lucide-react';
import { useEffect, useId, useMemo, useState } from 'react';
import { filterResources, resources } from '../data/resources';
import type { ResourceCategory } from '../types';
import { ResourceCard } from './ResourceCard';

interface ResourceExplorerProps {
  categories?: ResourceCategory[];
  label?: string;
  initialQuery?: string;
  onQueryChange?: (query: string) => void;
}

export function ResourceExplorer({
  categories,
  label = 'Search these resources',
  initialQuery = '',
  onQueryChange,
}: ResourceExplorerProps) {
  const [query, setQuery] = useState(initialQuery);
  const inputId = useId();
  const resultCountId = useId();
  const filteredResources = useMemo(
    () => filterResources(resources, query, categories),
    [categories, query]
  );

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  function updateQuery(value: string) {
    setQuery(value);
    onQueryChange?.(value);
  }

  return (
    <section aria-label={label}>
      <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <label
              htmlFor={inputId}
              className="text-sm font-black text-slate-950"
            >
              {label}
            </label>
            <p className="mt-1 text-sm text-slate-600">
              Search titles, topics, and resident-facing keywords.
            </p>
          </div>
          <p
            id={resultCountId}
            className="text-sm font-bold text-civic-700"
            aria-live="polite"
          >
            {filteredResources.length}{' '}
            {filteredResources.length === 1 ? 'resource' : 'resources'} found
          </p>
        </div>

        <div className="relative mt-4">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
          />
          <input
            id={inputId}
            type="search"
            value={query}
            onChange={event => updateQuery(event.target.value)}
            aria-describedby={resultCountId}
            placeholder="Try permits, hospital, barangay, or procurement"
            className="min-h-14 w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pl-12 pr-12 text-base text-slate-950 outline-none transition placeholder:text-slate-500 focus:border-civic-600 focus:bg-white focus:ring-4 focus:ring-civic-100"
          />
          {query && (
            <button
              type="button"
              onClick={() => updateQuery('')}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-lg text-slate-600 transition hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-600"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {filteredResources.length > 0 ? (
        <div className="mt-7 grid gap-5 md:grid-cols-2">
          {filteredResources.map(resource => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              headingLevel={2}
            />
          ))}
        </div>
      ) : (
        <div className="mt-7 rounded-[1.5rem] border border-dashed border-slate-300 bg-white p-9 text-center">
          <h2 className="text-xl font-black text-slate-950">
            No matching resource
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-600">
            Try a shorter term, browse another section, or report what you
            expected to find through the correction link below.
          </p>
        </div>
      )}
    </section>
  );
}
