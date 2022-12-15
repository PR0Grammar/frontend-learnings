const log = (msg) => {
    console.log('FROM MAIN THREAD: '+msg)
}
const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
        try {
            // Fetch the Service Worker JS to register (Step 1)
            const registration = await navigator.serviceWorker.register("/service-worker.js", {
                /**
                 * Optional parameter used to specify the subset of your content that you want the service worker to control.
                 * In this case '/' means all content under the app's origin
                 */
                scope: "/", 
            });
            if (registration.installing) {
                log("Service worker installing");
            } else if (registration.waiting) {
                log("Service worker installed");
            } else if (registration.active) {
                log("Service worker active");
            }
        } catch (error) {
            console.error(`Registration failed with ${error}`);
        }
    }
};


registerServiceWorker();