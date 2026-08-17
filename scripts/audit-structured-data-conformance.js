const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const ignored = new Set(['.git', '.next', 'node_modules']);
const files = [];
function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.html')) files.push(full);
  }
}
walk(ROOT);

const errors = [];
let products = 0;
let events = 0;
for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  for (const match of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    let schema;
    try { schema = JSON.parse(match[1].trim()); } catch { continue; }
    const entities = schema['@graph'] || [schema];
    for (const entity of entities) {
      if (entity?.['@type'] === 'Product') {
        products += 1;
        const offer = entity.offers;
        if (offer) {
          if (offer['@type'] === 'AggregateOffer') {
            if (!/^\d+(?:\.\d+)?$/.test(String(offer.lowPrice || '')) || !/^\d+(?:\.\d+)?$/.test(String(offer.highPrice || ''))) errors.push(`${path.relative(ROOT, file)}: invalid AggregateOffer price range`);
          } else {
            if (!/^\d+(?:\.\d+)?$/.test(String(offer.price || ''))) errors.push(`${path.relative(ROOT, file)}: invalid Product price`);
            if (!String(offer.url || '').startsWith('https://')) errors.push(`${path.relative(ROOT, file)}: invalid Offer URL`);
          }
          if (offer.priceValidUntil && Number.isNaN(Date.parse(offer.priceValidUntil))) errors.push(`${path.relative(ROOT, file)}: invalid priceValidUntil`);
        }
      }
      if (entity?.['@type'] === 'Event') {
        events += 1;
        if (!entity.startDate || Number.isNaN(Date.parse(entity.startDate))) errors.push(`${path.relative(ROOT, file)}: Event without verified ISO startDate`);
      }
    }
  }
}
console.log(JSON.stringify({ files: files.length, products, events, errors: errors.length }));
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
