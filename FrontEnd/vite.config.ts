import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    return {
        plugins: [react(), svgr()],
        base: "./",
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
        esbuild: {
            drop: mode === "development" ? [] : ["console", "debugger"],
        },
    };
});
