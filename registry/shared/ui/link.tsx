import { Text as RNText, type TextProps as RNTextProps } from 'react-native';
import { tv } from 'tailwind-variants';
import { cn, openSafeUrl } from '@/lib/utils';

const linkVariants = tv({
  variants: {
    variant: {
      default: 'text-primary',
      muted: 'text-muted-foreground',
    },
  },
  defaultVariants: { variant: 'default' },
});

export type LinkVariant = 'default' | 'muted';

export interface LinkProps extends RNTextProps {
  variant?: LinkVariant;
  /** Text decoration; 'none' removes the underline. */
  underline?: 'always' | 'none';
  /** URL to open with `Linking` when `external` — scheme-guarded to http/https/mailto/tel. */
  href?: string;
  /**
   * When true (default), `href` is opened via `Linking.openURL`.
   * Set false to route it through your own `onPress` instead.
   */
  external?: boolean;
  className?: string;
}

/** Inline text link; presses `href` through scheme-guarded Linking. */
export function Link({
  variant = 'default',
  underline = 'always',
  href,
  external = true,
  onPress,
  className,
  ...props
}: LinkProps) {
  return (
    <RNText
      accessibilityRole="link"
      className={cn(
        linkVariants({ variant }),
        underline === 'always' && 'underline',
        className
      )}
      onPress={(e) => {
        onPress?.(e);
        if (external && href) void openSafeUrl(href);
      }}
      {...props}
    />
  );
}
