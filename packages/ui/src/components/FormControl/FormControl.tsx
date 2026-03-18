import React, { createContext, useContext } from "react";
import { View, Text, Pressable } from "react-native";
import { useTokens } from "@rnui/headless";

export type FormControlVariant = "filled" | "outlined" | "standard";
export type FormControlMargin = "dense" | "none" | "normal";

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
  variant = "outlined",
  margin = "none",
  style,
}: FormControlProps) {
  const tokens = useTokens();
  const marginSize = margin === "dense" ? tokens.spacing[2] : margin === "normal" ? tokens.spacing[4] : 0;

  return (
    <FormControlContext.Provider value={{ error, required, disabled, focused, fullWidth, variant }}>
      <View style={[{ alignSelf: fullWidth ? "stretch" : "flex-start", marginVertical: marginSize }, style]}>
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
  const tokens = useTokens();
  const ctx = useFormControl();
  const color = ctx?.error ? tokens.color.error.text : tokens.color.text.secondary;

  return (
    <Text style={[{ fontSize: tokens.fontSize.sm, fontWeight: tokens.fontWeight.medium, color }, style]}>
      {children}{ctx?.required ? " *" : ""}
    </Text>
  );
}

export interface FormHelperTextProps {
  children?: React.ReactNode;
  style?: object;
}

export function FormHelperText({ children, style }: FormHelperTextProps) {
  const tokens = useTokens();
  const ctx = useFormControl();
  const color = ctx?.error ? tokens.color.error.text : tokens.color.text.tertiary;

  return (
    <Text style={[{ fontSize: tokens.fontSize.xs, color, marginTop: tokens.spacing[1] }, style]}>
      {children}
    </Text>
  );
}

export interface FormControlLabelProps {
  control: React.ReactElement;
  label?: React.ReactNode;
  labelPlacement?: "end" | "start" | "top" | "bottom";
  disabled?: boolean;
  onPress?: () => void;
  style?: object;
}

export function FormControlLabel({
  control,
  label,
  labelPlacement = "end",
  disabled,
  onPress,
  style,
}: FormControlLabelProps) {
  const tokens = useTokens();
  const ctx = useFormControl();
  const isDisabled = disabled ?? ctx?.disabled ?? false;

  const controlElement = React.cloneElement(control, {
    disabled: isDisabled,
  } as any);

  const isRow = labelPlacement === "start" || labelPlacement === "end";
  const rowReverse = labelPlacement === "start";
  const colReverse = labelPlacement === "top";

  return (
    <Pressable
      onPress={onPress ?? (control.props as any)?.onPress}
      disabled={isDisabled}
      style={[
        {
          flexDirection: isRow ? (rowReverse ? "row-reverse" : "row") : (colReverse ? "column-reverse" : "column"),
          alignItems: isRow ? "center" : "flex-start",
          gap: tokens.spacing[2],
          opacity: isDisabled ? tokens.opacity[60] : 1,
        },
        style,
      ]}
    >
      {controlElement}
      {label ? (
        <Text style={{ color: tokens.color.text.secondary, fontSize: tokens.fontSize.sm }}>
          {label}
        </Text>
      ) : null}
    </Pressable>
  );
}
