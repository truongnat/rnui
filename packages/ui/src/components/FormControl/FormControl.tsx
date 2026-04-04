import React, { createContext, useContext, useMemo } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useComponentTokens, useTokens } from '@truongdq01/headless';

export type FormControlVariant = 'filled' | 'outlined' | 'standard';
export type FormControlMargin = 'dense' | 'none' | 'normal';

interface FormControlContextValue {
  error?: boolean;
  required?: boolean;
  disabled?: boolean;
  focused?: boolean;
  fullWidth?: boolean;
  variant?: FormControlVariant;
}

const FormControlContext = createContext<FormControlContextValue | null>(null);

export function useFormControl() {
  return useContext(FormControlContext);
}

export interface FormControlProps {
  children?: React.ReactNode;
  error?: boolean;
  required?: boolean;
  disabled?: boolean;
  focused?: boolean;
  fullWidth?: boolean;
  variant?: FormControlVariant;
  margin?: FormControlMargin;
  style?: object;
}

export function FormControl({
  children,
  error,
  required,
  disabled,
  focused,
  fullWidth,
  variant = 'outlined',
  margin = 'none',
  style,
}: FormControlProps) {
  const { formControl } = useComponentTokens();
  const tokens = useTokens();

  const marginSize = useMemo(() => {
    if (margin === 'dense') return tokens.spacing[2];
    if (margin === 'normal') return tokens.spacing[4];
    return 0;
  }, [margin, tokens]);

  const ctxValue = useMemo(
    () => ({ error, required, disabled, focused, fullWidth, variant }),
    [error, required, disabled, focused, fullWidth, variant]
  );

  return (
    <FormControlContext.Provider value={ctxValue}>
      <View
        style={
          [
            formControl.container,
            {
              alignSelf: fullWidth ? 'stretch' : 'flex-start',
              marginVertical: marginSize,
            },
            style,
          ] as any
        }
      >
        {children}
      </View>
    </FormControlContext.Provider>
  );
}

export interface FormLabelProps {
  children?: React.ReactNode;
  style?: object;
}

export function FormLabel({ children, style }: FormLabelProps) {
  const { formControl } = useComponentTokens();
  const ctx = useFormControl();

  const color = ctx?.error
    ? formControl.errorText.color
    : ctx?.disabled
      ? formControl.label.color + '80'
      : formControl.label.color;

  return (
    <Text style={[formControl.label, { color }, style] as any}>
      {children}
      {ctx?.required ? ' *' : ''}
    </Text>
  );
}

export interface FormHelperTextProps {
  children?: React.ReactNode;
  style?: object;
}

export function FormHelperText({ children, style }: FormHelperTextProps) {
  const { formControl } = useComponentTokens();
  const ctx = useFormControl();

  const color = ctx?.error
    ? formControl.errorText.color
    : formControl.helperText.color;

  return (
    <Text style={[formControl.helperText, { color }, style] as any}>
      {children}
    </Text>
  );
}

export interface FormControlLabelProps {
  control: React.ReactElement;
  label?: React.ReactNode;
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
  disabled?: boolean;
  onPress?: () => void;
  style?: object;
}

export function FormControlLabel({
  control,
  label,
  labelPlacement = 'end',
  disabled,
  onPress,
  style,
}: FormControlLabelProps) {
  const { formControl } = useComponentTokens();
  const tokens = useTokens();
  const ctx = useFormControl();
  const isDisabled = disabled ?? ctx?.disabled ?? false;

  const controlElement = React.cloneElement<any>(control, {
    disabled: isDisabled,
  });

  const isRow = labelPlacement === 'start' || labelPlacement === 'end';
  const rowReverse = labelPlacement === 'start';
  const colReverse = labelPlacement === 'top';

  return (
    <Pressable
      onPress={onPress ?? (control.props as any)?.onPress}
      disabled={isDisabled}
      style={[
        {
          flexDirection: isRow
            ? rowReverse
              ? 'row-reverse'
              : 'row'
            : colReverse
              ? 'column-reverse'
              : 'column',
          alignItems: isRow ? 'center' : 'flex-start',
          gap: tokens.spacing[2],
          opacity: isDisabled ? 0.6 : 1,
        },
        style,
      ]}
    >
      {controlElement}
      {label ? <Text style={formControl.label as any}>{label}</Text> : null}
    </Pressable>
  );
}
