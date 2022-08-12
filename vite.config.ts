import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import path from 'path'
import tsconfigPaths from 'vite-tsconfig-paths'
import Inspect from 'vite-plugin-inspect'


// @ts-ignore
import EnvGenerator from './src/plugins/vite/env'

export default ({ mode }) => {
  // Load app-level env vars to node-level env vars.
  const env = loadEnv(mode, process.cwd(), '')
  /**
   * @link https://vitejs.dev/config/
   */
  return defineConfig({
    plugins: [
      vue(),
      AutoImport({
        imports: [
          '@vueuse/core',
          'vue',
          'vue-router',
          {
            '@vue/apollo-composable': [
              'useSubscription'
            ]
          }
        ],
        include: [
          /\.[tj]sx?$/,
          /\.vue$/, /\.vue\?vue/,
          /\.md$/
        ],
        dirs: [
          'src/**/composable/*', // blob pattern
          'src/**/store',
        ],
        dts: path.resolve(__dirname, 'types/auto-imports.d.ts'),
        eslintrc: {
          enabled: true,
          globalsPropValue: true
        },
      }),
      Components({
        resolvers: [
          IconsResolver({
            prefix: 'i'
          })
        ],
        dts: path.resolve(__dirname, 'types/components.d.ts')
      }),
      Icons({
        autoInstall: true
      }),
      tsconfigPaths({
        loose: true
      }),
      Inspect({}),
      EnvGenerator()
    ],
    server: {
      port: Number(env.PORT) || 3000,
      proxy: {
        '/bunny': {
          // @ts-ignore
          target: 'https://sg.storage.bunnycdn.com/smileeyev2/',
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/bunny/, '')
        },
        '/smileeye': {
          // @ts-ignore
          target: 'https://v2-be.smileeye.edu.vn/',
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/smileeye/, '')
        }
      },
    }
  })
}
