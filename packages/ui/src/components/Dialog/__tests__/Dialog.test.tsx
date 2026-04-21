import { fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import React from 'react';
import { Text } from 'react-native';
import { Dialog } from '../Dialog';

describe('Dialog', () => {
  it('renders title and content', () => {
    const { UNSAFE_root } = render(
      <ThemeProvider>
        <Dialog open={true} title="Dialog Title">
          <Text>Dialog Content</Text>
        </Dialog>
      </ThemeProvider>
    );

    const overlay = UNSAFE_root.findByProps({ testID: 'animated-overlay' });
    expect(overlay).toBeTruthy();
  });

  describe('Accessibility', () => {
    it('has accessibilityViewIsModal on content container', () => {
      const { UNSAFE_root } = render(
        <ThemeProvider>
          <Dialog open={true} title="Test">
            <Text>Content</Text>
          </Dialog>
        </ThemeProvider>
      );
      const container = UNSAFE_root.findByProps({
        accessibilityLabel: 'Dialog',
      });
      expect(container.props.accessibilityViewIsModal).toBe(true);
    });

    it('uses default accessibilityLabel values', () => {
      const { UNSAFE_root } = render(
        <ThemeProvider>
          <Dialog open={true} title="Test">
            <Text>Content</Text>
          </Dialog>
        </ThemeProvider>
      );
      expect(
        UNSAFE_root.findByProps({ accessibilityLabel: 'Dialog' })
      ).toBeTruthy();
      expect(
        UNSAFE_root.findByProps({ accessibilityLabel: 'Dismiss dialog' })
      ).toBeTruthy();
    });

    it('applies custom accessibilityLabel', () => {
      const { UNSAFE_root } = render(
        <ThemeProvider>
          <Dialog
            open={true}
            title="Test"
            accessibilityLabel="Confirm deletion"
            backdropAccessibilityLabel="Close confirmation"
          >
            <Text>Content</Text>
          </Dialog>
        </ThemeProvider>
      );
      expect(
        UNSAFE_root.findByProps({ accessibilityLabel: 'Confirm deletion' })
      ).toBeTruthy();
      expect(
        UNSAFE_root.findByProps({ accessibilityLabel: 'Close confirmation' })
      ).toBeTruthy();
    });

    it('backdrop has button role and hint', () => {
      const { UNSAFE_root } = render(
        <ThemeProvider>
          <Dialog open={true} title="Test">
            <Text>Content</Text>
          </Dialog>
        </ThemeProvider>
      );
      const backdrop = UNSAFE_root.findByProps({
        accessibilityLabel: 'Dismiss dialog',
      });
      expect(backdrop.props.accessibilityRole).toBe('button');
      expect(backdrop.props.accessibilityHint).toBe('Closes the dialog');
    });

    it('calls onClose when backdrop is pressed', () => {
      const onClose = jest.fn();
      const { UNSAFE_root } = render(
        <ThemeProvider>
          <Dialog open={true} title="Test" onClose={onClose}>
            <Text>Content</Text>
          </Dialog>
        </ThemeProvider>
      );
      const backdrop = UNSAFE_root.findByProps({
        accessibilityLabel: 'Dismiss dialog',
      });
      fireEvent.press(backdrop);
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
