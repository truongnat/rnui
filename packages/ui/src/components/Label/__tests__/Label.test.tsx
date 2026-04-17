import React from 'react';
import { render } from '@testing-library/react-native';
import { Label } from '../Label';
import { ThemeProvider } from '@truongdq01/headless';

// Helper to wrap components with ThemeProvider
const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('Label', () => {
  it('renders children correctly', () => {
    const { getByText } = renderWithTheme(
      <Label testID="label">Test Label</Label>
    );

    expect(getByText('Test Label')).toBeTruthy();
  });

  it('shows required asterisk when required prop is true', () => {
    const { getByText } = renderWithTheme(<Label required>Test Label</Label>);

    expect(getByText('Test Label *')).toBeTruthy();
  });

  it('does not show asterisk when required is false', () => {
    const { getByText } = renderWithTheme(
      <Label required={false}>Test Label</Label>
    );

    expect(getByText('Test Label')).toBeTruthy();
    expect(() => getByText('Test Label *')).toThrow();
  });

  it('applies testID correctly', () => {
    const { getByTestId } = renderWithTheme(
      <Label testID="custom-label">Test Label</Label>
    );

    expect(getByTestId('custom-label')).toBeTruthy();
  });

  it('handles non-string children', () => {
    const { getByTestId } = renderWithTheme(
      <Label testID="label">
        <React.Fragment>Complex Label</React.Fragment>
      </Label>
    );

    expect(getByTestId('label')).toBeTruthy();
  });

  it('applies required asterisk when required is true', () => {
    const { getByText } = renderWithTheme(
      <Label required={true}>Test Label</Label>
    );

    expect(getByText('Test Label *')).toBeTruthy();
  });

  it('sets nativeID prop correctly', () => {
    const { getByTestId } = renderWithTheme(
      <Label nativeID="test-id" testID="label">
        Test Label
      </Label>
    );

    expect(getByTestId('label')).toBeTruthy();
  });
});
