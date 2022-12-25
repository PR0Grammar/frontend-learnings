# Worker Threads

Refs:
- MDN: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
- Lifecycle of Service Worker: https://web.dev/service-worker-lifecycle/
- From PWA perspective: https://web.dev/learn/pwa/service-workers/

## Web Workers

[TODO]

## Shared Workers

- Shared workers is a worker that can be accessed from several browser contexts, such as windows, iframes and even other workers!

- In order for all the browser contexts to share the Shared Worker, they must share the same protocol, host and port. 

- They are auto-terminated once all clients (eg. all tabs) have disconnected, but can also be manually killed via `terminate()` from the main thread or `self.close()` from within the worker

- Unlike web workers, clients must communicate via the `port` object on the worker object. These `ports` differeniate message channels from the different clients.

- To spin one up:
    1. On client
        1. Attach event listener for messages
        2. call `start()` on `MessagePort` object (must be done before any `postMessage()` calls)
    2. On worker
        1.  add `onconnect` event listener to add event listener to messsages on the `MessagePort`
        2. Call `start()` on the `MessagePort` object

```JS
// Client
const worker = new SharedWorker("jsworker.js");

worker.port.addEventListener("message", function(e) {
	alert(e.data);
}, false);

worker.port.start();

// post a message to the shared web worker
worker.port.postMessage("ME!");
```

```JS
// Shared worker
self.addEventListener("connect", function (e) {

	var port = e.ports[0];
	connections++;

	port.addEventListener("message", function (e) {
		port.postMessage("Hello " + e.data + " (port #" + connections + ")");
	}, false);

	port.start();

}, false);
```

## Service Workers

- Service workers are a special kind of web wroker that can be installed in your browser and provide special features previously unavailable to regular web pages

- Service Workers run on a separate thread, which means you don't have access to things in the main thread including DOM, several APIs, or Cookies. They act as proxies between web browsers and web servers, and improve reliability by providing **offline access**, and **boost page performance**.

- Service workers are short-lived. They usually spin up in response to events like `fetch`, `push` and `message`, but will, in all likelihood, be torn down many times while browsing a page.

### Lifecycle

- On the very first visit to a webpage that installs a new server worker, the initial visit to a page provides its baseline functionality while the service worker downloads. After a service worker is installed and activated, it controls the page to offer improved reliability and speed.

- The lifecycle can be seen as:
    1. **Installing**: Begin registration. It's intended to allow to setup worker-specific resources such as offline caches.
    2. **Installed**: Awaiting clients using other seervice workers to be closed.
    3. **Activating**: There are not clients controlled by other workers. This step to finish setup/cleanup
    4. **Activated**: The service worker can now handle functional events
    5. **Redundant**: This service worker is being replaced by another

- In more detail, the basic setup steps:
    1. The service worker URL is fetched and registered via `serviceWorkerContainer.register()`
    2. If successful, the service worker is executed in a `ServiceWorkerGlobalScope` - this is a special kind of worker context, running off the main script execution thread.
    3. Service worker is ready to process events
    4. Installation of worker is attempted when service-worker controlled pages are accessed subsequently. An `Install` event is **always the first** one sent to a service worker. This is basically the same procedure as installing a native or Firefox OS app - **making everything available for use offline**.
    5. When `oninstall` handler completes, the service worker is considered installed.
    6. Next is **activation**. When the service worker is installed, it then receieves an activate event. The primary use of `onactivate` is for **cleanup of resources** used in previous versions of a Service worker script.
    7. The Service Worker **will now control pages**, but only after the `register()` is successful. In other words, **documents will have to be reloaded** to actually be controlled, because a document starts life with or without a Service worker and maintains that for its lifetime.

- In more detail v2:
    - `install` event is first event a service worker gets and only happens once
    - A promise is passed to `installEvent.waitUntil()` signals the duration and success or failure of your install
    - The service worker won't receieve events like `fetch` and `push` until it successfully finishes installing and becomes "active"
    - *** By default, a page's fetches won't go through a service worker unless the page request itself went through a service worker. So you'll need to refresh the page to see the effects
        - `client.claim()` can override this default, and take control of non-controlled pages

- Common reasons to failing to register a service worker:
    1. You are not running your app through HTTPS
    2. The path of your service worker file is not written correctly - it must be written **RELATIVE** to the origin, not your app's root directory.
    3. It is not allowed to point to a service worker of a different origin other than that of your app.

### Access to JS driven Caching API

- One aspect of service worker technology is **Cache** interface which is a caching mechansim separate from HTTP Cache.

- The interface is accessed within the service wroker scope and within the scope of the main thread. This interface is programmable through JS. How this may be useful:
    - Store static assets in the cache on the first request for them, and only serve them from the cache for every subsequent request.
    - Store page markup in the cache, but only serve markup from the cache in offline scenarios.
    - Serve stale responses for certain assets from the cache, but update it from the network in the background.
    - Stream partial content from the network and assemble it with an app shell from the cache to improve perceptual performance.

### Scope and control

- Default scope of a service worker is `./` relative to the script URL
    eg. if SW is regsitered at `//example.com/foo/bar.js` the default scope is `//example.com/foo/`
