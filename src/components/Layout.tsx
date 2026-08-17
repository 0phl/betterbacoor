import {
  ArrowRight,
  CalendarCheck2,
  ExternalLink,
  FileCheck2,
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
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <a
        href="#main-content"
        className="sr-only z-[100] rounded-md bg-white px-4 py-3 font-semibold text-civic-800 shadow focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <header>
        <div className="bg-civic-950 text-white">
          <div className="page-shell flex min-h-10 items-center justify-between gap-5 py-2 text-xs leading-5 sm:text-sm">
            <p>
              <strong>Unofficial and community-run.</strong>{' '}
              <span className="text-civic-100">
                Not operated by or endorsed by the City Government of Bacoor.
              </span>
            </p>
            <div className="hidden shrink-0 items-center gap-5 lg:flex">
              <a
                href="https://bacoor.gov.ph/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded font-semibold text-white hover:text-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
              >
                Official city portal
                <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://github.com/0phl/betterbacoor/issues/new?template=correction.yml"
                target="_blank"
                rel="noreferrer"
                className="rounded font-semibold text-white hover:text-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
              >
                Correction form (GitHub account required)
              </a>
            </div>
          </div>
        </div>

        <div className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="page-shell flex min-h-[4.75rem] flex-wrap items-center justify-between gap-x-5 py-3">
            <NavLink
              to="/"
              className="inline-flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-600 focus-visible:ring-offset-4"
            >
              <BrandMark className="h-11 w-11 text-civic-700" />
              <span>
                <span className="block text-lg font-black tracking-[-0.025em] text-slate-950">
                  BetterBacoor
                </span>
                <span className="block text-[0.68rem] font-bold uppercase tracking-[0.13em] text-slate-500">
                  Civic wayfinding
                </span>
              </span>
            </NavLink>

            <button
              type="button"
              aria-controls="primary-navigation"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
              onClick={() => setMenuOpen(open => !open)}
              className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 text-slate-800 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-600 lg:hidden"
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
              <ul className="flex flex-col gap-1 lg:flex-row lg:items-center">
                {navigation.map(item => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.end}
                      className={({ isActive }) =>
                        `inline-flex min-h-11 w-full items-center rounded-lg px-3 py-2 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-600 lg:w-auto ${
                          isActive
                            ? 'bg-civic-50 text-civic-800'
                            : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950'
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
                    className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-civic-700 px-4 py-2 text-sm font-black text-white transition hover:bg-civic-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-600 focus-visible:ring-offset-2 lg:w-auto"
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

      <footer className="border-t border-slate-800 bg-civic-950 text-slate-300">
        <div className="page-shell grid gap-10 py-14 lg:grid-cols-[1.5fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3 text-white">
              <BrandMark className="h-11 w-11 text-civic-600" />
              <div>
                <p className="text-lg font-black tracking-tight">
                  BetterBacoor
                </p>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-sky-200">
                  Find the right starting point
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-xl text-sm leading-6 text-slate-400">
              An unofficial, open-source civic guide for Bacoor. Complete
              applications, submissions, and payments only on the linked
              government system.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-xs font-bold text-slate-300">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck
                  aria-hidden="true"
                  className="h-4 w-4 text-emerald-400"
                />
                Source linked
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarCheck2
                  aria-hidden="true"
                  className="h-4 w-4 text-sky-300"
                />
                Date checked
              </span>
              <span className="inline-flex items-center gap-1.5">
                <FileCheck2
                  aria-hidden="true"
                  className="h-4 w-4 text-sky-300"
                />
                Public corrections
              </span>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.12em] text-white">
              Explore
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              {navigation.slice(1).map(item => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className="rounded hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
              <li>
                <NavLink
                  to="/search"
                  className="rounded hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
                >
                  Search all resources
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.12em] text-white">
              Project
            </h2>
            <div className="mt-4 flex flex-col items-start gap-3 text-sm">
              <a
                href="https://github.com/0phl/betterbacoor"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
              >
                <Github aria-hidden="true" className="h-4 w-4" /> Source on
                GitHub
                <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://github.com/0phl/betterbacoor/issues/new?template=correction.yml"
                target="_blank"
                rel="noreferrer"
                className="rounded hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
              >
                Report incorrect or outdated information on GitHub (account
                required)
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="page-shell flex flex-col gap-3 py-5 text-xs leading-5 text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <p>
              Based on the{' '}
              <a
                href="https://github.com/iyanski/betterlocalgov"
                target="_blank"
                rel="noreferrer"
                className="rounded underline underline-offset-2 hover:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
              >
                BetterLocalGov starter
              </a>{' '}
              and inspired by the{' '}
              <a
                href="https://bettergov.ph/"
                target="_blank"
                rel="noreferrer"
                className="rounded underline underline-offset-2 hover:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
              >
                BetterGov.ph community
              </a>
              .
            </p>
            <NavLink
              to="/about"
              className="inline-flex items-center gap-1.5 rounded font-bold text-slate-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
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
