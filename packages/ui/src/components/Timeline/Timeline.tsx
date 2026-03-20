import React, { createContext, useContext } from "react";
import { View, Text } from "react-native";
import { useTokens } from "@rnui/headless";

export type TimelinePosition = "left" | "right" | "alternate" | "alternate-reverse";

interface TimelineContextValue {
  position: TimelinePosition;
}

const TimelineContext = createContext<TimelineContextValue | null>(null);

function useTimelineContext() {
  return useContext(TimelineContext);
}

export interface TimelineProps {
  position?: TimelinePosition;
  children?: React.ReactNode;
}

export function Timeline({ position = "right", children }: TimelineProps) {
  return (
    <TimelineContext.Provider value={{ position }}>
      <View style={{ gap: 16 }}>{React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        const element = child as React.ReactElement<any>;
        if (position === "alternate" || position === "alternate-reverse") {
          const isEven = index % 2 === 0;
          const derived = position === "alternate" ? (isEven ? "right" : "left") : (isEven ? "left" : "right");
          return React.cloneElement(element, { position: element.props?.position ?? derived } as any);
        }
        return element;
      })}</View>
    </TimelineContext.Provider>
  );
}

export interface TimelineItemProps {
  position?: "left" | "right";
  children?: React.ReactNode;
}

export function TimelineItem({ position, children }: TimelineItemProps) {
  const ctx = useTimelineContext();
  const resolved = position ?? (ctx?.position === "left" || ctx?.position === "right" ? ctx.position : "right");

  return (
    <View style={{ flexDirection: "row", alignItems: "stretch", minHeight: 70 }}>
      <View style={{ flex: 1 }}>
        {resolved === "right" ? extractOpposite(children) : extractContent(children)}
      </View>
      <TimelineSeparator>{extractSeparator(children)}</TimelineSeparator>
      <View style={{ flex: 1 }}>
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
  return items.length ? items : null;
}

function extractSeparator(children: React.ReactNode) {
  return extractChildrenByType(children, TimelineSeparator) ?? null;
}

function extractContent(children: React.ReactNode) {
  const result = extractChildrenByType(children, TimelineContent);
  // Wrap string content in Text
  if (result && result.length === 1 && typeof result[0] === "string") {
    return <Text>{result[0]}</Text>;
  }
  return result ?? null;
}

function extractOpposite(children: React.ReactNode) {
  const result = extractChildrenByType(children, TimelineOppositeContent);
  // Wrap string content in Text
  if (result && result.length === 1 && typeof result[0] === "string") {
    return <Text>{result[0]}</Text>;
  }
  return result ?? null;
}

export interface TimelineSeparatorProps {
  children?: React.ReactNode;
}

export function TimelineSeparator({ children }: TimelineSeparatorProps) {
  return (
    <View style={{ alignItems: "center", width: 40 }}>
      {children}
    </View>
  );
}

export interface TimelineDotProps {
  variant?: "filled" | "outlined";
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning" | "inherit";
}

export function TimelineDot({ variant = "filled", color = "primary" }: TimelineDotProps) {
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
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: variant === "filled" ? fill : "transparent",
        borderWidth: 2,
        borderColor: fill,
      }}
    />
  );
}

export function TimelineConnector() {
  const tokens = useTokens();
  return <View style={{ width: 2, flex: 1, backgroundColor: tokens.color.border.default, marginVertical: 4 }} />;
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
