const CACHE_NAME = 'webcognita-govcon-radar-v1.5.0';
const ASSETS = [
  '/govcon-radar/',
  '/govcon-radar/index.html',
  '/govcon-radar/govcon-corpus.json',
  '/govcon-radar/manifest.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    const stale = keys.filter((k) => k !== CACHE_NAME);
    await Promise.all(stale.map((k) => caches.delete(k)));
    await self.clients.claim();
    // Auto-refresh open tabs once when purging legacy cache-first v1.0.0 / v1.1.0 ServiceWorker
    if (stale.length > 0) {
      const winClients = await self.clients.matchAll({ type: 'window' });
      winClients.forEach((client) => {
        if (client.navigate) client.navigate(client.url);
      });
    }
  })());
});

// Network-first with offline cache fallback so updates never serve stale HTML/CSS
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request, { cache: 'no-store' })
      .then((networkResp) => {
        if (networkResp && networkResp.status === 200) {
          const clone = networkResp.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return networkResp;
      })
      .catch(() => caches.match(event.request))
  );
});
