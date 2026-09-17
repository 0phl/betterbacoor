import { t, useLanguage } from '../i18n';
import { Search, X } from 'lucide-react';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { findLocalInformation } from '../data/local-discovery';
import { categoryLabels, filterResources, resources } from '../data/resources';
import type { ResourceCategory } from '../types';
import { ResourceCard } from './ResourceCard';

interface ResourceExplorerProps {
  includeLocal?: boolean;
  categories?: ResourceCategory[];
  label?: string;
  initialQuery?: string;
  onQueryChange?: (query: string) => void;
}

export function ResourceExplorer({
  includeLocal = false,
  categories,
  label = 'Search these resources',
  initialQuery = '',
  onQueryChange,
}: ResourceExplorerProps) {
  useLanguage();
  const [query, setQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);
  const [visible, setVisible] = useState(12);
  const [selectedCategory, setSelectedCategory] = useState<
    ResourceCategory | 'all'
  >('all');
  const allowedCategories =
    categories ?? (Object.keys(categoryLabels) as ResourceCategory[]);
  const inputId = useId();
  const resultCountId = useId();
  const activeCategories =
    selectedCategory === 'all' || !allowedCategories.includes(selectedCategory)
      ? categories
      : [selectedCategory];
  const localResults = includeLocal
    ? findLocalInformation(query, activeCategories)
    : [];
  const filteredResources = useMemo(
    () =>
      filterResources(
        resources,
        query,
        selectedCategory === 'all' ||
          !allowedCategories.includes(selectedCategory)
          ? categories
          : [selectedCategory]
      ),
    [categories, query, selectedCategory, allowedCategories]
  );

  const results = [
    ...localResults
      .filter(row => row.id === 'emergency')
      .map(row => ({ kind: 'local' as const, row })),
    ...localResults
      .filter(row => row.id.startsWith('topic-'))
      .map(row => ({ kind: 'local' as const, row })),
    ...filteredResources.map(row => ({ kind: 'official' as const, row })),
    ...localResults
      .filter(row => !row.id.startsWith('topic-') && row.id !== 'emergency')
      .map(row => ({ kind: 'local' as const, row })),
  ];

  useEffect(() => {
    setQuery(initialQuery);
    setVisible(12);
  }, [initialQuery]);

  function updateQuery(value: string) {
    setQuery(value);
    setVisible(12);
    onQueryChange?.(value);
  }

  return (
    <section aria-label={t(label)}>
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <label
              htmlFor={inputId}
              className="text-sm font-semibold text-slate-950"
            >
              {t(label)}
            </label>
            <p className="mt-1 text-sm text-slate-600">
              {t('Try a service, office, or something you need help with.')}
            </p>
          </div>
          <p
            id={resultCountId}
            className="text-sm font-semibold text-civic-700"
            aria-live="polite"
          >
            {filteredResources.length + localResults.length}{' '}
            {filteredResources.length + localResults.length === 1
              ? t('resource')
              : t('resources')}
            {t(' found')}
          </p>
        </div>

        <div className="relative mt-4">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
          />
          <input
            id={inputId}
            ref={inputRef}
            type="search"
            value={query}
            onChange={event => updateQuery(event.target.value)}
            aria-describedby={resultCountId}
            placeholder={t('Try permits, hospital, barangay, or procurement')}
            className="managed-search min-h-14 w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-12 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-civic-500 focus:ring-4 focus:ring-civic-100"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                updateQuery('');
                inputRef.current?.focus();
              }}
              aria-label={t('Clear search')}
              className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-600"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      <div
        className="filter-chips"
        role="group"
        aria-label={t('Filter by resource type')}
      >
        <button
          type="button"
          aria-pressed={
            selectedCategory === 'all' ||
            !allowedCategories.includes(selectedCategory)
          }
          onClick={() => {
            setSelectedCategory('all');
            setVisible(12);
          }}
        >
          {t('All resources')}
        </button>
        {allowedCategories.length > 1 &&
          allowedCategories.map(category => (
            <button
              key={category}
              type="button"
              aria-pressed={selectedCategory === category}
              onClick={() => {
                setSelectedCategory(category);
                setVisible(12);
              }}
            >
              {t(categoryLabels[category])}
            </button>
          ))}
      </div>

      {filteredResources.length + localResults.length > 0 ? (
        <>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {(includeLocal ? results.slice(0, visible) : results).map(result =>
              result.kind === 'official' ? (
                <ResourceCard
                  key={result.row.id}
                  resource={result.row}
                  headingLevel={2}
                />
              ) : (
                <article className="resource-card" key={result.row.id}>
                  <div className="resource-topline">
                    <span className="resource-type">
                      {t(categoryLabels[result.row.category])}
                    </span>
                    <span className="source-domain">
                      {t('ON BETTERBACOOR')}
                    </span>
                  </div>
                  <h2>{t(result.row.title)}</h2>
                  <p className="resource-summary">{t(result.row.summary)}</p>
                  <div className="resource-bottom">
                    <Link
                      className="text-link"
                      to={result.row.href}
                      aria-label={`${t('View on BetterBacoor')}: ${t(result.row.title)}`}
                    >
                      {t('View on BetterBacoor')}
                      <ArrowRight size={17} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              )
            )}
          </div>
          {includeLocal &&
            visible < filteredResources.length + localResults.length && (
              <button
                className="local-info-more"
                type="button"
                onClick={() => setVisible(visible + 12)}
              >
                {t('Show more')}
              </button>
            )}
        </>
      ) : (
        <div className="mt-7 rounded-2xl border border-dashed border-slate-300 bg-white p-9 text-center">
          <h2 className="text-xl font-bold text-slate-950">
            {t('No matching resource')}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-600">
            {t(
              'Try a shorter term such as “permit” or “office”, select All resources, or clear your search to browse the available links.'
            )}
          </p>
        </div>
      )}
    </section>
  );
}
