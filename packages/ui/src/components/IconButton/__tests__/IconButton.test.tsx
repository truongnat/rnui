import { fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import type React from 'react';
import { Text } from 'react-native';
import { IconButton } from '..';

const renderWithTheme = (component: React.ReactElement) =>
  render(<ThemeProvider>{component}</ThemeProvider>);

describe('IconButton', () => {
  it('uses label as the accessibility label by default', () => {
    const { getByLabelText } = renderWithTheme(
      <IconButton icon={<Text>☆</Text>} label="Search" />
    );

    expect(getByLabelText('Search')).toBeTruthy();
  });

  it('allows overriding the accessibility label', () => {
    const { getByLabelText, queryByLabelText } = renderWithTheme(
      <IconButton
        icon={<Text>☆</Text>}
        label="Search"
        accessibilityLabel="Find items"
      />
    );

    expect(getByLabelText('Find items')).toBeTruthy();
    expect(queryByLabelText('Search')).toBeNull();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderWithTheme(
      <IconButton icon={<Text>☆</Text>} label="Search" onPress={onPress} />
    );

    fireEvent.press(getByLabelText('Search'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders loading state as disabled', () => {
    const { getByRole } = renderWithTheme(
      <IconButton icon={<Text>☆</Text>} label="Refresh" loading />
    );

    const button = getByRole('button');
    expect(button.props.accessibilityState?.disabled).toBe(true);
  });
});
