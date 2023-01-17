const log = (msg) => {
    console.log(`___FROM MAIN THREAD___\n${msg}}`)
}

const getSharedWorker = async () => {
    const worker = new SharedWorker('shared_worker.js')
    worker.port.start()
    worker.port.onmessage = (e) => {
        log(`message from sw:${e.data}`)
    }
    return worker
}

const init = async() => {
    const worker = await getSharedWorker();
    worker.port.postMessage('hello sw!');
}

init()