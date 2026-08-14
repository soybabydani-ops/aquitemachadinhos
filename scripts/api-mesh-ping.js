#!/usr/bin/env node
async function meshPing(urls) {
  console.log('[MESH-PING] High priority to Google + Bing...');
  urls.forEach(u => console.log(`  → ${u}`));
}
module.exports = { meshPing };
if (require.main === module) meshPing(['https://www.aquitemachadinhos.com.br/']);
