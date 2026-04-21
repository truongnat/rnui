import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Icon } from '../Icon';
import { useTokens } from '@truongdq01/headless';

interface AlertCloseButtonProps {
  onClose?: () => void;
  getCloseButtonProps: () => any;
  textColor?: string;
}

/**
 * Internal component for the Alert close button.
 */
export const AlertCloseButton = ({
  onClose,
  getCloseButtonProps,
  textColor,
}: AlertCloseButtonProps) => {
  const tokens = useTokens();

  if (!onClose) return null;

  return (
    <Pressable
      hitSlop={8}
      style={styles.closeButton}
      {...getCloseButtonProps()}
    >
      <Icon
        size={18}
        color={textColor || tokens.color.text.inverse}
        name="close"
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    marginTop: 2,
  },
});
