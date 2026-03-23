import React from "react";
import { render } from "@testing-library/react-native";
import { ButtonGroup } from "../ButtonGroup";
import { Button } from "../../Button";
import { ThemeProvider } from "@truongnat/headless";

test("ButtonGroup renders children", () => {
  const { getByText } = render(
    <ThemeProvider>
      <ButtonGroup>
        <Button label="One" />
        <Button label="Two" />
      </ButtonGroup>
    </ThemeProvider>
  );
  expect(getByText("One")).toBeTruthy();
  expect(getByText("Two")).toBeTruthy();
});
