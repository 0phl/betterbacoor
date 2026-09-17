import fs from 'node:fs';
import path from 'node:path';

export function validateBarangayInformation(root) {
  const errors = [];
  const read = name =>
    JSON.parse(fs.readFileSync(path.join(root, 'content', name), 'utf8'));
  const census = read('barangay-profiles.json');
  const health = read('barangay-health.json');
  const schools = read('barangay-schools.json');
  const waste = read('barangay-waste.json');
  const directoryIds = new Set(
    read('local-directory.json')
      .entries.filter(row => row.category === 'barangay')
      .map(row => row.id)
  );
  function require(condition, message) {
    if (!condition) errors.push(`My Barangay: ${message}`);
  }
  function source(value, hosts) {
    try {
      const url = new URL(value);
      return url.protocol === 'https:' && hosts.includes(url.hostname);
    } catch {
      return false;
    }
  }
  function unique(rows, key, name) {
    require(new Set(rows.map(row => row[key])).size ===
      rows.length, `duplicate ${name}`);
  }
  const day = /^\d{4}-\d{2}-\d{2}$/;
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  require(census.barangays.length ===
    directoryIds.size, 'census must cover every current barangay');
  unique(census.barangays, 'psgc', 'PSGC');
  unique(census.barangays, 'directory_id', 'profile');
  require(census.barangays.reduce(
    (sum, row) => sum + row.population_2024,
    0
  ) === census.city_population, 'population total differs from city total');
  require(source(census.source_url, ['psa.gov.ph']), 'invalid census source');
  for (const row of census.barangays)
    require(directoryIds.has(row.directory_id) &&
      /^0402103\d{3}$/.test(row.psgc) &&
      Number.isInteger(row.population_2024) &&
      row.population_2024 >= 0, `invalid profile ${row.name}`);
  for (const dataset of [health, schools, waste])
    require(day.test(dataset.reviewed_on), 'missing review date');
  unique(health.entries, 'id', 'health listing');
  for (const row of health.entries) {
    require(['yakap', 'animal-bite', 'dental'].includes(row.service) &&
      ['Government', 'Private'].includes(row.sector) &&
      row.name &&
      row.address, `incomplete health listing ${row.id}`);
    require(source(row.source_url, ['www.philhealth.gov.ph']) &&
      row.source_url.endsWith(`#page=${row.source_page}`) &&
      Number.isInteger(row.source_row) &&
      row.source_row > 0 &&
      row.source_page > 0 &&
      day.test(row.expires_on), `missing health provenance ${row.id}`);
    require(!row.email ||
      email.test(row.email), `invalid health email ${row.id}`);
    for (const phone of row.phones) {
      const digits = phone.number.replace(/\D/g, '');
      require(/^0\d{9,10}$/.test(digits) &&
        phone.dial ===
          `+63${digits.slice(1)}`, `invalid dialable health contact ${row.id}`);
    }
  }
  unique(schools.entries, 'id', 'school listing');
  for (const row of schools.entries) {
    require(row.name &&
      ['elementary', 'junior-high', 'senior-high'].includes(
        row.level
      ), `invalid school ${row.id}`);
    require(!row.email ||
      /^\d{6}@deped\.gov\.ph$/.test(
        row.email
      ), `invalid school email ${row.id}`);
    require(source(row.source_url, ['www.depedbacoorcity.ph']) &&
      source(row.facebook_url, [
        'www.facebook.com',
      ]), `invalid school source ${row.id}`);
  }
  unique(waste.images, 'url', 'garbage table');
  for (const image of waste.images)
    require(source(image.url, ['bacoor.gov.ph']) &&
      source(image.source_url, ['bacoor.gov.ph']) &&
      image.barangay_ids.length &&
      image.barangay_ids.every(id =>
        directoryIds.has(id)
      ), 'garbage table lacks a valid source or barangay');
  for (const row of waste.routes)
    require(waste.images.some(
      image =>
        image.url === row.image_url &&
        image.barangay_ids.includes(row.barangay_id)
    ) &&
      row.area &&
      row.days.length &&
      row.days.every(day => Number.isInteger(day) && day >= 0 && day <= 6) &&
      /^([01]\d|2[0-3]):[0-5]\d$/.test(row.start) &&
      /^([01]\d|2[0-3]):[0-5]\d$/.test(
        row.end
      ), `invalid garbage route ${row.area}`);
  return errors;
}
