import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Vite Configuration
 * 
 * This file configures the Vite build tool for the React project.
 * It handles server settings, plugins, environment variables, and path aliases.
 */
export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode (development, production, etc.)
  // The third argument '' ensures all env vars are loaded, not just those with VITE_ prefix.
  const env = loadEnv(mode, '.', '');

  return {
    // Server configuration
    server: {
      port: 3000, // Run the dev server on port 3000
      host: '0.0.0.0', // Expose the server to the network (accessible externally)
    },

    // Plugins used by Vite
    plugins: [
      react() // Enables React support with Fast Refresh
    ],

    // Define global constants that can be replaced at build time
    define: {
      // Expose the GEMINI_API_KEY to the client-side code safely
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },

    // Module resolution options
    resolve: {
      alias: {
        // Set up an alias '@' to point to the project root directory
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
