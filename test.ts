import { Chunk } from "./extract.ts"

export const bufferToHash = async (buffer: Uint8Array): Promise<string> => {
    const hash = await crypto.subtle.digest("SHA-256", buffer)

    const hashHex = Array.from(new Uint8Array(hash))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")

    return hashHex
}

export const chunksToHash = async (chunks: Chunk[]): Promise<string> => {
    const buffer = chunks
        .map((chunk) => chunk.data)
        .reduce((a, b) => {
            return new Uint8Array([...a, ...b])
        }, new Uint8Array(0))

    return await bufferToHash(buffer)
}
