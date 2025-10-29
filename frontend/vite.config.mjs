import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        // Use a different dev server port so the backend can run on 8080
        port: 5173
    }
})

