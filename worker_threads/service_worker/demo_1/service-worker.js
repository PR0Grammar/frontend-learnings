// SOURCE: https://googlechrome.github.io/samples/service-worker/basic/


// Names of the two caches used in this version of the service worker.
// Change to v2, etc. when you update any of the local resources, which will
// in turn trigger the install event again.
const PRECACHE = 'precache-v2';
const RUNTIME = 'runtime';



// A list of local resources we always want to be cached.
const PRECACHE_URLS = [
    'index.html',
    './', // Alias for index.html
    'styles.css',
    'demo.js'
];

const log = (msg) => {
    console.log('FROM SW: ' + msg)
}

// #INSTALLATION: Setup worker specific resources
//
// For this step, we setup pre-caches for the resources in PRECACHE_URLS
self.addEventListener('install', (event) => {
    log('Install handler ran')
    event.waitUntil(
        caches.open(PRECACHE).then(cache => cache.addAll(PRECACHE_URLS)).then(() => {

            // Forces waiting service worker to become the active service wroker
            return self.skipWaiting()
        })
    )
})

// # ACTIVATION: Use this step to finish setup or do cleanup
//
// For this, clean up old caches
self.addEventListener('activate', event => {
    log('Activation handler ran')
    const CURRENT_CACHES = [PRECACHE, RUNTIME];

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return cacheNames.filter(cacheName => !CURRENT_CACHES.includes(cacheName));
        }).then(cachesToDelete => {
            return Promise.all(cachesToDelete.map(cacheToDelete => {
                return caches.delete(cacheToDelete);
            }));
        }).then(() => self.clients.claim())
    );
})

// # Intercept network requests
//
// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
    const requestUrl = event.request.url

    if (requestUrl.startsWith(self.location.origin)) {
        log('Same Origin Request: ' + requestUrl)
        event.respondWith(
            caches.match(event.request).then(cachedResponse => {
                if (cachedResponse) {
                    log('Cache Hit: ' + requestUrl)
                    return cachedResponse;
                }

                log('Cache Miss: ' + requestUrl)
                return caches.open(RUNTIME).then(cache => {
                    return fetch(event.request).then(response => {
                        log('Fetching ' + requestUrl)
                        // Put a copy of the response in the runtime cache.
                        return cache.put(event.request, response.clone()).then(() => {
                            log('Placed Resource in RUNTIME Cache ' + requestUrl)
                            return response;
                        });
                    });
                });
            })
        );
        return
    }
    log('Not Same Origin Request: ' + requestUrl)
});