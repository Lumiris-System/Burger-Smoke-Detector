import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' : le site fonctionne quel que soit le nom du dépôt GitHub
export default defineConfig({
  base: './',
  plugins: [react()],
})
