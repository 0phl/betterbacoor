const CACHE = 'betterbacoor-emergency-v1';
export const offlineGuidePath = '/offline/emergency.html';
export interface OfflineSnapshot {
  savedAt: string;
  reviewed: string;
  version: string;
}
export const supportsOffline = () =>
  window.isSecureContext && 'serviceWorker' in navigator && 'caches' in window;

export async function readOfflineSnapshot(): Promise<OfflineSnapshot | null> {
  if (!supportsOffline()) return null;
  const response = await caches.match(offlineGuidePath, { cacheName: CACHE });
  if (!response) return null;
  const savedAt = response.headers.get('X-BB-Saved');
  const reviewed = response.headers.get('X-BB-Reviewed');
  const version = response.headers.get('X-BB-Version');
  return savedAt && reviewed && version ? { savedAt, reviewed, version } : null;
}

export async function changeOfflineGuide(
  type: 'SAVE_EMERGENCY' | 'REMOVE_EMERGENCY'
): Promise<OfflineSnapshot | null> {
  if (!supportsOffline())
    throw new Error('Offline storage is unavailable in this browser.');
  await navigator.serviceWorker.register('/emergency-sw.js', {
    scope: '/',
    updateViaCache: 'none',
  });
  const registration = await new Promise<ServiceWorkerRegistration>(
    (resolve, reject) => {
      const timeout = window.setTimeout(
        () => reject(new Error('Offline setup took too long. Try again.')),
        15000
      );
      navigator.serviceWorker.ready.then(
        result => {
          window.clearTimeout(timeout);
          resolve(result);
        },
        error => {
          window.clearTimeout(timeout);
          reject(error);
        }
      );
    }
  );
  if (!registration.active)
    throw new Error('Offline guide is not ready. Try again.');
  return new Promise((resolve, reject) => {
    const channel = new MessageChannel();
    const close = () => {
      window.clearTimeout(timeout);
      channel.port1.close();
    };
    const timeout = window.setTimeout(() => {
      close();
      reject(new Error('Could not finish saving. Reconnect and try again.'));
    }, 20000);
    channel.port1.onmessage = event => {
      close();
      if (event.data.ok) resolve(event.data.snapshot);
      else
        reject(
          new Error(
            type === 'SAVE_EMERGENCY'
              ? 'Could not save the guide. Check your connection and browser storage, then try again. An existing saved copy is kept.'
              : 'Could not remove the saved guide. Try again.'
          )
        );
    };
    registration.active!.postMessage({ type }, [channel.port2]);
  });
}
