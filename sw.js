// Service Worker — Aqui Tem Achadinhos (v23 — correção DEFINITIVA de cache)
// O que mudou: (1) nova versão v23, (2) skipWaiting + clients.claim = atualiza IMEDIATAMENTE,
// (3) apaga TODOS os caches velhos (v22 e anteriores) na ativação, (4) HTML sempre fresco (network-first).
const CACHE = 'achadinhos-v23';
const ASSETS = [
  './', './index.html', './cadastro.html', './cadastro-motorista.html', './categoria.html',
  './loja.html', './ofertas.html', './busca.html', './turista.html', './anuncie.html',
  './motoristas.html', './motorista.html', './painel.html', './admin.html', './login.html',
  './sobre.html', './contato.html', './faq.html', './politica-de-privacidade.html',
  './termos.html', './politica-de-ofertas.html', './obrigado.html', './favoritos.html', './404.html',
  './mapa.html', './classificados.html', './imoveis.html', './empregos.html', './veiculos.html',
  './moveis-eletro.html', './eletronicos.html', './animais.html', './servicos.html', './eventos-peao.html',
  './anuncio.html', './cadastro-anuncio.html', './guia-peao.html', './o-que-fazer-festa-do-peao.html', './onde-comer-barretos.html',
  './assets/styles.css', './assets/tailwind.css', './assets/app.js', './assets/peao-hero.jpg',
  './assets/vendor/leaflet.js', './assets/vendor/leaflet.markercluster.js',
  './assets/vendor/leaflet.css', './assets/vendor/MarkerCluster.css', './assets/vendor/MarkerCluster.Default.css',
  './manifest.webmanifest', './logo.svg', './icon-192.png', './icon-512.png'
];

// INSTALL — skipWaiting: a versão nova assume IMEDIATAMENTE (não espera fechar abas)
self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS).catch(() => {}))
  );
});

// ACTIVATE — apaga TODOS os caches antigos (v22 etc.) e assume as abas abertas
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// FETCH — network-first: HTML sempre fresco do servidor; só usa cache se offline
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const u = new URL(e.request.url);
  if (u.origin !== self.location.origin) return;

  e.respondWith(
    fetch(e.request)
      .then((r) => {
        if (r.ok) {
          const cp = r.clone();
          caches.open(CACHE).then((c) => c.put(e.request, cp)).catch(() => {});
        }
        return r;
      })
      .catch(() =>
        caches.match(e.request).then((c) => c || caches.match('./index.html')).then((c) => c || new Response('', { status: 200, headers: { 'Content-Type': 'text/html' } }))
      )
  );
});
