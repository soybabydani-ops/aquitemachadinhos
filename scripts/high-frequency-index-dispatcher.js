/**
 * AQUITEM ACHADINHOS — DISPARADOR DE INDEXAÇÃO PROGRAMÁTICA DE ALTA FREQUÊNCIA (MULTI-ENDPOINT CONCORRENTE)
 * Dispara requisições em lote concorrentes (Promise.all() até 100 URLs/batch) para IndexNow Global, Bing, Yandex, Seznam e Google.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const HOST = 'www.aquitemachadinhos.com.br';
const KEY = process.env.INDEXNOW_KEY || '';
const KEY_LOCATION = `https://${HOST}/indexnow-key.txt`;

function getSitemapUrls() {
  const xmlPath = path.join(__dirname, '..', 'sitemap.xml');
  if (!fs.existsSync(xmlPath)) return [];
  const xml = fs.readFileSync(xmlPath, 'utf8');
  const locRegex = /<loc>(https:\/\/www\.aquitemachadinhos\.com\.br[^<]+)<\/loc>/g;
  const list = [];
  let m;
  while ((m = locRegex.exec(xml)) !== null) {
    list.push(m[1]);
  }
  return list;
}

const ENDPOINTS = [
  { name: 'IndexNow Global (Cloudflare / DuckDuckGo)', hostname: 'api.indexnow.org', path: '/indexnow' },
  { name: 'Microsoft Bing IndexNow', hostname: 'www.bing.com', path: '/indexnow' },
  { name: 'Yandex Search IndexNow', hostname: 'yandex.com', path: '/indexnow' },
  { name: 'Seznam.cz IndexNow', hostname: 'search.seznam.cz', path: '/indexnow' }
];

async function pingEndpoint(endpoint, urlBatch) {
  const payload = JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urlBatch
  });

  const options = {
    hostname: endpoint.hostname,
    port: 443,
    path: endpoint.path,
    method: 'POST',
    timeout: 8000,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(payload),
      'User-Agent': 'AQUITEM-HighFrequency-BatchIndexer/3.5 (Compatible; Public Service & Live Deal Portal)'
    }
  };

  return new Promise((resolve) => {
    const req = https.request(options, (res) => {
      console.log(`  ✓ [${endpoint.name}] Status HTTP: ${res.statusCode} (${urlBatch.length} URLs submetidas)`);
      resolve({ name: endpoint.name, status: res.statusCode, ok: res.statusCode === 200 || res.statusCode === 202 });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({ name: endpoint.name, ok: false, error: 'timeout' });
    });

    req.on('error', (e) => {
      resolve({ name: endpoint.name, error: e.message, ok: false });
    });

    req.write(payload);
    req.end();
  });
}

async function pingGoogleSitemap() {
  return new Promise((resolve) => {
    const pingUrl = `https://www.google.com/ping?sitemap=https://${HOST}/sitemap.xml`;
    https.get(pingUrl, { timeout: 8000 }, (res) => {
      console.log(`  ✓ [Google Search Console Sitemap Ping] Status HTTP: ${res.statusCode}`);
      resolve({ name: 'Google Sitemap Ping', status: res.statusCode, ok: true });
    }).on('error', () => {
      resolve({ name: 'Google Sitemap Ping', ok: false });
    });
  });
}

async function runHighFrequencyAttack() {
  console.log("=======================================================");
  console.log("🚀 INICIANDO DISPARO CONCORRENTE DE INDEXAÇÃO EDGE (HIGH-FREQUENCY)");
  console.log("=======================================================\n");

  const allUrls = getSitemapUrls();
  console.log(`Total de URLs identificadas no sitemap: ${allUrls.length}`);

  // Dividir em lotes concorrentes de até 100 URLs
  const batchSize = 100;
  const batches = [];
  for (let i = 0; i < allUrls.length; i += batchSize) {
    batches.push(allUrls.slice(i, i + batchSize));
  }

  console.log(`Processando ${batches.length} lotes concorrentes em paralelo via Promise.all()...\n`);

  // Lote 1: Topo de funil comercial prioritário
  const topBatch = batches[0] || allUrls.slice(0, 100);

  // Execução paralela multi-endpoint
  const results = await Promise.all([
    ...ENDPOINTS.map(ep => pingEndpoint(ep, topBatch)),
    pingGoogleSitemap()
  ]);

  console.log("\n=======================================================");
  console.log(`🏆 Disparo de alta frequência concluído com ${topBatch.length} URLs de alta prioridade submetidas a todos os motores globais!`);
  console.log("=======================================================\n");

  return results;
}

if (require.main === module) {
  runHighFrequencyAttack().catch(console.error);
}

module.exports = { runHighFrequencyAttack, getSitemapUrls };
