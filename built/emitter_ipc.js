"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ipc = require('node-ipc');
ipc.config.id = 'hello';
ipc.config.retry = 1500;
ipc.config.silent = true;
exports.prepareBench = function () { return new Promise(function (res) {
    ipc.connectTo('world', function () {
        ipc.of.world.on('connect', function () {
            res();
        });
    });
}); };
exports.runBench = function (N, msg) { return new Promise(function (res) {
    var i = 0;
    ipc.of.world.emit('message', //any event or message type your server listens for
    msg);
    ipc.of.world.on('message', //any event or message type your server listens for
    function (data) {
        if (++i > N) {
            i = 0;
            res();
            return;
        }
        ipc.of.world.emit('message', //any event or message type your server listens for
        msg);
    });
}); };
exports.close = function () { return ipc.disconnect('world'); };
