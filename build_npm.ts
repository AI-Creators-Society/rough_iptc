// ex. scripts/build_npm.ts
import { build, emptyDir } from "https://deno.land/x/dnt@0.31.0/mod.ts"

await emptyDir("./npm")

await build({
    entryPoints: ["./mod.ts"],
    outDir: "./npm",
    shims: {
        // see JS docs for overview and more options
        deno: true,
    },
    package: {
        // package.json properties
        name: "iptc",
        version: Deno.args[0],
        description: "Get IPTC data from PNG image",
        license: "MIT",
        repository: {
            type: "git",
            url: "https://github.com/ai-art-club/iptc.git",
        },
        bugs: {
            url: "https://github.com/ai-art-club/iptc/issues",
        },
    },
})

// post build steps
Deno.copyFileSync("LICENSE", "npm/LICENSE")
Deno.copyFileSync("README.md", "npm/README.md")
