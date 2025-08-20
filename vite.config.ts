import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
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
