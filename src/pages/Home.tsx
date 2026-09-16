import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  FileText,
  HeartPulse,
  Landmark,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { HomeSearch } from '../components/HomeSearch';
import { PageMeta } from '../components/PageMeta';
import { ResourceCard } from '../components/ResourceCard';
import { CommunityTools } from '../components/CommunityTools';
import { GuideCards } from '../components/GuideCards';
import { resources } from '../data/resources';

const quickTasks = [
  {
    label: 'Prepare my business permit',
    detail: 'Requirements, steps & a personal checklist',
    to: '/services/business-permit',
    icon: BriefcaseBusiness,
  },
  {
    label: 'Get a birth or civil record',
    detail: 'Understand the local registry process',
    to: '/services/civil-registry',
    icon: FileText,
  },
  {
    label: 'Get ready for work',
    detail: 'Your working-permit starting point',
    to: '/services/working-permit',
    icon: Users,
  },
  {
    label: 'Find the right city office',
    detail: 'Call or email published office contacts',
    to: '/directories#office-contacts-title',
    icon: Building2,
  },
];
const topics = [
  {
    title: 'Permits & applications',
    description: 'Business, building & working permits',
    to: '/services/business-permit',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Offices & barangays',
    description: 'Find the right people to contact',
    to: '/directories',
    icon: Building2,
  },
  {
    title: 'Health & care',
    description: 'Hospitals and city health contacts',
    to: '/directories?type=hospital',
    icon: HeartPulse,
  },
  {
    title: 'Jobs & opportunities',
    description: 'Job search and employment contacts',
    query: 'employment',
    icon: Users,
  },
  {
    title: 'Budgets & public records',
    description: 'Spending, procurement & city plans',
    to: '/transparency',
    icon: Landmark,
  },
  {
    title: 'Emergency & safety',
    description: 'Hotlines, flood safety & disaster guidance',
    to: '/emergency',
    icon: ShieldCheck,
  },
];

export function Home() {
  const featured = [
    'bacoor-one-stop-shop',
    'bacoor-barangay-directory',
    'bacoor-hospital-directory',
    'bacoor-department-directory',
  ]
    .map(id => resources.find(resource => resource.id === id))
    .filter(resource => resource !== undefined);
  return (
    <>
      <PageMeta
        title="BetterBacoor"
        description="Your community guide to Bacoor. Find government services, local offices, useful resources, and public records in one place."
      />
      <section className="home-hero">
        <div className="page-shell hero-grid">
          <div className="hero-copy">
            <p className="hero-eyebrow">
              BACOOR, CAVITE · BUILT FOR THE COMMUNITY
            </p>
            <h1>
              Bacoor,
              <br />
              made <span>easier.</span>
            </h1>
            <p className="hero-description">
              A little less paperwork. A little more living. Clear guides,
              useful contacts, and everyday help for our community.
            </p>
            <HomeSearch />
          </div>
          <section className="quick-panel" aria-labelledby="quick-title">
            <div className="quick-panel-heading">
              <span className="eyebrow">LET’S GET YOU STARTED</span>
              <h2 id="quick-title">What brings you here?</h2>
            </div>
            {quickTasks.map(({ label, detail, to, icon: Icon }) => (
              <Link className="quick-task" to={to} key={to}>
                <span className="task-icon">
                  <Icon size={21} aria-hidden="true" />
                </span>
                <span>
                  <strong>{label}</strong>
                  <small>{detail}</small>
                </span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            ))}
            <Link to="/services" className="quick-panel-footer">
              Explore all services <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </section>
        </div>
        <div className="hero-baseline">
          <div className="page-shell">
            <span>
              <ShieldCheck size={16} aria-hidden="true" /> Clear guides.
              Official sources.
            </span>
            <span>
              <Users size={16} aria-hidden="true" /> Community-run. Free for
              everyone.
            </span>
            <Link to="/about">
              Get to know BetterBacoor{' '}
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <section
        className="page-shell home-section"
        aria-labelledby="guides-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">LET’S MAKE IT SIMPLE</p>
            <h2 id="guides-title">Know what to do. Before you go.</h2>
            <p>
              Read the steps, prepare your documents, and keep your own
              checklist.
            </p>
          </div>
          <Link className="text-link" to="/services">
            All service guides <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
        <GuideCards />
      </section>
      <section
        className="page-shell home-section"
        aria-labelledby="topics-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">YOUR CITY, WITHIN REACH</p>
            <h2 id="topics-title">A little help for everyday life.</h2>
          </div>
          <Link className="text-link" to="/search">
            Browse all resources <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
        <div className="topic-grid">
          {topics.map(({ title, description, to, query, icon: Icon }) => (
            <Link
              to={to ?? `/search?q=${query}`}
              className="topic-link"
              key={title}
            >
              <span className="topic-icon">
                <Icon size={23} strokeWidth={1.6} aria-hidden="true" />
              </span>
              <span>
                <h3>{title}</h3>
                <p>{description}</p>
              </span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>
      <section className="page-shell" aria-labelledby="charter-title">
        <div className="charter-feature">
          <span className="charter-icon">
            <BookOpen size={30} strokeWidth={1.5} aria-hidden="true" />
          </span>
          <div>
            <p className="eyebrow">BEFORE YOU VISIT CITY HALL</p>
            <h2 id="charter-title">A clearer path through the paperwork.</h2>
            <p>
              Find service requirements, steps, and office information in
              Bacoor’s 2026 Citizen’s Charter.
            </p>
          </div>
          <Link to="/charter" className="button-primary">
            Read the charter here <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <section
        className="page-shell home-section"
        aria-labelledby="resources-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">GOOD PLACES TO START</p>
            <h2 id="resources-title">Useful links, all in one place.</h2>
            <p>Go straight to the office or official service you need.</p>
          </div>
          <Link className="text-link" to="/search">
            View all {resources.length} resources{' '}
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {featured.map(resource => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </section>
      <div className="community-section">
        <div className="page-shell community-wrap">
          <section
            className="community-note"
            aria-labelledby="community-story-title"
          >
            <figure className="community-art">
              <img
                src="/images/community-life.png"
                alt="Illustration of neighbors, a small shop, and a jeepney in a Filipino community"
                width="1536"
                height="1024"
                loading="lazy"
              />
              <figcaption>
                A community illustration, created for BetterBacoor.
              </figcaption>
            </figure>
            <div>
              <p className="eyebrow">BY THE COMMUNITY. FOR THE COMMUNITY.</p>
              <h2 id="community-story-title">
                A better Bacoor starts with all of us.
              </h2>
              <p>
                Local guides, useful tools, and information we can trust. Built
                for our neighbors in Bacoor, alongside a wider community working
                to make public information better for everyone.
              </p>
              <Link className="text-link" to="/about">
                Our story <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </section>
          <div className="community-resources">
            <CommunityTools compact />
          </div>
        </div>
      </div>
    </>
  );
}
