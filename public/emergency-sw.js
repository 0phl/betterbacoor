/* global self, caches */
const CACHE = 'betterbacoor-emergency-v1';
const PAGE = '/offline/emergency.html';

self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event =>
  event.waitUntil(self.clients.claim())
);

async function saveGuide() {
  const response = await fetch(PAGE, {
    cache: 'no-store',
    signal: AbortSignal.timeout(15000),
  });
  if (
    !response.ok ||
    !response.headers.get('content-type')?.includes('text/html')
  )
    throw new Error('Guide download failed.');
  let html = await response.text();
  const version = html.match(
    /name="bb-emergency-version" content="([a-f0-9]{64})"/
  )?.[1];
  const reviewed = html.match(
    /name="bb-emergency-reviewed" content="(\d{4}-\d{2}-\d{2})"/
  )?.[1];
  if (!version || !reviewed || !html.includes('id="saved-state"'))
    throw new Error('Invalid guide response.');
  const savedAt = new Date().toISOString();
  html = html.replace(
    /(<strong id="saved-state">)[^<]*(<\/strong>)/,
    `$1Saved in this browser · ${savedAt.slice(0, 10)} (UTC)$2`
  );
  const headers = new Headers({
    'Content-Type': 'text/html; charset=utf-8',
    'X-BB-Saved': savedAt,
    'X-BB-Reviewed': reviewed,
    'X-BB-Version': version,
  });
  const cache = await caches.open(CACHE);
  // Replace only after the complete download has passed validation.
  await cache.put(PAGE, new Response(html, { headers }));
  return { savedAt, reviewed, version };
}

self.addEventListener('message', event => {
  if (
    !event.source?.url ||
    new URL(event.source.url).origin !== self.location.origin
  )
    return;
  if (!['SAVE_EMERGENCY', 'REMOVE_EMERGENCY'].includes(event.data?.type))
    return;
  const port = event.ports[0];
  if (!port) return;
  event.waitUntil(
    (async () => {
      try {
        const snapshot =
          event.data.type === 'SAVE_EMERGENCY'
            ? await saveGuide()
            : (await caches.delete(CACHE), null);
        port.postMessage({ ok: true, snapshot });
      } catch {
        port.postMessage({ ok: false });
      }
    })()
  );
});

async function emergencyNavigation(request) {
  const cached = await caches.match(PAGE, { cacheName: CACHE });
  if (new URL(request.url).pathname === PAGE && cached) return cached;
  try {
    const response = await fetch(request, {
      signal: AbortSignal.timeout(4000),
    });
    if (response.status >= 500 && cached) return cached;
    return response;
  } catch {
    if (cached) return cached;
    return new Response(
      'Emergency guide not saved in this browser. Reconnect to BetterBacoor to save a copy. In immediate danger, call 161 or 911 using your phone.',
      { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
    );
  }
}

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (
    event.request.method !== 'GET' ||
    event.request.mode !== 'navigate' ||
    url.origin !== self.location.origin ||
    !['/emergency', '/emergency/', PAGE].includes(url.pathname)
  )
    return;
  event.respondWith(emergencyNavigation(event.request));
});
