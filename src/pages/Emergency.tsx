import { useState } from 'react';
import {
  ArrowUpRight,
  Download,
  Phone,
  Printer,
  ShieldCheck,
  Waves,
  Flame,
  House,
  CloudRain,
  HeartPulse,
  Siren,
  Radio,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageMeta } from '../components/PageMeta';
import { OfflineEmergency } from '../components/OfflineEmergency';
import {
  emergency,
  emergencyCardText,
  emergencyNeedsReview,
  emergencySource,
  type EmergencyContact,
} from '../data/emergency';

const icons = [Waves, Flame, House, CloudRain, Waves, HeartPulse, ShieldCheck];

function SourceLinks({ ids }: { ids: string[] }) {
  return (
    <div className="emergency-sources">
      Sources:{' '}
      {ids.map(id => {
        const source = emergencySource(id);
        return (
          <a key={id} href={source.url} target="_blank" rel="noreferrer">
            {source.name}
            <ArrowUpRight size={12} aria-hidden="true" />
          </a>
        );
      })}
    </div>
  );
}

function Contact({
  contact,
  primary = false,
}: {
  contact: EmergencyContact;
  primary?: boolean;
}) {
  const Heading = primary ? 'h2' : 'h3';
  return (
    <article
      className={`emergency-contact${primary ? ' emergency-contact-primary' : ''}`}
    >
      <Heading>{contact.name}</Heading>
      <p>{contact.description}</p>
      <a
        className="emergency-call"
        href={`tel:${contact.dial}`}
        aria-label={`Call ${contact.name}: ${contact.number}`}
      >
        <Phone size={primary ? 24 : 19} aria-hidden="true" />
        <strong>{contact.number}</strong>
        <span>Call</span>
      </a>
      <SourceLinks ids={contact.sources} />
    </article>
  );
}

export function Emergency() {
  const [selected, setSelected] = useState('flood');
  const situation = emergency.situations.find(item => item.id === selected)!;
  return (
    <>
      <PageMeta
        title="Emergency help in Bacoor"
        description="Find Bacoor emergency hotlines, flood and fire safety guidance, and a contact card to keep offline."
      />
      <section className="emergency-intro">
        <div className="page-shell">
          <p className="eyebrow">EMERGENCY & DISASTER HELP</p>
          <h1>Help when it matters.</h1>
          <p className="emergency-lead">
            In immediate danger? Call for help now.
          </p>
          <p className="emergency-intro-note">
            Use Bacoor’s priority hotline or the national emergency number.
          </p>
          <div className="emergency-primary-grid">
            {emergency.contacts.slice(0, 2).map(contact => (
              <Contact key={contact.id} contact={contact} primary />
            ))}
          </div>
          <p className="emergency-connection">
            BetterBacoor cannot dispatch responders. If a local number does not
            connect, try 911. Call buttons open your device’s phone app; a
            connected phone service is needed.
          </p>
        </div>
      </section>
      <div className="page-shell emergency-content">
        <OfflineEmergency />
        {emergencyNeedsReview() && (
          <p className="emergency-review" role="status">
            These published contacts are due for another source review. Consult
            the linked sources for changes. If a local number does not connect,
            try 911.
          </p>
        )}
        <section
          aria-labelledby="situation-title"
          className="emergency-situations"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">KNOW YOUR NEXT STEP</p>
              <h2 id="situation-title">What kind of help do you need?</h2>
              <p>
                Choose a situation for practical guidance and relevant contacts.
              </p>
            </div>
          </div>
          <label className="mobile-situation-select">
            Choose a situation
            <select
              value={selected}
              onChange={event => setSelected(event.target.value)}
              aria-controls="situation-guidance"
            >
              {emergency.situations.map(item => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
          <div
            className="situation-picker"
            role="group"
            aria-label="Emergency situation"
          >
            {emergency.situations.map((item, index) => {
              const Icon = icons[index];
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={selected === item.id}
                  aria-controls="situation-guidance"
                  onClick={() => setSelected(item.id)}
                >
                  <Icon size={18} aria-hidden="true" />
                  {item.label}
                </button>
              );
            })}
          </div>
          <section
            id="situation-guidance"
            className="situation-guidance"
            aria-labelledby="situation-heading"
          >
            <div>
              <h3 id="situation-heading">{situation.title}</h3>
              <ol>
                {situation.steps.map((step, index) => (
                  <li key={step.title}>
                    <span aria-hidden="true">0{index + 1}</span>
                    <div>
                      <h4>{step.title}</h4>
                      <p>{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <SourceLinks ids={situation.sources} />
            </div>
            <aside aria-label="Contacts for this situation">
              <p className="eyebrow">HELP FOR THIS SITUATION</p>
              {situation.contacts.map(id => {
                const contact = emergency.contacts.find(
                  item => item.id === id
                )!;
                return (
                  <a
                    key={id}
                    href={`tel:${contact.dial}`}
                    className="situation-contact"
                  >
                    <span>{contact.name}</span>
                    <strong>
                      <Phone size={17} aria-hidden="true" />
                      {contact.number}
                    </strong>
                  </a>
                );
              })}
              <p>
                For immediate danger, you can also call{' '}
                <a href="tel:161">161</a> or <a href="tel:911">911</a>. Follow
                the responding service’s instructions.
              </p>
            </aside>
          </section>
        </section>
        <section className="hotlines-section" aria-labelledby="hotlines-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">KEEP THESE WITHIN REACH</p>
              <h2 id="hotlines-title">Local response & additional help</h2>
              <p>Published contact numbers. Tap a number to call.</p>
            </div>
            <div className="emergency-actions">
              <a
                href={`data:text/plain;charset=utf-8,${encodeURIComponent(emergencyCardText())}`}
                download="betterbacoor-emergency-contacts.txt"
              >
                <Download size={17} aria-hidden="true" />
                Save contact card
              </a>
              <button type="button" onClick={() => window.print()}>
                <Printer size={17} aria-hidden="true" />
                Print this page
              </button>
            </div>
          </div>
          <div className="hotline-grid">
            {emergency.contacts.slice(2).map(contact => (
              <Contact key={contact.id} contact={contact} />
            ))}
          </div>
          <p className="emergency-note">
            Red Cross is a humanitarian organization. Contact numbers come from
            the publishers linked above; response availability cannot be
            confirmed by this website. The saved card includes its information
            snapshot and source links.
          </p>
        </section>
        <section
          className="emergency-preparation"
          aria-labelledby="prepare-title"
        >
          <div>
            <Radio size={28} aria-hidden="true" />
            <h2 id="prepare-title">A little preparation helps.</h2>
            <p>
              Plan where your family will meet and how to evacuate. Keep
              drinking water, food, a first-aid kit, a flashlight, spare
              batteries, and a battery-powered radio ready.
            </p>
            <SourceLinks ids={['flood']} />
            <Link to="/directories#office-contacts-title">
              Find local offices <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="official-update-links">
            <h3>Check official updates</h3>
            <p>Open the issuing agency’s website for current information.</p>
            <a
              href="https://www.pagasa.dost.gov.ph/"
              target="_blank"
              rel="noreferrer"
            >
              <CloudRain size={21} aria-hidden="true" />
              <span>
                <strong>PAGASA</strong>
                <small>Weather bulletins & rainfall advisories</small>
              </span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <a
              href="https://bacoor.gov.ph/category/announcement/"
              target="_blank"
              rel="noreferrer"
            >
              <Siren size={21} aria-hidden="true" />
              <span>
                <strong>Bacoor announcements</strong>
                <small>Local government advisories</small>
              </span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <a
              href="https://hazardhunter.georisk.gov.ph/"
              target="_blank"
              rel="noreferrer"
            >
              <Waves size={21} aria-hidden="true" />
              <span>
                <strong>HazardHunterPH</strong>
                <small>Hazard planning · not live flood conditions</small>
              </span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
