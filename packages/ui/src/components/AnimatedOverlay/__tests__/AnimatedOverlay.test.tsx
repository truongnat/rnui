import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import type React from 'react';
import { Text } from 'react-native';
import { AnimatedOverlay } from '../AnimatedOverlay';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('AnimatedOverlay', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders children when visible', () => {
    const { UNSAFE_root } = renderWithTheme(
      <AnimatedOverlay visible={true}>
        <Text>Test Content</Text>
      </AnimatedOverlay>
    );

    const overlay = UNSAFE_root.findByProps({ testID: 'animated-overlay' });
    expect(overlay).toBeTruthy();
  });

  it('accepts animation type prop', () => {
    const { UNSAFE_root } = renderWithTheme(
      <AnimatedOverlay visible={true} animationType="scale">
        <Text>Content</Text>
      </AnimatedOverlay>
    );

    const overlay = UNSAFE_root.findByProps({ testID: 'animated-overlay' });
    expect(overlay).toBeTruthy();
  });

  it('accepts duration prop', () => {
    const { UNSAFE_root } = renderWithTheme(
      <AnimatedOverlay visible={true} duration={500}>
        <Text>Content</Text>
      </AnimatedOverlay>
    );

    const overlay = UNSAFE_root.findByProps({ testID: 'animated-overlay' });
    expect(overlay).toBeTruthy();
  });
});
