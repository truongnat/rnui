import React from "react";
import { render } from "@testing-library/react-native";
import { Carousel } from "../Carousel";
import { ThemeProvider } from "@rnui/headless";
import { Text } from "react-native";

test("Carousel renders current item", () => {
  const data = ["Slide 1", "Slide 2"];
  const { getByText } = render(
    <ThemeProvider>
      <Carousel
        data={data}
        renderItem={(item) => <Text>{item}</Text>}
      />
    </ThemeProvider>
  );
  expect(getByText("Slide 1")).toBeTruthy();
});
