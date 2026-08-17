import { ExternalLink, Github, MapPin } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

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
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <a
        href="#main-content"
        className="sr-only z-[100] rounded-md bg-white px-4 py-3 font-semibold text-blue-800 shadow focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <div className="border-b border-blue-200 bg-blue-50">
        <div className="page-shell py-2 text-sm leading-6 text-blue-950">
          <strong>Unofficial and community-run.</strong> BetterBacoor is not
          operated by or endorsed by the City Government of Bacoor. Transactions
          remain on their linked government systems.
        </div>
      </div>

      <header className="z-40 border-b border-slate-200 bg-white/95 backdrop-blur lg:sticky lg:top-0">
        <div className="page-shell flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
          <NavLink
            to="/"
            className="inline-flex w-fit items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-700 text-lg font-black text-white">
              B
            </span>
            <span>
              <span className="block text-lg font-bold tracking-tight">
                BetterBacoor
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-600">
                <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
                Community civic information
              </span>
            </span>
          </NavLink>

          <nav aria-label="Primary navigation">
            <ul className="flex flex-wrap gap-1">
              {navigation.map(item => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      `inline-flex min-h-11 items-center rounded-lg px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                        isActive
                          ? 'bg-blue-50 text-blue-800'
                          : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <RouteChangeManager />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>

      <footer className="mt-20 border-t border-slate-200 bg-slate-950 text-slate-200">
        <div className="page-shell grid gap-10 py-12 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-lg font-bold text-white">BetterBacoor</p>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
              A personal, open-source civic-information project maintained by
              residents. Always complete applications and payments on the linked
              government system.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 text-sm">
            <a
              href="https://github.com/0phl/betterbacoor"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded text-slate-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              <Github aria-hidden="true" className="h-4 w-4" /> Source on GitHub
              <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://github.com/0phl/betterbacoor/issues/new?template=correction.yml"
              target="_blank"
              rel="noreferrer"
              className="rounded text-slate-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              Report incorrect or outdated information
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
