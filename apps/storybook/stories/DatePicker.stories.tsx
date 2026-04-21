import type { StoryObj } from '@storybook/react-native';
import { DatePicker, ThemeProvider } from '@truongdq01/ui';
import type React from 'react';
import { useState } from 'react';
import { Text, View } from 'react-native';

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24, gap: 12 }}>{children}</View>
  </ThemeProvider>
);

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  decorators: [
    (Story: React.ComponentType) => (
      <Wrap>
        <Story />
      </Wrap>
    ),
  ],
};

export default meta;

export const Default: StoryObj<typeof DatePicker> = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <View style={{ gap: 20 }}>
        <DatePicker
          label="Birth Date"
          placeholder="Select your birth date"
          date={date}
          onChange={(d) => setDate(d)}
        />
        <DatePicker
          label="Appointment Time"
          placeholder="Select time"
          mode="time"
          date={date}
          onChange={(d) => setDate(d)}
        />
        <DatePicker
          label="With Error"
          placeholder="Select a date"
          date={null}
          onChange={(d) => setDate(d)}
          error="This field is required"
        />
        <DatePicker
          label="Disabled"
          placeholder="Not selectable"
          date={new Date()}
          onChange={() => {}}
          disabled
        />
      </View>
    );
  },
};
