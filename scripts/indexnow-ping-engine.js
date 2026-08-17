/**
 * MOTOR DE INDEXAÇÃO MULTI-ENDPOINT (INDEXNOW GLOBAL, BING, YANDEX & GOOGLE SITEMAP PING)
 * Dispara notificações simultâneas para todos os motores de busca em milissegundos.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const HOST = 'www.aquitemachadinhos.com.br';
const KEY = process.env.INDEXNOW_KEY || '';
const KEY_LOCATION = `https://${HOST}/indexnow-key.txt`;

// Extrai URLs do sitemap.xml
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
  { name: 'Yandex Search IndexNow', hostname: 'yandex.com', path: '/indexnow' }
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
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(payload),
      'User-Agent': 'AQUITEM-HighFrequency-Indexer/2.0'
    }
  };

  return new Promise((resolve) => {
    const req = https.request(options, (res) => {
      console.log(`✓ [${endpoint.name}] Resposta HTTP: ${res.statusCode}`);
      resolve(res.statusCode === 200 || res.statusCode === 202);
    });

    req.on('error', (e) => {
      console.warn(`⚠️ [${endpoint.name}] Aviso: ${e.message}`);
      resolve(false);
    });

    req.write(payload);
    req.end();
  });
}

// Google Search Console Ping
async function pingGoogleSitemap() {
  return new Promise((resolve) => {
    const pingUrl = `https://www.google.com/ping?sitemap=https://${HOST}/sitemap.xml`;
    https.get(pingUrl, (res) => {
      console.log(`✓ [Google Search Console Sitemap Ping] Resposta HTTP: ${res.statusCode}`);
      resolve(true);
    }).on('error', () => {
      resolve(false);
    });
  });
}

async function runIndexAttack() {
  const urls = getSitemapUrls();
  console.log(`🚀 Iniciando disparo de indexação massiva para ${urls.length} URLs...`);

  const topBatch = urls.slice(0, 100); // Lote prioritário das páginas de maior comissão

  // Disparo simultâneo e paralelo para todos os endpoints
  await Promise.all([
    ...ENDPOINTS.map(ep => pingEndpoint(ep, topBatch)),
    pingGoogleSitemap()
  ]);

  console.log('\n🏆 Rede Global de Indexação Interconectada com Sucesso!');
}

runIndexAttack();
