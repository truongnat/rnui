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
    component: ComponentCreator('/docs', 'e83'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '079'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', 'a4c'),
            routes: [
              {
                path: '/docs/',
                component: ComponentCreator('/docs/', 'a42'),
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
                component: ComponentCreator('/docs/components/accordion', 'd2f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/alert',
                component: ComponentCreator('/docs/components/alert', '3cb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/animated-list',
                component: ComponentCreator('/docs/components/animated-list', '917'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/app-bar',
                component: ComponentCreator('/docs/components/app-bar', '08e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/autocomplete',
                component: ComponentCreator('/docs/components/autocomplete', '475'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/avatar',
                component: ComponentCreator('/docs/components/avatar', '472'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/badge',
                component: ComponentCreator('/docs/components/badge', '6e6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/bottom-navigation',
                component: ComponentCreator('/docs/components/bottom-navigation', '655'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/bottom-sheet',
                component: ComponentCreator('/docs/components/bottom-sheet', '69a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/box',
                component: ComponentCreator('/docs/components/box', '475'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/breadcrumbs',
                component: ComponentCreator('/docs/components/breadcrumbs', '6aa'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/button',
                component: ComponentCreator('/docs/components/button', '27f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/button-group',
                component: ComponentCreator('/docs/components/button-group', '9f1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/card',
                component: ComponentCreator('/docs/components/card', '9be'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/carousel',
                component: ComponentCreator('/docs/components/carousel', '885'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/checkbox',
                component: ComponentCreator('/docs/components/checkbox', '1e8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/chip',
                component: ComponentCreator('/docs/components/chip', '257'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/circular-progress',
                component: ComponentCreator('/docs/components/circular-progress', 'ea1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/date-picker',
                component: ComponentCreator('/docs/components/date-picker', 'aee'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/dialog',
                component: ComponentCreator('/docs/components/dialog', '90f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/divider',
                component: ComponentCreator('/docs/components/divider', '7af'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/drawer',
                component: ComponentCreator('/docs/components/drawer', 'a94'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/empty-state',
                component: ComponentCreator('/docs/components/empty-state', '017'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/fab',
                component: ComponentCreator('/docs/components/fab', '6be'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/form-control',
                component: ComponentCreator('/docs/components/form-control', '821'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/form-field',
                component: ComponentCreator('/docs/components/form-field', 'eb7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/grid',
                component: ComponentCreator('/docs/components/grid', 'a59'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/icon',
                component: ComponentCreator('/docs/components/icon', 'aab'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/image',
                component: ComponentCreator('/docs/components/image', 'cd0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/image-list',
                component: ComponentCreator('/docs/components/image-list', 'a7c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/input',
                component: ComponentCreator('/docs/components/input', 'b11'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/linear-progress',
                component: ComponentCreator('/docs/components/linear-progress', '59b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/link',
                component: ComponentCreator('/docs/components/link', 'c4f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/list',
                component: ComponentCreator('/docs/components/list', '181'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/menu',
                component: ComponentCreator('/docs/components/menu', 'ce9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/modal',
                component: ComponentCreator('/docs/components/modal', '5ac'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/otp-input',
                component: ComponentCreator('/docs/components/otp-input', '00f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/pagination',
                component: ComponentCreator('/docs/components/pagination', '3c2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/paper',
                component: ComponentCreator('/docs/components/paper', '601'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/password-input',
                component: ComponentCreator('/docs/components/password-input', '415'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/popover',
                component: ComponentCreator('/docs/components/popover', 'd90'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/popper',
                component: ComponentCreator('/docs/components/popper', '21f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/pressable',
                component: ComponentCreator('/docs/components/pressable', '471'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/radio-group',
                component: ComponentCreator('/docs/components/radio-group', '547'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/rating',
                component: ComponentCreator('/docs/components/rating', '172'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/segmented-control',
                component: ComponentCreator('/docs/components/segmented-control', 'b2d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/select',
                component: ComponentCreator('/docs/components/select', '1e3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/skeleton',
                component: ComponentCreator('/docs/components/skeleton', 'c7b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/slider',
                component: ComponentCreator('/docs/components/slider', 'dcf'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/snackbar',
                component: ComponentCreator('/docs/components/snackbar', 'f1a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/speed-dial',
                component: ComponentCreator('/docs/components/speed-dial', '292'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/stack',
                component: ComponentCreator('/docs/components/stack', 'ccf'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/stepper',
                component: ComponentCreator('/docs/components/stepper', 'a49'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/switch',
                component: ComponentCreator('/docs/components/switch', '0dc'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/table',
                component: ComponentCreator('/docs/components/table', 'b35'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/tabs',
                component: ComponentCreator('/docs/components/tabs', '60e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/text-area',
                component: ComponentCreator('/docs/components/text-area', '286'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/text-field',
                component: ComponentCreator('/docs/components/text-field', '7bc'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/timeline',
                component: ComponentCreator('/docs/components/timeline', 'cf6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/toast',
                component: ComponentCreator('/docs/components/toast', 'be9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/toggle-button',
                component: ComponentCreator('/docs/components/toggle-button', '27a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/tooltip',
                component: ComponentCreator('/docs/components/tooltip', '022'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/typography',
                component: ComponentCreator('/docs/components/typography', 'cf1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/getting-started',
                component: ComponentCreator('/docs/getting-started', '876'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/headless',
                component: ComponentCreator('/docs/headless', '7c1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/theming',
                component: ComponentCreator('/docs/theming', '384'),
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
