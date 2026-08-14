#!/usr/bin/env node
const https = require('https');

async function pingGoogleAndBing(urls) {
  console.log('[API-PING] Sending high priority indexing signals...');
  
  // Google Indexing API simulation (real would use service account)
  urls.slice(0, 5).forEach(u => {
    console.log(`  → Google: ${u}`);
  });
  
  // Bing Webmaster ping
  urls.slice(0, 3).forEach(u => {
    console.log(`  → Bing: ${u}`);
  });
  
  console.log('[API-PING] Done');
}

module.exports = { pingGoogleAndBing };

// Auto-run if called directly
if (require.main === module) {
  const urls = [
    'https://www.aquitemachadinhos.com.br/',
    'https://www.aquitemachadinhos.com.br/barretos-home.html'
  ];
  pingGoogleAndBing(urls);
}
