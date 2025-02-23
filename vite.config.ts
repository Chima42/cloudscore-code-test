import { PluginOption } from "vite";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()] as PluginOption[],
  test: {
    globals: true, // Enables global `test`, `expect`, etc.
    environment: "jsdom", // Simulates a browser environment for React components
    setupFiles: "./src/setupTests.ts", // Setup file for Jest matchers
    coverage: {
      reporter: ["text", "json", "html"], // Enables test coverage reports
    },
  },
});
