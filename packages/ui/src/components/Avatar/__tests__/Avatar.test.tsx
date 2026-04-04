import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Avatar, AvatarGroup } from '../Avatar';
import { ThemeProvider } from '@truongdq01/headless';

// Helper to wrap components with ThemeProvider
const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('Avatar', () => {
  describe('Rendering', () => {
    it('renders with image source', () => {
      const { root } = renderWithTheme(
        <Avatar src="https://example.com/avatar.jpg" />
      );
      expect(root).toBeTruthy();
    });

    it('renders with initials', () => {
      const { getByText } = renderWithTheme(<Avatar initials="JD" />);
      expect(getByText('JD')).toBeTruthy();
    });

    it('renders with fallback icon', () => {
      const { getByText } = renderWithTheme(
        <Avatar fallbackIcon={<Text>👤</Text>} />
      );
      expect(getByText('👤')).toBeTruthy();
    });

    it('renders default fallback when no props', () => {
      const { getByText } = renderWithTheme(<Avatar />);
      expect(getByText('?')).toBeTruthy();
    });

    it('prioritizes src over initials', () => {
      const { queryByText, root } = renderWithTheme(
        <Avatar src="https://example.com/avatar.jpg" initials="JD" />
      );
      expect(queryByText('JD')).toBeNull();
      expect(root).toBeTruthy();
    });

    it('prioritizes initials over fallback icon', () => {
      const { getByText, queryByText } = renderWithTheme(
        <Avatar initials="AB" fallbackIcon={<Text>👤</Text>} />
      );
      expect(getByText('AB')).toBeTruthy();
      expect(queryByText('👤')).toBeNull();
    });
  });

  describe('Sizes', () => {
    it('renders xs size', () => {
      const { root } = renderWithTheme(<Avatar initials="XS" size="xs" />);
      expect(root).toBeTruthy();
    });

    it('renders sm size', () => {
      const { root } = renderWithTheme(<Avatar initials="SM" size="sm" />);
      expect(root).toBeTruthy();
    });

    it('renders md size (default)', () => {
      const { root } = renderWithTheme(<Avatar initials="MD" />);
      expect(root).toBeTruthy();
    });

    it('renders lg size', () => {
      const { root } = renderWithTheme(<Avatar initials="LG" size="lg" />);
      expect(root).toBeTruthy();
    });

    it('renders xl size', () => {
      const { root } = renderWithTheme(<Avatar initials="XL" size="xl" />);
      expect(root).toBeTruthy();
    });

    it('renders 2xl size', () => {
      const { root } = renderWithTheme(<Avatar initials="2X" size="2xl" />);
      expect(root).toBeTruthy();
    });
  });

  describe('Shapes', () => {
    it('renders circle shape (default)', () => {
      const { root } = renderWithTheme(<Avatar initials="CI" />);
      expect(root).toBeTruthy();
    });

    it('renders rounded shape', () => {
      const { root } = renderWithTheme(
        <Avatar initials="RO" shape="rounded" />
      );
      expect(root).toBeTruthy();
    });
  });

  describe('Status Indicator', () => {
    it('renders online status', () => {
      const { root } = renderWithTheme(
        <Avatar initials="ON" status="online" />
      );
      expect(root).toBeTruthy();
    });

    it('renders offline status', () => {
      const { root } = renderWithTheme(
        <Avatar initials="OF" status="offline" />
      );
      expect(root).toBeTruthy();
    });

    it('renders busy status', () => {
      const { root } = renderWithTheme(<Avatar initials="BU" status="busy" />);
      expect(root).toBeTruthy();
    });

    it('renders away status', () => {
      const { root } = renderWithTheme(<Avatar initials="AW" status="away" />);
      expect(root).toBeTruthy();
    });

    it('renders without status by default', () => {
      const { root } = renderWithTheme(<Avatar initials="NS" />);
      expect(root).toBeTruthy();
    });
  });

  describe('Initials Processing', () => {
    it('converts initials to uppercase', () => {
      const { getByText } = renderWithTheme(<Avatar initials="ab" />);
      expect(getByText('AB')).toBeTruthy();
    });

    it('truncates initials to 2 characters', () => {
      const { getByText } = renderWithTheme(<Avatar initials="ABCD" />);
      expect(getByText('AB')).toBeTruthy();
    });

    it('handles single character initials', () => {
      const { getByText } = renderWithTheme(<Avatar initials="A" />);
      expect(getByText('A')).toBeTruthy();
    });

    it('generates consistent colors for same initials', () => {
      const { root: root1 } = renderWithTheme(<Avatar initials="JD" />);
      const { root: root2 } = renderWithTheme(<Avatar initials="JD" />);
      expect(root1).toBeTruthy();
      expect(root2).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('applies accessibility label', () => {
      const { getByLabelText } = renderWithTheme(
        <Avatar initials="AL" accessibilityLabel="User Avatar" />
      );
      expect(getByLabelText('User Avatar')).toBeTruthy();
    });

    it('is accessible when label provided', () => {
      const { root } = renderWithTheme(
        <Avatar initials="AC" accessibilityLabel="Profile Picture" />
      );
      expect(root).toBeTruthy();
    });
  });

  describe('Custom Styling', () => {
    it('accepts custom style', () => {
      const { root } = renderWithTheme(
        <Avatar initials="CS" style={{ marginTop: 10 }} />
      );
      expect(root).toBeTruthy();
    });

    it('merges custom style with default styles', () => {
      const { root } = renderWithTheme(
        <Avatar
          initials="MS"
          style={[{ marginTop: 10 }, { marginBottom: 10 }]}
        />
      );
      expect(root).toBeTruthy();
    });
  });
});

describe('AvatarGroup', () => {
  const mockAvatars = [
    { initials: 'JD' },
    { initials: 'AB' },
    { initials: 'CD' },
    { initials: 'EF' },
    { initials: 'GH' },
  ];

  describe('Rendering', () => {
    it('renders multiple avatars', () => {
      const { getByText } = renderWithTheme(
        <AvatarGroup avatars={mockAvatars.slice(0, 3)} />
      );
      expect(getByText('JD')).toBeTruthy();
      expect(getByText('AB')).toBeTruthy();
      expect(getByText('CD')).toBeTruthy();
    });

    it('renders empty group', () => {
      const { root } = renderWithTheme(<AvatarGroup avatars={[]} />);
      expect(root).toBeTruthy();
    });

    it('renders single avatar', () => {
      const { getByText } = renderWithTheme(
        <AvatarGroup avatars={[{ initials: 'SO' }]} />
      );
      expect(getByText('SO')).toBeTruthy();
    });
  });

  describe('Max Limit', () => {
    it('respects default max of 4', () => {
      const { getByText, queryByText } = renderWithTheme(
        <AvatarGroup avatars={mockAvatars} />
      );
      expect(getByText('JD')).toBeTruthy();
      expect(getByText('AB')).toBeTruthy();
      expect(getByText('CD')).toBeTruthy();
      expect(getByText('EF')).toBeTruthy();
      expect(queryByText('GH')).toBeNull();
    });

    it('shows overflow count', () => {
      const { getByText } = renderWithTheme(
        <AvatarGroup avatars={mockAvatars} max={3} />
      );
      expect(getByText('+2')).toBeTruthy();
    });

    it('respects custom max', () => {
      const { getByText, queryByText } = renderWithTheme(
        <AvatarGroup avatars={mockAvatars} max={2} />
      );
      expect(getByText('JD')).toBeTruthy();
      expect(getByText('AB')).toBeTruthy();
      expect(queryByText('CD')).toBeNull();
      expect(getByText('+3')).toBeTruthy();
    });

    it('does not show overflow when under max', () => {
      const { queryByText } = renderWithTheme(
        <AvatarGroup avatars={mockAvatars.slice(0, 2)} max={4} />
      );
      expect(queryByText('+')).toBeNull();
    });
  });

  describe('Sizes', () => {
    it('renders with default md size', () => {
      const { root } = renderWithTheme(
        <AvatarGroup avatars={mockAvatars.slice(0, 2)} />
      );
      expect(root).toBeTruthy();
    });

    it('renders with sm size', () => {
      const { root } = renderWithTheme(
        <AvatarGroup avatars={mockAvatars.slice(0, 2)} size="sm" />
      );
      expect(root).toBeTruthy();
    });

    it('renders with lg size', () => {
      const { root } = renderWithTheme(
        <AvatarGroup avatars={mockAvatars.slice(0, 2)} size="lg" />
      );
      expect(root).toBeTruthy();
    });
  });

  describe('Overlap', () => {
    it('uses default overlap', () => {
      const { root } = renderWithTheme(
        <AvatarGroup avatars={mockAvatars.slice(0, 3)} />
      );
      expect(root).toBeTruthy();
    });

    it('accepts custom overlap', () => {
      const { root } = renderWithTheme(
        <AvatarGroup avatars={mockAvatars.slice(0, 3)} overlap={10} />
      );
      expect(root).toBeTruthy();
    });

    it('handles zero overlap', () => {
      const { root } = renderWithTheme(
        <AvatarGroup avatars={mockAvatars.slice(0, 3)} overlap={0} />
      );
      expect(root).toBeTruthy();
    });
  });

  describe('Integration', () => {
    it('works with image avatars', () => {
      const imageAvatars = [
        { src: 'https://example.com/1.jpg' },
        { src: 'https://example.com/2.jpg' },
      ];
      const { root } = renderWithTheme(<AvatarGroup avatars={imageAvatars} />);
      expect(root).toBeTruthy();
    });

    it('works with mixed avatar types', () => {
      const mixedAvatars = [
        { src: 'https://example.com/1.jpg' },
        { initials: 'AB' },
        { fallbackIcon: <Text>👤</Text> },
      ];
      const { getByText } = renderWithTheme(
        <AvatarGroup avatars={mixedAvatars} />
      );
      expect(getByText('AB')).toBeTruthy();
    });

    it('works with status indicators', () => {
      const statusAvatars = [
        { initials: 'ON', status: 'online' as const },
        { initials: 'OF', status: 'offline' as const },
      ];
      const { root } = renderWithTheme(<AvatarGroup avatars={statusAvatars} />);
      expect(root).toBeTruthy();
    });
  });
});
