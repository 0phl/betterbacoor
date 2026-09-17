// @vitest-environment node
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { describe, expect, it, vi } from 'vitest';
import { renderOfflineEmergency } from './offline-page.mjs';

const data = JSON.parse(
  readFileSync(new URL('../content/emergency.json', import.meta.url), 'utf8')
);
const html = renderOfflineEmergency(data, 'PHN2Zy8+');
const code = readFileSync(
  new URL('../public/emergency-sw.js', import.meta.url),
  'utf8'
);
const PAGE = '/offline/emergency.html';

function worker() {
  const listeners = {};
  const saved = new Map();
  const network = vi.fn(
    async () => new Response(html, { headers: { 'Content-Type': 'text/html' } })
  );
  const cache = { put: async (key, value) => saved.set(key, value.clone()) };
  runInNewContext(code, {
    self: {
      addEventListener: (type, handler) => {
        listeners[type] = handler;
      },
      location: { origin: 'https://example.test' },
      skipWaiting: async () => {},
      clients: { claim: async () => {} },
    },
    caches: {
      open: async () => cache,
      match: async key => saved.get(key)?.clone(),
      delete: async () => {
        saved.clear();
        return true;
      },
    },
    fetch: network,
    URL,
    Response,
    Headers,
    AbortSignal,
  });
  async function message(type, language = 'en') {
    let result;
    let pending;
    listeners.message({
      source: { url: 'https://example.test/emergency' },
      data: { type, language },
      ports: [
        {
          postMessage: value => {
            result = value;
          },
        },
      ],
      waitUntil: promise => {
        pending = promise;
      },
    });
    await pending;
    return result;
  }
  function navigate(path, mode = 'navigate') {
    let response;
    listeners.fetch({
      request: { url: `https://example.test${path}`, method: 'GET', mode },
      respondWith: promise => {
        response = promise;
      },
    });
    return response;
  }
  return { network, saved, message, navigate };
}

describe('Emergency offline lifecycle', () => {
  it('saves Filipino content, preserved sources and phone numbers, and the selected-language label', async () => {
    const localized = renderOfflineEmergency(data, 'PHN2Zy8+', 'fil');
    expect(localized).toContain('<html lang="fil">');
    expect(localized).toContain('Gabay sa emergency.');
    expect(localized).toContain('Lumabas at manatili sa labas.');
    for (const contact of data.contacts)
      expect(localized).toContain(`tel:${contact.dial}`);
    for (const source of data.sources)
      expect(localized).toContain(source.url.replace(/&/g, '&amp;'));
    const test = worker();
    test.network.mockResolvedValueOnce(
      new Response(localized, { headers: { 'Content-Type': 'text/html' } })
    );
    const result = await test.message('SAVE_EMERGENCY', 'fil');
    expect(result.snapshot.language).toBe('fil');
    expect(test.network.mock.calls[0][0]).toBe('/offline/emergency-fil.html');
    test.network.mockRejectedValue(new Error('Offline'));
    const response = await test.navigate('/emergency');
    expect(response.headers.get('X-BB-Language')).toBe('fil');
    expect(await response.text()).toContain('Na-save sa browser na ito');
  });
  it('builds a self-contained guide from the same verified contacts and every situation', () => {
    for (const contact of data.contacts)
      expect(html).toContain(`href="tel:${contact.dial}"`);
    for (const item of data.situations)
      expect(html).toContain(`id="${item.id}"`);
    for (const source of data.sources)
      expect(html).toContain(source.url.replace(/&/g, '&amp;'));
    expect(html).not.toMatch(/<(script|img)[^>]*src="https?:/);
    expect(html).not.toContain('<link');
    expect(html).toContain('due for another source review');
    expect(html).toContain(data.last_verified);
  });
  it('saves only on request, then serves the full saved guide after a network failure', async () => {
    const test = worker();
    expect(test.saved.size).toBe(0);
    const result = await test.message('SAVE_EMERGENCY');
    expect(result.ok).toBe(true);
    expect(result.snapshot.reviewed).toBe(data.last_verified);
    test.network.mockRejectedValue(new Error('Offline'));
    const response = await test.navigate('/emergency?test=offline');
    const body = await response.text();
    expect(body).toContain('Saved in this browser');
    expect(body).toContain('tel:161');
    expect(body).toContain('id="flood"');
    expect(response.headers.get('X-BB-Saved')).toBe(result.snapshot.savedAt);
    expect(await (await test.navigate(PAGE)).text()).toBe(body);
  });
  it('preserves a previous copy if a refresh fails or the server returns an app shell', async () => {
    const test = worker();
    await test.message('SAVE_EMERGENCY');
    const before = await test.saved.get(PAGE).clone().text();
    test.network.mockRejectedValueOnce(new Error('Offline'));
    expect((await test.message('SAVE_EMERGENCY')).ok).toBe(false);
    test.network.mockResolvedValueOnce(
      new Response('<html>App shell</html>', {
        headers: { 'Content-Type': 'text/html' },
      })
    );
    expect((await test.message('SAVE_EMERGENCY')).ok).toBe(false);
    expect(await test.saved.get(PAGE).clone().text()).toBe(before);
  });
  it('replaces a saved copy only after a valid refresh and removes it on request', async () => {
    const test = worker();
    await test.message('SAVE_EMERGENCY');
    test.network.mockResolvedValueOnce(
      new Response(
        html.replace('Emergency essentials.', 'Updated emergency essentials.'),
        { headers: { 'Content-Type': 'text/html' } }
      )
    );
    expect((await test.message('SAVE_EMERGENCY')).ok).toBe(true);
    expect(await test.saved.get(PAGE).clone().text()).toContain(
      'Updated emergency essentials.'
    );
    expect((await test.message('REMOVE_EMERGENCY')).snapshot).toBeNull();
    expect(test.saved.size).toBe(0);
    test.network.mockRejectedValue(new Error('Offline'));
    const response = await test.navigate(PAGE);
    expect(response.status).toBe(503);
    expect(await response.text()).toContain('not saved');
  });
  it('uses the online hub when reachable and does not intercept other pages or downloads', async () => {
    const test = worker();
    await test.message('SAVE_EMERGENCY');
    test.network.mockResolvedValue(new Response('Online hub'));
    expect(await (await test.navigate('/emergency')).text()).toBe('Online hub');
    expect(test.navigate('/services')).toBeUndefined();
    expect(
      test.navigate('/documents/bacoor-citizens-charter-2026.pdf')
    ).toBeUndefined();
    expect(test.navigate(PAGE, 'cors')).toBeUndefined();
  });
});
