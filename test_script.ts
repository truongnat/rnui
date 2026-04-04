import React from 'react';

const size = 'md';
const tokens = { fontSize: { md: 16 } };
const iconSize = 24;
const iconColor = 'red';

const renderIcon = (icon: React.ReactNode) => {
  if (!icon) return null;
  if (React.isValidElement<{ size?: number | string; color?: string }>(icon)) {
    return React.cloneElement(icon, {
      size: icon.props.size ?? (size === 'sm' ? tokens.fontSize.md : iconSize),
      color: icon.props.color ?? iconColor,
    });
  }
  return icon;
};
