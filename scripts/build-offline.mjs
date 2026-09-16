import fs from 'node:fs';
import { renderOfflineEmergency } from './offline-page.mjs';

const root = new URL('../', import.meta.url);
const data = JSON.parse(
  fs.readFileSync(new URL('content/emergency.json', root), 'utf8')
);
const logo = fs
  .readFileSync(new URL('public/logo-mark.svg', root))
  .toString('base64');
const destination = new URL('public/offline/', root);
fs.mkdirSync(destination, { recursive: true });
fs.writeFileSync(
  new URL('emergency.html', destination),
  renderOfflineEmergency(data, logo)
);
console.log('Generated self-contained emergency essentials.');
