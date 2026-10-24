import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// `npm run build` يبني الموقع العادي، و `npm run build:single` يبني ملف HTML واحد فيه كل شي
// base: './' حتى يشتغل الموقع من أي رابط (مثلاً GitHub Pages تحت /marshmallow/)
export default defineConfig(({ mode }) => ({
  base: './',
  plugins: [react(), ...(mode === 'single' ? [viteSingleFile()] : [])],
  build: mode === 'single' ? { outDir: 'dist-single' } : {},
}))
