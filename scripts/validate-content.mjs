import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const schema = JSON.parse(
  fs.readFileSync(path.join(root, 'schemas/resource.schema.json'), 'utf8')
);
const collection = JSON.parse(
  fs.readFileSync(path.join(root, 'content/resources.json'), 'utf8')
);

if (!Array.isArray(collection.resources)) {
  throw new Error('content/resources.json must contain a resources array');
}

const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);
const validate = ajv.compile(schema);
const ids = new Set();
const officialUrls = new Set();
const errors = [];
const today = new Date();
today.setUTCHours(0, 0, 0, 0);

for (const [index, resource] of collection.resources.entries()) {
  if (!validate(resource)) {
    errors.push(
      `resources[${index}] ${resource.id ?? '(missing id)'}: ${ajv.errorsText(
        validate.errors,
        { separator: '; ' }
      )}`
    );
    continue;
  }

  if (ids.has(resource.id)) {
    errors.push(`Duplicate resource id: ${resource.id}`);
  }
  ids.add(resource.id);

  if (officialUrls.has(resource.official_url)) {
    errors.push(`Duplicate official URL: ${resource.official_url}`);
  }
  officialUrls.add(resource.official_url);

  for (const field of ['official_url', 'source_url']) {
    const hostname = new URL(resource[field]).hostname;
    if (hostname !== 'gov.ph' && !hostname.endsWith('.gov.ph')) {
      errors.push(
        `${resource.id}: ${field} must use an HTTPS Philippine government domain under .gov.ph`
      );
    }
  }

  const verified = new Date(`${resource.last_verified}T00:00:00Z`);
  const ageDays = Math.floor(
    (today.getTime() - verified.getTime()) / 86_400_000
  );
  if (ageDays < 0) {
    errors.push(`${resource.id}: last_verified cannot be in the future`);
  } else if (ageDays > resource.review_interval_days) {
    errors.push(
      `${resource.id}: verification is ${ageDays} days old; limit is ${resource.review_interval_days}`
    );
  }

  if (resource.risk_level === 'high' && !resource.correction_url) {
    errors.push(`${resource.id}: high-risk records require a correction URL`);
  }

  const maximumInterval = resource.risk_level === 'high' ? 90 : 180;
  if (resource.review_interval_days > maximumInterval) {
    errors.push(
      `${resource.id}: ${resource.risk_level} records must be reviewed within ${maximumInterval} days`
    );
  }
}

if (errors.length > 0) {
  console.error('Content validation failed:\n');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Validated ${collection.resources.length} civic resources.`);
