
const PRECACHE_URLS = []

const log = (msg) => {
    console.log('FROM SW: ' + msg)
}

self.addEventListener('install', (event) => {
    log('Install handler ran')
})