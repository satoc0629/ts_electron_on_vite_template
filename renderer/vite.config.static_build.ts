import {builtinModules} from 'module'
import react from '@vitejs/plugin-react'

export default {
  root: __dirname,         // レンダリングプロセスのディレクトリを指す
  // root: "./",         // レンダリングプロセスのディレクトリを指す
  base: './',              // index.htmlに読み込まれる静的リソースの場所；例：src=". /index.js"
  build: {
    outDir: '../dist/renderer',
    // emptyOutDir: true,
    assetsDir: '',         // デフォルトのアセットを使用すると、Electronパッケージの後にfile://ベースのロードに失敗するので、この点には十分注意してください。
    rollupOptions: {
      output: {
        format: 'cjs',     // cjs, es Electronは現在CommonJs形式のみをサポートしています。
      },
      external: [          // 組み込みAPIをパッケージ化しないようRollupに指示する
        'electron',
        ...builtinModules,
      ],
    },
  },
  optimizeDeps: {
    exclude: ['electron'], // Vite に、ビルド済みの electron を除外するように指示するか、__diranme が定義されていない場合
  },
  plugins: [react()]
}