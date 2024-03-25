import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'https://strive-frontend-staging.onrender.com',
    setupNodeEvents(on, config) {},
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
});
