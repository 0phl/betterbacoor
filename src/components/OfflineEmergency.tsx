import { t, useLanguage, phrase } from '../i18n';
import { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  Download,
  RefreshCw,
  Trash2,
  WifiOff,
} from 'lucide-react';
import {
  changeOfflineGuide,
  offlineGuidePath,
  readOfflineSnapshot,
  supportsOffline,
  type OfflineSnapshot,
} from '../data/offline';

export function OfflineEmergency() {
  const language = useLanguage();
  const [snapshot, setSnapshot] = useState<OfflineSnapshot | null>(null);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  useEffect(() => {
    let mounted = true;
    readOfflineSnapshot()
      .then(value => {
        if (mounted) setSnapshot(value);
      })
      .catch(() => {
        if (mounted)
          setError(
            'Browser storage is unavailable. You can still download the contact card below.'
          );
      })
      .finally(() => {
        if (mounted) setBusy(false);
      });
    return () => {
      mounted = false;
    };
  }, []);
  async function change(type: 'SAVE_EMERGENCY' | 'REMOVE_EMERGENCY') {
    setBusy(true);
    setError('');
    setMessage('');
    try {
      setSnapshot(await changeOfflineGuide(type));
      setMessage(
        type === 'SAVE_EMERGENCY'
          ? 'Emergency essentials saved. Open the saved guide and bookmark it for quick access.'
          : 'The saved guide has been removed from this browser.'
      );
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Please try again.');
    } finally {
      setBusy(false);
    }
  }
  const overdue =
    snapshot &&
    Date.now() - new Date(`${snapshot.reviewed}T00:00:00Z`).getTime() >
      30 * 86400000;
  return (
    <section className="offline-emergency" aria-labelledby="offline-title">
      <div className="offline-emergency-heading">
        <span className="offline-icon">
          <WifiOff size={23} aria-hidden="true" />
        </span>
        <div>
          <p className="eyebrow">{t('READY BEFORE YOU NEED IT')}</p>
          <h2 id="offline-title">{t('Keep help available offline.')}</h2>
        </div>
      </div>
      <p>
        {t(
          'Save all seven hotlines and safety guidance for this browser. Open the saved guide even when you lose internet access. Calls still need phone service.'
        )}
      </p>
      {snapshot && (
        <p className="offline-snapshot">
          {t('Saved')}{' '}
          {new Date(snapshot.savedAt).toLocaleDateString(
            language === 'fil' ? 'fil-PH' : 'en-PH',
            {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            }
          )}{' '}
          {t('· Information snapshot: ')}
          {snapshot.reviewed}
          {overdue
            ? t(' · Due for a source review. Reconnect and check for updates.')
            : t('')}
        </p>
      )}
      {snapshot && (
        <p className="offline-snapshot">
          {phrase('Saved language:', 'Wika ng naka-save na gabay:')}{' '}
          {(snapshot.language ?? 'en') === 'fil' ? 'Filipino' : 'English'}.{' '}
          {(snapshot.language ?? 'en') !== language &&
            phrase(
              'Refresh to save this guide in English.',
              'I-update para i-save ang gabay sa Filipino.'
            )}
        </p>
      )}
      {supportsOffline() ? (
        <div className="offline-actions">
          <button
            className="button-primary"
            disabled={busy}
            type="button"
            onClick={() => change('SAVE_EMERGENCY')}
          >
            {snapshot ? (
              <RefreshCw size={17} aria-hidden="true" />
            ) : (
              <Download size={17} aria-hidden="true" />
            )}
            {t(
              busy
                ? 'Please wait…'
                : snapshot
                  ? 'Refresh saved guide'
                  : 'Save emergency essentials'
            )}
          </button>
          {snapshot && (
            <>
              <a href={offlineGuidePath} className="text-link">
                {t('Open saved guide ')}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <button
                className="offline-remove"
                disabled={busy}
                type="button"
                onClick={() => change('REMOVE_EMERGENCY')}
              >
                <Trash2 size={16} aria-hidden="true" />
                {t(' Remove')}
              </button>
            </>
          )}
        </div>
      ) : (
        <p className="offline-snapshot">
          {t(
            'Offline saving is unavailable in this browser. Use “Save contact card” below for a downloadable backup.'
          )}
        </p>
      )}
      <p className="offline-feedback" aria-live="polite">
        {t(error || message)}
      </p>
      <p className="offline-fine-print">
        {t(
          'Saved only on this device. Clearing browser storage can remove it. This is a reference guide, not live weather, road, or evacuation-center information.'
        )}
      </p>
    </section>
  );
}
