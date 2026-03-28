import React from 'react';

export function IconWrapper({ children, size, color }: { children: React.ReactNode; size?: number; color?: string }) {
  const tokens = { color: { text: { primary: 'black' } } };
  if (!React.isValidElement<{ color?: string; size?: number }>(children)) return null;
  return React.cloneElement(children, {
    color: children.props.color ?? color ?? tokens.color.text.primary,
    size: children.props.size ?? size,
  });
}
