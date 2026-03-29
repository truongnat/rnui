import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Input } from "../Input";
import { ThemeProvider } from "@truongdq01/headless";

test("Input renders and handles text change", () => {
  const onChange = jest.fn();
  const { getByPlaceholderText } = render(
    <ThemeProvider>
      <Input placeholder="Type here" onChange={onChange} />
    </ThemeProvider>
  );
  fireEvent(getByPlaceholderText("Type here"), "onChange", { nativeEvent: { text: "Hello" } });
  expect(onChange).toHaveBeenCalledWith("Hello");
});
