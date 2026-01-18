const CACHE_NAME = 'svg-cache-v1';

// SVG resources to cache
const SVG_PATTERNS = [
  /\.svg$/i,
  /cdn\.jsdelivr\.net.*devicon.*\.svg/i
];

// Check if a URL should be cached
function shouldCache(url) {
  return SVG_PATTERNS.some(pattern => pattern.test(url));
}

// Install event - pre-cache the favicon
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(['/favicon.svg']);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name.startsWith('svg-cache-') && name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch event - cache-first strategy for SVGs
self.addEventListener('fetch', event => {
  const url = event.request.url;

  if (shouldCache(url)) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache => {
        return cache.match(event.request).then(cachedResponse => {
          if (cachedResponse) {
            // Return cached version, but update cache in background
            fetch(event.request).then(networkResponse => {
              if (networkResponse.ok) {
                cache.put(event.request, networkResponse.clone());
              }
            }).catch(() => {});
            return cachedResponse;
          }

          // Not in cache, fetch from network and cache it
          return fetch(event.request).then(networkResponse => {
            if (networkResponse.ok) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          });
        });
      })
    );
  }
});
