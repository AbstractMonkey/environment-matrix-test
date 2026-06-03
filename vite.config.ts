import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The `base` MUST match the GitHub Pages repo name so asset URLs resolve under
// https://<user>.github.io/environment-matrix-test/
export default defineConfig({
  plugins: [react()],
  base: '/environment-matrix-test/',
})
