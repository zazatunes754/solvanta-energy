import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
base: '/solvanta-energy/',
plugins: [
  react(),
  {
    /**
     * GitHub Pages SPA fallback: GitHub Pages serves a repository's
     * `404.html` for any path it cannot match. Shipping the app shell as
     * `404.html` lets direct visits and refreshes on unknown or future routes
     * boot the SPA. (The prerender step that runs right after this build
     * overwrites 404.html with a prerendered not-found page that still boots
     * the SPA; every *known* route ships as its own prerendered index.html.)
     */
    name: "gh-pages-spa-fallback",
    apply: "build",
    closeBundle() {
      const outDir = path.resolve(import.meta.dirname, "dist");
      fs.copyFileSync(path.join(outDir, "index.html"), path.join(outDir, "404.html"));
      console.log("Wrote dist/404.html (SPA fallback for GitHub Pages)");
    },
  },
],
build: {
outDir: "dist",
sourcemap: false,
chunkSizeWarningLimit: 800,
},
preview: {
port: 4173,
},
});
