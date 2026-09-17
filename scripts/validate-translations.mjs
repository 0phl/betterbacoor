import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
const root = path.resolve(import.meta.dirname, '..');
const catalog = JSON.parse(
  fs.readFileSync(path.join(root, 'src/i18n/fil.json'), 'utf8')
);
const failures = new Set();
function check(value) {
  const key = value.trim().replace(/\s+/g, ' ');
  if (key && typeof catalog[key] !== 'string') failures.add(key);
}
function files(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap(entry =>
      entry.isDirectory()
        ? entry.name === 'i18n'
          ? []
          : files(path.join(dir, entry.name))
        : /\.(ts|tsx)$/.test(entry.name) && !entry.name.includes('.test.')
          ? [path.join(dir, entry.name)]
          : []
    );
}
for (const file of files(path.join(root, 'src'))) {
  const ast = ts.createSourceFile(
    file,
    fs.readFileSync(file, 'utf8'),
    ts.ScriptTarget.Latest,
    true
  );
  function visit(node) {
    if (
      ts.isCallExpression(node) &&
      node.expression.getText(ast) === 't' &&
      ts.isStringLiteral(node.arguments[0])
    )
      check(node.arguments[0].text);
    if (
      ts.isPropertyAssignment(node) &&
      [
        'title',
        'summary',
        'description',
        'detail',
        'text',
        'label',
        'fee',
        'timing',
        'note',
        'actionLabel',
        'eligibility',
      ].includes(node.name.getText(ast)) &&
      ts.isStringLiteral(node.initializer)
    )
      check(node.initializer.text);
    if (
      ts.isPropertyAssignment(node) &&
      node.name.getText(ast) === 'requirements' &&
      ts.isArrayLiteralExpression(node.initializer)
    )
      node.initializer.elements.forEach(item => {
        if (ts.isStringLiteral(item)) check(item.text);
      });
    if (
      ts.isVariableDeclaration(node) &&
      node.name.getText(ast) === 'requirements' &&
      node.initializer &&
      ts.isArrayLiteralExpression(node.initializer)
    ) {
      node.initializer.elements.forEach(item => {
        if (ts.isStringLiteral(item)) check(item.text);
      });
    }
    if (
      ts.isVariableDeclaration(node) &&
      node.name.getText(ast) === 'note' &&
      node.initializer &&
      ts.isStringLiteral(node.initializer)
    )
      check(node.initializer.text);
    ts.forEachChild(node, visit);
  }
  visit(ast);
}
const emergency = JSON.parse(
  fs.readFileSync(path.join(root, 'content/emergency.json'), 'utf8')
);
for (const contact of emergency.contacts) {
  check(contact.name);
  check(contact.description);
}
for (const situation of emergency.situations) {
  check(situation.label);
  check(situation.title);
  for (const step of situation.steps) {
    check(step.title);
    check(step.text);
  }
}
for (const resource of JSON.parse(
  fs.readFileSync(path.join(root, 'content/resources.json'), 'utf8')
).resources) {
  check(resource.title);
  check(resource.summary);
}
for (const office of JSON.parse(
  fs.readFileSync(path.join(root, 'content/office-contacts.json'), 'utf8')
).offices)
  check(office.description);
for (const facility of JSON.parse(
  fs.readFileSync(path.join(root, 'content/barangay-health.json'), 'utf8')
).entries)
  check(facility.sector);
if (failures.size) {
  console.error('Missing Filipino translations:\n' + [...failures].join('\n'));
  process.exit(1);
}
console.log(
  `Validated Filipino coverage (${Object.keys(catalog).length} entries).`
);
