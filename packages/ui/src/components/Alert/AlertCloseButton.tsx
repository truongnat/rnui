import { type UseAlertCloseButtonProps, useTokens } from '@truongdq01/headless';
import { Pressable, StyleSheet } from 'react-native';
import { Icon } from '../Icon';

interface AlertCloseButtonProps {
  onClose?: () => void;
  getCloseButtonProps: () => UseAlertCloseButtonProps;
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
