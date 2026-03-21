import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Input } from "../Input";
import { ThemeProvider } from "@rnui/headless";

test("Input renders and handles text change", () => {
  const onChange = jest.fn();
  const { getByPlaceholderText } = render(
    <ThemeProvider>
      <Input placeholder="Type here" onChange={onChange} />
    </ThemeProvider>
  );
  fireEvent.changeText(getByPlaceholderText("Type here"), "Hello");
  expect(onChange).toHaveBeenCalledWith("Hello");
});
