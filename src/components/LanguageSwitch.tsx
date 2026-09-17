import { setLanguage, useLanguage } from '../i18n';
import { Languages } from 'lucide-react';

export function LanguageSwitch() {
  const language = useLanguage();
  return (
    <div className="language-switch" role="group" aria-label="Language / Wika">
      <span className="language-switch-label">
        <Languages size={15} aria-hidden="true" />
        <span>{language === 'fil' ? 'Wika' : 'Language'}</span>
      </span>
      <div className="language-switch-options">
        <button
          type="button"
          lang="en"
          aria-pressed={language === 'en'}
          onClick={() => setLanguage('en')}
        >
          English
        </button>
        <button
          type="button"
          lang="fil"
          aria-pressed={language === 'fil'}
          onClick={() => setLanguage('fil')}
        >
          Filipino
        </button>
      </div>
    </div>
  );
}
