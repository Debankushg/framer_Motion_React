import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0", // Allows access from any IP
    port: 7600,
    strictPort: true, // Ensures it doesn't change ports if 5173 is busy
    allowedHosts: ["localhost"],
  },
  preview: {
    // host: '0.0.0.0',
    port: 7600, // Ensure preview runs on the correct port
    allowedHosts: ["localhost"], // Allow external domain
  },
});
