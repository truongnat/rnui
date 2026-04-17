import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/search',
    component: ComponentCreator('/search', '822'),
    exact: true,
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '720'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '47d'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', 'e0a'),
            routes: [
              {
                path: '/docs/',
                component: ComponentCreator('/docs/', '183'),
                exact: true,
              },
              {
                path: '/docs/components',
                component: ComponentCreator('/docs/components', '48d'),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/accordion',
                component: ComponentCreator(
                  '/docs/components/accordion',
                  'e06'
                ),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/alert',
                component: ComponentCreator('/docs/components/alert', 'e5b'),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/animated-list',
                component: ComponentCreator(
                  '/docs/components/animated-list',
                  'eec'
                ),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/app-bar',
                component: ComponentCreator('/docs/components/app-bar', '89e'),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/autocomplete',
                component: ComponentCreator(
                  '/docs/components/autocomplete',
                  '9ef'
                ),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/avatar',
                component: ComponentCreator('/docs/components/avatar', 'ed4'),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/badge',
                component: ComponentCreator('/docs/components/badge', '67f'),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/bottom-navigation',
                component: ComponentCreator(
                  '/docs/components/bottom-navigation',
                  'f69'
                ),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/bottom-sheet',
                component: ComponentCreator(
                  '/docs/components/bottom-sheet',
                  'a1a'
                ),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/box',
                component: ComponentCreator('/docs/components/box', '922'),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/breadcrumbs',
                component: ComponentCreator(
                  '/docs/components/breadcrumbs',
                  'f24'
                ),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/button',
                component: ComponentCreator('/docs/components/button', 'f9a'),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/button-group',
                component: ComponentCreator(
                  '/docs/components/button-group',
                  '078'
                ),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/card',
                component: ComponentCreator('/docs/components/card', '519'),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/carousel',
                component: ComponentCreator('/docs/components/carousel', '368'),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/checkbox',
                component: ComponentCreator('/docs/components/checkbox', '24d'),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/chip',
                component: ComponentCreator('/docs/components/chip', '7a9'),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/circular-progress',
                component: ComponentCreator(
                  '/docs/components/circular-progress',
                  '433'
                ),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/date-picker',
                component: ComponentCreator(
                  '/docs/components/date-picker',
                  'c6b'
                ),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/dialog',
                component: ComponentCreator('/docs/components/dialog', '52b'),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/divider',
                component: ComponentCreator('/docs/components/divider', 'e8c'),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/drawer',
                component: ComponentCreator('/docs/components/drawer', 'a48'),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/empty-state',
                component: ComponentCreator(
                  '/docs/components/empty-state',
                  '12e'
                ),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/fab',
                component: ComponentCreator('/docs/components/fab', '568'),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/form-control',
                component: ComponentCreator(
                  '/docs/components/form-control',
                  'ffa'
                ),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/form-field',
                component: ComponentCreator(
                  '/docs/components/form-field',
                  '37f'
                ),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/grid',
                component: ComponentCreator('/docs/components/grid', 'b2e'),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/icon',
                component: ComponentCreator('/docs/components/icon', 'aa2'),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/image',
                component: ComponentCreator('/docs/components/image', 'b10'),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/image-list',
                component: ComponentCreator(
                  '/docs/components/image-list',
                  '9cc'
                ),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/input',
                component: ComponentCreator('/docs/components/input', '629'),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/linear-progress',
                component: ComponentCreator(
                  '/docs/components/linear-progress',
                  '98a'
                ),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/link',
                component: ComponentCreator('/docs/components/link', '3d3'),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/list',
                component: ComponentCreator('/docs/components/list', '508'),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/menu',
                component: ComponentCreator('/docs/components/menu', 'f22'),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/modal',
                component: ComponentCreator('/docs/components/modal', 'd70'),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/otp-input',
                component: ComponentCreator(
                  '/docs/components/otp-input',
                  'c22'
                ),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/pagination',
                component: ComponentCreator(
                  '/docs/components/pagination',
                  '8c2'
                ),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/paper',
                component: ComponentCreator('/docs/components/paper', 'bfb'),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/password-input',
                component: ComponentCreator(
                  '/docs/components/password-input',
                  '81a'
                ),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/popover',
                component: ComponentCreator('/docs/components/popover', '82c'),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/popper',
                component: ComponentCreator('/docs/components/popper', 'c88'),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/pressable',
                component: ComponentCreator(
                  '/docs/components/pressable',
                  '2a6'
                ),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/radio-group',
                component: ComponentCreator(
                  '/docs/components/radio-group',
                  '19e'
                ),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/rating',
                component: ComponentCreator('/docs/components/rating', 'd4c'),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/segmented-control',
                component: ComponentCreator(
                  '/docs/components/segmented-control',
                  '1e2'
                ),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/select',
                component: ComponentCreator('/docs/components/select', '137'),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/skeleton',
                component: ComponentCreator('/docs/components/skeleton', 'a50'),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/slider',
                component: ComponentCreator('/docs/components/slider', 'a36'),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/snackbar',
                component: ComponentCreator('/docs/components/snackbar', '5b6'),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/speed-dial',
                component: ComponentCreator(
                  '/docs/components/speed-dial',
                  '37c'
                ),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/stack',
                component: ComponentCreator('/docs/components/stack', 'c87'),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/stepper',
                component: ComponentCreator('/docs/components/stepper', '42f'),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/switch',
                component: ComponentCreator('/docs/components/switch', 'd90'),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/table',
                component: ComponentCreator('/docs/components/table', 'a90'),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/tabs',
                component: ComponentCreator('/docs/components/tabs', 'c97'),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/text-area',
                component: ComponentCreator(
                  '/docs/components/text-area',
                  '8a6'
                ),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/text-field',
                component: ComponentCreator(
                  '/docs/components/text-field',
                  'a72'
                ),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/timeline',
                component: ComponentCreator('/docs/components/timeline', '70f'),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/toast',
                component: ComponentCreator('/docs/components/toast', '255'),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/toggle-button',
                component: ComponentCreator(
                  '/docs/components/toggle-button',
                  'd7e'
                ),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/tooltip',
                component: ComponentCreator('/docs/components/tooltip', '5bb'),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/components/typography',
                component: ComponentCreator(
                  '/docs/components/typography',
                  '97a'
                ),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/getting-started',
                component: ComponentCreator('/docs/getting-started', 'b78'),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/headless',
                component: ComponentCreator('/docs/headless', '3f2'),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
              {
                path: '/docs/theming',
                component: ComponentCreator('/docs/theming', 'b1d'),
                exact: true,
                sidebar: 'tutorialSidebar',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/',
    component: ComponentCreator('/', '2e1'),
    exact: true,
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
