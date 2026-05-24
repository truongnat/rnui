import React from 'react';
import { Text, type TextStyle } from 'react-native';
import { Typography } from '../Typography';
import { AlertTitle } from './AlertTitle';

function hasExplicitTextColor(
  style: TextStyle | TextStyle[] | undefined
): boolean {
  if (style == null) {
    return false;
  }
  const styles = Array.isArray(style) ? style : [style];
  return styles.some(
    (entry) =>
      entry != null &&
      typeof entry === 'object' &&
      'color' in entry &&
      entry.color != null
  );
}

/**
 * Applies alert severity text color to compound Text/Typography children
 * unless they already declare a color.
 */
export function inheritAlertTextColor(
  node: React.ReactNode,
  textColor: string
): React.ReactNode {
  return React.Children.map(node, (child) => {
    if (
      !React.isValidElement<{
        color?: string;
        style?: TextStyle | TextStyle[];
        children?: React.ReactNode;
      }>(child)
    ) {
      return child;
    }

    if (child.type === AlertTitle) {
      return child;
    }

    if (child.type === Typography) {
      if (child.props.color != null && child.props.color !== '') {
        return child;
      }
      return React.cloneElement(child, { color: textColor });
    }

    if (child.type === Text) {
      if (
        child.props.color != null ||
        hasExplicitTextColor(child.props.style)
      ) {
        return child;
      }
      return React.cloneElement(child, {
        style: [child.props.style, { color: textColor }] as TextStyle[],
      });
    }

    if (child.props.children != null) {
      return React.cloneElement(child, {
        children: inheritAlertTextColor(child.props.children, textColor),
      });
    }

    return child;
  });
}
