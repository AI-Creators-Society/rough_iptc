// ex. scripts/build_npm.ts
import { build, emptyDir } from "https://deno.land/x/dnt@0.31.0/mod.ts"
// import { copy } from "https://deno.land/std@0.162.0/fs/mod.ts"

await emptyDir("npm")

await build({
    entryPoints: ["./mod.ts"],
    outDir: "./npm",
    shims: {
        // see JS docs for overview and more options
        deno: {
            test: true,
        },
        blob: true,
        crypto: true,
        custom: [
            {
                package: {
                    name: "textencoder-ponyfill",
                    version: "1.0.2",
                },
                globalNames: ["TextEncoder", "TextDecoder"],
            },
        ],
    },
    test: false,
    rootTestDir: "./test",
    package: {
        // package.json properties
        name: "rough_iptc",
        version: Deno.args[0],
        description: "Get IPTC data from PNG image",
        license: "MIT",
        repository: {
            type: "git",
            url: "git+https://github.com/ai-art-club/iptc.git",
        },
        bugs: {
            url: "https://github.com/ai-art-club/iptc/issues",
        },
    },
})

// post build steps
Deno.copyFileSync("LICENSE", "npm/LICENSE")
Deno.copyFileSync("README.md", "npm/README.md")

await Deno.writeTextFile("npm/.npmignore", "esm/testdata/\nscript/test/\n", { append: true })
