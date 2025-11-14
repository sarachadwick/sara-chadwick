// Service Worker for Studio Image Caching
const CACHE_NAME = "studio-cache-v1";
const IMAGE_CACHE_NAME = "studio-images-v1";
const MAX_CACHE_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days

// Install event - cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(["/studio.html", "/studio-data.js", "/index.html"]);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== IMAGE_CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Handle image requests
  if (
    url.pathname.startsWith("/studio/") &&
    (url.pathname.endsWith(".png") ||
      url.pathname.endsWith(".jpg") ||
      url.pathname.endsWith(".jpeg") ||
      url.pathname.endsWith(".webp"))
  ) {
    event.respondWith(
      caches.open(IMAGE_CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            // Check cache age
            const cachedDate = cachedResponse.headers.get("sw-cached-date");
            if (cachedDate) {
              const age = Date.now() - parseInt(cachedDate);
              if (age < MAX_CACHE_AGE) {
                return cachedResponse;
              }
            } else {
              return cachedResponse;
            }
          }

          // Fetch from network
          return fetch(event.request)
            .then((response) => {
              if (response.ok) {
                // Clone the response and add cache date
                const responseToCache = response.clone();
                const newHeaders = new Headers(responseToCache.headers);
                newHeaders.set("sw-cached-date", Date.now().toString());

                const modifiedResponse = new Response(responseToCache.body, {
                  status: responseToCache.status,
                  statusText: responseToCache.statusText,
                  headers: newHeaders,
                });

                cache.put(event.request, modifiedResponse);
                return response;
              }
              return response;
            })
            .catch(() => {
              // If network fails and we have a cached version, use it
              return (
                cachedResponse ||
                new Response("Image not available", { status: 404 })
              );
            });
        });
      })
    );
  } else {
    // Handle other requests (HTML, JS, etc.)
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return (
          cachedResponse ||
          fetch(event.request).then((response) => {
            if (response.ok && event.request.method === "GET") {
              const responseToCache = response.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseToCache);
              });
            }
            return response;
          })
        );
      })
    );
  }
});
