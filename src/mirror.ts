import { Peer } from 'roletalk'
var ipc = require('node-ipc');

const mirror = new Peer({ name: 'mirror' })
mirror.listen(8000)

mirror.role('msg_mirror').onMessage('message', (ctx) => {
    mirror.destination('msg_emitter').send('message', ctx.data)
})


ipc.config.id = 'world';
ipc.config.retry = 1500;
ipc.config.silent = true

ipc.serve(
    function () {
        ipc.server.on(
            'message',
            function (data: any, socket: any) {
                ipc.log('got a message : ', data);
                ipc.server.emit(
                    socket,
                    'message',
                    data
                );
            }
        );
    }
);

ipc.server.start();