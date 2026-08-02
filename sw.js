// Service Worker — Aqui Tem Achadinhos (v22 — fix iOS Safari)
const CACHE = 'achadinhos-v22';
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

// INSTALL — SEM skipWaiting (deixa o iOS trocar naturalmente)
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS).catch(() => {}))
  );
});

// ACTIVATE — SEM clients.claim (não força takeover no iOS)
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
});

// FETCH — network-first para TUDO (mais seguro no iOS)
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const u = new URL(e.request.url);
  if (u.origin !== self.location.origin) return;

  // NAVEGAÇÃO e RECURSOS: network-first com fallback de cache
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
