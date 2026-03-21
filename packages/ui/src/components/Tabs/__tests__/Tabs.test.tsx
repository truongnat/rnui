import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Tabs, Tab } from "../Tabs";
import { ThemeProvider } from "@rnui/headless";

test("Tabs handles change", () => {
  const onChange = jest.fn();
  const { getByText } = render(
    <ThemeProvider>
      <Tabs value="a" onChange={onChange}>
        <Tab value="a" label="Tab A" />
        <Tab value="b" label="Tab B" />
      </Tabs>
    </ThemeProvider>
  );
  
  fireEvent.press(getByText("Tab B"));
  expect(onChange).toHaveBeenCalledWith("b");
});
