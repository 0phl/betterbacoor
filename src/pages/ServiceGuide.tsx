import { t, useLanguage } from '../i18n';
import { useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Check,
  Mail,
  Printer,
  RotateCcw,
} from 'lucide-react';
import {
  guides,
  type GuideVariant,
  type ServiceGuide as Guide,
} from '../data/guides';
import { PageMeta } from '../components/PageMeta';
import { NotFound } from './NotFound';
import { checklistKey, readChecklist } from '../data/checklists';

function Checklist({
  guide,
  variant,
}: {
  guide: Guide;
  variant: GuideVariant;
}) {
  useLanguage();
  const key = checklistKey(guide, variant);
  const [checked, setChecked] = useState<number[]>(
    () => readChecklist(guide, variant).checked
  );
  const [storageError, setStorageError] = useState(false);
  function update(next: number[]) {
    setChecked(next);
    try {
      if (next.length) localStorage.setItem(key, JSON.stringify(next));
      else localStorage.removeItem(key);
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }
  return (
    <section className="guide-checklist" aria-labelledby="checklist-title">
      <div className="checklist-heading">
        <div>
          <p className="eyebrow">{t('YOUR PREPARATION SPACE')}</p>
          <h2 id="checklist-title">{t('My checklist')}</h2>
        </div>
        <span className="checklist-count" aria-live="polite">
          {checked.length}
          {t(' of ')}
          {variant.requirements.length}
          {t(' ready')}
        </span>
      </div>
      <p className="checklist-help">
        {t(
          'Tick what you’ve prepared. Only your ticks are saved in this browser. No documents or personal details are collected.'
        )}
      </p>
      <progress
        aria-label={t('Checklist progress')}
        max={variant.requirements.length}
        value={checked.length}
      />
      <div className="checklist-items">
        {variant.requirements.map((item, index) => (
          <label
            key={item}
            className={checked.includes(index) ? 'is-checked' : ''}
          >
            <input
              type="checkbox"
              checked={checked.includes(index)}
              onChange={() =>
                update(
                  checked.includes(index)
                    ? checked.filter(n => n !== index)
                    : [...checked, index]
                )
              }
            />
            <span>{t(item)}</span>
          </label>
        ))}
      </div>
      <p className="guide-callout">{t(variant.note)}</p>
      {checked.length === variant.requirements.length && (
        <p className="checklist-complete">
          <Check size={18} aria-hidden="true" />
          {t(
            ' Your preparation list is complete. The city will still review your application.'
          )}
        </p>
      )}
      {storageError && (
        <p role="status">
          {t(
            'Your browser could not save these ticks. You can still use and print this checklist during this visit.'
          )}
        </p>
      )}
      <div className="checklist-actions">
        <button type="button" onClick={() => window.print()}>
          <Printer size={16} aria-hidden="true" />
          {t(' Print guide & checklist')}
        </button>
        <button
          type="button"
          onClick={() => update([])}
          disabled={!checked.length}
        >
          <RotateCcw size={15} aria-hidden="true" />
          {t(' Reset checklist')}
        </button>
      </div>
    </section>
  );
}

export function GuideContent({
  guide,
  fixedVariantId,
  initialVariantId,
}: {
  guide: Guide;
  fixedVariantId?: string;
  initialVariantId?: string;
}) {
  useLanguage();
  const [variantId, setVariantId] = useState(
    initialVariantId ?? guide.variants[0].id
  );
  const variant =
    guide.variants.find(item => item.id === (fixedVariantId ?? variantId)) ??
    guide.variants[0];
  const overdue =
    Date.now() - new Date(`${guide.verified}T00:00:00Z`).getTime() >
    90 * 86400000;
  return (
    <>
      <PageMeta title={guide.title} description={guide.summary} />
      <div className="guide-intro">
        <div className="page-shell">
          {!fixedVariantId && (
            <Link className="back-link" to="/services">
              <ArrowLeft size={16} aria-hidden="true" />
              {t(' All service guides')}
            </Link>
          )}
          <p className="eyebrow">{t(guide.category)}</p>
          <h1 id="guide-title" tabIndex={-1}>
            {t(guide.title)}
          </h1>
          <p>{t(guide.summary)}</p>
          <span className="guide-source-badge">
            <BookOpen size={15} aria-hidden="true" />
            {t(' A BetterBacoor guide based on official city information')}
          </span>
          {(fixedVariantId || guide.variants.length > 1) && (
            <p className="finder-selection">
              {t('Your selection:')} <strong>{t(variant.label)}</strong>
            </p>
          )}
          {guide.eligibility && (
            <p className="guide-eligibility">{t(guide.eligibility)}</p>
          )}
        </div>
      </div>
      <div className="page-shell guide-layout">
        <div className="guide-main">
          {overdue && (
            <p className="guide-callout">
              {t(
                'This guide is due for a source review. Confirm current requirements with the office before using this checklist.'
              )}
            </p>
          )}
          {!fixedVariantId && guide.variants.length > 1 && (
            <fieldset className="guide-options">
              <legend>{t('What are you applying for?')}</legend>
              <div>
                {guide.variants.map(item => (
                  <label key={item.id}>
                    <input
                      type="radio"
                      name="application-type"
                      value={item.id}
                      checked={variant.id === item.id}
                      onChange={() => setVariantId(item.id)}
                    />
                    <span>{t(item.label)}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}
          <Checklist key={variant.id} guide={guide} variant={variant} />
          <section className="guide-steps" aria-labelledby="steps-title">
            <p className="eyebrow">{t('HOW IT WORKS')}</p>
            <h2 id="steps-title">{t('Your next steps')}</h2>
            <ol>
              {variant.steps.map((step, i) => (
                <li key={step.title}>
                  <span className="step-number">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3>{t(step.title)}</h3>
                    <p>{t(step.detail)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>
        <aside className="guide-sidebar" aria-label={t('Service details')}>
          <section>
            <h2>{t('Good to know')}</h2>
            <dl>
              <dt>{t('Responsible office')}</dt>
              <dd lang="en">{guide.office}</dd>
              <dt>{t('Fees')}</dt>
              <dd>{t(guide.fee)}</dd>
              <dt>{t('Processing')}</dt>
              <dd>{t(guide.timing)}</dd>
            </dl>
            <div className="guide-links guide-contact-links">
              <a className="contact-link" href={`mailto:${guide.email}`}>
                <Mail size={16} aria-hidden="true" /> <span>{guide.email}</span>
              </a>
              {guide.contactSourceUrl && (
                <a
                  className="text-link"
                  href={guide.contactSourceUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t('Office contact source')}{' '}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              )}
            </div>
          </section>
          <section className="guide-source">
            <h2>{t('Go to the source')}</h2>
            <p lang="en">{guide.sourceLabel}</p>
            <div className="guide-links">
              {variant.sourcePage && (
                <Link
                  className="text-link"
                  to={`/charter?page=${variant.sourcePage}`}
                >
                  {t('Read these pages here')}{' '}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              )}
              <a
                href={`${guide.sourceUrl}${variant.sourcePage ? `#page=${variant.sourcePage}` : ''}`}
                target="_blank"
                rel="noreferrer"
              >
                {t('Original government source')}{' '}
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          </section>
          {guide.actionUrl && (
            <section className="guide-continue">
              <h2>{t('Ready to apply?')}</h2>
              <p>
                {t(
                  'Preparation happens here. Your official application, account, and payment stay with the city.'
                )}
              </p>
              <a href={guide.actionUrl} target="_blank" rel="noreferrer">
                {t(guide.actionLabel)}
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </section>
          )}
        </aside>
      </div>
    </>
  );
}

export function ServiceGuide() {
  useLanguage();
  const { slug } = useParams();
  const [params] = useSearchParams();
  const guide = guides.find(item => item.slug === slug);
  const variant = guide?.variants.find(
    item => item.id === params.get('variant')
  );
  return guide ? (
    <GuideContent
      key={`${guide.slug}:${variant?.id ?? ''}`}
      guide={guide}
      initialVariantId={variant?.id}
    />
  ) : (
    <NotFound />
  );
}
