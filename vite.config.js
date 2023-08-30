import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

export default ({ mode }) => {
  return defineConfig({
    plugins: [react()],
    define: {
      "process.env.NODE_ENV": `"${mode}"`,
    },
    resolve: {
      alias: {
        'src': path.resolve(__dirname, './src'),
        'IMAGES': path.resolve(__dirname, './src/assets/images')
      },
    },
  })
}
