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
  // Don't claim clients on localhost (dev server)
  const isLocalhost = self.location.hostname === 'localhost' || 
                      self.location.hostname === '127.0.0.1';
  
  if (isLocalhost) {
    // On localhost, unregister this service worker immediately
    self.registration.unregister();
    return;
  }
  
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

  // Skip service worker requests
  if (url.pathname === "/sw.js") {
    return;
  }

  // Skip Vite dev server requests - these need to go directly to the dev server
  // Vite handles module resolution and HMR for these paths
  // Also skip localhost (dev server) completely
  if (
    url.hostname === "localhost" ||
    url.hostname === "127.0.0.1" ||
    url.pathname.startsWith("/src/") ||
    url.pathname.startsWith("/@vite/") ||
    url.pathname.startsWith("/@id/") ||
    url.pathname.startsWith("/node_modules/") ||
    url.pathname.startsWith("/assets/") ||
    url.pathname === "/vite.svg" ||
    url.pathname.includes(".js") ||
    url.pathname.includes(".mjs")
  ) {
    // Let these requests pass through to the network without interception
    // Don't call event.respondWith() - let the browser handle it natively
    return;
  }

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
    // Handle other requests (HTML, JS, etc.) - but only for static pages
    // Don't cache dynamic Vite-generated content
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return (
          cachedResponse ||
          fetch(event.request).then((response) => {
            // Only cache HTML pages and static assets, not module scripts
            if (
              response.ok &&
              event.request.method === "GET" &&
              !url.pathname.startsWith("/src/") &&
              !url.pathname.startsWith("/@") &&
              !url.pathname.startsWith("/assets/")
            ) {
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
