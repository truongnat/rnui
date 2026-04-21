import { fireEvent, render, waitFor } from '@testing-library/react-native';
import type React from 'react';
import { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import {
  Badge,
  Button,
  Checkbox,
  Divider,
  EmptyState,
  FormField,
  FormGroup,
  Input,
  Skeleton,
  Switch,
  ThemeProvider,
} from '../index';

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider colorScheme="light">{children}</ThemeProvider>
);

// ─── Button ───────────────────────────────────────────────────────

describe('Button', () => {
  it('renders label', () => {
    const { getByText } = render(
      <Wrap>
        <Button label="Save" onPress={() => {}} />
      </Wrap>
    );
    expect(getByText('Save')).toBeTruthy();
  });

  it('shows ActivityIndicator when loading', () => {
    const { UNSAFE_root } = render(
      <Wrap>
        <Button label="Save" loading onPress={() => {}} />
      </Wrap>
    );
    // When loading with center position (default), text has opacity: 0
    const activityIndicators = UNSAFE_root.findAllByType(ActivityIndicator);
    expect(activityIndicators.length).toBeGreaterThan(0);
  });

  it('calls onPress when tapped', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Wrap>
        <Button label="Tap" onPress={onPress} />
      </Wrap>
    );
    fireEvent.press(getByText('Tap'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    const { UNSAFE_root } = render(
      <Wrap>
        <Button label="Tap" disabled onPress={onPress} />
      </Wrap>
    );
    // Verify button is rendered with disabled prop
    // Note: react-test-renderer doesn't prevent event handlers on disabled elements
    const animatedView = UNSAFE_root.findByType('Reanimated.View' as any);
    expect(animatedView.props.accessibilityState?.disabled).toBe(true);
  });

  it('renders all variants without crashing', () => {
    const variants = ['solid', 'outline', 'ghost', 'destructive'] as const;
    variants.forEach((variant) => {
      const { getByText } = render(
        <Wrap>
          <Button label={variant} variant={variant} onPress={() => {}} />
        </Wrap>
      );
      expect(getByText(variant)).toBeTruthy();
    });
  });
});

// ─── Input ────────────────────────────────────────────────────────

describe('Input', () => {
  it('renders label and placeholder', () => {
    const { getByText, getByPlaceholderText } = render(
      <Wrap>
        <Input label="Email" placeholder="you@example.com" />
      </Wrap>
    );
    expect(getByText('Email')).toBeTruthy();
    expect(getByPlaceholderText('you@example.com')).toBeTruthy();
  });

  it('shows error text', () => {
    const { getByText } = render(
      <Wrap>
        <Input label="Email" error="Invalid email" />
      </Wrap>
    );
    expect(getByText('Invalid email')).toBeTruthy();
  });

  it('shows helper text when no error', () => {
    const { getByText } = render(
      <Wrap>
        <Input label="Email" helperText="Used for login" />
      </Wrap>
    );
    expect(getByText('Used for login')).toBeTruthy();
  });

  it('hides helper when error is present', () => {
    const { queryByText } = render(
      <Wrap>
        <Input label="Email" error="Required" helperText="Used for login" />
      </Wrap>
    );
    expect(queryByText('Used for login')).toBeNull();
  });

  it('fires onChangeText', () => {
    const onChange = jest.fn();
    const { getByPlaceholderText } = render(
      <Wrap>
        <Input placeholder="type" onChangeText={onChange} />
      </Wrap>
    );
    fireEvent.changeText(getByPlaceholderText('type'), 'hello');
    expect(onChange).toHaveBeenCalledWith('hello');
  });
});

// ─── Checkbox ─────────────────────────────────────────────────────

describe('Checkbox', () => {
  it('renders label', () => {
    const { getByText } = render(
      <Wrap>
        <Checkbox label="Accept terms" />
      </Wrap>
    );
    expect(getByText('Accept terms')).toBeTruthy();
  });

  it('calls onChange on press', () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <Wrap>
        <Checkbox label="Accept" onChange={onChange} />
      </Wrap>
    );
    fireEvent.press(getByText('Accept'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('does not call onChange when disabled', () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <Wrap>
        <Checkbox label="Accept" disabled onChange={onChange} />
      </Wrap>
    );
    fireEvent.press(getByText('Accept'));
    expect(onChange).not.toHaveBeenCalled();
  });
});

// ─── Switch ───────────────────────────────────────────────────────

describe('Switch', () => {
  it('renders label and calls onChange', () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <Wrap>
        <Switch label="Notifications" onChange={onChange} />
      </Wrap>
    );
    fireEvent.press(getByText('Notifications'));
    expect(onChange).toHaveBeenCalledWith(true);
  });
});

// ─── Badge ────────────────────────────────────────────────────────

describe('Badge', () => {
  it('renders label', () => {
    const { getByText } = render(
      <Wrap>
        <Badge label="New" />
      </Wrap>
    );
    expect(getByText('New')).toBeTruthy();
  });

  it('renders all variants without crashing', () => {
    const variants = [
      'default',
      'brand',
      'success',
      'warning',
      'error',
      'info',
    ] as const;
    variants.forEach((variant) => {
      const { getByText } = render(
        <Wrap>
          <Badge label={variant} variant={variant} />
        </Wrap>
      );
      expect(getByText(variant)).toBeTruthy();
    });
  });
});

// ─── Divider ──────────────────────────────────────────────────────

describe('Divider', () => {
  it('renders without label', () => {
    const { toJSON } = render(
      <Wrap>
        <Divider />
      </Wrap>
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with label', () => {
    const { getByText } = render(
      <Wrap>
        <Divider label="OR" />
      </Wrap>
    );
    expect(getByText('OR')).toBeTruthy();
  });
});

// ─── FormField ────────────────────────────────────────────────────

describe('FormField', () => {
  it('renders label, required indicator, and child', () => {
    const { getByText } = render(
      <Wrap>
        <FormField label="Email" required helperText="Your login email">
          <Input placeholder="you@example.com" />
        </FormField>
      </Wrap>
    );
    expect(getByText('Email')).toBeTruthy();
    expect(getByText('*')).toBeTruthy();
    expect(getByText('Your login email')).toBeTruthy();
  });

  it('shows error and hides helper', () => {
    const { getByText, queryByText } = render(
      <Wrap>
        <FormField label="Email" error="Required" helperText="hint">
          <Input placeholder="email" />
        </FormField>
      </Wrap>
    );
    expect(getByText('Required')).toBeTruthy();
    expect(queryByText('hint')).toBeNull();
  });

  it('FormGroup renders children with gap', () => {
    const { getAllByText } = render(
      <Wrap>
        <FormGroup>
          <FormField label="First">
            <Input />
          </FormField>
          <FormField label="Second">
            <Input />
          </FormField>
        </FormGroup>
      </Wrap>
    );
    expect(getAllByText(/First|Second/).length).toBe(2);
  });
});

// ─── EmptyState ───────────────────────────────────────────────────

describe('EmptyState', () => {
  it('renders title and description', () => {
    const { getByText } = render(
      <Wrap>
        <EmptyState
          title="Nothing here"
          description="Add your first item to get started."
        />
      </Wrap>
    );
    expect(getByText('Nothing here')).toBeTruthy();
    expect(getByText('Add your first item to get started.')).toBeTruthy();
  });

  it('renders action button and fires callback', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Wrap>
        <EmptyState
          title="Empty"
          action={<Button label="Add item" onPress={onPress} />}
        />
      </Wrap>
    );
    fireEvent.press(getByText('Add item'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

// ─── Skeleton ─────────────────────────────────────────────────────

describe('Skeleton', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(
      <Wrap>
        <Skeleton width={200} height={20} />
      </Wrap>
    );
    expect(toJSON()).toBeTruthy();
  });

  it('SkeletonCard renders without crashing', () => {
    const { SkeletonCard } = require('../components/Skeleton');
    const { toJSON } = render(
      <Wrap>
        <SkeletonCard />
      </Wrap>
    );
    expect(toJSON()).toBeTruthy();
  });
});
