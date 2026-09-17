import { t, useLanguage } from '../i18n';
import { ArrowRight, Search } from 'lucide-react';
import { type FormEvent, useId, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
export function HomeSearch() {
  useLanguage();
  const [query, setQuery] = useState('');
  const inputId = useId();
  const navigate = useNavigate();
  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = query.trim();
    navigate(value ? `/search?q=${encodeURIComponent(value)}` : '/search');
  }
  return (
    <div className="home-search">
      <form role="search" onSubmit={submitSearch}>
        <label htmlFor={inputId} className="sr-only">
          {t('Search all verified Bacoor resources')}
        </label>
        <div className="home-search-field">
          <Search size={21} aria-hidden="true" />
          <input
            id={inputId}
            type="search"
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder={t('What can we help you find?')}
          />
          <button type="submit" aria-label={t('Search')}>
            <ArrowRight size={22} aria-hidden="true" />
          </button>
        </div>
      </form>
      <div className="search-shortcuts">
        <span>{t('Start with:')}</span>
        <Link to="/services/business-permit">{t('Business permit guide')}</Link>
        <Link to="/services/civil-registry">{t('Birth & civil records')}</Link>
        <Link to="/services/working-permit">{t('Working permit')}</Link>
      </div>
    </div>
  );
}
