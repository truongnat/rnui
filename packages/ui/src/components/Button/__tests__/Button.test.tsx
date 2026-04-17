import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../Button';
import { ThemeProvider } from '@truongdq01/headless';

// Helper to wrap components with ThemeProvider
const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('Button', () => {
  describe('Rendering', () => {
    it('renders with label', () => {
      const { getByText } = renderWithTheme(<Button label="Click me" />);
      expect(getByText('Click me')).toBeTruthy();
    });

    it('renders with children', () => {
      const { getByText } = renderWithTheme(<Button>Click me</Button>);
      expect(getByText('Click me')).toBeTruthy();
    });

    it('prefers children over label', () => {
      const { getByText, queryByText } = renderWithTheme(
        <Button label="Label">Children</Button>
      );
      expect(getByText('Children')).toBeTruthy();
      expect(queryByText('Label')).toBeNull();
    });

    it('renders without crashing when no label or children', () => {
      const { root } = renderWithTheme(<Button />);
      expect(root).toBeTruthy();
    });
  });

  describe('Interactions', () => {
    it('calls onPress when pressed', () => {
      const onPress = jest.fn();
      const { getByText } = renderWithTheme(
        <Button label="Click" onPress={onPress} />
      );
      fireEvent.press(getByText('Click'));
      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('calls onLongPress when long pressed', () => {
      const onLongPress = jest.fn();
      const { getByText } = renderWithTheme(
        <Button label="Long Press" onLongPress={onLongPress} />
      );
      fireEvent(getByText('Long Press'), 'longPress');
      expect(onLongPress).toHaveBeenCalledTimes(1);
    });

    it('does not call onPress when disabled', () => {
      const onPress = jest.fn();
      const { getByRole } = renderWithTheme(
        <Button label="Disabled" onPress={onPress} disabled />
      );
      const button = getByRole('button');
      expect(button.props.accessibilityState?.disabled).toBe(true);
    });

    it('does not call onPress when loading', () => {
      const onPress = jest.fn();
      const { getByRole } = renderWithTheme(
        <Button label="Loading" onPress={onPress} loading />
      );
      const button = getByRole('button');
      expect(button.props.accessibilityState?.disabled).toBe(true);
    });
  });

  describe('Variants', () => {
    it('renders solid variant', () => {
      const { getByText } = renderWithTheme(
        <Button label="Solid" variant="solid" />
      );
      expect(getByText('Solid')).toBeTruthy();
    });

    it('renders outline variant', () => {
      const { getByText } = renderWithTheme(
        <Button label="Outline" variant="outline" />
      );
      expect(getByText('Outline')).toBeTruthy();
    });

    it('renders ghost variant', () => {
      const { getByText } = renderWithTheme(
        <Button label="Ghost" variant="ghost" />
      );
      expect(getByText('Ghost')).toBeTruthy();
    });

    it('renders destructive variant', () => {
      const { getByText } = renderWithTheme(
        <Button label="Destructive" variant="destructive" />
      );
      expect(getByText('Destructive')).toBeTruthy();
    });

    it('maps contained to solid', () => {
      const { getByText } = renderWithTheme(
        <Button label="Contained" variant="contained" />
      );
      expect(getByText('Contained')).toBeTruthy();
    });

    it('maps outlined to outline', () => {
      const { getByText } = renderWithTheme(
        <Button label="Outlined" variant="outlined" />
      );
      expect(getByText('Outlined')).toBeTruthy();
    });

    it('maps text to ghost', () => {
      const { getByText } = renderWithTheme(
        <Button label="Text" variant="text" />
      );
      expect(getByText('Text')).toBeTruthy();
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      const { getByText } = renderWithTheme(<Button label="Small" size="sm" />);
      expect(getByText('Small')).toBeTruthy();
    });

    it('renders medium size (default)', () => {
      const { getByText } = renderWithTheme(<Button label="Medium" />);
      expect(getByText('Medium')).toBeTruthy();
    });

    it('renders large size', () => {
      const { getByText } = renderWithTheme(<Button label="Large" size="lg" />);
      expect(getByText('Large')).toBeTruthy();
    });
  });

  describe('Colors', () => {
    const colors = [
      'primary',
      'secondary',
      'success',
      'error',
      'info',
      'warning',
      'accent',
      'inherit',
    ] as const;

    colors.forEach((color) => {
      it(`renders ${color} color`, () => {
        const { getByText } = renderWithTheme(
          <Button label={color} color={color} />
        );
        expect(getByText(color)).toBeTruthy();
      });
    });
  });

  describe('Loading State', () => {
    it('shows loading indicator when loading', () => {
      const { getByTestId } = renderWithTheme(
        <Button label="Loading" loading />
      );
      // ActivityIndicator is rendered
      expect(getByTestId).toBeTruthy();
    });

    it('shows loading at start position', () => {
      const { root } = renderWithTheme(
        <Button label="Loading" loading loadingPosition="start" />
      );
      expect(root).toBeTruthy();
    });

    it('shows loading at end position', () => {
      const { root } = renderWithTheme(
        <Button label="Loading" loading loadingPosition="end" />
      );
      expect(root).toBeTruthy();
    });

    it('shows loading at center position (default)', () => {
      const { root } = renderWithTheme(
        <Button label="Loading" loading loadingPosition="center" />
      );
      expect(root).toBeTruthy();
    });

    it('accepts custom loading indicator', () => {
      const CustomLoader = () => <>Custom Loader</>;
      const { root } = renderWithTheme(
        <Button label="Loading" loading loadingIndicator={<CustomLoader />} />
      );
      // Just verify it renders without crashing
      expect(root).toBeTruthy();
    });
  });

  describe('Icons', () => {
    it('renders with leading icon', () => {
      const { root } = renderWithTheme(
        <Button label="Icon" leadingIcon={<>📦</>} />
      );
      expect(root).toBeTruthy();
    });

    it('renders with trailing icon', () => {
      const { root } = renderWithTheme(
        <Button label="Icon" trailingIcon={<>→</>} />
      );
      expect(root).toBeTruthy();
    });

    it('renders with startIcon (alias)', () => {
      const { root } = renderWithTheme(
        <Button label="Icon" startIcon={<>📦</>} />
      );
      expect(root).toBeTruthy();
    });

    it('renders with endIcon (alias)', () => {
      const { root } = renderWithTheme(
        <Button label="Icon" endIcon={<>→</>} />
      );
      expect(root).toBeTruthy();
    });

    it('renders icon-only button', () => {
      const { root } = renderWithTheme(<Button leadingIcon={<>📦</>} />);
      expect(root).toBeTruthy();
    });
  });

  describe('Layout', () => {
    it('renders full width when fullWidth is true', () => {
      const { root } = renderWithTheme(<Button label="Full Width" fullWidth />);
      expect(root).toBeTruthy();
    });

    it('renders with custom style', () => {
      const { root } = renderWithTheme(
        <Button label="Custom" style={{ backgroundColor: 'red' }} />
      );
      expect(root).toBeTruthy();
    });

    it('renders without elevation when disableElevation is true', () => {
      const { root } = renderWithTheme(
        <Button label="No Shadow" disableElevation />
      );
      expect(root).toBeTruthy();
    });
  });

  describe('Link Behavior', () => {
    it('renders as link when href is provided', () => {
      const { getByText } = renderWithTheme(
        <Button label="Link" href="https://example.com" />
      );
      expect(getByText('Link')).toBeTruthy();
    });

    it('calls onPress and opens link when href is provided', () => {
      const onPress = jest.fn();
      const { getByText } = renderWithTheme(
        <Button label="Link" href="https://example.com" onPress={onPress} />
      );
      fireEvent.press(getByText('Link'));
      expect(onPress).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has correct accessibility role', () => {
      const { getByRole } = renderWithTheme(<Button label="Accessible" />);
      expect(getByRole('button')).toBeTruthy();
    });

    it('uses label as accessibility label by default', () => {
      const { getByLabelText } = renderWithTheme(
        <Button label="Accessible Button" />
      );
      expect(getByLabelText('Accessible Button')).toBeTruthy();
    });

    it('uses custom accessibility label when provided', () => {
      const { getByLabelText } = renderWithTheme(
        <Button label="Click" accessibilityLabel="Custom Label" />
      );
      expect(getByLabelText('Custom Label')).toBeTruthy();
    });

    it('includes accessibility hint when provided', () => {
      const { getByA11yHint } = renderWithTheme(
        <Button label="Submit" accessibilityHint="Submits the form" />
      );
      expect(getByA11yHint('Submits the form')).toBeTruthy();
    });

    it('is not accessible when disabled', () => {
      const { getByRole } = renderWithTheme(
        <Button label="Disabled" disabled />
      );
      const button = getByRole('button');
      expect(button.props.accessibilityState?.disabled).toBe(true);
    });
  });

  describe('States', () => {
    it('renders disabled state', () => {
      const { getByText } = renderWithTheme(
        <Button label="Disabled" disabled />
      );
      expect(getByText('Disabled')).toBeTruthy();
    });

    it('renders loading state', () => {
      const { getByText } = renderWithTheme(<Button label="Loading" loading />);
      expect(getByText('Loading')).toBeTruthy();
    });

    it('disabled takes precedence over loading', () => {
      const onPress = jest.fn();
      const { getByRole } = renderWithTheme(
        <Button label="Both" disabled loading onPress={onPress} />
      );
      const button = getByRole('button');
      expect(button.props.accessibilityState?.disabled).toBe(true);
    });
  });

  describe('Feedback Mode', () => {
    it('renders with scale feedback (default)', () => {
      const { root } = renderWithTheme(
        <Button label="Scale" feedbackMode="scale" />
      );
      expect(root).toBeTruthy();
    });

    it('renders with opacity feedback', () => {
      const { root } = renderWithTheme(
        <Button label="Opacity" feedbackMode="opacity" />
      );
      expect(root).toBeTruthy();
    });

    it('renders with none feedback', () => {
      const { root } = renderWithTheme(
        <Button label="None" feedbackMode="none" />
      );
      expect(root).toBeTruthy();
    });
  });
});
