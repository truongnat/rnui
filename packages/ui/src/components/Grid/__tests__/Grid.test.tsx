import React from "react";
import { render } from "@testing-library/react-native";
import { Grid } from "../Grid";
import { Text } from "react-native";
import { ThemeProvider } from "@rnui/headless";

test("Grid renders children", () => {
  const { getByText } = render(
    <ThemeProvider>
      <Grid container>
        <Grid item><Text>Grid Item</Text></Grid>
      </Grid>
    </ThemeProvider>
  );
  expect(getByText("Grid Item")).toBeTruthy();
});
