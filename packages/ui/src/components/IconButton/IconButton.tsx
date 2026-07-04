import { Button } from '../Button';
import type { IconButtonProps } from './types';

export function IconButton({
  icon,
  label,
  accessibilityLabel,
  variant = 'ghost',
  feedbackMode = 'opacity',
  ...props
}: IconButtonProps) {
  return (
    <Button
      {...props}
      accessibilityLabel={accessibilityLabel ?? label}
      feedbackMode={feedbackMode}
      leadingIcon={icon}
      variant={variant}
    />
  );
}

IconButton.displayName = 'IconButton';
