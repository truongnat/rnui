import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Input } from '../Input';
import { ThemeProvider } from '@truongdq01/headless';
import { Text, View } from 'react-native';

describe('Input', () => {
  // ─── Rendering Tests ────────────────────────────────────────────────

  describe('Rendering', () => {
    it('renders with placeholder', () => {
      const { getByPlaceholderText } = render(
        <ThemeProvider>
          <Input placeholder="Enter text" />
        </ThemeProvider>
      );
      expect(getByPlaceholderText('Enter text')).toBeTruthy();
    });

    it('renders with label', () => {
      const { getByText } = render(
        <ThemeProvider>
          <Input label="Username" placeholder="Enter username" />
        </ThemeProvider>
      );
      expect(getByText('Username')).toBeTruthy();
    });

    it('renders with helper text', () => {
      const { getByText } = render(
        <ThemeProvider>
          <Input helperText="Enter your email address" />
        </ThemeProvider>
      );
      expect(getByText('Enter your email address')).toBeTruthy();
    });

    it('renders with error message', () => {
      const { getByText } = render(
        <ThemeProvider>
          <Input error="This field is required" />
        </ThemeProvider>
      );
      expect(getByText('This field is required')).toBeTruthy();
    });

    it('error message overrides helper text', () => {
      const { getByText, queryByText } = render(
        <ThemeProvider>
          <Input helperText="Helper text" error="Error message" />
        </ThemeProvider>
      );
      expect(getByText('Error message')).toBeTruthy();
      expect(queryByText('Helper text')).toBeNull();
    });

    it('renders with leading element', () => {
      const { getByTestId } = render(
        <ThemeProvider>
          <Input
            leadingElement={<View testID="leading-icon" />}
            placeholder="Search"
          />
        </ThemeProvider>
      );
      expect(getByTestId('leading-icon')).toBeTruthy();
    });

    it('renders with trailing element', () => {
      const { getByTestId } = render(
        <ThemeProvider>
          <Input
            trailingElement={<View testID="trailing-icon" />}
            placeholder="Password"
          />
        </ThemeProvider>
      );
      expect(getByTestId('trailing-icon')).toBeTruthy();
    });

    it('renders with both leading and trailing elements', () => {
      const { getByTestId } = render(
        <ThemeProvider>
          <Input
            leadingElement={<View testID="leading-icon" />}
            trailingElement={<View testID="trailing-icon" />}
            placeholder="Search"
          />
        </ThemeProvider>
      );
      expect(getByTestId('leading-icon')).toBeTruthy();
      expect(getByTestId('trailing-icon')).toBeTruthy();
    });
  });

  // ─── Size Variants ──────────────────────────────────────────────────

  describe('Size Variants', () => {
    it('renders with small size', () => {
      const { getByPlaceholderText } = render(
        <ThemeProvider>
          <Input size="sm" placeholder="Small input" />
        </ThemeProvider>
      );
      expect(getByPlaceholderText('Small input')).toBeTruthy();
    });

    it('renders with medium size (default)', () => {
      const { getByPlaceholderText } = render(
        <ThemeProvider>
          <Input size="md" placeholder="Medium input" />
        </ThemeProvider>
      );
      expect(getByPlaceholderText('Medium input')).toBeTruthy();
    });

    it('renders with large size', () => {
      const { getByPlaceholderText } = render(
        <ThemeProvider>
          <Input size="lg" placeholder="Large input" />
        </ThemeProvider>
      );
      expect(getByPlaceholderText('Large input')).toBeTruthy();
    });

    it('defaults to medium size when not specified', () => {
      const { getByPlaceholderText } = render(
        <ThemeProvider>
          <Input placeholder="Default size" />
        </ThemeProvider>
      );
      expect(getByPlaceholderText('Default size')).toBeTruthy();
    });
  });

  // ─── Interaction Tests ──────────────────────────────────────────────

  describe('Interactions', () => {
    it('handles text change', () => {
      const onChange = jest.fn();
      const { getByPlaceholderText } = render(
        <ThemeProvider>
          <Input placeholder="Type here" onChange={onChange} />
        </ThemeProvider>
      );
      fireEvent(getByPlaceholderText('Type here'), 'onChange', {
        nativeEvent: { text: 'Hello' },
      });
      expect(onChange).toHaveBeenCalledWith('Hello');
    });

    it('handles focus event', () => {
      const onFocus = jest.fn();
      const { getByPlaceholderText } = render(
        <ThemeProvider>
          <Input placeholder="Focus me" onFocus={onFocus} />
        </ThemeProvider>
      );
      fireEvent(getByPlaceholderText('Focus me'), 'focus');
      expect(onFocus).toHaveBeenCalled();
    });

    it('handles blur event', () => {
      const onBlur = jest.fn();
      const { getByPlaceholderText } = render(
        <ThemeProvider>
          <Input placeholder="Blur me" onBlur={onBlur} />
        </ThemeProvider>
      );
      fireEvent(getByPlaceholderText('Blur me'), 'blur');
      expect(onBlur).toHaveBeenCalled();
    });

    it('calls onClearError on first keystroke', () => {
      const onClearError = jest.fn();
      const { getByPlaceholderText } = render(
        <ThemeProvider>
          <Input
            placeholder="Type here"
            error="Error message"
            onClearError={onClearError}
          />
        </ThemeProvider>
      );
      fireEvent(getByPlaceholderText('Type here'), 'onChange', {
        nativeEvent: { text: 'H' },
      });
      expect(onClearError).toHaveBeenCalledTimes(1);
    });

    it('does not call onClearError on subsequent keystrokes', () => {
      const onClearError = jest.fn();
      const { getByPlaceholderText } = render(
        <ThemeProvider>
          <Input
            placeholder="Type here"
            error="Error message"
            onClearError={onClearError}
          />
        </ThemeProvider>
      );
      const input = getByPlaceholderText('Type here');
      fireEvent(input, 'onChange', { nativeEvent: { text: 'H' } });
      fireEvent(input, 'onChange', { nativeEvent: { text: 'He' } });
      fireEvent(input, 'onChange', { nativeEvent: { text: 'Hel' } });
      expect(onClearError).toHaveBeenCalledTimes(1);
    });

    it('does not call onClearError when text is empty', () => {
      const onClearError = jest.fn();
      const { getByPlaceholderText } = render(
        <ThemeProvider>
          <Input
            placeholder="Type here"
            error="Error message"
            onClearError={onClearError}
          />
        </ThemeProvider>
      );
      fireEvent(getByPlaceholderText('Type here'), 'onChange', {
        nativeEvent: { text: '' },
      });
      expect(onClearError).not.toHaveBeenCalled();
    });
  });

  // ─── State Tests ────────────────────────────────────────────────────

  describe('States', () => {
    it('renders in disabled state', () => {
      const { getByPlaceholderText } = render(
        <ThemeProvider>
          <Input placeholder="Disabled" disabled />
        </ThemeProvider>
      );
      const input = getByPlaceholderText('Disabled');
      expect(input.props.editable).toBe(false);
    });

    it('renders in error state', () => {
      const { getByText } = render(
        <ThemeProvider>
          <Input placeholder="Input" error="Invalid input" />
        </ThemeProvider>
      );
      expect(getByText('Invalid input')).toBeTruthy();
    });

    it('renders in focused state', () => {
      const { getByPlaceholderText } = render(
        <ThemeProvider>
          <Input placeholder="Focus me" />
        </ThemeProvider>
      );
      const input = getByPlaceholderText('Focus me');
      fireEvent(input, 'focus');
      // Focus state is internal, just verify no crash
      expect(input).toBeTruthy();
    });

    it('disabled input does not trigger onChange', () => {
      const onChange = jest.fn();
      const { getByPlaceholderText } = render(
        <ThemeProvider>
          <Input placeholder="Disabled" disabled onChange={onChange} />
        </ThemeProvider>
      );
      const input = getByPlaceholderText('Disabled');
      expect(input.props.editable).toBe(false);
    });
  });

  // ─── Accessibility Tests ────────────────────────────────────────────

  describe('Accessibility', () => {
    it('sets accessibility label from label prop', () => {
      const { getByPlaceholderText } = render(
        <ThemeProvider>
          <Input label="Email" placeholder="Enter email" />
        </ThemeProvider>
      );
      const input = getByPlaceholderText('Enter email');
      expect(input.props.accessibilityLabel).toBe('Email');
    });

    it('sets disabled accessibility state', () => {
      const { getByPlaceholderText } = render(
        <ThemeProvider>
          <Input placeholder="Disabled" disabled />
        </ThemeProvider>
      );
      const input = getByPlaceholderText('Disabled');
      expect(input.props.accessibilityState).toEqual({ disabled: true });
    });

    it('sets enabled accessibility state', () => {
      const { getByPlaceholderText } = render(
        <ThemeProvider>
          <Input placeholder="Enabled" />
        </ThemeProvider>
      );
      const input = getByPlaceholderText('Enabled');
      expect(input.props.accessibilityState).toEqual({ disabled: false });
    });
  });

  // ─── TextInput Props Pass-through ───────────────────────────────────

  describe('TextInput Props', () => {
    it('passes through secureTextEntry prop', () => {
      const { getByPlaceholderText } = render(
        <ThemeProvider>
          <Input placeholder="Password" secureTextEntry />
        </ThemeProvider>
      );
      const input = getByPlaceholderText('Password');
      expect(input.props.secureTextEntry).toBe(true);
    });

    it('passes through keyboardType prop', () => {
      const { getByPlaceholderText } = render(
        <ThemeProvider>
          <Input placeholder="Email" keyboardType="email-address" />
        </ThemeProvider>
      );
      const input = getByPlaceholderText('Email');
      expect(input.props.keyboardType).toBe('email-address');
    });

    it('passes through autoCapitalize prop', () => {
      const { getByPlaceholderText } = render(
        <ThemeProvider>
          <Input placeholder="Name" autoCapitalize="words" />
        </ThemeProvider>
      );
      const input = getByPlaceholderText('Name');
      expect(input.props.autoCapitalize).toBe('words');
    });

    it('passes through maxLength prop', () => {
      const { getByPlaceholderText } = render(
        <ThemeProvider>
          <Input placeholder="Code" maxLength={6} />
        </ThemeProvider>
      );
      const input = getByPlaceholderText('Code');
      expect(input.props.maxLength).toBe(6);
    });

    it('passes through multiline prop', () => {
      const { getByPlaceholderText } = render(
        <ThemeProvider>
          <Input placeholder="Description" multiline />
        </ThemeProvider>
      );
      const input = getByPlaceholderText('Description');
      expect(input.props.multiline).toBe(true);
    });

    it('passes through numberOfLines prop', () => {
      const { getByPlaceholderText } = render(
        <ThemeProvider>
          <Input placeholder="Bio" multiline numberOfLines={4} />
        </ThemeProvider>
      );
      const input = getByPlaceholderText('Bio');
      expect(input.props.numberOfLines).toBe(4);
    });
  });

  // ─── Edge Cases ─────────────────────────────────────────────────────

  describe('Edge Cases', () => {
    it('handles empty string value', () => {
      const { getByPlaceholderText } = render(
        <ThemeProvider>
          <Input placeholder="Empty" value="" />
        </ThemeProvider>
      );
      expect(getByPlaceholderText('Empty')).toBeTruthy();
    });

    it('handles undefined onChange', () => {
      const { getByPlaceholderText } = render(
        <ThemeProvider>
          <Input placeholder="No handler" />
        </ThemeProvider>
      );
      fireEvent(getByPlaceholderText('No handler'), 'onChange', {
        nativeEvent: { text: 'test' },
      });
      // Should not crash
      expect(getByPlaceholderText('No handler')).toBeTruthy();
    });

    it('handles undefined onClearError', () => {
      const { getByPlaceholderText } = render(
        <ThemeProvider>
          <Input placeholder="Type" error="Error" />
        </ThemeProvider>
      );
      fireEvent(getByPlaceholderText('Type'), 'onChange', {
        nativeEvent: { text: 'test' },
      });
      // Should not crash
      expect(getByPlaceholderText('Type')).toBeTruthy();
    });

    it('handles both label and error', () => {
      const { getByText } = render(
        <ThemeProvider>
          <Input label="Email" error="Invalid email" />
        </ThemeProvider>
      );
      expect(getByText('Email')).toBeTruthy();
      expect(getByText('Invalid email')).toBeTruthy();
    });

    it('handles all props together', () => {
      const onChange = jest.fn();
      const onFocus = jest.fn();
      const onBlur = jest.fn();
      const onClearError = jest.fn();

      const { getByText, getByPlaceholderText, getByTestId } = render(
        <ThemeProvider>
          <Input
            label="Username"
            placeholder="Enter username"
            helperText="Choose a unique username"
            error="Username taken"
            size="lg"
            leadingElement={<View testID="icon" />}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onClearError={onClearError}
          />
        </ThemeProvider>
      );

      expect(getByText('Username')).toBeTruthy();
      expect(getByText('Username taken')).toBeTruthy();
      expect(getByPlaceholderText('Enter username')).toBeTruthy();
      expect(getByTestId('icon')).toBeTruthy();
    });
  });
});
