import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // server : {
  //   proxy : {
  //     '/backend' : {
  //       target: 'http://localhost', // or your backend's address
  //       secure : false,
  //       rewrite: (path) => path.replace(/^\/backend\//, '/') // remove trailing slash
  //   }
  //   }
  // },
  plugins: [react()],
})
