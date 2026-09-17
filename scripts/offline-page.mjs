import { createHash } from 'node:crypto';
import fs from 'node:fs';
import { JSDOM } from 'jsdom';
const translations = JSON.parse(
  fs.readFileSync(new URL('../src/i18n/fil.json', import.meta.url), 'utf8')
);

const escape = value =>
  String(value).replace(
    /[&<>"']/g,
    char =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[
        char
      ]
  );

export function renderOfflineEmergency(data, logo, language = 'en') {
  const version = createHash('sha256')
    .update(
      JSON.stringify({
        data,
        language,
        translations: language === 'fil' ? translations : null,
      })
    )
    .digest('hex');
  const sources = ids =>
    `<p class="sources">Sources: ${ids
      .map(id => {
        const source = data.sources.find(item => item.id === id);
        return `<a lang="en" href="${escape(source.url)}">${escape(source.name)}</a>`;
      })
      .join(' · ')}</p>`;
  const html = `<!doctype html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow"><meta name="bb-emergency-version" content="${version}">
<meta name="bb-emergency-reviewed" content="${escape(data.last_verified)}">
<meta name="bb-emergency-language" content="${language}">
<title>Emergency essentials · BetterBacoor</title>
<style>
*{box-sizing:border-box}body{margin:0;background:#f7f9fa;color:#17202d;font:16px/1.65 system-ui,sans-serif}a{color:#00329e;text-underline-offset:3px}a:focus-visible,summary:focus-visible{outline:3px solid #00329e;outline-offset:4px}header,main,footer{max-width:960px;margin:auto;padding:24px}header{display:flex;align-items:center;gap:14px}header img{width:60px;height:60px}header strong{font-size:21px;letter-spacing:-.6px}header small{display:block;color:#526176}h1{font-size:clamp(32px,7vw,48px);line-height:1.1;letter-spacing:-1.5px;margin:12px 0 18px}h2{font-size:24px;letter-spacing:-.6px}h3{font-size:17px}p{margin:8px 0 16px}.eyebrow{font-size:12px;letter-spacing:1.5px;font-weight:700;color:#00329e}.note{background:#eef1f5;border-radius:14px;padding:20px;color:#465466;font-size:14px}.hotlines{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:14px;margin:24px 0}article{background:white;border:1px solid #e0e5ec;border-radius:16px;padding:22px}article h3{margin:0}article p{font-size:14px;color:#526176}.call{font-size:24px;font-weight:750;text-decoration:none;display:block;padding:8px 0}.sources{font-size:12px!important;color:#526176;overflow-wrap:anywhere}.sources a{display:inline-block}.choices{display:flex;flex-wrap:wrap;gap:8px;margin:24px 0}.choices a{padding:8px 14px;background:white;border:1px solid #dce2eb;border-radius:24px;font-size:14px;text-decoration:none}details{background:white;border:1px solid #e0e5ec;border-radius:16px;padding:20px;margin:12px 0}summary{font-weight:700;cursor:pointer}li{margin-block:18px}li p{font-size:15px;color:#465466}footer{font-size:13px;color:#526176}#review-warning{margin-top:12px}section{scroll-margin-top:24px}@media print{body{background:white}.choices,.online-link{display:none}details{break-inside:avoid}details::details-content{content-visibility:visible}article{break-inside:avoid}.hotlines{grid-template-columns:1fr 1fr}}
</style></head><body>
<header><img src="data:image/svg+xml;base64,${logo}" alt=""><div><strong>BetterBacoor</strong><small>Independent · Community-run</small></div></header>
<main><p class="eyebrow">KEEP WITHIN REACH</p><h1>Emergency essentials.</h1>
<p>Published hotlines and practical guidance for Bacoor. In immediate danger, call <a href="tel:161">161</a> or <a href="tel:911">911</a>.</p>
<div class="note"><strong id="saved-state">Online reference · not yet saved in this browser</strong>
<p id="snapshot-info">Information snapshot: ${escape(data.last_verified)}. This is not a live advisory feed. Review this information within ${data.review_interval_days} days of the snapshot date.</p>
<p id="review-warning" hidden>This snapshot is due for another source review. Reconnect and check the linked agencies for changes. The contacts remain available below.</p>
<a class="online-link" href="/emergency">Return to the emergency hub to save or refresh this guide</a></div>
<p>BetterBacoor cannot dispatch responders. Phone calls still need a connected phone service. Source links need internet access. If a local number does not connect, try 911.</p>
<section aria-labelledby="contacts"><h2 id="contacts">Who to call</h2><div class="hotlines">${data.contacts.map(contact => `<article><h3>${escape(contact.name)}</h3><p>${escape(contact.description)}</p><a class="call" href="tel:${escape(contact.dial)}">${escape(contact.number)}</a>${sources(contact.sources)}</article>`).join('')}</div></section>
<p class="note">Tell the responder where you are, a nearby landmark, and what happened. Follow their instructions. Ask BDRRMO or your barangay which evacuation center is currently open; this guide does not track shelter capacity or safe routes.</p>
<section aria-labelledby="guidance"><h2 id="guidance">Guidance for your situation</h2>
<nav class="choices" aria-label="Jump to a situation">${data.situations.map(item => `<a href="#${escape(item.id)}">${escape(item.label)}</a>`).join('')}</nav>
${data.situations.map(item => `<details id="${escape(item.id)}" open><summary><span>${escape(item.label)}</span> · <span>${escape(item.title)}</span></summary><ol>${item.steps.map(step => `<li><strong>${escape(step.title)}</strong><p>${escape(step.text)}</p></li>`).join('')}</ol>${sources(item.sources)}</details>`).join('')}</section>
</main><footer>Saved copies can be removed by your browser when storage is cleared. Keep a downloaded contact card as another backup. Unofficial; not operated by or endorsed by the City Government of Bacoor.</footer>
<script>document.getElementById('review-warning').hidden = Date.now() - Date.parse('${data.last_verified}T00:00:00Z') <= ${data.review_interval_days} * 86400000;</script>
</body></html>`;
  if (language === 'en') return html;
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  doc.documentElement.lang = 'fil';
  const walker = doc.createTreeWalker(doc.body, 4);
  let node;
  while ((node = walker.nextNode())) {
    if (['SCRIPT', 'STYLE'].includes(node.parentElement?.tagName)) continue;
    const translated = translations[node.textContent.trim()];
    if (translated)
      node.textContent = node.textContent.replace(/\S[\s\S]*\S|\S/, translated);
  }
  for (const element of doc.querySelectorAll('[aria-label]')) {
    const translated = translations[element.getAttribute('aria-label')];
    if (translated) element.setAttribute('aria-label', translated);
  }
  doc.title = 'Gabay sa emergency · BetterBacoor';
  doc.getElementById('snapshot-info').textContent =
    `Petsa ng impormasyon: ${data.last_verified}. Hindi ito kasalukuyang ulat ng mga abiso. Suriin muli sa loob ng ${data.review_interval_days} araw mula sa petsa ng impormasyon.`;
  return dom.serialize();
}
