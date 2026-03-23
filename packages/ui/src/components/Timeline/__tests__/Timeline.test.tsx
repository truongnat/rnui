import React from "react";
import { render } from "@testing-library/react-native";
import { Timeline, TimelineItem, TimelineContent } from "../Timeline";
import { ThemeProvider } from "@truongdq01/headless";
import { Text } from "react-native";

test("Timeline renders events", () => {
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
  expect(getByText("Event 1")).toBeTruthy();
});
