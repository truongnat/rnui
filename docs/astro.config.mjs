// @ts-check

import react from '@astrojs/react';
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://rnui.vercel.app',
  integrations: [
    react(),
    starlight({
      title: 'RNUI',
      customCss: ['./src/styles/custom.css', './src/styles/preview.css'],
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/truongnat/rnui',
        },
      ],
      sidebar: [
        {
          label: 'Introduction',
          items: [
            { label: 'Getting Started', slug: 'getting-started' },
            { label: 'Theming', slug: 'theming' },
            { label: 'Headless Hooks', slug: 'headless' },
            { label: 'Component Tree', slug: 'component-tree' },
            { label: 'Component Status', slug: 'components/status' },
            { label: 'AI usage', slug: 'guides/ai-usage' },
            { label: 'Component schema', slug: 'guides/component-schema' },
            { label: 'AI Render Core', slug: 'guides/ai-renderer' },
            { label: 'Screen renderer', slug: 'guides/screen-renderer' },
            { label: 'Web builder', slug: 'guides/web-builder' },
            { label: 'Example app', slug: 'guides/example' },
          ],
        },
        {
          label: 'Components',
          autogenerate: { directory: 'components' },
        },
      ],
    }),
  ],
});
