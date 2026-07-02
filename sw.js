const CACHE_NAME = 'kalkulator-onck-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Install Service Worker dan simpan aset ke cache
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Aktifkan Service Worker dan hapus cache lama jika ada
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Strategi Fetch: Ambil dari Cache dulu, jika gagal ambil dari Jaringan
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});
