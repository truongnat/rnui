import React from "react";
import { render } from "@testing-library/react-native";
import { AppBar, Toolbar } from "../AppBar";
import { ThemeProvider } from "@rnui/headless";
import { Text } from "react-native";

describe("AppBar", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <ThemeProvider>
        <AppBar>
          <Toolbar>
            <Text>Title</Text>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    );

    expect(getByText("Title")).toBeTruthy();
  });

  it("applies variant and position styles", () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <AppBar variant="outlined" position="absolute" testID="app-bar">
          <Toolbar>
            <Text>Title</Text>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    );

    const appBar = getByTestId("app-bar");
    expect(appBar).toBeTruthy();
  });
});
