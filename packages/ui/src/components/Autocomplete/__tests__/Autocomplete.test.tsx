import React from "react";
import { render } from "@testing-library/react-native";
import { Autocomplete } from "../Autocomplete";
import { ThemeProvider } from "@truongnat/headless";

test("Autocomplete renders", () => {
  const { getByPlaceholderText } = render(
    <ThemeProvider>
      <Autocomplete 
        options={[{ label: "Apple", value: "apple" }]} 
        placeholder="Search fruit"
      />
    </ThemeProvider>
  );
  expect(getByPlaceholderText("Search fruit")).toBeTruthy();
});
