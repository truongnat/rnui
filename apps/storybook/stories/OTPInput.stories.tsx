import type { StoryObj } from '@storybook/react-native';
import { OTPInput, ThemeProvider } from '@truongdq01/ui';
import React from 'react';
import { View } from 'react-native';

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24, gap: 12, alignItems: 'center' }}>
      {children}
    </View>
  </ThemeProvider>
);

const meta = {
  title: 'Components/OTPInput',
  component: OTPInput,
  decorators: [
    (Story: React.ComponentType) => (
      <Wrap>
        <Story />
      </Wrap>
    ),
  ],
};

export default meta;

export const Default: StoryObj<typeof OTPInput> = {
  render: () => {
    const [value, setValue] = React.useState('');
    return (
      <OTPInput
        length={6}
        value={value}
        onChange={setValue}
        onComplete={(code) => console.log('Completed:', code)}
      />
    );
  },
};
