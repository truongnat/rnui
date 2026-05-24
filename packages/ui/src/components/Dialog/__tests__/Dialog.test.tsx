import { fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import { resolveComponentTokens, semanticTokens } from '@truongdq01/tokens';
import { KeyboardAvoidingView, Text } from 'react-native';
import { Dialog } from '../Dialog';

describe('Dialog tokens regression', () => {
  it('defines host inset, container maxWidth, and lg shadow', () => {
    const { dialog } = resolveComponentTokens(semanticTokens.light);
    expect(dialog.hostInset.paddingHorizontal).toBe(16);
    expect(dialog.container.maxWidth).toBe(400);
    expect(dialog.container.padding).toBe(24);
    expect(dialog.container.shadowOpacity).toBeDefined();
  });
});

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

  describe('Layout', () => {
    it('wraps content in KeyboardAvoidingView', () => {
      const { UNSAFE_root } = render(
        <ThemeProvider>
          <Dialog open={true} title="Test">
            <Text>Content</Text>
          </Dialog>
        </ThemeProvider>
      );
      expect(
        UNSAFE_root.findAllByType(KeyboardAvoidingView).length
      ).toBeGreaterThan(0);
    });

    it('renders title and actions slots', () => {
      const { getByText } = render(
        <ThemeProvider>
          <Dialog
            open={true}
            title="Confirm"
            actions={<Text>Confirm Action</Text>}
          >
            <Text>Body copy</Text>
          </Dialog>
        </ThemeProvider>
      );
      expect(getByText('Confirm')).toBeTruthy();
      expect(getByText('Body copy')).toBeTruthy();
      expect(getByText('Confirm Action')).toBeTruthy();
    });

    it('supports form content without throwing', () => {
      const { getByText } = render(
        <ThemeProvider>
          <Dialog open={true} title="Form">
            <Text>Email field</Text>
          </Dialog>
        </ThemeProvider>
      );
      expect(getByText('Email field')).toBeTruthy();
    });
  });
});
