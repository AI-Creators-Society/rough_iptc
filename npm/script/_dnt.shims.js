"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dntGlobalThis = exports.TextDecoder = exports.TextEncoder = exports.crypto = exports.Blob = void 0;
const buffer_1 = require("buffer");
var buffer_2 = require("buffer");
Object.defineProperty(exports, "Blob", { enumerable: true, get: function () { return buffer_2.Blob; } });
const shim_crypto_1 = require("@deno/shim-crypto");
var shim_crypto_2 = require("@deno/shim-crypto");
Object.defineProperty(exports, "crypto", { enumerable: true, get: function () { return shim_crypto_2.crypto; } });
const textencoder_ponyfill_1 = require("textencoder-ponyfill");
var textencoder_ponyfill_2 = require("textencoder-ponyfill");
Object.defineProperty(exports, "TextEncoder", { enumerable: true, get: function () { return textencoder_ponyfill_2.TextEncoder; } });
Object.defineProperty(exports, "TextDecoder", { enumerable: true, get: function () { return textencoder_ponyfill_2.TextDecoder; } });
const dntGlobals = {
    Blob: buffer_1.Blob,
    crypto: shim_crypto_1.crypto,
    TextEncoder: textencoder_ponyfill_1.TextEncoder,
    TextDecoder: textencoder_ponyfill_1.TextDecoder,
};
exports.dntGlobalThis = createMergeProxy(globalThis, dntGlobals);
// deno-lint-ignore ban-types
function createMergeProxy(baseObj, extObj) {
    return new Proxy(baseObj, {
        get(_target, prop, _receiver) {
            if (prop in extObj) {
                return extObj[prop];
            }
            else {
                return baseObj[prop];
            }
        },
        set(_target, prop, value) {
            if (prop in extObj) {
                delete extObj[prop];
            }
            baseObj[prop] = value;
            return true;
        },
        deleteProperty(_target, prop) {
            let success = false;
            if (prop in extObj) {
                delete extObj[prop];
                success = true;
            }
            if (prop in baseObj) {
                delete baseObj[prop];
                success = true;
            }
            return success;
        },
        ownKeys(_target) {
            const baseKeys = Reflect.ownKeys(baseObj);
            const extKeys = Reflect.ownKeys(extObj);
            const extKeysSet = new Set(extKeys);
            return [...baseKeys.filter((k) => !extKeysSet.has(k)), ...extKeys];
        },
        defineProperty(_target, prop, desc) {
            if (prop in extObj) {
                delete extObj[prop];
            }
            Reflect.defineProperty(baseObj, prop, desc);
            return true;
        },
        getOwnPropertyDescriptor(_target, prop) {
            if (prop in extObj) {
                return Reflect.getOwnPropertyDescriptor(extObj, prop);
            }
            else {
                return Reflect.getOwnPropertyDescriptor(baseObj, prop);
            }
        },
        has(_target, prop) {
            return prop in extObj || prop in baseObj;
        },
    });
}
