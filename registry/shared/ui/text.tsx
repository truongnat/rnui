import { Text as RNText, type TextProps as RNTextProps } from 'react-native';
import { tv } from 'tailwind-variants';
import { cn } from '@/lib/utils';

const textVariants = tv({
  variants: {
    variant: {
      default: 'text-base text-foreground',
      h1: 'text-4xl font-extrabold tracking-tight text-foreground',
      h2: 'text-3xl font-semibold tracking-tight text-foreground',
      h3: 'text-2xl font-semibold tracking-tight text-foreground',
      h4: 'text-xl font-semibold tracking-tight text-foreground',
      p: 'text-base leading-7 text-foreground',
      lead: 'text-xl text-muted-foreground',
      large: 'text-lg font-semibold text-foreground',
      small: 'text-sm font-medium leading-none text-foreground',
      muted: 'text-sm text-muted-foreground',
      blockquote: 'border-l-4 border-border pl-4 italic text-foreground',
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
  return (
    <RNText className={cn(textVariants({ variant }), className)} {...props} />
  );
}
