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

  // GA4 must never load before an affirmative analytics choice. The static
  // build injects a tiny consent controller rather than a tag that silently
  // executes on page load. Functional/security storage remains available while
  // analytics and advertising storage stay denied by default.
  return `<script id="aquitem-google-analytics">(function(){var id='${measurementId}',key='aquitem_analytics_consent_v1',loaded=false;var denied={ad_storage:'denied',analytics_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',functionality_storage:'granted',security_storage:'granted'};var granted={ad_storage:'denied',analytics_storage:'granted',ad_user_data:'denied',ad_personalization:'denied',functionality_storage:'granted',security_storage:'granted'};window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};window.gtag('consent','default',denied);function stored(){try{return localStorage.getItem(key);}catch(e){return null;}}function save(value){try{localStorage.setItem(key,value);}catch(e){}}function removeBanner(){var banner=document.getElementById('aquitem-analytics-consent');if(banner)banner.remove();}function loadAnalytics(){if(loaded)return;loaded=true;window.gtag('consent','update',granted);window.gtag('js',new Date());window.gtag('config',id,{anonymize_ip:true,allow_google_signals:false});var tag=document.createElement('script');tag.async=true;tag.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(id);document.head.appendChild(tag);}function loadAfterPage(){if(document.readyState==='complete')loadAnalytics();else window.addEventListener('load',loadAnalytics,{once:true});}function settingsButton(){if(document.getElementById('aquitem-analytics-settings'))return;var button=document.createElement('button');button.id='aquitem-analytics-settings';button.type='button';button.textContent='Privacidade';button.setAttribute('aria-label','Gerenciar cookies analíticos');button.style.cssText='position:fixed;left:12px;bottom:12px;z-index:2147483646;border:1px solid #64748b;border-radius:999px;padding:8px 12px;background:#0f172a;color:#fff;font:600 12px system-ui;box-shadow:0 4px 16px rgba(0,0,0,.25);cursor:pointer';button.addEventListener('click',showBanner);document.body.appendChild(button);}function choose(value){save(value);removeBanner();settingsButton();if(value==='granted')loadAfterPage();else window.gtag('consent','update',denied);}function showBanner(){if(document.getElementById('aquitem-analytics-consent'))return;var mount=function(){if(document.getElementById('aquitem-analytics-consent'))return;var banner=document.createElement('section');banner.id='aquitem-analytics-consent';banner.setAttribute('role','dialog');banner.setAttribute('aria-label','Preferências de cookies');banner.style.cssText='position:fixed;right:16px;bottom:16px;z-index:2147483647;max-width:390px;padding:18px;border-radius:14px;background:#0f172a;color:#f8fafc;border:1px solid #334155;box-shadow:0 18px 48px rgba(0,0,0,.45);font:14px/1.45 system-ui';banner.innerHTML='<strong style="display:block;margin-bottom:6px">Cookies analíticos</strong><p style="margin:0 0 12px">Com sua permissão, usamos o Google Analytics para entender o uso do site. A recusa não impede a navegação.</p><p style="margin:0 0 14px"><a href="/politica-de-privacidade" style="color:#93c5fd">Política de privacidade</a></p><div style="display:flex;gap:8px;justify-content:flex-end"><button type="button" data-choice="denied" style="padding:8px 11px;border:1px solid #64748b;border-radius:8px;background:transparent;color:#fff;cursor:pointer">Recusar</button><button type="button" data-choice="granted" style="padding:8px 11px;border:0;border-radius:8px;background:#2563eb;color:#fff;font-weight:700;cursor:pointer">Aceitar analytics</button></div>';banner.querySelector('[data-choice="denied"]').addEventListener('click',function(){choose('denied');});banner.querySelector('[data-choice="granted"]').addEventListener('click',function(){choose('granted');});document.body.appendChild(banner);};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();}window.AquitemAnalyticsConsent={open:showBanner,revoke:function(){choose('denied');showBanner();}};var choice=stored();if(choice==='granted'){settingsButton();loadAfterPage();}else if(choice==='denied'){settingsButton();window.gtag('consent','update',denied);}else showBanner();})();</script>`;
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
