import { forwardRef } from 'react';
import { TextInput, type TextInputProps } from 'react-native';
import { cn } from '@/lib/utils';

export interface TextareaProps extends TextInputProps {
  className?: string;
  placeholderClassName?: string;
}

export const Textarea = forwardRef<TextInput, TextareaProps>(
  ({ className, placeholderClassName, ...props }, ref) => {
    const placeholder = cn('text-muted-foreground', placeholderClassName);
    // See input.tsx: nativewind/uniwind disagree on the placeholder prop name.
    const placeholderProps = {
      placeholderClassName: placeholder,
      placeholderTextColorClassName: placeholder,
    };
    return (
      <TextInput
        ref={ref}
        multiline
        textAlignVertical="top"
        className={cn(
          'min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground',
          'disabled:opacity-50',
          className
        )}
        {...(placeholderProps as Partial<TextInputProps>)}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';
