import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://ilhanaras.github.io',
  base: '/UNI-CHAT/',
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
});
