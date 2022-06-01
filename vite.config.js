import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/keyboard-trainer/",
  plugins: [vue()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true,
  },
});
