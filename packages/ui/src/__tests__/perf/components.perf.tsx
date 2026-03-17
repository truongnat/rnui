/**
 * Performance tests — render count assertions using @testing-library/react-native.
 *
 * Strategy: wrap components in a render-counting spy to assert they do not
 * re-render unnecessarily. No external perf library needed.
 *
 * Run with: bun test:perf
 */
import React, { useState, useRef } from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import { ThemeProvider, Button, Input, Switch, Checkbox, Badge } from "../../index";

// ─── Render counter utility ───────────────────────────────────────

function makeRenderCounter() {
  const count = { current: 0 };
  function RenderCounter({ children }: { children: React.ReactNode }) {
    count.current += 1;
    return <>{children}</>;
  }
  return { RenderCounter, count };
}

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider colorScheme="light">{children}</ThemeProvider>
);

// ─── Button ───────────────────────────────────────────────────────

test("Button: does not re-render on unrelated parent state change", () => {
  const { RenderCounter, count } = makeRenderCounter();

  function Parent() {
    const [n, setN] = useState(0);
    return (
      <Wrap>
        <Button label="static" onPress={() => { }} />
        <RenderCounter>
          <Button label="counter-watched" onPress={() => setN(c => c + 1)} />
        </RenderCounter>
      </Wrap>
    );
  }

  const { getByText } = render(<Parent />);
  const before = count.current;
  // Trigger the other button — should not re-render the watched one
  fireEvent.press(getByText("static"));
  expect(count.current).toBe(before);
});

test("Button: only re-renders once when variant prop changes", () => {
  const { RenderCounter, count } = makeRenderCounter();

  function Parent() {
    const [v, setV] = useState<"solid" | "outline">("solid");
    return (
      <Wrap>
        <RenderCounter>
          <Button label="btn" variant={v} onPress={() => setV(p => p === "solid" ? "outline" : "solid")} />
        </RenderCounter>
      </Wrap>
    );
  }

  const { getByText } = render(<Parent />);
  const before = count.current;
  fireEvent.press(getByText("btn"));
  expect(count.current).toBe(before + 1);
});

test("Button: loading toggle causes exactly one re-render", () => {
  const { RenderCounter, count } = makeRenderCounter();

  function Parent() {
    const [loading, setLoading] = useState(false);
    return (
      <Wrap>
        <RenderCounter>
          <Button label="save" loading={loading} onPress={() => setLoading(p => !p)} />
        </RenderCounter>
      </Wrap>
    );
  }

  const { getByText } = render(<Parent />);
  const initial = count.current;
  act(() => fireEvent.press(getByText("save")));
  expect(count.current).toBe(initial + 1);
});

// ─── Input ────────────────────────────────────────────────────────

test("Input: re-renders once per keystroke (controlled)", () => {
  const { RenderCounter, count } = makeRenderCounter();

  function Parent() {
    const [val, setVal] = useState("");
    return (
      <Wrap>
        <RenderCounter>
          <Input value={val} onChangeText={setVal} placeholder="type" />
        </RenderCounter>
      </Wrap>
    );
  }

  const { getByPlaceholderText } = render(<Parent />);
  const before = count.current;
  fireEvent.changeText(getByPlaceholderText("type"), "a");
  fireEvent.changeText(getByPlaceholderText("type"), "ab");
  fireEvent.changeText(getByPlaceholderText("type"), "abc");
  // 3 keystrokes = 3 re-renders of Parent which causes 3 re-renders of Input
  expect(count.current).toBe(before + 3);
});

// ─── Switch ───────────────────────────────────────────────────────

test("Switch: exactly one re-render per toggle", () => {
  const { RenderCounter, count } = makeRenderCounter();

  function Parent() {
    const [on, setOn] = useState(false);
    return (
      <Wrap>
        <RenderCounter>
          <Switch on={on} onChange={setOn} label="toggle" />
        </RenderCounter>
      </Wrap>
    );
  }

  const { getByText } = render(<Parent />);
  const before = count.current;
  fireEvent.press(getByText("toggle"));
  expect(count.current).toBe(before + 1);
  fireEvent.press(getByText("toggle"));
  expect(count.current).toBe(before + 2);
});

// ─── Checkbox ─────────────────────────────────────────────────────

test("Checkbox: exactly one re-render per toggle", () => {
  const { RenderCounter, count } = makeRenderCounter();

  function Parent() {
    const [checked, setChecked] = useState(false);
    return (
      <Wrap>
        <RenderCounter>
          <Checkbox label="agree" checked={checked} onChange={setChecked} />
        </RenderCounter>
      </Wrap>
    );
  }

  const { getByText } = render(<Parent />);
  const before = count.current;
  fireEvent.press(getByText("agree"));
  expect(count.current).toBe(before + 1);
});

// ─── Badge ────────────────────────────────────────────────────────

test("Badge: zero re-renders after mount with static props", () => {
  const { RenderCounter, count } = makeRenderCounter();

  function Parent() {
    const [unrelated, setUnrelated] = useState(0);
    return (
      <Wrap>
        <Button label="inc" onPress={() => setUnrelated(p => p + 1)} />
        <RenderCounter>
          <Badge label="static" variant="success" />
        </RenderCounter>
      </Wrap>
    );
  }

  const { getByText } = render(<Parent />);
  const after_mount = count.current;
  // Trigger unrelated state update 3 times
  fireEvent.press(getByText("inc"));
  fireEvent.press(getByText("inc"));
  fireEvent.press(getByText("inc"));
  // Badge should not have re-rendered since its props didn't change
  expect(count.current).toBe(after_mount);
});

// ─── Theme switch ─────────────────────────────────────────────────

test("ThemeProvider: dark mode toggle re-renders all children", () => {
  const counters = {
    button: { current: 0 },
    badge: { current: 0 },
    input: { current: 0 },
  };

  function CountedButton() {
    counters.button.current += 1;
    return <Button label="A" onPress={() => { }} />;
  }
  function CountedBadge() {
    counters.badge.current += 1;
    return <Badge label="B" />;
  }
  function CountedInput() {
    counters.input.current += 1;
    return <Input placeholder="C" />;
  }

  function App() {
    const [dark, setDark] = useState(false);
    return (
      <ThemeProvider colorScheme={dark ? "dark" : "light"}>
        <CountedButton />
        <CountedBadge />
        <CountedInput />
        <Button label="toggle" onPress={() => setDark(p => !p)} />
      </ThemeProvider>
    );
  }

  const { getByText } = render(<App />);
  const b0 = counters.button.current;
  const d0 = counters.badge.current;
  const i0 = counters.input.current;

  act(() => fireEvent.press(getByText("toggle")));

  // Each child must re-render exactly once on theme change
  expect(counters.button.current).toBe(b0 + 1);
  expect(counters.badge.current).toBe(d0 + 1);
  expect(counters.input.current).toBe(i0 + 1);
});