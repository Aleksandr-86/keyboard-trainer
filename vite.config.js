import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
process.env.BROWSER = "chrome";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/keyboard-trainer/",
  plugins: [vue()],
  server: {
    open: "index.html",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "es2020",
    },
  },
  build: {
    target: "es2020",
    outDir: "docs",
    emptyOutDir: true,
    sourcemap: true,
  },
});
