import React from "react";
import { render } from "@testing-library/react-native";
import { AnimatedList } from "../AnimatedList";
import { ThemeProvider } from "@rnui/headless";
import { Text } from "react-native";

test("AnimatedList renders items", () => {
  const data = [{ id: "1", text: "Item 1" }];
  const { getByText } = render(
    <ThemeProvider>
      <AnimatedList
        data={data}
        estimatedItemSize={50}
        renderItem={({ item }) => <Text>{item.text}</Text>}
      />
    </ThemeProvider>
  );
  expect(getByText("Item 1")).toBeTruthy();
});
