import { fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import React from 'react';
import { Text } from 'react-native';
import { Drawer } from '../Drawer';

describe('Drawer', () => {
  it('renders children when open', () => {
    const { getByText } = render(
      <ThemeProvider>
        <Drawer open={true}>
          <Text>Drawer Content</Text>
        </Drawer>
      </ThemeProvider>
    );
    expect(getByText('Drawer Content')).toBeTruthy();
  });

  describe('Accessibility', () => {
    it('has accessibilityViewIsModal on content container', () => {
      const { getByLabelText } = render(
        <ThemeProvider>
          <Drawer open={true}>
            <Text>Content</Text>
          </Drawer>
        </ThemeProvider>
      );
      const container = getByLabelText('Drawer');
      expect(container.props.accessibilityViewIsModal).toBe(true);
    });

    it('uses default accessibilityLabel values', () => {
      const { getByLabelText } = render(
        <ThemeProvider>
          <Drawer open={true}>
            <Text>Content</Text>
          </Drawer>
        </ThemeProvider>
      );
      expect(getByLabelText('Drawer')).toBeTruthy();
      expect(getByLabelText('Dismiss drawer')).toBeTruthy();
    });

    it('applies custom accessibilityLabel', () => {
      const { getByLabelText } = render(
        <ThemeProvider>
          <Drawer
            open={true}
            accessibilityLabel="Navigation menu"
            backdropAccessibilityLabel="Close navigation"
          >
            <Text>Content</Text>
          </Drawer>
        </ThemeProvider>
      );
      expect(getByLabelText('Navigation menu')).toBeTruthy();
      expect(getByLabelText('Close navigation')).toBeTruthy();
    });

    it('backdrop has button role and hint', () => {
      const { getByLabelText } = render(
        <ThemeProvider>
          <Drawer open={true}>
            <Text>Content</Text>
          </Drawer>
        </ThemeProvider>
      );
      const backdrop = getByLabelText('Dismiss drawer');
      expect(backdrop.props.accessibilityRole).toBe('button');
      expect(backdrop.props.accessibilityHint).toBe('Closes the drawer');
    });

    it('calls onClose when backdrop is pressed', () => {
      const onClose = jest.fn();
      const { getByLabelText } = render(
        <ThemeProvider>
          <Drawer open={true} onClose={onClose}>
            <Text>Content</Text>
          </Drawer>
        </ThemeProvider>
      );
      const backdrop = getByLabelText('Dismiss drawer');
      fireEvent.press(backdrop);
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
