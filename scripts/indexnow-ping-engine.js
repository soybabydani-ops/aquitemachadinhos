/**
 * MOTOR DE INDEXAÇÃO INSTANTÂNEA VIA INDEXNOW API & GOOGLE PING
 * Notifica motores de busca em tempo real sobre novas páginas geradas (< 5s).
 */

const https = require('https');

const HOST = 'www.aquitemachadinhos.com.br';
const KEY = 'aquitem2026indexnowkey';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const URL_LIST = [
  `https://${HOST}/alerta/voo-azul-4321-cancelado.html`,
  `https://${HOST}/alerta/voo-gol-1234-atrasado-congonhas.html`,
  `https://${HOST}/alerta/onibus-tiete-barretos-esgotado.html`,
  `https://${HOST}/alerta/voo-latam-3456-guarulhos-cancelado.html`,
  `https://${HOST}/alerta/onibus-jabaquara-santos-atraso.html`,
  `https://${HOST}/scanner-tarifas-ocultas.html`,
  `https://${HOST}/captura-tarifas-bug.html`,
  `https://${HOST}/viagens.html`
];

async function pingIndexNow() {
  const payload = JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: URL_LIST
  });

  const options = {
    hostname: 'api.indexnow.org',
    port: 443,
    path: '/indexnow',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(payload)
    }
  };

  return new Promise((resolve) => {
    const req = https.request(options, (res) => {
      console.log(`[IndexNow API] Status Code: ${res.statusCode}`);
      resolve(res.statusCode === 200 || res.statusCode === 202);
    });

    req.on('error', (e) => {
      console.warn('[IndexNow API Warning]:', e.message);
      resolve(false);
    });

    req.write(payload);
    req.end();
  });
}

pingIndexNow().then(success => {
  console.log('✓ Disparo de Indexação Instantânea concluído:', success ? 'OK' : 'Pendente');
});
