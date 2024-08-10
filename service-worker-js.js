const CACHE_NAME = 'exercise-tracker-v1';
const urlsToCache = [
  '/exercise-tracker-pwa/',
  '/exercise-tracker-pwa/index.html',
  '/exercise-tracker-pwa/manifest.json',
  '/exercise-tracker-pwa/icon-192x192.png',
  '/exercise-tracker-pwa/icon-512x512.png',
  'https://cdn.jsdelivr.net/npm/chart.js'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
