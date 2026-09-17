import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const sourcePath = fileURLToPath(
  new URL('../public/logo-mark.svg', import.meta.url)
);
const faviconPath = fileURLToPath(
  new URL('../public/favicon.svg', import.meta.url)
);
const indexPath = fileURLToPath(new URL('../index.html', import.meta.url));
const writeMode = process.argv.includes('--write');

const source = readFileSync(sourcePath, 'utf8');
if (!source.includes('viewBox="0 0 512 479"')) {
  throw new Error('Unexpected primary logo viewBox; review favicon framing.');
}

const pathLines = source
  .split(/\r?\n/)
  .filter(line => line.startsWith('<path '));

if (pathLines.length !== 94) {
  throw new Error(
    `Expected 94 primary-logo paths, found ${pathLines.length}. Review the approved mark before regenerating the favicon.`
  );
}

const geometryHash = createHash('sha256')
  .update(pathLines.join('\n'))
  .digest('hex');

const favicon = [
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 544 544" role="img" aria-labelledby="betterbacoor-favicon-title betterbacoor-favicon-description">',
  '<title id="betterbacoor-favicon-title">BetterBacoor favicon</title>',
  '<desc id="betterbacoor-favicon-description">The approved BetterBacoor community emblem on a white background.</desc>',
  `<!-- Generated from all 94 unchanged logo-mark.svg paths; geometry SHA-256: ${geometryHash} -->`,
  '<rect width="544" height="544" rx="88" fill="#fff" />',
  '<g transform="translate(16 32.5)">',
  ...pathLines.map(line => `  ${line}`),
  '</g>',
  '</svg>',
  '',
].join('\n');

const faviconBytes = Buffer.byteLength(favicon);
if (faviconBytes >= 1_200_000) {
  throw new Error(
    `public/favicon.svg is ${faviconBytes} bytes; the BetterLGU crawler limit is under 1.2MB.`
  );
}

if (
  /<script\b|<foreignObject\b|(?:href|xlink:href)=["'](?:https?:)?\/\//i.test(
    favicon
  )
) {
  throw new Error(
    'public/favicon.svg contains content rejected by the BetterLGU crawler.'
  );
}

const index = readFileSync(indexPath, 'utf8');
const iconTags = (index.match(/<link\b[^>]*>/gi) ?? []).filter(tag =>
  /\brel=["'][^"']*\bicon\b[^"']*["']/i.test(tag)
);
const expectedFirstIcon =
  '<link rel="icon" type="image/svg+xml" href="/favicon.svg" />';

if (iconTags[0] !== expectedFirstIcon) {
  throw new Error(
    'The first rel=icon in index.html must resolve to /favicon.svg as image/svg+xml.'
  );
}

if (!index.includes('<meta name="robots" content="index, follow" />')) {
  throw new Error(
    'The public application must use index, follow after its approved launch.'
  );
}

if (writeMode) {
  writeFileSync(faviconPath, favicon);
  console.log(
    `Generated public/favicon.svg from ${pathLines.length} unchanged paths.`
  );
} else {
  let current;
  try {
    current = readFileSync(faviconPath, 'utf8');
  } catch {
    throw new Error(
      'public/favicon.svg is missing. Run npm run generate:favicon.'
    );
  }

  if (current.replace(/\r\n/g, '\n') !== favicon) {
    throw new Error(
      'public/favicon.svg does not match the approved primary logo. Run npm run generate:favicon and review the result.'
    );
  }

  console.log(
    `Validated crawler-ready favicon: ${faviconBytes} bytes, white background, and ${pathLines.length} unchanged primary-logo paths.`
  );
}
