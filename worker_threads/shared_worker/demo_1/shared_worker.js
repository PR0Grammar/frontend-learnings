const log = (msg) => {
    console.log(`____FROM SHARED WORKER____\n${msg}`)
}

let clientCount = 0

onconnect = (ev) => {
    const port = ev.ports[0]

    port.onmessage = (portEv) => {
        log('message from main thread: ' + portEv.data)
    }

    port.start();
    port.postMessage(`hello main thread! You are the ${++clientCount} client to connect to me!`)
}

