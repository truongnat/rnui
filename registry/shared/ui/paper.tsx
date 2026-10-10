import type { ReactNode } from 'react';
import { StyleSheet, View, type ViewProps, type ViewStyle } from 'react-native';
import { tv } from 'tailwind-variants';
import { cn } from '@/lib/utils';

const paperVariants = tv({
  base: 'rounded-2xl bg-card p-5',
  variants: {
    variant: {
      flat: 'bg-muted/50 border border-transparent',
      elevated: 'bg-card',
      outlined: 'border border-border bg-card',
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

const elevationStyle: Record<PaperElevation, ViewStyle> = {
  none: {},
  sm: {
    elevation: 1.5,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  md: {
    elevation: 3.5,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  lg: {
    elevation: 7,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 4 },
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.06)',
  },
};

/**
 * Elevated surface — shadcn card-like container with flat/elevated/outlined
 * variants and refined soft shadows.
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
      style={[
        { borderCurve: 'continuous' },
        variant === 'elevated' && elevationStyle[elevation],
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}
