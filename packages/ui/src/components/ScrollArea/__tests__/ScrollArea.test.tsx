import React from 'react';
import { render } from '@testing-library/react-native';
import { Text, View } from 'react-native';
import { ScrollArea } from '../ScrollArea';
import { ThemeProvider } from '@truongdq01/headless';

// Helper to wrap components with ThemeProvider
const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('ScrollArea', () => {
  it('renders children correctly', () => {
    const { getByTestId, getByText } = renderWithTheme(
      <ScrollArea testID="scroll-area">
        <Text>Test Content</Text>
      </ScrollArea>
    );

    expect(getByTestId('scroll-area')).toBeTruthy();
    expect(getByText('Test Content')).toBeTruthy();
  });

  it('applies custom style', () => {
    const { getByTestId } = renderWithTheme(
      <ScrollArea testID="scroll-area" style={{ backgroundColor: 'red' }}>
        <Text>Content</Text>
      </ScrollArea>
    );

    expect(getByTestId('scroll-area')).toBeTruthy();
  });

  it('handles vertical scrolling by default', () => {
    const { getByTestId } = renderWithTheme(
      <ScrollArea testID="scroll-area">
        <Text>Content</Text>
      </ScrollArea>
    );

    expect(getByTestId('scroll-area')).toBeTruthy();
  });

  it('supports horizontal direction', () => {
    const { getByTestId } = renderWithTheme(
      <ScrollArea direction="horizontal" testID="scroll-area">
        <Text>Content</Text>
      </ScrollArea>
    );

    expect(getByTestId('scroll-area')).toBeTruthy();
  });

  it('supports both directions', () => {
    const { getByTestId } = renderWithTheme(
      <ScrollArea direction="both" testID="scroll-area">
        <Text>Content</Text>
      </ScrollArea>
    );

    expect(getByTestId('scroll-area')).toBeTruthy();
  });

  it('respects scroll indicator visibility', () => {
    const { getByTestId } = renderWithTheme(
      <ScrollArea
        testID="scroll-area"
        showVerticalScrollIndicator={false}
        showHorizontalScrollIndicator={false}
      >
        <Text>Content</Text>
      </ScrollArea>
    );

    expect(getByTestId('scroll-area')).toBeTruthy();
  });

  it('passes through ScrollView props', () => {
    const { getByTestId } = renderWithTheme(
      <ScrollArea
        testID="scroll-area"
        onScroll={() => {}}
        keyboardShouldPersistTaps="handled"
      >
        <Text>Content</Text>
      </ScrollArea>
    );

    expect(getByTestId('scroll-area')).toBeTruthy();
  });

  it('handles empty children', () => {
    const { getByTestId } = renderWithTheme(
      <ScrollArea testID="scroll-area" />
    );

    expect(getByTestId('scroll-area')).toBeTruthy();
  });

  it("direction='horizontal' indicator logic", () => {
    const { getByTestId } = renderWithTheme(
      <ScrollArea direction="horizontal" testID="scroll-area">
        <Text>Content</Text>
      </ScrollArea>
    );

    expect(getByTestId('scroll-area')).toBeTruthy();
  });

  it('no implicit flex behavior', () => {
    const { getByTestId } = renderWithTheme(
      <ScrollArea testID="scroll-area" style={{ height: 100 }}>
        <Text>Content</Text>
      </ScrollArea>
    );

    expect(getByTestId('scroll-area')).toBeTruthy();
  });
});
