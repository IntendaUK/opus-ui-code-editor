import { resolve } from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import * as packageJson from './package.json'
import libCss from 'vite-plugin-libcss';

export default defineConfig(configEnv => ({
  plugins: [
    libCss(),
    react({
      babel: {
        "plugins": [
      [
        "prismjs",
        {
          "languages": [
            "bash",
            "markup",
            "jsx",
            "json"
          ],
          "theme": "twilight",
          "css": true
        }
      ]
    ]
      }
    }),
  ],
  build: {
    lib: {
      entry: resolve('src', 'library.js'),
      name: '@intenda/opus-ui-code-editor',
      formats: ['es'],
      fileName: () => `lib.js`,
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
    },
  },
}))