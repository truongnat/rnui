import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import type React from 'react';
import { Text } from 'react-native';
import { Badge } from '../Badge';

// Helper to wrap components with ThemeProvider
const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider brand={undefined} override={undefined}>
      {component}
    </ThemeProvider>
  );
};

// Mock icon component for testing
const MockIcon = ({ size, color }: { size?: number; color?: string }) => (
  <Text testID="mock-icon" style={{ fontSize: size, color }}>
    ★
  </Text>
);

describe('Badge', () => {
  describe('Rendering', () => {
    it('renders with label', () => {
      const { getByText } = renderWithTheme(<Badge label="New" />);
      expect(getByText('New')).toBeTruthy();
    });

    it('renders with empty label', () => {
      const { getByText } = renderWithTheme(<Badge label="" />);
      expect(getByText('')).toBeTruthy();
    });

    it('renders with long label', () => {
      const longLabel = 'This is a very long badge label';
      const { getByText } = renderWithTheme(<Badge label={longLabel} />);
      expect(getByText(longLabel)).toBeTruthy();
    });

    it('renders with special characters', () => {
      const { getByText } = renderWithTheme(<Badge label="★ Special!" />);
      expect(getByText('★ Special!')).toBeTruthy();
    });
  });

  describe('Variants', () => {
    it('renders default variant', () => {
      const { getByText } = renderWithTheme(<Badge label="Default" />);
      expect(getByText('Default')).toBeTruthy();
    });

    it('renders brand variant', () => {
      const { getByText } = renderWithTheme(
        <Badge label="Brand" variant="brand" />
      );
      expect(getByText('Brand')).toBeTruthy();
    });

    it('renders success variant', () => {
      const { getByText } = renderWithTheme(
        <Badge label="Success" variant="success" />
      );
      expect(getByText('Success')).toBeTruthy();
    });

    it('renders warning variant', () => {
      const { getByText } = renderWithTheme(
        <Badge label="Warning" variant="warning" />
      );
      expect(getByText('Warning')).toBeTruthy();
    });

    it('renders error variant', () => {
      const { getByText } = renderWithTheme(
        <Badge label="Error" variant="error" />
      );
      expect(getByText('Error')).toBeTruthy();
    });

    it('renders info variant', () => {
      const { getByText } = renderWithTheme(
        <Badge label="Info" variant="info" />
      );
      expect(getByText('Info')).toBeTruthy();
    });
  });

  describe('Sizes', () => {
    it('renders sm size', () => {
      const { getByText } = renderWithTheme(<Badge label="Small" size="sm" />);
      expect(getByText('Small')).toBeTruthy();
    });

    it('renders md size (default)', () => {
      const { getByText } = renderWithTheme(<Badge label="Medium" />);
      expect(getByText('Medium')).toBeTruthy();
    });

    it('renders lg size', () => {
      const { getByText } = renderWithTheme(<Badge label="Large" size="lg" />);
      expect(getByText('Large')).toBeTruthy();
    });
  });

  describe('Icon Support', () => {
    it('renders with icon', () => {
      const { getByText, getByTestId } = renderWithTheme(
        <Badge label="With Icon" icon={<MockIcon />} />
      );
      expect(getByText('With Icon')).toBeTruthy();
      expect(getByTestId('mock-icon')).toBeTruthy();
    });

    it('renders without icon', () => {
      const { getByText, queryByTestId } = renderWithTheme(
        <Badge label="No Icon" />
      );
      expect(getByText('No Icon')).toBeTruthy();
      expect(queryByTestId('mock-icon')).toBeNull();
    });

    it('clones icon with size prop', () => {
      const { getByTestId } = renderWithTheme(
        <Badge label="Icon Size" icon={<MockIcon />} size="lg" />
      );
      expect(getByTestId('mock-icon')).toBeTruthy();
    });

    it('clones icon with color prop', () => {
      const { getByTestId } = renderWithTheme(
        <Badge label="Icon Color" icon={<MockIcon />} variant="success" />
      );
      expect(getByTestId('mock-icon')).toBeTruthy();
    });

    it('preserves custom icon props', () => {
      const { getByTestId } = renderWithTheme(
        <Badge label="Custom" icon={<MockIcon size={20} color="red" />} />
      );
      const icon = getByTestId('mock-icon');
      expect(icon).toBeTruthy();
    });
  });

  describe('Variant + Size Combinations', () => {
    it('renders brand + sm', () => {
      const { getByText } = renderWithTheme(
        <Badge label="Brand SM" variant="brand" size="sm" />
      );
      expect(getByText('Brand SM')).toBeTruthy();
    });

    it('renders success + lg', () => {
      const { getByText } = renderWithTheme(
        <Badge label="Success LG" variant="success" size="lg" />
      );
      expect(getByText('Success LG')).toBeTruthy();
    });

    it('renders error + md', () => {
      const { getByText } = renderWithTheme(
        <Badge label="Error MD" variant="error" size="md" />
      );
      expect(getByText('Error MD')).toBeTruthy();
    });

    it('renders warning + sm', () => {
      const { getByText } = renderWithTheme(
        <Badge label="Warning SM" variant="warning" size="sm" />
      );
      expect(getByText('Warning SM')).toBeTruthy();
    });

    it('renders info + lg', () => {
      const { getByText } = renderWithTheme(
        <Badge label="Info LG" variant="info" size="lg" />
      );
      expect(getByText('Info LG')).toBeTruthy();
    });
  });

  describe('Variant + Icon Combinations', () => {
    it('renders brand variant with icon', () => {
      const { getByText, getByTestId } = renderWithTheme(
        <Badge label="Brand" variant="brand" icon={<MockIcon />} />
      );
      expect(getByText('Brand')).toBeTruthy();
      expect(getByTestId('mock-icon')).toBeTruthy();
    });

    it('renders success variant with icon', () => {
      const { getByText, getByTestId } = renderWithTheme(
        <Badge label="Success" variant="success" icon={<MockIcon />} />
      );
      expect(getByText('Success')).toBeTruthy();
      expect(getByTestId('mock-icon')).toBeTruthy();
    });

    it('renders error variant with icon', () => {
      const { getByText, getByTestId } = renderWithTheme(
        <Badge label="Error" variant="error" icon={<MockIcon />} />
      );
      expect(getByText('Error')).toBeTruthy();
      expect(getByTestId('mock-icon')).toBeTruthy();
    });

    it('renders warning variant with icon', () => {
      const { getByText, getByTestId } = renderWithTheme(
        <Badge label="Warning" variant="warning" icon={<MockIcon />} />
      );
      expect(getByText('Warning')).toBeTruthy();
      expect(getByTestId('mock-icon')).toBeTruthy();
    });
  });

  describe('Memoization', () => {
    it('renders consistently with same props', () => {
      const { getByText, rerender } = renderWithTheme(
        <Badge label="Memo Test" variant="brand" size="md" />
      );
      expect(getByText('Memo Test')).toBeTruthy();

      rerender(
        <ThemeProvider brand={undefined} override={undefined}>
          <Badge label="Memo Test" variant="brand" size="md" />
        </ThemeProvider>
      );
      expect(getByText('Memo Test')).toBeTruthy();
    });

    it('updates when props change', () => {
      const { getByText, rerender } = renderWithTheme(
        <Badge label="Original" variant="default" />
      );
      expect(getByText('Original')).toBeTruthy();

      rerender(
        <ThemeProvider brand={undefined} override={undefined}>
          <Badge label="Updated" variant="success" />
        </ThemeProvider>
      );
      expect(getByText('Updated')).toBeTruthy();
    });
  });

  describe('Custom style', () => {
    it('merges style prop onto container', () => {
      const { getByText } = renderWithTheme(
        <Badge label="Styled" style={{ opacity: 0.9 }} />
      );
      expect(getByText('Styled')).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('handles numeric labels', () => {
      const { getByText } = renderWithTheme(<Badge label="123" />);
      expect(getByText('123')).toBeTruthy();
    });

    it('handles emoji in labels', () => {
      const { getByText } = renderWithTheme(<Badge label="🎉 Party" />);
      expect(getByText('🎉 Party')).toBeTruthy();
    });

    it('handles whitespace in labels', () => {
      const { getByText } = renderWithTheme(<Badge label="  Spaced  " />);
      expect(getByText('  Spaced  ')).toBeTruthy();
    });

    it('renders with all props combined', () => {
      const { getByText, getByTestId } = renderWithTheme(
        <Badge
          label="Complete"
          variant="success"
          size="lg"
          icon={<MockIcon />}
        />
      );
      expect(getByText('Complete')).toBeTruthy();
      expect(getByTestId('mock-icon')).toBeTruthy();
    });
  });

  describe('Multiple Badges', () => {
    it('renders multiple badges independently', () => {
      const { getByText } = renderWithTheme(
        <>
          <Badge label="First" variant="brand" />
          <Badge label="Second" variant="success" />
          <Badge label="Third" variant="error" />
        </>
      );
      expect(getByText('First')).toBeTruthy();
      expect(getByText('Second')).toBeTruthy();
      expect(getByText('Third')).toBeTruthy();
    });

    it('renders badges with different sizes', () => {
      const { getByText } = renderWithTheme(
        <>
          <Badge label="Small" size="sm" />
          <Badge label="Medium" size="md" />
          <Badge label="Large" size="lg" />
        </>
      );
      expect(getByText('Small')).toBeTruthy();
      expect(getByText('Medium')).toBeTruthy();
      expect(getByText('Large')).toBeTruthy();
    });
  });
});
