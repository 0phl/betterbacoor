import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { About } from './pages/About';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { ResourcesPage } from './pages/ResourcesPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="search"
            element={
              <ResourcesPage
                eyebrow="Search the guide"
                title="Search all verified Bacoor resources"
                description="Search every checked BetterBacoor starting point across services, official systems, directories, and public records."
                searchLabel="Search all verified Bacoor resources"
              />
            }
          />
          <Route
            path="services"
            element={
              <ResourcesPage
                eyebrow="Services and online systems"
                title="Start with a verified government source"
                description="BetterBacoor currently points to the City of Bacoor’s published charter and transaction systems. Plain-language service guides will be added only after page-level verification."
                categories={['service', 'official-system']}
              />
            }
          />
          <Route
            path="directories"
            element={
              <ResourcesPage
                eyebrow="Directories"
                title="Find the office or local directory you need"
                description="These links go to directories published by the City of Bacoor. Contact details can change, so each record carries a visible verification date and correction route."
                categories={['directory']}
              />
            }
          />
          <Route
            path="transparency"
            element={
              <ResourcesPage
                eyebrow="Transparency"
                title="Go directly to Bacoor public records"
                description="Browse the City of Bacoor’s procurement and disclosure pages without presenting copied documents as the current source of truth."
                categories={['transparency']}
              />
            }
          />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
