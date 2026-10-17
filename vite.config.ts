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
     * `404.html` for any path it cannot match. Shipping a copy of the app
     * shell as `404.html` lets direct visits and refreshes on nested routes
     * (e.g. /solvanta-energy/contact) boot the SPA, after which React
     * Router renders the correct page instead of the host's error page.
     */
    name: "gh-pages-spa-fallback",
    apply: "build",
    closeBundle() {
      const outDir = path.resolve(__dirname, "dist");
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
