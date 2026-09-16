import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { About } from './pages/About';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { ResourcesPage } from './pages/ResourcesPage';
import { ServiceGuide } from './pages/ServiceGuide';
import { CharterReader } from './pages/CharterReader';
import { Emergency } from './pages/Emergency';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services/:slug" element={<ServiceGuide />} />
          <Route path="charter" element={<CharterReader />} />
          <Route path="emergency" element={<Emergency />} />
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
                title="Find your next step."
                description="Prepare for your next visit with clear guides and personal checklists. Read the requirements here, then use the city’s official system when you’re ready to apply."
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
                description="Find barangay halls, hospitals, city departments, and national government offices. Each directory links directly to the City of Bacoor’s published information."
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
                description="See how public money is spent and what the city is planning. Explore procurement, financial disclosures, and published development plans."
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
