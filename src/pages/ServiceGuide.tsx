import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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

function Checklist({
  guide,
  variant,
}: {
  guide: Guide;
  variant: GuideVariant;
}) {
  const key = `betterbacoor:checklist:${guide.slug}:${variant.id}:${guide.verified}`;
  const [checked, setChecked] = useState<number[]>(() => {
    try {
      const stored: unknown = JSON.parse(localStorage.getItem(key) ?? '[]');
      return Array.isArray(stored)
        ? [
            ...new Set(
              stored.filter(
                (n): n is number =>
                  Number.isInteger(n) &&
                  n >= 0 &&
                  n < variant.requirements.length
              )
            ),
          ]
        : [];
    } catch {
      return [];
    }
  });
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
          <p className="eyebrow">YOUR PREPARATION SPACE</p>
          <h2 id="checklist-title">My checklist</h2>
        </div>
        <span className="checklist-count" aria-live="polite">
          {checked.length} of {variant.requirements.length} ready
        </span>
      </div>
      <p className="checklist-help">
        Tick what you’ve prepared. Only your ticks are saved in this browser. No
        documents or personal details are collected.
      </p>
      <progress
        aria-label="Checklist progress"
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
            <span>{item}</span>
          </label>
        ))}
      </div>
      <p className="guide-callout">{variant.note}</p>
      {checked.length === variant.requirements.length && (
        <p className="checklist-complete">
          <Check size={18} aria-hidden="true" /> Your preparation list is
          complete. The city will still review your application.
        </p>
      )}
      {storageError && (
        <p role="status">
          Your browser could not save these ticks. You can still use and print
          this checklist during this visit.
        </p>
      )}
      <div className="checklist-actions">
        <button type="button" onClick={() => window.print()}>
          <Printer size={16} aria-hidden="true" /> Print guide & checklist
        </button>
        <button
          type="button"
          onClick={() => update([])}
          disabled={!checked.length}
        >
          <RotateCcw size={15} aria-hidden="true" /> Reset checklist
        </button>
      </div>
    </section>
  );
}

function GuideContent({ guide }: { guide: Guide }) {
  const [variantId, setVariantId] = useState(guide.variants[0].id);
  const variant =
    guide.variants.find(item => item.id === variantId) ?? guide.variants[0];
  const overdue =
    Date.now() - new Date(`${guide.verified}T00:00:00Z`).getTime() >
    90 * 86400000;
  return (
    <>
      <PageMeta title={guide.title} description={guide.summary} />
      <div className="guide-intro">
        <div className="page-shell">
          <Link className="back-link" to="/services">
            <ArrowLeft size={16} aria-hidden="true" /> All service guides
          </Link>
          <p className="eyebrow">{guide.category}</p>
          <h1>{guide.title}</h1>
          <p>{guide.summary}</p>
          <span className="guide-source-badge">
            <BookOpen size={15} aria-hidden="true" /> A BetterBacoor guide based
            on official city information
          </span>
        </div>
      </div>
      <div className="page-shell guide-layout">
        <div className="guide-main">
          {overdue && (
            <p className="guide-callout">
              This guide is due for a source review. Confirm current
              requirements with the office before using this checklist.
            </p>
          )}
          {guide.variants.length > 1 && (
            <fieldset className="guide-options">
              <legend>What are you applying for?</legend>
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
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}
          <Checklist key={variant.id} guide={guide} variant={variant} />
          <section className="guide-steps" aria-labelledby="steps-title">
            <p className="eyebrow">HOW IT WORKS</p>
            <h2 id="steps-title">Your next steps</h2>
            <ol>
              {variant.steps.map((step, i) => (
                <li key={step.title}>
                  <span className="step-number">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>
        <aside className="guide-sidebar" aria-label="Service details">
          <section>
            <h2>Good to know</h2>
            <dl>
              <dt>Responsible office</dt>
              <dd>{guide.office}</dd>
              <dt>Fees</dt>
              <dd>{guide.fee}</dd>
              <dt>Processing</dt>
              <dd>{guide.timing}</dd>
            </dl>
            <a className="contact-link" href={`mailto:${guide.email}`}>
              <Mail size={16} aria-hidden="true" /> {guide.email}
            </a>
          </section>
          <section className="guide-source">
            <h2>Go to the source</h2>
            <p>{guide.sourceLabel}</p>
            {variant.sourcePage && (
              <Link
                className="text-link"
                to={`/charter?page=${variant.sourcePage}`}
              >
                Read these pages here{' '}
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            )}
            <a
              href={`${guide.sourceUrl}${variant.sourcePage ? `#page=${variant.sourcePage}` : ''}`}
              target="_blank"
              rel="noreferrer"
            >
              Original government source{' '}
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </section>
          {guide.actionUrl && (
            <section className="guide-continue">
              <h2>Ready to apply?</h2>
              <p>
                Preparation happens here. Your official application, account,
                and payment stay with the city.
              </p>
              <a href={guide.actionUrl} target="_blank" rel="noreferrer">
                {guide.actionLabel}
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
  const { slug } = useParams();
  const guide = guides.find(item => item.slug === slug);
  return guide ? <GuideContent key={guide.slug} guide={guide} /> : <NotFound />;
}
