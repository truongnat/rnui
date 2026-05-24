import type { ScreenSchema } from './screen-schema';

/** Example ScreenSchema fixtures for docs and tests. */
export const loginScreenSchemaExample: ScreenSchema = {
  id: 'login',
  name: 'Login',
  version: '1',
  description: 'Email and password login screen',
  actions: [{ id: 'signIn', description: 'Submit credentials' }],
  root: {
    type: 'Screen',
    props: { padding: 'md', spacing: 'md' },
    children: [
      {
        type: 'Typography',
        props: { variant: 'h4', children: 'Welcome back' },
      },
      {
        type: 'Typography',
        props: {
          variant: 'body2',
          color: 'secondary',
          children: 'Sign in to continue',
        },
      },
      {
        type: 'Stack',
        props: { spacing: 'md' },
        children: [
          {
            type: 'Input',
            props: {
              label: 'Email',
              placeholder: 'you@example.com',
              value: '',
            },
          },
          {
            type: 'Input',
            props: {
              label: 'Password',
              placeholder: '••••••••',
              secureTextEntry: true,
              value: '',
            },
          },
          {
            type: 'Button',
            props: {
              label: 'Sign in',
              variant: 'solid',
              fullWidth: true,
              action: 'signIn',
            },
          },
        ],
      },
    ],
  },
};

export const settingsScreenSchemaExample: ScreenSchema = {
  id: 'settings',
  name: 'Settings',
  version: '1',
  root: {
    type: 'Screen',
    props: { padding: 'md', spacing: 'lg' },
    children: [
      {
        type: 'Typography',
        props: { variant: 'h4', children: 'Settings' },
      },
      {
        type: 'Card',
        props: { padding: 'md' },
        children: [
          {
            type: 'Stack',
            props: { spacing: 'md' },
            children: [
              {
                type: 'Switch',
                props: { label: 'Push notifications', on: true },
              },
              {
                type: 'Switch',
                props: { label: 'Dark mode', on: false },
              },
              { type: 'Divider', props: { spacing: 'sm' } },
              {
                type: 'Checkbox',
                props: { label: 'Share analytics', checked: true },
              },
            ],
          },
        ],
      },
    ],
  },
};

export const profileCardScreenSchemaExample: ScreenSchema = {
  id: 'profile-card',
  name: 'Profile Card',
  version: '1',
  root: {
    type: 'Screen',
    props: { padding: 'md' },
    children: [
      {
        type: 'Card',
        props: { padding: 'lg' },
        children: [
          {
            type: 'Stack',
            props: { direction: 'row', spacing: 'md', alignItems: 'center' },
            children: [
              {
                type: 'Avatar',
                props: { initials: 'TD', size: 'lg', status: 'online' },
              },
              {
                type: 'Stack',
                props: { spacing: 'xs' },
                children: [
                  {
                    type: 'Typography',
                    props: { variant: 'h6', children: 'Truong Dev' },
                  },
                  {
                    type: 'Typography',
                    props: {
                      variant: 'body2',
                      color: 'secondary',
                      children: 'Product designer',
                    },
                  },
                  {
                    type: 'Badge',
                    props: { label: 'Pro', variant: 'brand', size: 'sm' },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

export const dashboardScreenSchemaExample: ScreenSchema = {
  id: 'dashboard',
  name: 'Dashboard',
  version: '1',
  root: {
    type: 'Screen',
    props: { padding: 'md', spacing: 'md' },
    children: [
      {
        type: 'Typography',
        props: { variant: 'h4', children: 'Dashboard' },
      },
      {
        type: 'Alert',
        props: {
          severity: 'info',
          children: 'You have 3 tasks due today.',
        },
      },
      {
        type: 'Stack',
        props: { direction: 'row', spacing: 'md', wrap: true },
        children: [
          {
            type: 'Chip',
            props: { label: 'All', variant: 'solid', color: 'primary' },
          },
          {
            type: 'Chip',
            props: { label: 'Design', variant: 'subtle' },
          },
          {
            type: 'Chip',
            props: { label: 'Engineering', variant: 'subtle' },
          },
        ],
      },
      {
        type: 'Paper',
        props: { variant: 'outlined', elevation: 'none' },
        children: [
          {
            type: 'Typography',
            props: { variant: 'subtitle1', children: 'Recent activity' },
          },
          {
            type: 'Typography',
            props: {
              variant: 'body2',
              color: 'secondary',
              children: 'No new updates in the last hour.',
            },
          },
        ],
      },
    ],
  },
};

export const formScreenSchemaExample: ScreenSchema = {
  id: 'form',
  name: 'Contact Form',
  version: '1',
  actions: [{ id: 'submit', description: 'Submit form' }],
  root: {
    type: 'Screen',
    props: { padding: 'md', spacing: 'md' },
    children: [
      {
        type: 'Typography',
        props: { variant: 'h5', children: 'Contact us' },
      },
      {
        type: 'TextField',
        props: { label: 'Name', variant: 'outlined', required: true },
      },
      {
        type: 'TextField',
        props: {
          label: 'Email',
          variant: 'outlined',
          type: 'email',
          required: true,
        },
      },
      {
        type: 'TextField',
        props: {
          label: 'Message',
          variant: 'outlined',
          multiline: true,
          rows: 4,
        },
      },
      {
        type: 'Button',
        props: {
          label: 'Send message',
          variant: 'solid',
          fullWidth: true,
          action: 'submit',
        },
      },
    ],
  },
};

export const builtInScreenSchemaExamples = [
  loginScreenSchemaExample,
  settingsScreenSchemaExample,
  profileCardScreenSchemaExample,
  dashboardScreenSchemaExample,
  formScreenSchemaExample,
];
