/**
 * SERVICE WORKER v28.0 - AQUI TEM ACHADINHOS
 * Limpeza automática de caches legados e ativação imediata (skipWaiting)
 */

const CACHE_NAME = 'aquitem-v28.0-live';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/assets/styles.css?v=28.0',
  '/assets/tailwind.css',
  '/assets/supabase-client.js?v=28.0',
  '/assets/banner-barretos-v27.js?v=28.0',
  '/assets/beneficios-planos-v22.js?v=28.0',
  '/assets/painel-bloqueio-planos-v25.js?v=28.0',
  '/assets/app.js?v=28.0'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log('[SW v28.0] Purgando cache legado:', name);
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
