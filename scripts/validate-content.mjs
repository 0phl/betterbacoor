import fs from 'node:fs';
import { createHash } from 'node:crypto';
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

  const maximumInterval = resource.risk_level === 'high' ? 90 : 180;
  if (resource.review_interval_days > maximumInterval) {
    errors.push(
      `${resource.id}: ${resource.risk_level} records must be reviewed within ${maximumInterval} days`
    );
  }
}

const contacts = JSON.parse(
  fs.readFileSync(path.join(root, 'content/office-contacts.json'), 'utf8')
);
if (
  !collection.resources.some(
    resource =>
      resource.id === contacts.source_resource_id &&
      resource.category === 'directory'
  )
) {
  errors.push('Office contacts must reference a validated directory resource.');
}
if (!Array.isArray(contacts.offices) || contacts.offices.length === 0) {
  errors.push('Office contacts must contain at least one office.');
} else {
  const emails = new Set();
  for (const office of contacts.offices) {
    if (
      !office.name ||
      !office.description ||
      !/^[a-z0-9._-]+@bacoor\.gov\.ph$/i.test(office.email)
    )
      errors.push('Invalid office name, description, or official email.');
    if (emails.has(office.email))
      errors.push(`Duplicate office contact: ${office.email}`);
    emails.add(office.email);
    if (office.phone && !/^\+63\d{9,10}$/.test(office.phone))
      errors.push(`Invalid telephone: ${office.name}`);
    if (
      office.extension &&
      (!office.phone || !/^\d{2,5}$/.test(office.extension))
    )
      errors.push(`Invalid telephone extension: ${office.name}`);
  }
}

const documents = JSON.parse(
  fs.readFileSync(path.join(root, 'content/documents.json'), 'utf8')
).documents;
for (const document of documents) {
  const source = collection.resources.find(
    resource => resource.id === document.id
  );
  if (!source || source.source_url !== document.source_url)
    errors.push(`Document source does not match the resource: ${document.id}`);
  const file = path.resolve(root, document.path);
  if (!file.startsWith(path.join(root, 'public', 'documents') + path.sep)) {
    errors.push(`Document path must be under public/documents: ${document.id}`);
    continue;
  }
  if (!fs.existsSync(file)) {
    errors.push(`Missing document: ${document.path}`);
    continue;
  }
  const bytes = fs.readFileSync(file);
  if (
    bytes.length !== document.bytes ||
    createHash('sha256').update(bytes).digest('hex') !== document.sha256
  )
    errors.push(`Document integrity mismatch: ${document.id}`);
}

const emergency = JSON.parse(
  fs.readFileSync(path.join(root, 'content/emergency.json'), 'utf8')
);
const emergencyAge =
  (today.getTime() -
    new Date(`${emergency.last_verified}T00:00:00Z`).getTime()) /
  86_400_000;
if (
  !Number.isFinite(emergencyAge) ||
  emergencyAge < 0 ||
  emergencyAge > 30 ||
  emergency.review_interval_days !== 30
)
  errors.push(
    'Emergency content requires a valid source review within 30 days.'
  );
const emergencySourceIds = new Set(emergency.sources.map(source => source.id));
const emergencyContactIds = new Set(
  emergency.contacts.map(contact => contact.id)
);
if (
  emergencySourceIds.size !== emergency.sources.length ||
  emergencyContactIds.size !== emergency.contacts.length
)
  errors.push('Emergency source and contact IDs must be unique.');
for (const source of emergency.sources) {
  const url = new URL(source.url);
  const approved =
    source.type === 'government'
      ? url.hostname.endsWith('.gov.ph')
      : source.type === 'humanitarian' &&
        ['redcross.org.ph', 'www.redcross.org'].includes(url.hostname);
  if (!approved || url.protocol !== 'https:' || !source.name)
    errors.push(`Invalid emergency source: ${source.id}`);
}
for (const contact of emergency.contacts) {
  const printedDigits = contact.number.replace(/\D/g, '');
  const expectedDial = printedDigits.startsWith('0')
    ? `+63${printedDigits.slice(1)}`
    : printedDigits;
  if (
    !contact.name ||
    !contact.description ||
    !/^(161|911|143|\+63\d{9,10})$/.test(contact.dial) ||
    contact.dial !== expectedDial
  )
    errors.push(`Emergency phone display/dial mismatch: ${contact.id}`);
  if (
    !contact.sources.length ||
    contact.sources.some(id => !emergencySourceIds.has(id))
  )
    errors.push(`Missing emergency contact source: ${contact.id}`);
}
for (const situation of emergency.situations) {
  if (
    !situation.title ||
    !situation.steps.length ||
    situation.steps.some(step => !step.title || !step.text) ||
    !situation.sources.length ||
    situation.sources.some(id => !emergencySourceIds.has(id)) ||
    situation.contacts.some(id => !emergencyContactIds.has(id))
  )
    errors.push(`Invalid emergency guidance: ${situation.id}`);
}

const directory = JSON.parse(
  fs.readFileSync(path.join(root, 'content/local-directory.json'), 'utf8')
);
const directoryIds = new Set();
const directorySourceIds = new Set();
for (const source of directory.sources) {
  const age =
    (today.getTime() -
      new Date(`${source.last_verified}T00:00:00Z`).getTime()) /
    86400000;
  let approved = false;
  try {
    const url = new URL(source.url);
    approved = url.protocol === 'https:' && url.hostname.endsWith('.gov.ph');
  } catch {
    /* Report malformed source below. */
  }
  if (
    directorySourceIds.has(source.id) ||
    !source.id ||
    !source.title ||
    !source.source_location ||
    !approved ||
    !Number.isFinite(age) ||
    age < 0 ||
    age > source.review_interval_days ||
    !Number.isInteger(source.review_interval_days) ||
    source.review_interval_days < 1 ||
    source.review_interval_days > 90
  )
    errors.push(`Invalid or overdue local directory source: ${source.id}`);
  directorySourceIds.add(source.id);
}
for (const entry of directory.entries) {
  if (
    directoryIds.has(entry.id) ||
    !entry.id ||
    !entry.name ||
    !['barangay', 'hospital', 'health'].includes(entry.category) ||
    !directorySourceIds.has(entry.source_id) ||
    typeof entry.address !== 'string' ||
    !Array.isArray(entry.includes) ||
    entry.includes.some(name => typeof name !== 'string' || !name.trim()) ||
    !Array.isArray(entry.phones)
  )
    errors.push(`Invalid local directory entry: ${entry.id}`);
  directoryIds.add(entry.id);
  for (const phone of entry.phones ?? []) {
    const digits = phone.number.replace(/\D/g, '');
    if (
      phone.dial
        ? !/^\+63\d{9,10}$/.test(phone.dial) ||
          !digits.startsWith('0') ||
          phone.dial !== `+63${digits.slice(1)}`
        : !/^\d{3}-\d{4}$/.test(phone.number)
    )
      errors.push(`Invalid directory phone display/dial: ${entry.id}`);
  }
}
if (directory.entries.length === 0)
  errors.push('Local directory must not be empty.');

if (errors.length > 0) {
  console.error('Content validation failed:\n');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Validated ${collection.resources.length} civic resources.`);
