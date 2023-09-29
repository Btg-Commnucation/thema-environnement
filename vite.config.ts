import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": "/src",
      lib: "/src/lib",
      stores: "/src/stores",
      utils: "/src/utils",
      routes: "/src/routes",
      middleware: "/src/middleware",
      "/": "/public",
    },
  },
  plugins: [svelte()],
});
