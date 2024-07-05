import { defineConfig,loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from "dotenv"
dotenv.config()
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
 
  define: {
    GENAI_APIKEY:`"${process.env.GENAI_APIKEY}"`,
    GOOGLE_SPREAD_SHEET_API:`"${process.env.GOOGLE_SPREAD_SHEET_API}"`
  },
})
