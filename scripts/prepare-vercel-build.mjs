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

const NETWORK_HINTS = [
  '<link rel="dns-prefetch" href="https://anrdoezrs.net">',
  '<link rel="dns-prefetch" href="https://www.cj.com">',
  '<link rel="dns-prefetch" href="https://s.shopee.com.br">',
  '<link rel="dns-prefetch" href="https://meli.la">',
  '<link rel="preconnect" href="https://anrdoezrs.net" crossorigin="anonymous">',
  '<link rel="preconnect" href="https://s.shopee.com.br" crossorigin="anonymous">',
].join('');

const ORGANIZATION_SCHEMA = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://www.aquitemachadinhos.com.br/#organization',
      name: 'Aqui Tem Achadinhos',
      url: 'https://www.aquitemachadinhos.com.br',
      logo: 'https://www.aquitemachadinhos.com.br/logo.svg',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.aquitemachadinhos.com.br/#website',
      name: 'Aqui Tem Achadinhos',
      url: 'https://www.aquitemachadinhos.com.br',
      publisher: { '@id': 'https://www.aquitemachadinhos.com.br/#organization' },
      hasPart: [
        { '@type': 'WebPage', name: 'Política de privacidade', url: 'https://www.aquitemachadinhos.com.br/politica-de-privacidade' },
        { '@type': 'WebPage', name: 'Termos de uso', url: 'https://www.aquitemachadinhos.com.br/termos' },
      ],
    },
  ],
}).replace(/</g, '\\u003c');

function analyticsScript(measurementId) {
  if (!measurementId) return '';
  if (!/^G-[A-Z0-9]+$/i.test(measurementId)) {
    throw new Error('NEXT_PUBLIC_GA_MEASUREMENT_ID must be a valid GA4 measurement ID.');
  }

  // The static site has no Next Script runtime. Loading after window.load gives
  // the analytics tag an equivalent non-blocking role after page interaction.
  return `<script id="aquitem-google-analytics">window.addEventListener('load',function(){window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};window.gtag('js',new Date());window.gtag('config','${measurementId}',{anonymize_ip:true});var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=${measurementId}';document.head.appendChild(s);});</script>`;
}

function headEnhancements(measurementId) {
  return `${NETWORK_HINTS}${analyticsScript(measurementId)}<script id="aquitem-organization-schema" type="application/ld+json">${ORGANIZATION_SCHEMA}</script>`;
}

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

async function injectHeadEnhancements(directory, measurementId) {
  const entries = await readdir(directory, { withFileTypes: true });
  let updated = 0;
  for (const entry of entries) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      updated += await injectHeadEnhancements(target, measurementId);
      continue;
    }
    if (!entry.isFile() || !entry.name.endsWith('.html')) continue;
    const content = await readFile(target, 'utf8');
    if (content.includes('id="aquitem-organization-schema"') || !/<\/head>/i.test(content)) continue;
    await writeFile(target, content.replace(/<\/head>/i, `${headEnhancements(measurementId)}</head>`), 'utf8');
    updated += 1;
  }
  return updated;
}

async function prepareStaticOutput(indexNowKey, measurementId) {
  await rm(OUTPUT, { recursive: true, force: true });
  await mkdir(OUTPUT, { recursive: true });

  // Copy root entries one-by-one. Copying ROOT directly into ROOT/public would
  // recurse into itself even when a filter excludes the destination directory.
  const entries = await readdir(ROOT, { withFileTypes: true });
  for (const entry of entries) {
    if (DEPLOYMENT_EXCLUDES.has(entry.name)) continue;
    await cp(path.join(ROOT, entry.name), path.join(OUTPUT, entry.name), { recursive: entry.isDirectory() });
  }

  const htmlFilesUpdated = await injectHeadEnhancements(OUTPUT, measurementId);
  if (indexNowKey) {
    await writeFile(path.join(OUTPUT, 'indexnow-key.txt'), `${indexNowKey}\n`, 'utf8');
  }
  return htmlFilesUpdated;
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
  const analyticsMeasurementId = production ? required('NEXT_PUBLIC_GA_MEASUREMENT_ID') : '';
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

  const htmlFilesUpdated = await prepareStaticOutput(indexNowKey, analyticsMeasurementId);
  if (production && !existsSync(path.join(OUTPUT, 'indexnow-key.txt'))) {
    throw new Error('IndexNow verification file was not created.');
  }

  console.info(JSON.stringify({
    event: 'vercel_public_config_injected',
    production,
    filesUpdated: replacements,
    htmlFilesUpdated,
    outputDirectory: 'public',
  }));
}

main().catch((error) => {
  console.error('prepare_vercel_build_failed', error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
