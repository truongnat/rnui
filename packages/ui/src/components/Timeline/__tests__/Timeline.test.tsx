import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import React from 'react';
import { Text } from 'react-native';
import { Timeline, TimelineContent, TimelineItem } from '../Timeline';

test('Timeline renders events', () => {
  const { getByText } = render(
    <ThemeProvider>
      <Timeline>
        <TimelineItem>
          <TimelineContent>
            <Text>Event 1</Text>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </ThemeProvider>
  );
  expect(getByText('Event 1')).toBeTruthy();
});
