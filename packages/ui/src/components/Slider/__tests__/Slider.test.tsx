import React from "react";
import { render } from "@testing-library/react-native";
import { Slider } from "../Slider";
import { ThemeProvider } from "@truongdq01/headless";

test("Slider renders", () => {
  const { toJSON } = render(
    <ThemeProvider>
      <Slider value={50} min={0} max={100} />
    </ThemeProvider>
  );
  expect(toJSON()).toBeTruthy();
});
