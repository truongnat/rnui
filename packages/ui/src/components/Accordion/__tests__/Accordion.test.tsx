import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Accordion, AccordionSummary, AccordionDetails } from "../Accordion";
import { Text } from "react-native";
import { ThemeProvider } from "@truongnat/headless";

test("Accordion renders and expands on press", () => {
  const { getByText } = render(
    <ThemeProvider>
      <Accordion>
        <AccordionSummary>Details</AccordionSummary>
        <AccordionDetails>
          <Text>Expanded Content</Text>
        </AccordionDetails>
      </Accordion>
    </ThemeProvider>
  );
  fireEvent.press(getByText("Details"));
  expect(getByText("Expanded Content")).toBeTruthy();
});
