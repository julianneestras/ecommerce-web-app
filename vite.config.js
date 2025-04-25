import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    createSvgIconsPlugin({
      // Icon folder path
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      // Specify the symbolId format
      symbolId: "icon-[dir]-[name]",
    }),
  ],
});
