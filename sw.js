const CACHE_NAME = "doga-v1";

const FILES_TO_CACHE = [
    "/",
    "/index.html",
    "/index.css",
    "/index.js",
    "/manifest.json",

    "/1one/index1.html",
    "/1one/index1.css",
    "/1one/index1.js"
];

// Telepítés
self.addEventListener("install", (event) => {

    event.waitUntil(

        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(FILES_TO_CACHE);
        })

    );

    self.skipWaiting();

});

// Aktiválás
self.addEventListener("activate", (event) => {

    event.waitUntil(

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

    self.clients.claim();

});

// Kérések kezelése
self.addEventListener("fetch", (event) => {

    event.respondWith(

        caches.match(event.request).then((response) => {

            return response || fetch(event.request);

        })

    );

});
