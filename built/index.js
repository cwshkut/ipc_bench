"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var emitter_ws_1 = require("./emitter_ws");
var emitter_ipc_1 = require("./emitter_ipc");
var crypto_1 = require("crypto");
function compareResults() {
    return __awaiter(this, void 0, void 0, function () {
        var N, msgLength, msg, t1, diff1, t, diff;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    N = 1000 * 10;
                    msgLength = 100;
                    msg = crypto_1.randomBytes(msgLength).toString();
                    return [4 /*yield*/, emitter_ws_1.prepareBench()];
                case 1:
                    _a.sent();
                    console.log('WS bench prepared');
                    return [4 /*yield*/, emitter_ipc_1.prepareBench()];
                case 2:
                    _a.sent();
                    console.log('IPC bench prepared');
                    t1 = Date.now();
                    return [4 /*yield*/, emitter_ipc_1.runBench(N, msg)];
                case 3:
                    _a.sent();
                    diff1 = Date.now() - t1;
                    console.log("IPC bench done: " + N + " round trips for " + diff1 + " ms (freq = " + (N / diff1).toFixed(2) + ")");
                    t = Date.now();
                    return [4 /*yield*/, emitter_ws_1.runBench(N, msg)];
                case 4:
                    _a.sent();
                    diff = Date.now() - t;
                    console.log("WS bench done: " + N + " round trips for " + diff + " ms (freq = " + (N / diff).toFixed(2) + ")");
                    emitter_ipc_1.close();
                    emitter_ws_1.close();
                    return [2 /*return*/];
            }
        });
    });
}
compareResults();
