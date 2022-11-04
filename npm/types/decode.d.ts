import { Chunk } from "./extract.js";
export interface DecodedChunk {
    keyword: string;
    text: string;
}
export declare const decodeChunks: (chunk: Chunk) => DecodedChunk;
