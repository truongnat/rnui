import type { ReactNode } from 'react';
import { View, type ViewProps } from 'react-native';
import { Text, type TextProps } from '@/components/ui/text';
import { cn } from '@/lib/utils';

export interface BlockquoteProps extends ViewProps {
  /** Attribution line (author, source). Rendered as muted small text. */
  cite?: ReactNode;
  className?: string;
  textClassName?: string;
  children?: ReactNode;
}

/**
 * Quoted passage — quiet reading rule + emphasized text, with optional cite.
 *
 * @example
 * <Blockquote cite="— Ada Lovelace">
 *   The Analytical Engine weaves algebraic patterns…
 * </Blockquote>
 */
export function Blockquote({
  cite,
  className,
  textClassName,
  children,
  ...props
}: BlockquoteProps) {
  return (
    <View
      className={cn('gap-3 border-l border-border pl-4', className)}
      {...props}
    >
      <Text
        className={cn(
          'text-base italic leading-7 text-foreground',
          textClassName
        )}
      >
        {children}
      </Text>
      {cite != null ? <BlockquoteCite>{cite}</BlockquoteCite> : null}
    </View>
  );
}

/** Standalone cite — also usable inside `cite` for custom styling. */
export function BlockquoteCite({ className, ...props }: TextProps) {
  return (
    <Text
      className={cn('text-sm not-italic text-muted-foreground', className)}
      {...props}
    />
  );
}
