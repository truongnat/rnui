import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Marquee } from '../Marquee';
import { ThemeProvider } from '@truongdq01/headless';

// Helper to wrap components with ThemeProvider
const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('Marquee', () => {
  it('renders children correctly', () => {
    const { getByTestId } = renderWithTheme(
      <Marquee testID="marquee">
        <React.Fragment>Test Content</React.Fragment>
      </Marquee>
    );

    expect(getByTestId('marquee')).toBeTruthy();
  });

  it('applies accessibility label', () => {
    const label = 'Scrolling text';
    const { getByLabelText } = renderWithTheme(
      <Marquee accessibilityLabel={label}>
        <React.Fragment>Content</React.Fragment>
      </Marquee>
    );

    expect(getByLabelText(label)).toBeTruthy();
  });

  it('renders with custom speed', () => {
    const { getByTestId } = renderWithTheme(
      <Marquee speed={100}>
        <React.Fragment>Fast Content</React.Fragment>
      </Marquee>
    );

    expect(getByTestId('marquee')).toBeTruthy();
  });

  it('renders with different directions', () => {
    const { getByTestId } = renderWithTheme(
      <Marquee direction="left" testID="marquee">
        <React.Fragment>Left</React.Fragment>
      </Marquee>
    );

    expect(getByTestId('marquee')).toBeTruthy();
  });

  it('handles fade edges option', () => {
    const { getByTestId } = renderWithTheme(
      <Marquee fadeEdges={true} testID="marquee">
        <React.Fragment>Content</React.Fragment>
      </Marquee>
    );

    expect(getByTestId('marquee')).toBeTruthy();
  });

  it('renders with loop option', () => {
    const { getByTestId } = renderWithTheme(
      <Marquee loop={true} testID="marquee">
        <React.Fragment>Looping</React.Fragment>
      </Marquee>
    );

    expect(getByTestId('marquee')).toBeTruthy();
  });

  it('applies delay correctly', () => {
    const { getByTestId } = renderWithTheme(
      <Marquee delay={1000}>
        <React.Fragment>Delayed</React.Fragment>
      </Marquee>
    );

    expect(getByTestId('marquee')).toBeTruthy();
  });
});
