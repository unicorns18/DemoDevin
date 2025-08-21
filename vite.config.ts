import path from "path"
import vue from "@vitejs/plugin-vue"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [vue()],
  server: {
    host: '127.0.0.1',
    port: 5173,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Remove: root: "public",
  build: {
    outDir: "dist", // Changed from "../dist"
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, "index.html"), // Changed from "public/index.html"
    },
  },
})
