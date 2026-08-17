import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const errors = [];
if (process.env.VERCEL && !process.env.SEO_REFRESH_SECRET) errors.push('SEO_REFRESH_SECRET is required in Vercel.');
if (existsSync('api')) {
  const functions = readdirSync('api').filter((name) => !name.startsWith('_'));
  if (functions.length) errors.push(`Standalone /api functions remain: ${functions.join(', ')}`);
}
if (!existsSync(join('app', 'api', '[...subroute]', 'route.ts'))) errors.push('Consolidated API route is missing.');

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('Environment and consolidated API topology validated.');
