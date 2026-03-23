import React from "react";
import { render } from "@testing-library/react-native";
import { Tooltip } from "../Tooltip";
import { ThemeProvider } from "@truongnat/headless";
import { Text } from "react-native";

test("Tooltip renders title", () => {
  const { getByText } = render(
    <ThemeProvider>
      <Tooltip open={true} title="Hint">
        <Text>Target</Text>
      </Tooltip>
    </ThemeProvider>
  );
  expect(getByText("Hint")).toBeTruthy();
});
