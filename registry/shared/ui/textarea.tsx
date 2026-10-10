import { forwardRef, useContext, useState } from 'react';
import { StyleSheet, TextInput, type TextInputProps, type TextStyle } from 'react-native';
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
    const placeholderProps = {
      placeholderClassName: placeholder,
      placeholderTextColorClassName: placeholder,
    };

    const dynamicStyle: TextStyle = {
      borderColor: isInvalid
        ? colors.destructive
        : focused
          ? colors.ring || colors.primary
          : colors.input || colors.border,
      borderWidth: focused || isInvalid ? 1.5 : 1,
      backgroundColor: colors.background,
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
          'min-h-[100px] w-full rounded-xl p-3.5 text-base text-foreground',
          isDisabled && 'opacity-50',
          className
        )}
        style={[
          styles.baseTextarea,
          dynamicStyle,
          style,
        ]}
        placeholderTextColor={colors.mutedForeground}
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

const styles = StyleSheet.create({
  baseTextarea: {
    borderCurve: 'continuous',
    fontSize: 15,
  },
});
