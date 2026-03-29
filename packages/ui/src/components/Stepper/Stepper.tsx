import React from "react";
import { View, Text } from "react-native";
import { useComponentTokens } from "@truongdq01/headless";
import { Icon } from "../Icon";

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
  const { stepper } = useComponentTokens();
  const items = React.Children.toArray(children);

  return (
    <View style={[stepper.container, { flexDirection: orientation === "horizontal" ? "row" : "column" }]}>
      {items.map((child) => {
        if (!React.isValidElement<{ activeStep?: number; orientation?: "horizontal" | "vertical" }>(child)) return child;
        return React.cloneElement(child, { activeStep, orientation });
      })}
    </View>
  );
}

interface StepInternalProps extends StepProps {
  activeStep: number;
  orientation: "horizontal" | "vertical";
}

export function Step({ index, label, children, activeStep = 0, orientation = "horizontal" }: Partial<StepInternalProps> & StepProps) {
  const { stepper } = useComponentTokens();
  const isActive = index === activeStep;
  const isCompleted = index < activeStep;

  const color = isCompleted
    ? stepper.step.completed.color
    : isActive
      ? stepper.step.active.color
      : stepper.step.pending.color;

  return (
    <View style={{ flexDirection: orientation === "horizontal" ? "column" : "row", gap: 8, alignItems: "center" }}>
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          backgroundColor: isCompleted ? color : isActive ? `${color}20` : "transparent",
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
          borderColor: color,
        }}
      >
        {isCompleted ? (
          <Icon size={14} color={stepper.step.completed.color} name={"check" as any} />
        ) : (
          <Text style={{ fontSize: 12, fontWeight: "600", color: isActive ? color : color }}>
            {index + 1}
          </Text>
        )}
      </View>
      {label && (
        <Text style={{ color: isActive ? stepper.step.active.color : stepper.step.pending.color, fontSize: 14 }}>
          {label}
        </Text>
      )}
      {children}
    </View>
  );
}

export function StepLabel({ children, style }: StepLabelProps) {
  const { stepper } = useComponentTokens();
  return (
    <Text style={[{ color: stepper.step.pending.color, fontSize: 14 }, style]}>
      {children}
    </Text>
  );
}
