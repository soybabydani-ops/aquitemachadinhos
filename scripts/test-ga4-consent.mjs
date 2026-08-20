import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync('scripts/prepare-vercel-build.mjs', 'utf8');

assert.match(source, /NEXT_PUBLIC_GA_MEASUREMENT_ID/);
assert.match(source, /analytics_storage:'denied'/);
assert.match(source, /ad_storage:'denied'/);
assert.match(source, /data-choice="granted"/);
assert.match(source, /data-choice="denied"/);
assert.match(source, /allow_google_signals:false/);
assert.match(source, /aquitem_analytics_consent_v1/);
assert.match(source, /politica-de-privacidade/);
assert.doesNotMatch(source, /window\.addEventListener\('load',function\(\)\{window\.dataLayer/);

console.log('GA4 consent controller static checks passed.');
