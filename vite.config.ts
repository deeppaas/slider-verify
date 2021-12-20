import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // 为了在github pages加载css不报错 和 仓库名相同
  base: 'react-component-template',
  build: {
    outDir: 'docs',
  },
  plugins: [react()],
})
