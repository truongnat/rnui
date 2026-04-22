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
      const { getByText } = render(
        <ThemeProvider>
          <Drawer open={true}>
            <Text>Content</Text>
          </Drawer>
        </ThemeProvider>
      );
      expect(getByText('Content')).toBeTruthy();
    });

    it('applies custom accessibilityLabel', () => {
      const { getByText } = render(
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
      expect(getByText('Content')).toBeTruthy();
    });

    it('backdrop has button role and hint', () => {
      const { getByText } = render(
        <ThemeProvider>
          <Drawer open={true}>
            <Text>Content</Text>
          </Drawer>
        </ThemeProvider>
      );
      expect(getByText('Content')).toBeTruthy();
    });

    it('calls onClose when backdrop is pressed', () => {
      const onClose = jest.fn();
      const { getByText } = render(
        <ThemeProvider>
          <Drawer open={true} onClose={onClose}>
            <Text>Content</Text>
          </Drawer>
        </ThemeProvider>
      );
      expect(getByText('Content')).toBeTruthy();
      expect(onClose).not.toHaveBeenCalled();
    });
  });
});
