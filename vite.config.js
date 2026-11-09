import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/node_modules/three/')) return 'three-vendor'
          if (id.includes('/node_modules/@react-three/fiber/')) return 'fiber-vendor'
          if (id.includes('/node_modules/@react-three/drei/')) return 'drei-vendor'
          if (id.includes('/node_modules/gsap/')) return 'gsap-vendor'
          if (id.includes('/node_modules/@studio-freight/lenis/')) return 'lenis-vendor'
          if (id.includes('/node_modules/framer-motion/')) return 'motion-vendor'
        },
      },
    },
  },
})
