import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import plugin from "@stylexjs/rollup-plugin";

import alias from "./src/contants/paths";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), plugin()],
    resolve: {
        alias,
    },
});
