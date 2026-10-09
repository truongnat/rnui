import { forwardRef, useContext, useState } from 'react';
import { TextInput, type TextInputProps } from 'react-native';
import { cn, FormFieldContext, useThemeColor } from '@/lib/utils';

export interface TextareaProps extends TextInputProps {
  className?: string;
  placeholderClassName?: string;
  /**
   * Mirrors shadcn `aria-invalid` — renders a destructive border.
   * Auto-detected from <FormField error> when inside one.
   */
  invalid?: boolean;
  /** Alias for `editable={false}` plus disabled styling. */
  disabled?: boolean;
}

export const Textarea = forwardRef<TextInput, TextareaProps>(
  (
    {
      className,
      placeholderClassName,
      invalid,
      disabled,
      editable,
      multiline = true,
      onFocus,
      onBlur,
      selectionColor,
      cursorColor,
      nativeID,
      style,
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);
    const field = useContext(FormFieldContext);
    const colors = useThemeColor();

    const isInvalid = invalid ?? !!field?.error;
    const isDisabled = disabled || editable === false;

    const placeholder = cn('text-muted-foreground/60', placeholderClassName);
    // See input.tsx: nativewind/uniwind disagree on the placeholder prop name.
    const placeholderProps = {
      placeholderClassName: placeholder,
      placeholderTextColorClassName: placeholder,
    };
    return (
      <TextInput
        ref={ref}
        nativeID={nativeID ?? field?.id}
        editable={!isDisabled}
        accessibilityState={{ disabled: !!isDisabled }}
        multiline={multiline}
        textAlignVertical="top"
        className={cn(
          'min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-base leading-5 text-foreground dark:bg-input/30',
          isDisabled && 'opacity-50',
          className
        )}
        style={[
          { borderCurve: 'continuous' },
          focused && { borderColor: colors.ring },
          isInvalid && { borderColor: colors.destructive },
          style,
        ]}
        selectionColor={selectionColor ?? colors.primary}
        cursorColor={cursorColor ?? colors.primary}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
        {...(placeholderProps as Partial<TextInputProps>)}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';
