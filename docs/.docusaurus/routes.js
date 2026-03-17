import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/docs',
    component: ComponentCreator('/docs', '4a3'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '0d9'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', 'a5e'),
            routes: [
              {
                path: '/docs/',
                component: ComponentCreator('/docs/', '0ee'),
                exact: true
              },
              {
                path: '/docs/components/bottom-sheet',
                component: ComponentCreator('/docs/components/bottom-sheet', 'c00'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/button',
                component: ComponentCreator('/docs/components/button', 'd2e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/getting-started',
                component: ComponentCreator('/docs/getting-started', '2a1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/headless',
                component: ComponentCreator('/docs/headless', '70b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/theming',
                component: ComponentCreator('/docs/theming', '6b1'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '2e1'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
