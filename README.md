# Rough IPTC Chunk Reader

# Usage

## Deno

```ts
import { decodeChunks, extractChunks } from "https://deno.land/x/rough_iptc/mod.ts"

const data = await Deno.readFile("path/to/image.png")
const chunks = extractChunks(data)
const decodedChunks = chunks.map((chunk) => decodeChunks(chunk))

console.log(decodedChunks)
```

