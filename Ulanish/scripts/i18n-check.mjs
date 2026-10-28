import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
const langs = ['en', 'fa-AF', 'ps'];
const files = langs.map((l) =>
  JSON.parse(fs.readFileSync(new URL(`../src/i18n/locales/${l}.json`, import.meta.url), 'utf8')),
);
const flatten = (o, p = '') =>
  Object.entries(o).flatMap(([k, v]) =>
    typeof v === 'object' ? flatten(v, p + k + '.') : [p + k],
  );
const all = new Set(files.flatMap((o) => flatten(o)));
let failed = false;
for (let i = 0; i < files.length; i++) {
  const keys = new Set(flatten(files[i]));
  for (const key of all)
    if (!keys.has(key)) {
      console.error(`${langs[i]} missing ${key}`);
      failed = true;
    }
}
const walk = (d) =>
  fs
    .readdirSync(d, { withFileTypes: true })
    .flatMap((f) =>
      f.isDirectory() ? walk(`${d}/${f.name}`) : /\.tsx?$/.test(f.name) ? [`${d}/${f.name}`] : [],
    );
for (const file of walk(fileURLToPath(new URL('../src', import.meta.url)))) {
  const text = fs.readFileSync(file, 'utf8');
  for (const match of text.matchAll(/\bt\(['"]([\w.-]+)['"]/g)) {
    if (!all.has(match[1])) {
      console.error(`${file}: unknown ${match[1]}`);
      failed = true;
    }
  }
}
if (failed) process.exit(1);
console.log(
  `Translations complete: ${all.size} keys × ${langs.length} languages. Native review required before launch.`,
);
