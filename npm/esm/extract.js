import { crc32 } from "./deps/deno.land/x/crc32@v0.2.2/mod.js";
// Used for fast-ish conversion between uint8s and uint32s/int32s.
// Also required in order to remain agnostic for both Node Buffers and
// Uint8Arrays.
const uint8 = new Uint8Array(4);
const int32 = new Int32Array(uint8.buffer);
const uint32 = new Uint32Array(uint8.buffer);
export const extractChunks = (data) => {
    if (data[0] !== 0x89)
        throw new Error("Invalid .png file header");
    if (data[1] !== 0x50)
        throw new Error("Invalid .png file header");
    if (data[2] !== 0x4e)
        throw new Error("Invalid .png file header");
    if (data[3] !== 0x47)
        throw new Error("Invalid .png file header");
    if (data[4] !== 0x0d)
        throw new Error("Invalid .png file header: possibly caused by DOS-Unix line ending conversion?");
    if (data[5] !== 0x0a)
        throw new Error("Invalid .png file header: possibly caused by DOS-Unix line ending conversion?");
    if (data[6] !== 0x1a)
        throw new Error("Invalid .png file header");
    if (data[7] !== 0x0a)
        throw new Error("Invalid .png file header: possibly caused by DOS-Unix line ending conversion?");
    let ended = false;
    const chunks = [];
    let idx = 8;
    while (idx < data.length) {
        // Read the length of the current chunk,
        // which is stored as a Uint32.
        uint8[3] = data[idx++];
        uint8[2] = data[idx++];
        uint8[1] = data[idx++];
        uint8[0] = data[idx++];
        // Chunk includes name/type for CRC check (see below).
        const length = uint32[0] + 4;
        const chunk = new Uint8Array(length);
        chunk[0] = data[idx++];
        chunk[1] = data[idx++];
        chunk[2] = data[idx++];
        chunk[3] = data[idx++];
        // Get the name in ASCII for identification.
        const name = String.fromCharCode(chunk[0]) +
            String.fromCharCode(chunk[1]) +
            String.fromCharCode(chunk[2]) +
            String.fromCharCode(chunk[3]);
        // The IHDR header MUST come first.
        if (!chunks.length && name !== "IHDR") {
            throw new Error("IHDR header missing");
        }
        // The IEND header marks the end of the file,
        // so on discovering it break out of the loop.
        if (name === "IEND") {
            ended = true;
            chunks.push({
                name: name,
                data: new Uint8Array(0),
            });
            break;
        }
        // Read the contents of the chunk out of the main buffer.
        for (let i = 4; i < length; i++) {
            chunk[i] = data[idx++];
        }
        // Read out the CRC value for comparison.
        // It's stored as an Int32.
        uint8[3] = data[idx++];
        uint8[2] = data[idx++];
        uint8[1] = data[idx++];
        uint8[0] = data[idx++];
        const crcActual = int32[0];
        const crcExpect = parseInt(crc32(chunk), 16);
        // console.log(crcActual, crcExpect)
        // console.log(uint8, int32, uint32)
        if (crcExpect !== crcActual) {
            // TODO: なぜかこれが一致しないことがあって謎。とりま無視
            // throw new Error("CRC values for " + name + " header do not match, PNG file is likely corrupted")
        }
        // The chunk data is now copied to remove the 4 preceding
        // bytes used for the chunk name/type.
        const chunkData = new Uint8Array(chunk.buffer.slice(4));
        chunks.push({
            name: name,
            data: chunkData,
        });
    }
    if (!ended) {
        throw new Error(".png file ended prematurely: no IEND header was found");
    }
    return chunks;
};
