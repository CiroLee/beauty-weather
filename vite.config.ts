import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import px2vw from '@yuo/postcss-px2vw';
import autoprefixer from 'autoprefixer';
// https://vitejs.dev/config/
export default defineConfig({
  base: '/beauty-weather/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    modules: {
      generateScopedName: '[name]_[local]_[hash:base64:5]',
    },
    postcss: {
      // 自动追加前缀
      plugins: [
        autoprefixer(),
        px2vw({
          unitToConvert: 'px',
          viewportWidth: 375,
          unitPrecision: 5,
          propList: ['*'],
          viewportUnit: 'vw',
          fontViewportUnit: 'vw',
          selectorBlackList: ['.ignore'],
          minPixelValue: 1,
          mediaQuery: false,
          replace: true,
        }),
      ],
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/style/mixins.scss";`,
      },
    },
  },
});
