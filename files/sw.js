// EtiquetaPro Service Worker
// Versão do cache — incremente para forçar atualização em todos os dispositivos
const CACHE_VERSION = 'etiquetapro-v1';

const ASSETS_TO_CACHE = [
  './etiquetapro.html',
  'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
  'https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@400;600;700;800&display=swap'
];

// INSTALL — faz cache dos assets essenciais
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE).catch(() => {
        // Se algum asset externo falhar, continua mesmo assim
        return cache.add('./etiquetapro.html');
      });
    }).then(() => self.skipWaiting())
  );
});

// ACTIVATE — limpa caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// FETCH — estratégia: network-first para o HTML, cache-first para assets estáticos
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // HTML principal — sempre tenta buscar atualizado (network-first)
  if (url.pathname.endsWith('etiquetapro.html') || url.pathname === '/' || url.pathname.endsWith('/')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_VERSION).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match('./etiquetapro.html'))
    );
    return;
  }

  // Assets estáticos (CDN libs, fonts) — cache-first
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_VERSION).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => cached);
    })
  );
});

// Mensagem de atualização — cliente pode chamar sw.postMessage('skipWaiting')
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') self.skipWaiting();
});
