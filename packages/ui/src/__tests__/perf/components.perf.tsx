/**
 * Performance tests — render count assertions using @testing-library/react-native.
 *
 * Strategy: wrap components in a render-counting spy to assert they do not
 * re-render unnecessarily. No external perf library needed.
 *
 * Run with: bun test:perf
 */

import { act, fireEvent, render } from '@testing-library/react-native';
import React, { useRef, useState } from 'react';
import {
  Badge,
  Button,
  Checkbox,
  Input,
  Switch,
  ThemeProvider,
} from '../../index';

// ─── Render counter utility ───────────────────────────────────────

/**
 * Creates a memoized component that increments a counter on every render.
 * Used to verify that React.memo is working correctly.
 */
function createCountedComponent<T>(Component: React.ComponentType<T>) {
  const count = { current: 0 };
  const Counted = React.memo((props: T & any) => {
    count.current += 1;
    return <Component {...props} />;
  });
  return { Counted, count };
}

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider colorScheme="light">{children}</ThemeProvider>
);

// ─── Button ───────────────────────────────────────────────────────

const noop = () => {};

test('Button: does not re-render on unrelated parent state change', () => {
  const { Counted: CountedButton, count } = createCountedComponent(Button);

  function Parent() {
    const [n, setN] = useState(0);
    return (
      <Wrap>
        <Button label="unrelated" onPress={() => setN((c) => c + 1)} />
        <CountedButton label="static" onPress={noop} />
      </Wrap>
    );
  }

  const { getByText } = render(<Parent />);
  const initial = count.current; // should be 1

  // Trigger unrelated state change in Parent
  fireEvent.press(getByText('unrelated'));

  // CountedButton is memoized and props (label, onPress) are stable, so count should remain same
  expect(count.current).toBe(initial);
});

test('Button: only re-renders once when variant prop changes', () => {
  const { Counted: CountedButton, count } = createCountedComponent(Button);

  function Parent() {
    const [v, setV] = useState<'solid' | 'outline'>('solid');
    return (
      <Wrap>
        <CountedButton
          label="btn"
          variant={v}
          onPress={() => setV((p) => (p === 'solid' ? 'outline' : 'solid'))}
        />
      </Wrap>
    );
  }

  const { getByText } = render(<Parent />);
  const before = count.current;
  fireEvent.press(getByText('btn'));
  expect(count.current).toBe(before + 1);
});

test('Button: loading toggle causes exactly one re-render', () => {
  const { Counted: CountedButton, count } = createCountedComponent(Button);

  function Parent() {
    const [loading, setLoading] = useState(false);
    return (
      <Wrap>
        <CountedButton
          label="save"
          loading={loading}
          onPress={() => setLoading((p) => !p)}
        />
      </Wrap>
    );
  }

  const { getByText } = render(<Parent />);
  const initial = count.current;
  act(() => fireEvent.press(getByText('save')));
  expect(count.current).toBe(initial + 1);
});

// ─── Input ────────────────────────────────────────────────────────

test('Input: re-renders once per keystroke (controlled)', () => {
  const { Counted: CountedInput, count } = createCountedComponent(Input);

  function Parent() {
    const [val, setVal] = useState('');
    return (
      <Wrap>
        <CountedInput value={val} onChangeText={setVal} placeholder="type" />
      </Wrap>
    );
  }

  const { getByPlaceholderText } = render(<Parent />);
  const before = count.current;
  fireEvent.changeText(getByPlaceholderText('type'), 'a');
  fireEvent.changeText(getByPlaceholderText('type'), 'ab');
  fireEvent.changeText(getByPlaceholderText('type'), 'abc');
  expect(count.current).toBe(before + 3);
});

// ─── Switch ───────────────────────────────────────────────────────

test('Switch: exactly one re-render per toggle', () => {
  const { Counted: CountedSwitch, count } = createCountedComponent(Switch);

  function Parent() {
    const [on, setOn] = useState(false);
    return (
      <Wrap>
        <CountedSwitch on={on} onChange={setOn} label="toggle" />
      </Wrap>
    );
  }

  const { getByText } = render(<Parent />);
  const before = count.current;
  fireEvent.press(getByText('toggle'));
  expect(count.current).toBe(before + 1);
  fireEvent.press(getByText('toggle'));
  expect(count.current).toBe(before + 2);
});

// ─── Checkbox ─────────────────────────────────────────────────────

test('Checkbox: exactly one re-render per toggle', () => {
  const { Counted: CountedCheckbox, count } = createCountedComponent(Checkbox);

  function Parent() {
    const [checked, setChecked] = useState(false);
    return (
      <Wrap>
        <CountedCheckbox
          label="agree"
          checked={checked}
          onChange={setChecked}
        />
      </Wrap>
    );
  }

  const { getByText } = render(<Parent />);
  const before = count.current;
  fireEvent.press(getByText('agree'));
  expect(count.current).toBe(before + 1);
});

// ─── Badge ────────────────────────────────────────────────────────

test('Badge: zero re-renders after mount with static props', () => {
  const { Counted: CountedBadge, count } = createCountedComponent(Badge);

  function Parent() {
    const [unrelated, setUnrelated] = useState(0);
    return (
      <Wrap>
        <Button label="inc" onPress={() => setUnrelated((p) => p + 1)} />
        <CountedBadge label="static" variant="success" />
      </Wrap>
    );
  }

  const { getByText } = render(<Parent />);
  const after_mount = count.current;

  // Trigger unrelated state update 3 times
  fireEvent.press(getByText('inc'));
  fireEvent.press(getByText('inc'));
  fireEvent.press(getByText('inc'));

  // Badge is memoized and its props didn't change
  expect(count.current).toBe(after_mount);
});

// ─── Theme switch ─────────────────────────────────────────────────

test('ThemeProvider: dark mode toggle re-renders all children', () => {
  const counters = {
    button: { current: 0 },
    badge: { current: 0 },
    input: { current: 0 },
  };

  function CountedButton() {
    counters.button.current += 1;
    return <Button label="A" onPress={() => {}} />;
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
      <ThemeProvider colorScheme={dark ? 'dark' : 'light'}>
        <CountedButton />
        <CountedBadge />
        <CountedInput />
        <Button label="toggle" onPress={() => setDark((p) => !p)} />
      </ThemeProvider>
    );
  }

  const { getByText } = render(<App />);
  const b0 = counters.button.current;
  const d0 = counters.badge.current;
  const i0 = counters.input.current;

  act(() => fireEvent.press(getByText('toggle')));

  // Each child must re-render exactly once on theme change
  expect(counters.button.current).toBe(b0 + 1);
  expect(counters.badge.current).toBe(d0 + 1);
  expect(counters.input.current).toBe(i0 + 1);
});
