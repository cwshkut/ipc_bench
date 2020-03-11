import { runBench as wsBench, prepareBench as prepareWSBench, close as wsClose } from './emitter_ws'
import { runBench as ipcBench, prepareBench as prepareIPCBench, close as ipcClose } from './emitter_ipc'
import { randomBytes } from 'crypto'

async function compareResults() {
    const N = 1000 * 10
    const msgLength = 100

    const msg = randomBytes(msgLength).toString()

    await prepareWSBench()
    console.log('WS bench prepared')
    await prepareIPCBench()
    console.log('IPC bench prepared')

    let t1 = Date.now()
    await ipcBench(N, msg)
    let diff1 = Date.now() - t1
    console.log(`IPC bench done: ${N} round trips for ${diff1} ms (freq = ${(N / diff1).toFixed(2)})`)

    let t = Date.now()
    await wsBench(N, msg)
    let diff = Date.now() - t
    console.log(`WS bench done: ${N} round trips for ${diff} ms (freq = ${(N / diff).toFixed(2)})`)

    ipcClose()
    wsClose()
}

compareResults()