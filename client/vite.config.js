import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0', // allow access from any network interface
    port: 5173,       // default Vite port, change if needed
    allowedHosts: ['webridev1working-client.onrender.com'],
  },
  optimizeDeps: {
  include: ['react-hot-toast']
}
})
