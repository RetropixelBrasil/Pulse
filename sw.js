const CACHE_NAME = "pulse-v2";

const FILES = [

    "./",

    "./index.html",
    "./feed.html",
    "./history.html",
    "./settings.html",
    "./forgotpassword.html",

    "./manifest.webmanifest",

    "./css/style.css",

    "./js/app.js",
    "./js/feed.js",
    "./js/history.js",
    "./js/settings.js",
    "./js/news-loader.js",
    "./js/rss.js",

    "./firebase/auth.js",
    "./firebase/firebase-config.js",
    "./firebase/firestore.js",
    "./firebase/history.js",
    "./firebase/messaging.js",
    "./firebase/tokens.js",
    "./firebase/user.js",
    "./firebase/feedback.js",

    "./assets/Pulse_logo.png",
    "./assets/Pulse_icon.png",
    "./assets/icon-192.png",
    "./assets/icon-512.png"

];


// ==========================
// INSTALAÇÃO
// ==========================

self.addEventListener(
    "install",
    event => {

        event.waitUntil(

            caches.open(
                CACHE_NAME
            )
            .then(
                cache => {

                    return cache.addAll(
                        FILES
                    );

                }
            )

        );

        self.skipWaiting();

    }
);


// ==========================
// ATIVAÇÃO
// ==========================

self.addEventListener(
    "activate",
    event => {

        event.waitUntil(

            caches.keys()
            .then(
                keys => {

                    return Promise.all(

                        keys.map(
                            key => {

                                if(
                                    key !==
                                    CACHE_NAME
                                ){

                                    return caches.delete(
                                        key
                                    );

                                }

                                return null;

                            }
                        )

                    );

                }
            )

        );

        self.clients.claim();

    }
);


// ==========================
// FETCH
// ==========================

self.addEventListener(
    "fetch",
    event => {

        const request =
        event.request;

        const url =
        new URL(
            request.url
        );


        // ==========================
        // REQUISIÇÕES EXTERNAS
        // ==========================

        // Firebase, gstatic, RSS,
        // RSS2JSON e qualquer outro
        // domínio externo passam
        // diretamente para a rede.

        if(
            url.origin !==
            self.location.origin
        ){

            return;

        }


        // ==========================
        // SOMENTE GET
        // ==========================

        if(
            request.method !==
            "GET"
        ){

            return;

        }


        // ==========================
        // HTML / JS / CSS
        // ==========================

        // Sempre tenta buscar a versão
        // mais recente primeiro.

        if(

            request.destination ===
            "document"

            ||

            request.destination ===
            "script"

            ||

            request.destination ===
            "style"

        ){

            event.respondWith(

                fetch(
                    request,
                    {
                        cache:
                        "no-store"
                    }
                )

                .then(
                    response => {

                        if(
                            response &&
                            response.ok
                        ){

                            const copy =
                            response.clone();

                            caches.open(
                                CACHE_NAME
                            )
                            .then(
                                cache => {

                                    cache.put(
                                        request,
                                        copy
                                    );

                                }
                            );

                        }

                        return response;

                    }
                )

                .catch(
                    () => {

                        return caches.match(
                            request
                        );

                    }
                )

            );

            return;

        }


        // ==========================
        // IMAGENS E OUTROS ARQUIVOS
        // ==========================

        event.respondWith(

            caches.match(
                request
            )

            .then(
                cachedResponse => {

                    if(
                        cachedResponse
                    ){

                        return cachedResponse;

                    }

                    return fetch(
                        request
                    )
                    .then(
                        response => {

                            if(
                                response &&
                                response.ok
                            ){

                                const copy =
                                response.clone();

                                caches.open(
                                    CACHE_NAME
                                )
                                .then(
                                    cache => {

                                        cache.put(
                                            request,
                                            copy
                                        );

                                    }
                                );

                            }

                            return response;

                        }
                    );

                }
            )

        );

    }
);
