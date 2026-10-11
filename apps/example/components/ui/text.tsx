import { useContext } from 'react';
import { Text as RNText, type TextProps as RNTextProps } from 'react-native';
import { tv } from 'tailwind-variants';
import { cn, TextClassContext } from '@/lib/utils';

const textVariants = tv({
  variants: {
    variant: {
      default: 'text-base text-foreground',
      h1: 'text-4xl font-extrabold tracking-tight text-foreground',
      h2: 'text-3xl font-semibold tracking-tight text-foreground',
      h3: 'text-2xl font-semibold tracking-tight text-foreground',
      h4: 'text-xl font-semibold tracking-tight text-foreground',
      p: 'text-base leading-7 text-foreground',
      lead: 'text-xl leading-7 text-muted-foreground',
      large: 'text-lg font-semibold leading-7 text-foreground',
      small: 'text-sm font-medium leading-5 text-foreground',
      muted: 'text-sm leading-6 text-muted-foreground',
      blockquote:
        'border-l border-border pl-4 italic leading-7 text-foreground',
      code: 'rounded-md bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export type TextVariant =
  | 'default'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'p'
  | 'lead'
  | 'large'
  | 'small'
  | 'muted'
  | 'blockquote'
  | 'code';

export interface TextProps extends RNTextProps {
  variant?: TextVariant;
  className?: string;
}

export function Text({ variant = 'default', className, ...props }: TextProps) {
  const textClass = useContext(TextClassContext);
  return (
    <RNText
      className={cn(textVariants({ variant }), textClass, className)}
      accessibilityRole={
        variant === 'h1' ||
        variant === 'h2' ||
        variant === 'h3' ||
        variant === 'h4'
          ? 'header'
          : undefined
      }
      {...props}
    />
  );
}
