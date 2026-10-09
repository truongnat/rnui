import { Children, type ReactNode } from 'react';
import { View, type ViewProps, type ViewStyle } from 'react-native';
import { cn, spacingValue, type SpacingToken } from '@/lib/utils';

export interface StackProps extends ViewProps {
  /** flex-direction shorthand. */
  direction?: ViewStyle['flexDirection'];
  /** Gap between children — token or pixel value. */
  spacing?: SpacingToken | number;
  /** Insert between every pair of children. */
  divider?: ReactNode;
  alignItems?: ViewStyle['alignItems'];
  justifyContent?: ViewStyle['justifyContent'];
  /** Shorthand for `flexWrap: 'wrap'` (handy for rows of chips). */
  wrap?: boolean;
  flexWrap?: ViewStyle['flexWrap'];
  className?: string;
  children?: ReactNode;
}

/**
 * One-dimensional layout helper — flex row/column with uniform spacing.
 *
 * @example
 * <Stack direction="row" spacing="md" alignItems="center">
 *   <Icon /><Label>Title</Label>
 * </Stack>
 */
export function Stack({
  direction = 'column',
  spacing = 'sm',
  divider,
  alignItems,
  justifyContent,
  wrap,
  flexWrap,
  className,
  children,
  style,
  ...props
}: StackProps) {
  const items = Children.toArray(children);
  const content = divider
    ? items.flatMap((child, i) => (i === 0 ? [child] : [divider, child]))
    : items;

  return (
    <View
      className={cn(className)}
      style={[
        {
          flexDirection: direction,
          gap: spacingValue(spacing),
          alignItems,
          justifyContent,
          flexWrap: flexWrap ?? (wrap ? 'wrap' : undefined),
        },
        style,
      ]}
      {...props}
    >
      {content}
    </View>
  );
}
