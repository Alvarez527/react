// // <reference types="vitest" />
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// // https://vite.dev/config/
// export default defineConfig(({mode}){
//     const env = loadEnv(mode, process.cwd(), '')
//     return(
//     plugins: [react()],
//     test: {
//         environment: 'happy-dom',
//         env: env
//     })
// })

export default defineConfig(({ mode }) => {
    // Carga variables desde .env.test
    const env = loadEnv(mode, process.cwd(), '')
    process.env.VITE_OPENAI_API_KEY = env.VITE_OPENAI_API_KEY
    // Load all environment variables
    return {
        plugins: [react()],
        test: {
            environment: 'happy-dom',
        },
    }
})
