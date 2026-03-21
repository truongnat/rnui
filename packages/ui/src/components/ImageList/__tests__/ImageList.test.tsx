import React from "react";
import { render } from "@testing-library/react-native";
import { ImageList, ImageListItem } from "../ImageList";
import { ThemeProvider } from "@rnui/headless";
import { View } from "react-native";

test("ImageList renders items", () => {
  const { toJSON } = render(
    <ThemeProvider>
      <ImageList cols={2}>
        <ImageListItem>
          <View />
        </ImageListItem>
      </ImageList>
    </ThemeProvider>
  );
  expect(toJSON()).toBeTruthy();
});
