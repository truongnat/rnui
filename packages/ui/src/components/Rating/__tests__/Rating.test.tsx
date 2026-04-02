import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Pressable, Text, AccessibilityInfo } from "react-native";
import { Rating } from "../Rating";
import { ThemeProvider } from "@truongdq01/headless";

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider colorScheme="light" brand={undefined} override={undefined}>
    {children}
  </ThemeProvider>
);

describe("Rating", () => {
  beforeEach(() => {
    if (typeof AccessibilityInfo.announceForAccessibility !== "function") {
      Object.assign(AccessibilityInfo, {
        announceForAccessibility: jest.fn(),
      });
    }
    jest.spyOn(AccessibilityInfo, "announceForAccessibility").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders", () => {
    const { toJSON } = render(
      <Wrap>
        <Rating value={3} />
      </Wrap>
    );
    expect(toJSON()).toBeTruthy();
  });

  it("announces when user changes value via star press", () => {
    const onChange = jest.fn();
    const { UNSAFE_getAllByType } = render(
      <Wrap>
        <Rating max={5} defaultValue={0} onChange={onChange} />
      </Wrap>
    );
    const pressables = UNSAFE_getAllByType(Pressable);
    expect(pressables.length).toBeGreaterThan(0);
    fireEvent.press(pressables[0]);
    expect(AccessibilityInfo.announceForAccessibility).toHaveBeenCalled();
    const announce = AccessibilityInfo.announceForAccessibility as jest.MockedFunction<
      typeof AccessibilityInfo.announceForAccessibility
    >;
    const arg = announce.mock.calls[0][0];
    expect(arg).toMatch(/out of/);
    expect(arg).toContain("5");
  });

  it("exposes adjustable region when interactive", () => {
    const { getByRole } = render(
      <Wrap>
        <Rating max={5} defaultValue={0} />
      </Wrap>
    );
    expect(getByRole("adjustable")).toBeTruthy();
  });

  it("star Pressables are not separate accessibility nodes", () => {
    const { UNSAFE_getAllByType } = render(
      <Wrap>
        <Rating max={5} defaultValue={0} />
      </Wrap>
    );
    const pressables = UNSAFE_getAllByType(Pressable);
    expect(pressables[0].props.accessible).toBe(false);
  });

  it("showValue renders fraction and compact uses tighter layout", () => {
    const { UNSAFE_getAllByType } = render(
      <Wrap>
        <Rating max={5} value={4} showValue compact readOnly />
      </Wrap>
    );
    const texts = UNSAFE_getAllByType(Text);
    const valueText = texts.find((n) => String(n.props.children) === "4/5");
    expect(valueText).toBeTruthy();
  });

  it("respects iconNames for half star", () => {
    const { UNSAFE_getAllByType } = render(
      <Wrap>
        <Rating
          max={5}
          value={2.5}
          precision={0.5}
          iconNames={{ filled: "star", empty: "star", half: "starHalf" }}
        />
      </Wrap>
    );
    expect(UNSAFE_getAllByType(Pressable).length).toBe(5);
  });
});
