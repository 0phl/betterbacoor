import {
  ArrowRight,
  ExternalLink,
  Github,
  Facebook,
  Menu,
  Search,
  ShieldCheck,
  Phone,
  X,
} from 'lucide-react';
import { useLayoutEffect, useRef, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { BrandMark } from './BrandMark';

const navigation = [
  { to: '/', label: 'Home', end: true },
  { to: '/services', label: 'Services' },
  { to: '/directories', label: 'Directories' },
  { to: '/emergency', label: 'Emergency' },
  { to: '/transparency', label: 'Transparency' },
  { to: '/about', label: 'About' },
];

function RouteChangeManager() {
  const location = useLocation();
  const previousPath = useRef(location.pathname + location.hash);

  useLayoutEffect(() => {
    const nextPath = location.pathname + location.hash;
    if (previousPath.current === nextPath) return;
    previousPath.current = nextPath;
    document.getElementById('main-content')?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (location.hash)
      document
        .getElementById(location.hash.slice(1))
        ?.scrollIntoView({ behavior: 'instant', block: 'start' });
  }, [location.pathname, location.hash]);

  return null;
}

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useLayoutEffect(() => {
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

      <header className="relative z-40">
        <div className="site-utility-bar">
          <div className="page-shell site-utility-inner">
            <p className="flex items-center gap-2">
              <ShieldCheck
                aria-hidden="true"
                className="h-3.5 w-3.5 shrink-0 text-civic-600"
              />
              <span>
                <strong>Unofficial and community-run.</strong>{' '}
                <span className="hidden xl:inline">
                  Not operated by or endorsed by the City Government of Bacoor.
                </span>
              </span>
            </p>
            <div className="site-utility-links">
              <a
                href="https://bacoor.gov.ph/"
                target="_blank"
                rel="noreferrer"
                className="utility-city-link"
              >
                Official city portal
                <ExternalLink aria-hidden="true" className="h-3 w-3" />
              </a>
              <a
                className="utility-emergency-call"
                href="tel:161"
                aria-label="Call 161 — Bacoor emergency hotline"
              >
                <Phone size={13} aria-hidden="true" />
                <span className="utility-emergency-label">Emergency?</span>
                <strong>Call 161</strong>
              </a>
            </div>
          </div>
        </div>

        <div className="modern-navbar">
          <div className="page-shell flex min-h-[6rem] flex-wrap items-center justify-between gap-x-2 py-2.5 sm:min-h-[6.75rem] xl:gap-x-5">
            <NavLink
              to="/"
              className="navbar-brand inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-600 focus-visible:ring-offset-4"
            >
              <BrandMark className="h-16 w-16 shrink-0 sm:h-20 sm:w-20" />
              <span>
                <span className="block text-lg font-bold tracking-[-0.035em] text-slate-950 sm:text-xl">
                  BetterBacoor.org
                </span>
                <span className="mt-1 block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-slate-500">
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
              className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-600 xl:hidden"
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
              className={`${menuOpen ? 'block' : 'hidden'} w-full border-t border-slate-200 pt-3 xl:block xl:w-auto xl:border-0 xl:pt-0`}
            >
              <ul className="nav-links flex flex-col gap-1 xl:flex-row xl:items-center xl:gap-0.5">
                {navigation.map(item => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.end}
                      className={({ isActive }) =>
                        `inline-flex min-h-10 w-full items-center rounded-full px-3.5 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-600 xl:w-auto ${
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
                <li className="xl:ml-2">
                  <NavLink
                    to="/search"
                    className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-full bg-civic-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-civic-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-600 focus-visible:ring-offset-2 xl:w-auto"
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

      <footer className="site-footer">
        <div className="page-shell grid grid-cols-2 gap-x-6 gap-y-10 py-12 lg:grid-cols-[1.5fr_0.75fr_0.75fr]">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <BrandMark className="footer-logo" />
              <div>
                <p className="footer-brand-name">BetterBacoor</p>
                <p className="text-xs text-slate-500">
                  Built for our community
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-lg text-sm leading-6 text-slate-600">
              A community-built home for clearer information and easier everyday
              life in Bacoor. Learn and prepare here; submit applications and
              payments through the official city systems.
            </p>
            <div className="footer-socials">
              <a
                href="https://github.com/0phl"
                target="_blank"
                rel="noreferrer"
                aria-label="Visit the creator on GitHub"
              >
                <Github size={20} aria-hidden="true" />
                <span>GitHub</span>
                <ExternalLink size={13} aria-hidden="true" />
              </a>
              <a
                href="https://www.facebook.com/people/BetterBacoororg/61594400221717/"
                target="_blank"
                rel="noreferrer"
                aria-label="BetterBacoor on Facebook"
              >
                <Facebook size={20} aria-hidden="true" />
                <span>Facebook</span>
                <ExternalLink size={13} aria-hidden="true" />
              </a>
            </div>
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
              Community
            </h2>
            <div className="mt-4 flex flex-col items-start gap-3 text-sm text-slate-600">
              <a
                href="https://lgu.bettergov.ph/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded hover:text-civic-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-600"
              >
                Explore Better LGUs
                <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://about.bettergov.ph/projects/"
                target="_blank"
                rel="noreferrer"
                className="rounded leading-6 hover:text-civic-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-600"
              >
                BetterGov projects
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
