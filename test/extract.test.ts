import { extractChunks } from "../mod.ts"
import { assertEquals } from "../deps.ts"
import { chunksToHash } from "../test.ts"

const imagesPath = "test/images"

Deno.test("extract chunks", async () => {
    // 0 to 2
    const imageNumbers = [0, 1, 2]
    const extension = ".png"
    const hashes = [
        "c6e0035c8c83a01e4b07d02f683bb466df7c1ecfce61d60cd9d37687e6e1b651",
        "4c2c8935355c60827aa166c25d5962ea5c1ef4135e0f0c48b683893c004197f6",
        "28f3332ffc05647b2685a16d84249e5b61118d58b0f80ba77a097d516501c05c",
    ]

    await Promise.all(
        imageNumbers.map(async (index, num) => {
            const data = await Deno.readFile(`${imagesPath}/${num}${extension}`)
            const chunks = extractChunks(data)

            const hash = await chunksToHash(chunks)

            assertEquals(hash, hashes[index])
        })
    )
})
