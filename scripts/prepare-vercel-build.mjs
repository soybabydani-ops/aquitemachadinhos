import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const OUTPUT = path.join(ROOT, 'public');
const DEPLOYMENT_EXCLUDES = new Set([
  '.git',
  '.vercel',
  'api',
  'server',
  'scripts',
  'supabase',
  'docs',
  'node_modules',
  'public',
  'package.json',
  'package-lock.json',
  'vercel.json',
  '.env',
  '.env.local',
  '.env.production',
  '.env.example',
  '.gitignore',
]);
const PLACEHOLDERS = {
  '__AQUITEM_SUPABASE_URL__': 'SUPABASE_URL',
  '__AQUITEM_SUPABASE_ANON_KEY__': 'SUPABASE_ANON_KEY',
};

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (['.git', '.vercel', 'node_modules', 'supabase', 'server', 'api', 'scripts', 'docs'].includes(entry.name)) continue;
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(target));
    else if (entry.isFile() && (target.endsWith('.html') || target.endsWith('.js') || target.endsWith('.json'))) files.push(target);
  }
  return files;
}

function required(name) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is required for the production Vercel build.`);
  return value;
}

async function prepareStaticOutput(indexNowKey) {
  await rm(OUTPUT, { recursive: true, force: true });
  await mkdir(OUTPUT, { recursive: true });

  // Copy root entries one-by-one. Copying ROOT directly into ROOT/public would
  // recurse into itself even when a filter excludes the destination directory.
  const entries = await readdir(ROOT, { withFileTypes: true });
  for (const entry of entries) {
    if (DEPLOYMENT_EXCLUDES.has(entry.name)) continue;
    await cp(path.join(ROOT, entry.name), path.join(OUTPUT, entry.name), { recursive: entry.isDirectory() });
  }

  if (indexNowKey) {
    await writeFile(path.join(OUTPUT, 'indexnow-key.txt'), `${indexNowKey}\n`, 'utf8');
  }
}

async function main() {
  if (!process.env.VERCEL) {
    console.info('prepare_vercel_build_skipped: local environment');
    return;
  }

  const production = process.env.VERCEL_ENV === 'production';
  const values = production
    ? {
        '__AQUITEM_SUPABASE_URL__': required('SUPABASE_URL'),
        '__AQUITEM_SUPABASE_ANON_KEY__': required('SUPABASE_ANON_KEY'),
      }
    : {
        // Preview deployments intentionally do not receive production credentials.
        '__AQUITEM_SUPABASE_URL__': '',
        '__AQUITEM_SUPABASE_ANON_KEY__': '',
      };

  const indexNowKey = production ? required('INDEXNOW_KEY') : '';
  if (production) {
    required('CRON_SECRET');
    required('SEO_REFRESH_SECRET');
  }

  const files = await walk(ROOT);
  let replacements = 0;
  for (const file of files) {
    let content = await readFile(file, 'utf8');
    const original = content;
    for (const [placeholder, value] of Object.entries(values)) {
      content = content.replaceAll(placeholder, value);
    }
    if (content !== original) {
      await writeFile(file, content, 'utf8');
      replacements += 1;
    }
  }

  await prepareStaticOutput(indexNowKey);
  if (production && !existsSync(path.join(OUTPUT, 'indexnow-key.txt'))) {
    throw new Error('IndexNow verification file was not created.');
  }

  console.info(JSON.stringify({
    event: 'vercel_public_config_injected',
    production,
    filesUpdated: replacements,
    outputDirectory: 'public',
  }));
}

main().catch((error) => {
  console.error('prepare_vercel_build_failed', error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
