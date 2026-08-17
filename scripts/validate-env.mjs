import { existsSync, readdirSync } from 'node:fs';

const errors = [];
if (!existsSync('index.html')) errors.push('Static production home is missing.');
if (!existsSync('api/[...subroute].js')) errors.push('Consolidated API function is missing.');
const apiFiles = readdirSync('api').filter(name => name.endsWith('.js'));
if (apiFiles.length !== 1) errors.push(`Expected one Vercel function, found ${apiFiles.length}.`);
if (process.env.VERCEL && !process.env.SEO_REFRESH_SECRET) errors.push('SEO_REFRESH_SECRET is required in Vercel.');
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log('Static production tree and consolidated API validated.');
