import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
base: '/solvanta-energy/',
plugins: [react()],
build: {
outDir: "dist",
sourcemap: false,
chunkSizeWarningLimit: 800,
},
preview: {
port: 4173,
},
});
