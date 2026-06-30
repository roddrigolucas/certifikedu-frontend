/// <reference types="vitest" />

import path from 'path';

import { sentryVitePlugin } from '@sentry/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { checker } from 'vite-plugin-checker';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      ...(mode !== 'development'
        ? [
            checker({
              typescript: true,
              eslint: {
                // prettier-ignore
                lintCommand: "eslint \"./**/*.{js,jsx,ts,tsx}\"",
              },
            }),
          ]
        : []),
      ...(env.SENTRY_AUTH_TOKEN
        ? [
            sentryVitePlugin({
              org: 'certifikedu',
              project: 'platform-web',
              authToken: env.SENTRY_AUTH_TOKEN,
              reactComponentAnnotation: { enabled: true },
            }),
          ]
        : []),
    ],
    publicDir: 'public',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@/assets': path.resolve(__dirname, './public/assets'),
        './runtimeConfig': './runtimeConfig.browser', // Fix Amplify issue.
      },
    },
    server: {
      host: true,
      open: true,
      port: Number(env.PORT ?? 3000),
    },

    build: {
      sourcemap: false,

      rollupOptions: {
        onLog(level, log, handler) {
          if (
            log.cause &&
            (log.cause as Error).message === `Can't resolve original location of error.`
          ) {
            return;
          }
          handler(level, log);
        },
      },
    },
    preview: {
      host: true,
      open: true,
      port: Number(env.PORT ?? 3000),
    },
    define: {
      _global: 'globalThis',
    },
    appType: 'spa',
  };
});
