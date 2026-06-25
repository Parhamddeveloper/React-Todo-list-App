import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  server: {
    host: true,
    port: 5173,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "robots.txt", "apple-touch-icon.png"],
      manifest: {
        name: "React Todo List App",
        short_name: "Todo",
        description: "A todo list app made by Parham Daneshnejad",
        start_url: "/",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "/img/logo192x192.png", // Small icon
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/img/logo512x512.png", // Large icon
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable", // Works in various environments
          },
        ],
      },
    }),
  ],
});
