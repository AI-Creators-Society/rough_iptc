import { decodeChunks, extractChunks } from "../mod.ts"

const imagesPath = "test/images"

Deno.test("denocde chunks", async () => {
    // 0 to 2
    const imageNumbers = [0, 1, 2]
    const extension = ".png"

    await Promise.all(
        imageNumbers.map(async (num) => {
            const data = await Deno.readFile(`${imagesPath}/${num}${extension}`)
            const chunks = extractChunks(data)
            const decodedChunks = chunks.map((chunk) => decodeChunks(chunk))

            console.log(decodedChunks)
        })
    )
})
