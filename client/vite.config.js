import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base:import.meta.env.BASE_URL || "/Rent_And_Lease_MarketPlace_For_House_Hold_Items/tree/main/client"
})
