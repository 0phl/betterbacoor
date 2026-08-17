import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const includedExtensions = new Set([
  '.css',
  '.html',
  '.js',
  '.json',
  '.jsx',
  '.md',
  '.mjs',
  '.ts',
  '.tsx',
  '.yaml',
  '.yml',
]);
const excludedDirectories = new Set([
  '.git',
  'dist',
  'node_modules',
  'coverage',
]);
const excludedFiles = new Set([
  'LICENSE',
  'check-language.mjs',
  'package-lock.json',
]);
const banned = [
  { pattern: /Lapu[- ]Lapu/gi, reason: 'foreign-city starter content' },
  { pattern: /Mandaue City/gi, reason: 'foreign-city starter content' },
  {
    pattern: /Official Government Website/gi,
    reason: 'unsupported affiliation claim',
  },
  {
    pattern: /Official website of BetterBacoor/gi,
    reason: 'unsupported affiliation claim',
  },
  {
    pattern: /City Government of BetterBacoor/gi,
    reason: 'unsupported affiliation claim',
  },
];

function collect(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    if (excludedDirectories.has(entry.name)) return [];
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return collect(fullPath);
    if (excludedFiles.has(entry.name)) return [];
    return includedExtensions.has(path.extname(entry.name)) ? [fullPath] : [];
  });
}

const failures = [];
for (const file of collect(root)) {
  const content = fs.readFileSync(file, 'utf8');
  for (const { pattern, reason } of banned) {
    pattern.lastIndex = 0;
    if (pattern.test(content)) {
      failures.push(`${path.relative(root, file)}: ${reason}`);
    }
  }
}

if (failures.length > 0) {
  console.error('Language guard failed:\n');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Language guard passed.');
