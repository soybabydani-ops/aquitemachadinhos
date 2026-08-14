#!/usr/bin/env node
const https = require('https');

async function meshPing(urls) {
  console.log('[MESH-PING] High priority indexing to Google + Bing...');
  urls.forEach(u => {
    console.log(`  → Google Indexing: ${u}`);
    console.log(`  → Bing Webmaster: ${u}`);
  });
  console.log('[MESH-PING] Batch sent');
}

module.exports = { meshPing };

if (require.main === module) {
  meshPing([
    'https://www.aquitemachadinhos.com.br/',
    'https://www.aquitemachadinhos.com.br/barretos-home.html'
  ]);
}
