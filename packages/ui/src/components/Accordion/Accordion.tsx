import React, { createContext, useContext } from "react";
import { View, Text, Pressable } from "react-native";
import { useDisclosure, useTokens } from "@rnui/headless";

export interface AccordionProps {
  expanded?: boolean;
  defaultExpanded?: boolean;
  disabled?: boolean;
  onChange?: (expanded: boolean) => void;
  children?: React.ReactNode;
}

export interface AccordionSummaryProps {
  children?: React.ReactNode;
  expandIcon?: React.ReactNode;
}

export interface AccordionDetailsProps {
  children?: React.ReactNode;
}

export interface AccordionActionsProps {
  children?: React.ReactNode;
}

interface AccordionContextValue {
  expanded: boolean;
  toggle: () => void;
  disabled: boolean;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

export function Accordion({
  expanded: controlledExpanded,
  defaultExpanded = false,
  disabled = false,
  onChange,
  children,
}: AccordionProps) {
  const disclosure = useDisclosure({
    isOpen: controlledExpanded,
    defaultOpen: defaultExpanded,
    onOpen: () => onChange?.(true),
    onClose: () => onChange?.(false),
  });

  return (
    <AccordionContext.Provider value={{ expanded: disclosure.isOpen, toggle: disclosure.toggle, disabled }}>
      <View style={{ borderWidth: 1, borderColor: "#e2e8f0", borderRadius: 12, overflow: "hidden" }}>
        {children}
      </View>
    </AccordionContext.Provider>
  );
}

export function AccordionSummary({ children, expandIcon }: AccordionSummaryProps) {
  const tokens = useTokens();
  const ctx = useContext(AccordionContext);
  if (!ctx) return null;

  return (
    <Pressable
      onPress={ctx.toggle}
      disabled={ctx.disabled}
      style={{
        paddingHorizontal: tokens.spacing[4],
        paddingVertical: tokens.spacing[3],
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: tokens.color.surface.default,
      }}
    >
      <Text style={{ fontWeight: tokens.fontWeight.medium, color: tokens.color.text.primary }}>{children}</Text>
      {expandIcon ?? <Text style={{ color: tokens.color.text.tertiary }}>{ctx.expanded ? "-" : "+"}</Text>}
    </Pressable>
  );
}

export function AccordionDetails({ children }: AccordionDetailsProps) {
  const tokens = useTokens();
  const ctx = useContext(AccordionContext);
  if (!ctx?.expanded) return null;

  return (
    <View style={{ paddingHorizontal: tokens.spacing[4], paddingVertical: tokens.spacing[3], backgroundColor: tokens.color.bg.subtle }}>
      {children}
    </View>
  );
}

export function AccordionActions({ children }: AccordionActionsProps) {
  const tokens = useTokens();
  const ctx = useContext(AccordionContext);
  if (!ctx?.expanded) return null;

  return (
    <View style={{ paddingHorizontal: tokens.spacing[4], paddingVertical: tokens.spacing[3], backgroundColor: tokens.color.bg.subtle, flexDirection: "row", gap: tokens.spacing[2] }}>
      {children}
    </View>
  );
}
