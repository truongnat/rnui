import type { ReactNode } from 'react';
import { View, type ViewProps, type ViewStyle } from 'react-native';
import { tv } from 'tailwind-variants';
import { cn } from '@/lib/utils';

const paperVariants = tv({
  base: 'rounded-xl bg-card p-4',
  variants: {
    variant: {
      flat: 'bg-muted/50',
      elevated: 'bg-card',
      outlined: 'border border-border bg-transparent',
    },
    square: {
      true: 'rounded-none',
    },
  },
  defaultVariants: {
    variant: 'elevated',
  },
});

export type PaperVariant = 'flat' | 'elevated' | 'outlined';
export type PaperElevation = 'none' | 'sm' | 'md' | 'lg';

export interface PaperProps extends ViewProps {
  variant?: PaperVariant;
  /** Shadow depth — only applies to the `elevated` variant. */
  elevation?: PaperElevation;
  /** Remove border radius. */
  square?: boolean;
  className?: string;
  children?: ReactNode;
}

// Elevation shadows must live in style — NativeWind can't express
// iOS shadowOffset/shadowRadius via classes.
const elevationStyle: Record<PaperElevation, ViewStyle> = {
  none: {},
  sm: {
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  md: {
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
  },
  lg: {
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 6 },
  },
};

/**
 * Elevated surface — shadcn card-like container with flat/elevated/outlined
 * variants.
 */
export function Paper({
  variant = 'elevated',
  elevation = 'sm',
  square,
  className,
  children,
  style,
  ...props
}: PaperProps) {
  return (
    <View
      className={cn(paperVariants({ variant, square }), className)}
      style={[variant === 'elevated' && elevationStyle[elevation], style]}
      {...props}
    >
      {children}
    </View>
  );
}
