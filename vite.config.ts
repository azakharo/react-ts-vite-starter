import * as path from 'path';
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import eslint from 'vite-plugin-eslint';

export default () => {
  return defineConfig({
    plugins: [
      react(),
      // svgr options: https://react-svgr.com/docs/options/
      svgr({svgrOptions: {icon: true}}),
      eslint({fix: true}),
    ],
    resolve: {
      alias: {
        src: path.resolve(__dirname, './src'),
        IMAGES: path.resolve(__dirname, './src/assets/images'),
      },
    },
    server: {
      open: true,
      port: 4000,
    },
  });
};
