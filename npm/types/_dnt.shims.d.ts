import { Deno } from "@deno/shim-deno-test";
export { Deno } from "@deno/shim-deno-test";
import { Blob } from "buffer";
export { Blob } from "buffer";
export { crypto, type Crypto, type SubtleCrypto, type AlgorithmIdentifier, type Algorithm, type RsaOaepParams, type BufferSource, type AesCtrParams, type AesCbcParams, type AesGcmParams, type CryptoKey, type KeyAlgorithm, type KeyType, type KeyUsage, type EcdhKeyDeriveParams, type HkdfParams, type HashAlgorithmIdentifier, type Pbkdf2Params, type AesDerivedKeyParams, type HmacImportParams, type JsonWebKey, type RsaOtherPrimesInfo, type KeyFormat, type RsaHashedKeyGenParams, type RsaKeyGenParams, type BigInteger, type EcKeyGenParams, type NamedCurve, type CryptoKeyPair, type AesKeyGenParams, type HmacKeyGenParams, type RsaHashedImportParams, type EcKeyImportParams, type AesKeyAlgorithm, type RsaPssParams, type EcdsaParams } from "@deno/shim-crypto";
import { TextEncoder, TextDecoder } from "textencoder-ponyfill";
export { TextEncoder, TextDecoder } from "textencoder-ponyfill";
export declare const dntGlobalThis: Omit<typeof globalThis, "Deno" | "Blob" | "crypto" | "TextEncoder" | "TextDecoder"> & {
    Deno: typeof Deno;
    Blob: typeof Blob;
    crypto: import("@deno/shim-crypto").Crypto;
    TextEncoder: typeof TextEncoder;
    TextDecoder: typeof TextDecoder;
};
