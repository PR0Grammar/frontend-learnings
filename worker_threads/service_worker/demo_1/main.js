const log = (msg) => {
    console.log('FROM MAIN THREAD:' + msg)
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


const init = async () => {
    log("Registering SW...")
    await registerServiceWorker();

    // Test out fetching resources to see network request interception from
    // Service Worker
    log("Fetching styles.css")
    await fetch('/styles.css', {credentials: 'same-origin'})
    log("Fetching demo.js")
    await fetch('/demo.js', {credentials: 'same-origin'})
    log("Fetching not_cached.js")
    await fetch('/not_cached.js', {credentials: 'same-origin'})

    // Quick indicator that fetch is done
    document.body.style.backgroundColor = 'wheat'
}

init()