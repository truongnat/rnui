import React from 'react';
import type { ChipIconProps } from './types';

/**
 * Leading icon slot for the Chip.
 * Clones the icon element to inject size and color if not already set.
 */
export function ChipIcon({ children, iconSize, iconColor }: ChipIconProps) {
  if (!children) return null;

  if (React.isValidElement<{ size?: number | string; color?: string }>(children)) {
    return React.cloneElement(children, {
      size: children.props.size ?? iconSize,
      color: children.props.color ?? iconColor,
    });
  }

  return <>{children}</>;
}
