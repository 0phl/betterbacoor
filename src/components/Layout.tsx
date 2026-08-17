import {
  ArrowRight,
  ExternalLink,
  Github,
  Menu,
  Search,
  ShieldCheck,
  X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { BrandMark } from './BrandMark';

const navigation = [
  { to: '/', label: 'Home', end: true },
  { to: '/services', label: 'Services' },
  { to: '/directories', label: 'Directories' },
  { to: '/transparency', label: 'Transparency' },
  { to: '/about', label: 'About' },
];

function RouteChangeManager() {
  const location = useLocation();
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    window.scrollTo({ top: 0, left: 0 });
    document.getElementById('main-content')?.focus();
  }, [location.pathname]);

  return null;
}

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#f7f9fa] text-slate-950">
      <a
        href="#main-content"
        className="sr-only z-[100] rounded-lg bg-white px-4 py-3 font-semibold text-civic-800 shadow-lg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <header>
        <div className="border-b border-civic-100 bg-civic-50 text-civic-950">
          <div className="page-shell flex min-h-9 items-center justify-between gap-5 py-1.5 text-[0.72rem] leading-5 sm:text-xs">
            <p className="flex items-center gap-2">
              <ShieldCheck
                aria-hidden="true"
                className="h-3.5 w-3.5 shrink-0 text-civic-600"
              />
              <span>
                <strong>Unofficial and community-run.</strong>{' '}
                <span className="hidden text-civic-800 sm:inline">
                  Not operated by or endorsed by the City Government of Bacoor.
                </span>
              </span>
            </p>
            <a
              href="https://bacoor.gov.ph/"
              target="_blank"
              rel="noreferrer"
              className="hidden shrink-0 items-center gap-1 font-semibold text-civic-800 hover:text-civic-950 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-600 sm:inline-flex"
            >
              Official city portal
              <ExternalLink aria-hidden="true" className="h-3 w-3" />
            </a>
          </div>
        </div>

        <div className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
          <div className="page-shell flex min-h-[4.5rem] flex-wrap items-center justify-between gap-x-5 py-2.5">
            <NavLink
              to="/"
              className="inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-600 focus-visible:ring-offset-4"
            >
              <BrandMark className="h-9 w-9 text-civic-700" />
              <span>
                <span className="block text-base font-bold tracking-[-0.025em] text-slate-950">
                  BetterBacoor
                </span>
                <span className="block text-[0.61rem] font-bold uppercase tracking-[0.14em] text-slate-500">
                  Civic guide
                </span>
              </span>
            </NavLink>

            <button
              type="button"
              aria-controls="primary-navigation"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
              onClick={() => setMenuOpen(open => !open)}
              className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-600 lg:hidden"
            >
              {menuOpen ? (
                <X aria-hidden="true" className="h-5 w-5" />
              ) : (
                <Menu aria-hidden="true" className="h-5 w-5" />
              )}
            </button>

            <nav
              id="primary-navigation"
              aria-label="Primary navigation"
              className={`${menuOpen ? 'block' : 'hidden'} w-full border-t border-slate-200 pt-3 lg:block lg:w-auto lg:border-0 lg:pt-0`}
            >
              <ul className="flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-0.5">
                {navigation.map(item => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.end}
                      className={({ isActive }) =>
                        `inline-flex min-h-10 w-full items-center rounded-full px-3.5 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-600 lg:w-auto ${
                          isActive
                            ? 'bg-civic-50 text-civic-800'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
                <li className="lg:ml-2">
                  <NavLink
                    to="/search"
                    className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-full bg-civic-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-civic-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-600 focus-visible:ring-offset-2 lg:w-auto"
                  >
                    <Search aria-hidden="true" className="h-4 w-4" />
                    Search
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <RouteChangeManager />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="page-shell grid gap-10 py-12 lg:grid-cols-[1.5fr_0.75fr_0.75fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <BrandMark className="h-9 w-9 text-civic-700" />
              <div>
                <p className="font-bold tracking-tight text-slate-950">
                  BetterBacoor
                </p>
                <p className="text-xs text-slate-500">
                  Find the right starting point
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-lg text-sm leading-6 text-slate-600">
              An unofficial, open-source civic guide for Bacoor. Complete
              applications, submissions, and payments only on the linked
              government system.
            </p>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
              Explore
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              {navigation.slice(1).map(item => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className="rounded hover:text-civic-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-600"
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
              <li>
                <NavLink
                  to="/search"
                  className="rounded hover:text-civic-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-600"
                >
                  Search all resources
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
              Project
            </h2>
            <div className="mt-4 flex flex-col items-start gap-3 text-sm text-slate-600">
              <a
                href="https://github.com/0phl/betterbacoor"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded hover:text-civic-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-600"
              >
                <Github aria-hidden="true" className="h-4 w-4" /> Source on
                GitHub
                <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://github.com/0phl/betterbacoor/issues/new?template=correction.yml"
                target="_blank"
                rel="noreferrer"
                className="rounded leading-6 hover:text-civic-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-600"
              >
                Report incorrect or outdated information on GitHub (account
                required)
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200">
          <div className="page-shell flex flex-col gap-3 py-5 text-xs leading-5 text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>
              Based on the{' '}
              <a
                href="https://github.com/iyanski/betterlocalgov"
                target="_blank"
                rel="noreferrer"
                className="rounded underline underline-offset-2 hover:text-civic-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-600"
              >
                BetterLocalGov starter
              </a>{' '}
              and inspired by the{' '}
              <a
                href="https://bettergov.ph/"
                target="_blank"
                rel="noreferrer"
                className="rounded underline underline-offset-2 hover:text-civic-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-600"
              >
                BetterGov.ph community
              </a>
              .
            </p>
            <NavLink
              to="/about"
              className="inline-flex items-center gap-1.5 rounded font-semibold text-slate-700 hover:text-civic-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-600"
            >
              How this guide works
              <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
            </NavLink>
          </div>
        </div>
      </footer>
    </div>
  );
}
