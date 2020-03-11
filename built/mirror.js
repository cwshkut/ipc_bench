"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var roletalk_1 = require("roletalk");
var ipc = require('node-ipc');
var mirror = new roletalk_1.Peer({ name: 'mirror' });
mirror.listen(8000);
mirror.role('msg_mirror').onMessage('message', function (ctx) {
    mirror.destination('msg_emitter').send('message', ctx.data);
});
ipc.config.id = 'world';
ipc.config.retry = 1500;
ipc.config.silent = true;
ipc.serve(function () {
    ipc.server.on('message', function (data, socket) {
        ipc.log('got a message : ', data);
        ipc.server.emit(socket, 'message', data);
    });
});
ipc.server.start();
