import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, RotateCcw, Check, Compass } from 'lucide-react';
import { t, useLanguage } from '../i18n';
import {
  finderStorageKey,
  readFinderAnswers,
  resolveFinder,
} from '../data/service-finder';
import { PageMeta } from '../components/PageMeta';
import { GuideContent } from './ServiceGuide';

export function ServiceFinder() {
  useLanguage();
  const [answers, setAnswers] = useState(readFinderAnswers);
  const [storageError, setStorageError] = useState(false);
  const previous = useRef(answers);
  const current = resolveFinder(answers);

  useEffect(() => {
    if (previous.current === answers) return;
    previous.current = answers;
    document
      .getElementById(current.guide ? 'guide-title' : 'finder-title')
      ?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [answers, current.guide]);

  function update(next: string[]) {
    setAnswers(next);
    try {
      if (next.length)
        localStorage.setItem(finderStorageKey, JSON.stringify(next));
      else localStorage.removeItem(finderStorageKey);
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }
  const controls = (
    <div className="finder-controls">
      {answers.length > 0 && (
        <button type="button" onClick={() => update(answers.slice(0, -1))}>
          <ArrowLeft size={16} aria-hidden="true" />
          {t('Change my last answer')}
        </button>
      )}
      {answers.length > 0 && (
        <button type="button" onClick={() => update([])}>
          <RotateCcw size={15} aria-hidden="true" />
          {t('Start over')}
        </button>
      )}
      <Link to="/services">
        {t('Browse all service guides')}
        <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </div>
  );
  const feedback = storageError && (
    <p className="finder-storage" role="status">
      {t(
        'Your browser could not save your choices. You can still use the finder and print your checklist during this visit.'
      )}
    </p>
  );

  if (current.guide && current.variant)
    return (
      <>
        <div className="page-shell finder-result-toolbar">
          <p className="eyebrow">
            <Check size={16} aria-hidden="true" />
            {t('YOUR PREPARATION GUIDE')}
          </p>
          {controls}
          {feedback}
        </div>
        <GuideContent
          key={`${current.guide.slug}:${current.variant.id}`}
          guide={current.guide}
          fixedVariantId={current.variant.id}
        />
      </>
    );

  return (
    <div className="page-shell finder-page">
      <PageMeta
        title={t('Find the right service')}
        description={t(
          'Answer a few simple questions to find the right Bacoor service guide and preparation checklist.'
        )}
      />
      <div className="finder-heading">
        <p className="eyebrow">
          <Compass size={18} aria-hidden="true" />
          {t('LET’S FIND YOUR NEXT STEP')}
        </p>
        <p className="finder-stage">
          {t('Service finder')} · {t('Question')} {answers.length + 1}
        </p>
        <h1 id="finder-title" tabIndex={-1}>
          {t(current.question!.title)}
        </h1>
        <p>{t(current.question!.description)}</p>
      </div>
      {current.trail.length > 0 && (
        <ol className="finder-trail" aria-label={t('Your choices')}>
          {current.trail.map((label, index) => (
            <li key={index}>
              <Check size={14} aria-hidden="true" />
              {t(label)}
            </li>
          ))}
        </ol>
      )}
      <div className="finder-choices">
        {current.question!.options.map(option => (
          <button
            type="button"
            className="finder-choice"
            key={option.id}
            onClick={() => update([...answers, option.id])}
          >
            <span>
              <strong>{t(option.label)}</strong>
              <span>{t(option.detail)}</span>
            </span>
            <ArrowRight size={20} aria-hidden="true" />
          </button>
        ))}
      </div>
      {controls}
      {feedback}
      <p className="finder-privacy">
        {t(
          'No account or personal details needed. Your choices stay in this browser. Start over to clear them; your saved checklist ticks are kept separately.'
        )}
      </p>
      <div className="finder-help">
        <p>
          {t('Need something else?')}{' '}
          <Link to="/directories#office-contacts-title">
            {t('Find the right city office')}
          </Link>
        </p>
        <Link to="/emergency">
          {t('Emergency help & hotlines')}
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
