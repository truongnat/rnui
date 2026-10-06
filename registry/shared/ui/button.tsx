import type { ReactNode } from 'react';
import { useContext } from 'react';
import { Pressable, Text, type PressableProps } from 'react-native';
import { tv } from 'tailwind-variants';
import {
  cn,
  FormFieldContext,
  TextClassContext,
  useThemeColor,
} from '@/lib/utils';

const buttonVariants = tv({
  slots: {
    base: 'flex-row items-center justify-center gap-2 rounded-md disabled:opacity-50',
    label: 'font-medium',
  },
  variants: {
    variant: {
      default: {
        base: 'bg-primary active:opacity-90',
        label: 'text-primary-foreground',
      },
      destructive: {
        base: 'bg-destructive active:opacity-90',
        label: 'text-destructive-foreground',
      },
      outline: {
        base: 'border border-border bg-background active:bg-accent dark:bg-input/30',
        label: 'text-foreground',
      },
      secondary: {
        base: 'bg-secondary active:opacity-80',
        label: 'text-secondary-foreground',
      },
      ghost: {
        base: 'active:bg-accent',
        label: 'text-foreground',
      },
      link: {
        label: 'text-primary underline',
      },
    },
    size: {
      default: { base: 'h-10 px-4', label: 'text-sm' },
      sm: { base: 'h-9 px-3', label: 'text-sm' },
      lg: { base: 'h-11 px-8', label: 'text-base' },
      icon: { base: 'h-10 w-10' },
      'icon-sm': { base: 'h-8 w-8' },
      'icon-lg': { base: 'h-11 w-11' },
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export type ButtonVariant =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link';
export type ButtonSize =
  | 'default'
  | 'sm'
  | 'lg'
  | 'icon'
  | 'icon-sm'
  | 'icon-lg';

export interface ButtonProps extends Omit<PressableProps, 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Mirrors shadcn `aria-invalid` — destructive border. Auto-detected from FormField error. */
  invalid?: boolean;
  className?: string;
  labelClassName?: string;
  children?: ReactNode;
}

export function Button({
  variant = 'default',
  size = 'default',
  invalid,
  className,
  labelClassName,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const { base, label } = buttonVariants({ variant, size });
  const field = useContext(FormFieldContext);
  const colors = useThemeColor();
  const isInvalid = invalid ?? !!field?.error;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      className={cn(base(), className)}
      {...props}
      style={(state) => [
        { borderCurve: 'continuous' },
        isInvalid && { borderColor: colors.destructive },
        typeof props.style === 'function' ? props.style(state) : props.style,
      ]}
    >
      <TextClassContext.Provider value={cn(label(), labelClassName)}>
        {typeof children === 'string' || typeof children === 'number' ? (
          <Text className={cn(label(), labelClassName)}>{children}</Text>
        ) : (
          children
        )}
      </TextClassContext.Provider>
    </Pressable>
  );
}
