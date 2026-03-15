const CACHE_NAME = 'hello-world-pwa-v2';
// Sesuaikan path cache dengan repository
const urlsToCache = [
    '/fullscreenpwa/',
    '/fullscreenpwa/index.html',
    '/fullscreenpwa/style.css',
    '/fullscreenpwa/app.js',
    '/fullscreenpwa/icon.png',
    '/fullscreenpwa/icon-512.png'
];

// Instalasi Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

// Ambil sumber dari cache
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});

// Perbarui Service Worker
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
