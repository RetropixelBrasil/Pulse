const CACHE_NAME = "pulse-v1";

const FILES = [

    "./",
    "./index.html",
    "./feed.html",
    "./history.html",
    "./settings.html",

    "./css/style.css",

    "./js/app.js",
    "./js/feed.js",
    "./js/history.js",
    "./js/settings.js",

    "./assets/Pulse_logo.png",
    "./assets/Pulse_icon.png",
    "./assets/icon-192.png",
    "./assets/icon-512.png"

];

self.addEventListener(
    "install",
    event => {

        event.waitUntil(

            caches.open(CACHE_NAME)
            .then(cache =>

                cache.addAll(FILES)

            )

        );

        self.skipWaiting();

    }
);

self.addEventListener(
    "activate",
    event => {

        event.waitUntil(

            caches.keys()
            .then(keys =>

                Promise.all(

                    keys.map(key => {

                        if(key !== CACHE_NAME){

                            return caches.delete(key);

                        }

                    })

                )

            )

        );

        self.clients.claim();

    }
);

self.addEventListener(
    "fetch",
    event => {

        event.respondWith(

            caches.match(event.request)
            .then(response =>

                response ||

                fetch(event.request)

            )

        );

    }
);
