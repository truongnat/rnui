import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/search',
    component: ComponentCreator('/search', '822'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '3f6'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', 'f08'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '656'),
            routes: [
              {
                path: '/docs/',
                component: ComponentCreator('/docs/', '183'),
                exact: true
              },
              {
                path: '/docs/components',
                component: ComponentCreator('/docs/components', '48d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/accordion',
                component: ComponentCreator('/docs/components/accordion', '716'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/alert',
                component: ComponentCreator('/docs/components/alert', '1f9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/animated-list',
                component: ComponentCreator('/docs/components/animated-list', 'd95'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/app-bar',
                component: ComponentCreator('/docs/components/app-bar', '29e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/autocomplete',
                component: ComponentCreator('/docs/components/autocomplete', '035'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/avatar',
                component: ComponentCreator('/docs/components/avatar', '1e9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/badge',
                component: ComponentCreator('/docs/components/badge', '3bb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/bottom-navigation',
                component: ComponentCreator('/docs/components/bottom-navigation', '4e9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/bottom-sheet',
                component: ComponentCreator('/docs/components/bottom-sheet', '4c1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/box',
                component: ComponentCreator('/docs/components/box', '7ca'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/breadcrumbs',
                component: ComponentCreator('/docs/components/breadcrumbs', '493'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/button',
                component: ComponentCreator('/docs/components/button', '41a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/button-group',
                component: ComponentCreator('/docs/components/button-group', '217'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/card',
                component: ComponentCreator('/docs/components/card', '1e2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/carousel',
                component: ComponentCreator('/docs/components/carousel', 'ee7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/checkbox',
                component: ComponentCreator('/docs/components/checkbox', '238'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/chip',
                component: ComponentCreator('/docs/components/chip', '6aa'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/circular-progress',
                component: ComponentCreator('/docs/components/circular-progress', '24b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/date-picker',
                component: ComponentCreator('/docs/components/date-picker', 'f81'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/dialog',
                component: ComponentCreator('/docs/components/dialog', '317'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/divider',
                component: ComponentCreator('/docs/components/divider', '1b7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/drawer',
                component: ComponentCreator('/docs/components/drawer', '9b1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/empty-state',
                component: ComponentCreator('/docs/components/empty-state', '9eb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/fab',
                component: ComponentCreator('/docs/components/fab', 'b33'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/form-control',
                component: ComponentCreator('/docs/components/form-control', '2b8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/form-field',
                component: ComponentCreator('/docs/components/form-field', '0d4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/grid',
                component: ComponentCreator('/docs/components/grid', 'e3d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/icon',
                component: ComponentCreator('/docs/components/icon', 'bdf'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/image',
                component: ComponentCreator('/docs/components/image', 'b49'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/image-list',
                component: ComponentCreator('/docs/components/image-list', '2e2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/input',
                component: ComponentCreator('/docs/components/input', 'edc'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/linear-progress',
                component: ComponentCreator('/docs/components/linear-progress', '007'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/link',
                component: ComponentCreator('/docs/components/link', 'f90'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/list',
                component: ComponentCreator('/docs/components/list', 'bee'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/menu',
                component: ComponentCreator('/docs/components/menu', 'ea7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/modal',
                component: ComponentCreator('/docs/components/modal', '10e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/otp-input',
                component: ComponentCreator('/docs/components/otp-input', '4ce'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/pagination',
                component: ComponentCreator('/docs/components/pagination', '11e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/paper',
                component: ComponentCreator('/docs/components/paper', '8d6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/password-input',
                component: ComponentCreator('/docs/components/password-input', '07b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/popover',
                component: ComponentCreator('/docs/components/popover', '426'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/popper',
                component: ComponentCreator('/docs/components/popper', 'be0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/pressable',
                component: ComponentCreator('/docs/components/pressable', 'ecc'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/radio-group',
                component: ComponentCreator('/docs/components/radio-group', '16b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/rating',
                component: ComponentCreator('/docs/components/rating', 'ac2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/segmented-control',
                component: ComponentCreator('/docs/components/segmented-control', 'bd6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/select',
                component: ComponentCreator('/docs/components/select', '00a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/skeleton',
                component: ComponentCreator('/docs/components/skeleton', 'db6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/slider',
                component: ComponentCreator('/docs/components/slider', '826'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/snackbar',
                component: ComponentCreator('/docs/components/snackbar', '872'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/speed-dial',
                component: ComponentCreator('/docs/components/speed-dial', 'fa9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/stack',
                component: ComponentCreator('/docs/components/stack', 'f62'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/stepper',
                component: ComponentCreator('/docs/components/stepper', 'd17'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/switch',
                component: ComponentCreator('/docs/components/switch', '452'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/table',
                component: ComponentCreator('/docs/components/table', '524'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/tabs',
                component: ComponentCreator('/docs/components/tabs', '73f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/text-area',
                component: ComponentCreator('/docs/components/text-area', '46a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/text-field',
                component: ComponentCreator('/docs/components/text-field', 'e2d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/timeline',
                component: ComponentCreator('/docs/components/timeline', '02c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/toast',
                component: ComponentCreator('/docs/components/toast', '45e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/toggle-button',
                component: ComponentCreator('/docs/components/toggle-button', '0b1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/tooltip',
                component: ComponentCreator('/docs/components/tooltip', '7be'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/typography',
                component: ComponentCreator('/docs/components/typography', '28d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/getting-started',
                component: ComponentCreator('/docs/getting-started', 'd84'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/headless',
                component: ComponentCreator('/docs/headless', '824'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/theming',
                component: ComponentCreator('/docs/theming', '0c6'),
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
