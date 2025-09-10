const CACHE = 'DevStickers-v1';
const ASSETS = [
  'index.html',
  'styles/main.css',
  'scripts/script.js',
  'icons/logo-stickers-cartoon-192x192.png',
  'icons/logo-stickers-cartoon-512x512.png',
  'images/abriuchamado.png',
  'images/agoraeusaquei.png',
  'images/coffeintocode.png',
  'images/floppybuthappy.png',
  'images/gohorse.png',
  'images/gohorseprocess.png',
  'images/jareiniciouai.png',
  'images/tchan.png',
  'images/vibecoding.png',
  'images/vibecoding2.png',
  'images/problemsolver.png',
  'manifest.webmanifest'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE ? caches.delete(k) : null)))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  event.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(cache => cache.put(req, copy));
      return res;
    }).catch(() => caches.match('./index.html')))
  );
});