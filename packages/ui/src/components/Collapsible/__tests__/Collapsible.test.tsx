import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { Text, View } from "react-native";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  useCollapsible,
} from "../Collapsible";
import { ThemeProvider } from "@truongdq01/headless";

// Helper to wrap components with ThemeProvider
const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe("Collapsible", () => {
  it("renders children correctly", () => {
    const { getByTestId } = renderWithTheme(
      <Collapsible testID="collapsible">
        <CollapsibleTrigger testID="trigger">
          <Text>Trigger</Text>
        </CollapsibleTrigger>
        <CollapsibleContent testID="content">
          <Text>Content</Text>
        </CollapsibleContent>
      </Collapsible>
    );

    expect(getByTestId("collapsible")).toBeTruthy();
    expect(getByTestId("trigger")).toBeTruthy();
    expect(getByTestId("content")).toBeTruthy();
  });

  it("accepts custom testID", () => {
    const { getByTestId } = renderWithTheme(
      <Collapsible testID="custom-collapsible">
        <CollapsibleTrigger>
          <Text>Trigger</Text>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Text>Content</Text>
        </CollapsibleContent>
      </Collapsible>
    );

    expect(getByTestId("custom-collapsible")).toBeTruthy();
  });

  it("starts with defaultOpen when specified", () => {
    const { getByTestId } = renderWithTheme(
      <Collapsible defaultOpen={true}>
        <CollapsibleTrigger testID="trigger">
          <Text>Trigger</Text>
        </CollapsibleTrigger>
        <CollapsibleContent testID="content">
          <Text>Content</Text>
        </CollapsibleContent>
      </Collapsible>
    );

    expect(getByTestId("trigger")).toBeTruthy();
    expect(getByTestId("content")).toBeTruthy();
  });

  it("useCollapsible throws error outside context", () => {
    const TestComponent = () => {
      useCollapsible();
      return <Text>Test</Text>;
    };

    expect(() => render(<TestComponent />)).toThrow(
      "useCollapsible must be used within a Collapsible component"
    );
  });

  it("does not toggle when disabled", () => {
    const fn = jest.fn();
    const { getByTestId } = renderWithTheme(
      <Collapsible disabled onOpenChange={fn}>
        <CollapsibleTrigger testID="trigger">
          <Text>T</Text>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Text>C</Text>
        </CollapsibleContent>
      </Collapsible>
    );
    fireEvent.press(getByTestId("trigger"));
    expect(fn).not.toHaveBeenCalled();
  });

  it("calls onOpenChange in controlled mode", () => {
    const fn = jest.fn();
    const { getByTestId } = renderWithTheme(
      <Collapsible open={false} onOpenChange={fn}>
        <CollapsibleTrigger testID="trigger">
          <Text>T</Text>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Text>C</Text>
        </CollapsibleContent>
      </Collapsible>
    );
    fireEvent.press(getByTestId("trigger"));
    expect(fn).toHaveBeenCalledWith(true);
  });
});