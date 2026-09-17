import { t, useLanguage } from '../i18n';
import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import contactData from '../../content/office-contacts.json';
import { getReviewStatus, resources } from '../data/resources';

export function OfficeContacts() {
  useLanguage();
  const source = resources.find(
    resource => resource.id === contactData.source_resource_id
  );
  if (!source) return null;
  return (
    <section className="mt-14" aria-labelledby="office-contacts-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{t('TALK TO THE RIGHT OFFICE')}</p>
          <h2 id="office-contacts-title">
            {t('A helpful contact can make all the difference.')}
          </h2>
          <p>
            {t(
              'Published city office contacts for service enquiries. For calls, dial the main number and ask for the listed extension.'
            )}
          </p>
        </div>
        <a
          className="text-link"
          href={source.source_url}
          target="_blank"
          rel="noreferrer"
        >
          {t('City directory source ')}
          <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      </div>
      {getReviewStatus(source).overdue && (
        <p className="resource-notice mb-4">
          {t(
            'Contact details may have changed. Check the city directory before calling.'
          )}
        </p>
      )}
      <div className="office-contacts">
        {contactData.offices.map(office => (
          <article key={office.email} className="office-contact">
            <div>
              <h3>{t(office.name)}</h3>
              <p>{t(office.description)}</p>
            </div>
            <div className="office-contact-links">
              {office.phone && (
                <a href={`tel:${office.phone}`}>
                  <Phone size={15} aria-hidden="true" />
                  <span>
                    (046) 481-4100{' '}
                    <small>
                      {t('local ')}
                      {office.extension}
                    </small>
                  </span>
                </a>
              )}
              <a href={`mailto:${office.email}`}>
                <Mail size={15} aria-hidden="true" />
                <span>{office.email}</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
