"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var roletalk_1 = require("roletalk");
var emitter = new roletalk_1.Peer({ name: 'emitter' });
exports.prepareBench = function () { return new Promise(function (res) {
    emitter.role('msg_emitter');
    emitter.connect('ws://localhost:8000').then(function () {
        res();
    });
}); };
exports.runBench = function (N, msg) { return new Promise(function (res) {
    var i = 0;
    emitter.destination('msg_mirror').send('message', msg);
    emitter.role('msg_emitter').onMessage('message', function (ctx) {
        if (++i > N) {
            i = 0;
            res();
            return;
        }
        emitter.destination('msg_mirror').send('message', msg);
    });
}); };
exports.close = function () { return emitter.close(); };
