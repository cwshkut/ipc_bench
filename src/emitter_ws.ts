import { Peer } from 'roletalk'

const emitter = new Peer({ name: 'emitter' })

export const prepareBench = () => new Promise(res => {
    emitter.role('msg_emitter')
    emitter.connect('ws://localhost:8000').then(() => {
        res()
    })
})


export const runBench = (N: number, msg: string) => new Promise<void>((res) => {
    let i = 0
    emitter.destination('msg_mirror').send('message', msg)
    emitter.role('msg_emitter').onMessage('message', (ctx) => {
        if (++i > N) {
            i = 0
            res()
            return
        }
        emitter.destination('msg_mirror').send('message', msg)
    })
})

export const close = () => emitter.close()
