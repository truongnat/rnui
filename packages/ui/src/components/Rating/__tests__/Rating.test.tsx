import React from "react";
import { render } from "@testing-library/react-native";
import { Rating } from "../Rating";
import { ThemeProvider } from "@rnui/headless";

test("Rating renders", () => {
  const { toJSON } = render(
    <ThemeProvider>
      <Rating value={3} />
    </ThemeProvider>
  );
  expect(toJSON()).toBeTruthy();
});
