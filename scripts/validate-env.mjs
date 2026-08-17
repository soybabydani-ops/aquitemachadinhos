import { existsSync, readdirSync } from 'node:fs';

const errors = [];
if (!existsSync('index.html')) errors.push('Static production home is missing.');
if (!existsSync('api/[...subroute].js')) errors.push('Consolidated API function is missing.');
const apiFiles = readdirSync('api').filter((name) => name.endsWith('.js'));
if (apiFiles.length !== 1) errors.push(`Expected one Vercel function, found ${apiFiles.length}.`);

if (process.env.VERCEL && process.env.VERCEL_ENV === 'production') {
  for (const name of [
    'CRON_SECRET',
    'SEO_REFRESH_SECRET',
    'SUPABASE_URL',
    'SUPABASE_ANON_KEY',
    'INDEXNOW_KEY',
  ]) {
    if (!process.env[name]) errors.push(`${name} is required in Vercel production.`);
  }
  if (!existsSync('public/indexnow-key.txt')) errors.push('Generated IndexNow verification file is missing.');
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('Static production tree, protected cron prerequisites, and consolidated API validated.');
