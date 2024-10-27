import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import dts from 'vite-plugin-dts'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vite.dev/config/
const a = defineConfig(({ mode }) => {
  const devPublicPath = fileURLToPath(new URL('./public', import.meta.url))

  return {
    publicDir: mode === 'development' ? devPublicPath : false,
    plugins: [
      vue(),
      dts({
        tsconfigPath: fileURLToPath(new URL('./tsconfig.app.json', import.meta.url)),
        entryRoot: fileURLToPath(new URL('./src/package', import.meta.url)),
        insertTypesEntry: true
      }),
      viteStaticCopy({
        targets: [
          { src: 'src/package/client.d.ts', dest: '.' },
          { src: 'src/package/styles/light.scss', dest: 'styles' },
          { src: 'src/package/styles/dark.scss', dest: 'styles' },
          { src: 'LICENSE', dest: '.' },
          { src: 'README.md', dest: '.' },
          { src: 'api.md', dest: '.' }
        ]
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@pkg': fileURLToPath(new URL('./src/package', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      },
      devSourcemap: true
    },
    build: {
      sourcemap: true,
      lib: {
        entry: fileURLToPath(new URL('./src/package', import.meta.url)),
        name: 'FakeQQUI'
        // formats: ['es', 'umd', 'cjs']
      },
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          assetFileNames: chunkInfo => {
            if (chunkInfo.name!.endsWith('css')) {
              return 'styles/[name][extname]'
            }
            return 'assets/[name].[ext]'
          },
          globals: {
            vue: 'Vue'
          }
        }
      }
    }
  }
})

export default a
