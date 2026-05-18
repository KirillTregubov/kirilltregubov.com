import { createReadStream, statSync } from "node:fs"
import type { IncomingMessage, ServerResponse } from "node:http"
import { join } from "node:path"

import babel from "@rolldown/plugin-babel"
import tailwindcss from "@tailwindcss/vite"
import { devtools } from "@tanstack/devtools-vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react"
import { nitro } from "nitro/vite"
import { defineConfig, type Plugin } from "vite"

function serveRawGlb(
  req: IncomingMessage,
  res: ServerResponse,
  next: () => void,
  publicDir: string,
) {
  const pathname = req.url?.split("?", 1)[0]

  if (!pathname?.startsWith("/assets/") || !pathname.endsWith(".glb")) {
    return next()
  }

  const filePath = join(publicDir, decodeURIComponent(pathname.slice(1)))

  try {
    const stat = statSync(filePath)

    res.writeHead(200, {
      "Content-Type": "model/gltf-binary",
      "Content-Length": stat.size,
      "X-Content-Type-Options": "nosniff",
    })

    createReadStream(filePath).pipe(res)
  } catch {
    next()
  }
}

function rawGlbServeAssets(): Plugin {
  return {
    name: "raw-glb-serve-assets",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        serveRawGlb(req, res, next, join(server.config.root, "public"))
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        serveRawGlb(req, res, next, join(server.config.root, ".output", "public"))
      })
    },
  }
}

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    rawGlbServeAssets(),
    devtools(),
    nitro({ rollupConfig: { external: [/^@sentry\//] } }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
})

export default config
