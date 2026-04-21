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
