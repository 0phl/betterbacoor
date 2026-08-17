import { Search, X } from 'lucide-react';
import { useId, useMemo, useState } from 'react';
import { filterResources, resources } from '../data/resources';
import type { ResourceCategory } from '../types';
import { ResourceCard } from './ResourceCard';

interface ResourceExplorerProps {
  categories?: ResourceCategory[];
  label?: string;
}

export function ResourceExplorer({
  categories,
  label = 'Search these resources',
}: ResourceExplorerProps) {
  const [query, setQuery] = useState('');
  const inputId = useId();
  const filteredResources = useMemo(
    () => filterResources(resources, query, categories),
    [categories, query]
  );

  return (
    <div>
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <label htmlFor={inputId} className="text-sm font-bold text-slate-900">
          {label}
        </label>
        <div className="relative mt-2">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
          />
          <input
            id={inputId}
            type="search"
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Try permits, hospital, barangay, or procurement"
            className="min-h-12 w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-12 text-base text-slate-950 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-lg text-slate-600 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
          )}
        </div>
        <p className="mt-2 text-sm text-slate-600" aria-live="polite">
          {filteredResources.length}{' '}
          {filteredResources.length === 1 ? 'resource' : 'resources'} found
        </p>
      </div>

      {filteredResources.length > 0 ? (
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {filteredResources.map(resource => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              headingLevel={2}
            />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <h2 className="text-lg font-bold text-slate-950">
            No matching resource
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Try a shorter term, or report what you expected to find through the
            correction link below.
          </p>
        </div>
      )}
    </div>
  );
}
