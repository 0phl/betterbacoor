import { t, useLanguage } from './i18n';
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
  useLanguage();
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
                eyebrow={t('Search the guide')}
                title={t('Search all verified Bacoor resources')}
                description={t(
                  'Search every checked BetterBacoor starting point across services, official systems, directories, and public records.'
                )}
                searchLabel={t('Search all verified Bacoor resources')}
              />
            }
          />
          <Route
            path="services"
            element={
              <ResourcesPage
                eyebrow={t('Services and online systems')}
                title={t('Find your next step.')}
                description={t(
                  'Prepare for your next visit with clear guides and personal checklists. Read the requirements here, then use the city’s official system when you’re ready to apply.'
                )}
                categories={['service', 'official-system']}
              />
            }
          />
          <Route
            path="directories"
            element={
              <ResourcesPage
                eyebrow={t('Directories')}
                title={t('Your local connections, closer.')}
                description={t(
                  'Find barangays, hospitals, health centers, and city offices. Search published contacts here, with the city source beside every listing.'
                )}
                categories={['directory']}
              />
            }
          />
          <Route
            path="transparency"
            element={
              <ResourcesPage
                eyebrow={t('Transparency')}
                title={t('Go directly to Bacoor public records')}
                description={t(
                  'See how public money is spent and what the city is planning. Explore procurement, financial disclosures, and published development plans.'
                )}
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
