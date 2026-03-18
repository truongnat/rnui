import React from "react";
import { View, Text } from "react-native";
import { useTokens } from "@rnui/headless";

export interface StepperProps {
  activeStep?: number;
  orientation?: "horizontal" | "vertical";
  children?: React.ReactNode;
}

export interface StepProps {
  index: number;
  label?: string;
  children?: React.ReactNode;
}

export interface StepLabelProps {
  children?: React.ReactNode;
  style?: object;
}

export function Stepper({ activeStep = 0, orientation = "horizontal", children }: StepperProps) {
  const tokens = useTokens();
  const items = React.Children.toArray(children);

  return (
    <View style={{ flexDirection: orientation === "horizontal" ? "row" : "column", gap: tokens.spacing[4] }}>
      {items.map((child) => {
        if (!React.isValidElement(child)) return child;
        const element = child as React.ReactElement<any>;
        return React.cloneElement(element, { activeStep, orientation });
      })}
    </View>
  );
}

interface StepInternalProps extends StepProps {
  activeStep: number;
  orientation: "horizontal" | "vertical";
}

export function Step({ index, label, children, activeStep, orientation }: StepInternalProps) {
  const tokens = useTokens();
  const isActive = index === activeStep;
  const isCompleted = index < activeStep;

  return (
    <View style={{ flexDirection: orientation === "horizontal" ? "column" : "row", gap: tokens.spacing[2], alignItems: "center" }}>
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          backgroundColor: isCompleted ? tokens.color.brand.default : isActive ? tokens.color.brand.subtle : tokens.color.bg.muted,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
          borderColor: isActive ? tokens.color.brand.default : tokens.color.border.default,
        }}
      >
        <Text style={{ fontSize: 12, fontWeight: tokens.fontWeight.semibold, color: isCompleted ? "#fff" : tokens.color.text.primary }}>
          {isCompleted ? "v" : index + 1}
        </Text>
      </View>
      {label && (
        <Text style={{ color: tokens.color.text.secondary, fontSize: tokens.fontSize.sm }}>
          {label}
        </Text>
      )}
      {children}
    </View>
  );
}

export function StepLabel({ children, style }: StepLabelProps) {
  const tokens = useTokens();
  return (
    <Text style={[{ color: tokens.color.text.secondary, fontSize: tokens.fontSize.sm }, style]}>
      {children}
    </Text>
  );
}
