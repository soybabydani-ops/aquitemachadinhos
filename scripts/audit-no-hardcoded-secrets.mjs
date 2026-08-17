import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const SKIP = new Set(['.git', '.vercel', 'node_modules', '.next']);
const PATTERNS = [
  ['github_pat', /ghp_[A-Za-z0-9_]+|github_pat_[A-Za-z0-9_]+/],
  ['vercel_token', /vcp_[A-Za-z0-9_]+/],
  ['supabase_pat', /sbp_[A-Za-z0-9_]+/],
  ['jwt', /eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/],
  ['telegram_bot_token', /\b\d{6,12}:[A-Za-z0-9_-]{20,}\b/],
  ['hardcoded_indexnow_key', /(?:INDEXNOW_KEY|indexNowKey)\s*=\s*["'][A-Za-z0-9-]{8,128}["']/],
];

async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const output = [];
  for (const entry of entries) {
    if (SKIP.has(entry.name)) continue;
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) output.push(...await files(target));
    else if (entry.isFile()) output.push(target);
  }
  return output;
}

const findings = [];
for (const file of await files(ROOT)) {
  if (/\.(png|jpe?g|gif|ico|pdf|woff2?)$/i.test(file)) continue;
  let content;
  try {
    content = await readFile(file, 'utf8');
  } catch {
    continue;
  }
  const matches = PATTERNS.filter(([, pattern]) => pattern.test(content)).map(([name]) => name);
  if (matches.length) findings.push({ file: path.relative(ROOT, file), matches });
}

if (findings.length) {
  console.error(JSON.stringify({ event: 'hardcoded_secret_findings', findings }, null, 2));
  process.exitCode = 1;
} else {
  console.log('No hardcoded credential patterns found.');
}
