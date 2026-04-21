import type { StoryObj } from '@storybook/react-native';
import {
  ThemeProvider,
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@truongdq01/ui';
import type React from 'react';
import { Text, View } from 'react-native';

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24 }}>{children}</View>
  </ThemeProvider>
);

const TimelineWrapper = (props: any) => (
  <Timeline position={props.position ?? 'right'}>
    <TimelineItem>
      <TimelineOppositeContent>
        <Text style={{ color: '#64748b' }}>09:00 AM</Text>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot color="primary" />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <Text style={{ fontWeight: '600' }}>Check-in</Text>
        <Text style={{ color: '#64748b' }}>Arrival at the venue</Text>
      </TimelineContent>
    </TimelineItem>
    <TimelineItem>
      <TimelineOppositeContent>
        <Text style={{ color: '#64748b' }}>10:30 AM</Text>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot color="success" />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <Text style={{ fontWeight: '600' }}>Keynote</Text>
        <Text style={{ color: '#64748b' }}>Main auditorium</Text>
      </TimelineContent>
    </TimelineItem>
    <TimelineItem>
      <TimelineOppositeContent>
        <Text style={{ color: '#64748b' }}>12:00 PM</Text>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot color="warning" />
      </TimelineSeparator>
      <TimelineContent>
        <Text style={{ fontWeight: '600' }}>Lunch</Text>
        <Text style={{ color: '#64748b' }}>Food court</Text>
      </TimelineContent>
    </TimelineItem>
  </Timeline>
);

const meta = {
  title: 'Components/Timeline',
  component: TimelineWrapper,
  decorators: [
    (Story: React.ComponentType) => (
      <Wrap>
        <Story />
      </Wrap>
    ),
  ],
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['right', 'left', 'alternate'],
    },
  },
  args: {
    position: 'right',
  },
};

export default meta;
type Story = StoryObj<typeof TimelineWrapper>;

export const Right: Story = {
  args: { position: 'right' },
};

export const Alternate: Story = {
  args: { position: 'alternate' },
};
