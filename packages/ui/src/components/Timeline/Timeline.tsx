import React, { createContext, useContext } from "react";
import { View, Text } from "react-native";
import { useTokens } from "@rnui/headless";

export type TimelinePosition = "left" | "right" | "alternate" | "alternate-reverse";

interface TimelineContextValue {
  position: TimelinePosition;
  itemVariant?: "filled" | "outlined";
}

const TimelineContext = createContext<TimelineContextValue | null>(null);

function useTimelineContext() {
  return useContext(TimelineContext);
}

export interface TimelineProps {
  position?: TimelinePosition;
  children?: React.ReactNode;
  itemVariant?: "filled" | "outlined";
}

export function Timeline({ position = "right", itemVariant = "filled", children }: TimelineProps) {
  return (
    <TimelineContext.Provider value={{ position, itemVariant }}>
      <View style={{ gap: 24 }}>{React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        const element = child as React.ReactElement<any>;
        if (position === "alternate" || position === "alternate-reverse") {
          const isEven = index % 2 === 0;
          const derived = position === "alternate" ? (isEven ? "right" : "left") : (isEven ? "left" : "right");
          return React.cloneElement(element, { position: element.props?.position ?? derived, variant: itemVariant } as any);
        }
        return React.cloneElement(element, { variant: itemVariant } as any);
      })}</View>
    </TimelineContext.Provider>
  );
}

export interface TimelineItemProps {
  position?: "left" | "right";
  variant?: "filled" | "outlined";
  status?: "pending" | "active" | "completed" | "error";
  children?: React.ReactNode;
}

export function TimelineItem({ position, variant = "filled", status = "pending", children }: TimelineItemProps) {
  const ctx = useTimelineContext();
  const resolved = position ?? (ctx?.position === "left" || ctx?.position === "right" ? ctx.position : "right");

  return (
    <View style={{ flexDirection: "row", alignItems: "stretch", minHeight: 80 }}>
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        {resolved === "right" ? extractOpposite(children) : extractContent(children)}
      </View>
      <TimelineSeparator status={status} variant={variant} />
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        {resolved === "right" ? extractContent(children) : extractOpposite(children)}
      </View>
    </View>
  );
}

function extractChildrenByType(children: React.ReactNode, type: any) {
  const items: React.ReactNode[] = [];
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === type) {
      const element = child as React.ReactElement<any>;
      items.push(element.props.children);
    }
  });
  return items.length > 0 ? items : null;
}

function extractSeparator(children: React.ReactNode) {
  return extractChildrenByType(children, TimelineSeparator);
}

function extractContent(children: React.ReactNode) {
  const result = extractChildrenByType(children, TimelineContent);
  // Wrap string content in Text
  if (result && result.length === 1 && typeof result[0] === "string") {
    return <Text>{result[0]}</Text>;
  }
  return result;
}

function extractOpposite(children: React.ReactNode) {
  const result = extractChildrenByType(children, TimelineOppositeContent);
  // Wrap string content in Text
  if (result && result.length === 1 && typeof result[0] === "string") {
    return <Text>{result[0]}</Text>;
  }
  return result;
}

export interface TimelineSeparatorProps {
  status?: "pending" | "active" | "completed" | "error";
  variant?: "filled" | "outlined";
  children?: React.ReactNode;
}

export function TimelineSeparator({ status = "pending", variant = "filled", children }: TimelineSeparatorProps) {
  const tokens = useTokens();
  
  const dotColors = {
    pending: tokens.color.border.default,
    active: tokens.color.brand.default,
    completed: tokens.color.success.icon,
    error: tokens.color.error.icon,
  };

  const connectorColor = status === "completed" ? tokens.color.success.border : tokens.color.border.default;

  return (
    <View style={{ alignItems: "center", width: 48, paddingHorizontal: 8 }}>
      {children || (
        <>
          <TimelineDot 
            variant={variant} 
            color={status === "completed" ? "success" : status === "error" ? "error" : status === "active" ? "primary" : "secondary"}
          />
          <TimelineConnector color={connectorColor} />
        </>
      )}
    </View>
  );
}

export interface TimelineDotProps {
  variant?: "filled" | "outlined";
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning" | "inherit";
  size?: number;
}

export function TimelineDot({ variant = "filled", color = "primary", size = 16 }: TimelineDotProps) {
  const tokens = useTokens();
  const fill = {
    primary: tokens.color.brand.default,
    secondary: tokens.color.text.secondary,
    success: tokens.color.success.icon,
    error: tokens.color.error.icon,
    info: tokens.color.info.icon,
    warning: tokens.color.warning.icon,
    inherit: tokens.color.text.primary,
  }[color];

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: variant === "filled" ? fill : "transparent",
        borderWidth: 2.5,
        borderColor: fill,
        ...tokens.shadow.sm,
      }}
    />
  );
}

export interface TimelineConnectorProps {
  color?: string;
  width?: number;
}

export function TimelineConnector({ color, width = 2 }: TimelineConnectorProps) {
  const tokens = useTokens();
  return <View style={{ width, flex: 1, backgroundColor: color ?? tokens.color.border.default, marginVertical: 4, borderRadius: width }} />;
}

export interface TimelineContentProps {
  children?: React.ReactNode;
  align?: "left" | "right";
}

export function TimelineContent({ children, align = "left" }: TimelineContentProps) {
  return (
    <View style={{ flex: 1, paddingHorizontal: 8, alignItems: align === "left" ? "flex-start" : "flex-end" }}>
      {children}
    </View>
  );
}

export interface TimelineOppositeContentProps {
  children?: React.ReactNode;
  align?: "left" | "right";
}

export function TimelineOppositeContent({ children, align = "right" }: TimelineOppositeContentProps) {
  return (
    <View style={{ flex: 1, paddingHorizontal: 8, alignItems: align === "left" ? "flex-start" : "flex-end" }}>
      {typeof children === "string" ? <Text>{children}</Text> : children}
    </View>
  );
}
