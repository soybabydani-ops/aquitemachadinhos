// Service Worker — Aqui Tem Achadinhos (v4 — fix Safari redirects)
const CACHE = 'achadinhos-v11';
const ASSETS = [
  './', './index.html', './cadastro.html', './cadastro-motorista.html', './categoria.html',
  './loja.html', './ofertas.html', './busca.html', './turista.html', './anuncie.html',
  './motoristas.html', './motorista.html', './painel.html', './admin.html', './login.html',
  './sobre.html', './contato.html', './faq.html', './politica-de-privacidade.html',
  './termos.html', './politica-de-ofertas.html', './obrigado.html', './favoritos.html', './404.html',
  './mapa.html', './classificados.html', './imoveis.html', './empregos.html', './veiculos.html',
  './moveis-eletro.html', './eletronicos.html', './animais.html', './servicos.html', './eventos-peao.html',
  './anuncio.html', './cadastro-anuncio.html', './guia-peao.html',
  './assets/styles.css', './assets/tailwind.css', './assets/app.js', './assets/peao-hero.jpg',
  './assets/vendor/leaflet.js', './assets/vendor/leaflet.markercluster.js',
  './assets/vendor/leaflet.css', './assets/vendor/MarkerCluster.css', './assets/vendor/MarkerCluster.Default.css',
  './manifest.webmanifest', './logo.svg', './icon-192.png', './icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS).catch(() => {})).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const u = new URL(e.request.url);
  if (u.origin !== self.location.origin) return;

  // NAVEGAÇÃO (páginas): network-first — NUNCA servir redirect do cache
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request)
        .then((r) => {
          // Só cachear respostas 200 (NUNCA redirects 3xx)
          if (r.ok) {
            const cp = r.clone();
            caches.open(CACHE).then((c) => c.put(e.request, cp)).catch(() => {});
          }
          return r;
        })
        .catch(() => caches.match(e.request).then((c) => c || caches.match('./index.html')))
    );
    return;
  }

  // OUTROS RECURSOS (CSS, JS, imagens): cache-first — só cachear 200
  e.respondWith(
    caches.match(e.request).then((c) => {
      const n = fetch(e.request)
        .then((r) => {
          if (r.ok) {
            const cp = r.clone();
            caches.open(CACHE).then((c) => c.put(e.request, cp)).catch(() => {});
          }
          return r;
        })
        .catch(() => c);
      return c || n;
    })
  );
});
