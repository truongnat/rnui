import { forwardRef } from 'react';
import { TextInput, type TextInputProps } from 'react-native';
import { cn } from '@/lib/utils';

export interface InputProps extends TextInputProps {
  className?: string;
  placeholderClassName?: string;
}

export const Input = forwardRef<TextInput, InputProps>(
  ({ className, placeholderClassName, ...props }, ref) => {
    const placeholder = cn('text-muted-foreground', placeholderClassName);
    // Engines disagree on the prop name: nativewind uses placeholderClassName,
    // uniwind uses placeholderTextColorClassName. Pass both; each ignores the other.
    const placeholderProps = {
      placeholderClassName: placeholder,
      placeholderTextColorClassName: placeholder,
    };
    return (
      <TextInput
        ref={ref}
        className={cn(
          'h-10 w-full rounded-md border border-input bg-background px-3 text-base text-foreground',
          'disabled:opacity-50',
          className
        )}
        {...(placeholderProps as Partial<TextInputProps>)}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';
