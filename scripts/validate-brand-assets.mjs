import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const sourcePath = fileURLToPath(
  new URL('../public/logo-mark.svg', import.meta.url)
);
const faviconPath = fileURLToPath(
  new URL('../public/favicon.svg', import.meta.url)
);
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

  if (current !== favicon) {
    throw new Error(
      'public/favicon.svg does not match the approved primary logo. Run npm run generate:favicon and review the result.'
    );
  }

  console.log(
    `Validated favicon: white background plus ${pathLines.length} unchanged primary-logo paths.`
  );
}
