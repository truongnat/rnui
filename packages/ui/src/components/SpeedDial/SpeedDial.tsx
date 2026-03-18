import React, { createContext, useContext } from "react";
import { View, Text, Pressable } from "react-native";
import { useDisclosure, useTokens } from "@rnui/headless";
import { Fab } from "../Fab/Fab";

export interface SpeedDialProps {
  ariaLabel: string;
  icon?: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  hidden?: boolean;
  children?: React.ReactNode;
}

export interface SpeedDialActionProps {
  icon?: React.ReactNode;
  tooltipTitle?: string;
  onPress?: () => void;
}

interface SpeedDialContextValue {
  isOpen: boolean;
  close: () => void;
}

const SpeedDialContext = createContext<SpeedDialContextValue | null>(null);

export function SpeedDial({
  ariaLabel,
  icon,
  direction = "up",
  open: controlledOpen,
  onOpen,
  onClose,
  hidden = false,
  children,
}: SpeedDialProps) {
  const disclosure = useDisclosure({ isOpen: controlledOpen, onOpen, onClose });
  const tokens = useTokens();

  if (hidden) return null;

  const stackStyle = {
    flexDirection: direction === "left" || direction === "right" ? "row" : "column",
    alignItems: "center" as const,
    gap: tokens.spacing[3],
  };

  return (
    <SpeedDialContext.Provider value={{ isOpen: disclosure.isOpen, close: disclosure.close }}>
      <View style={stackStyle}>
        {disclosure.isOpen && children}
        <Fab icon={icon} accessibilityLabel={ariaLabel} onPress={disclosure.toggle} />
      </View>
    </SpeedDialContext.Provider>
  );
}

export function SpeedDialAction({ icon, tooltipTitle, onPress }: SpeedDialActionProps) {
  const tokens = useTokens();
  const ctx = useContext(SpeedDialContext);
  if (!ctx?.isOpen) return null;

  return (
    <Pressable
      onPress={() => {
        onPress?.();
        ctx.close();
      }}
      style={{ alignItems: "center", gap: 4 }}
    >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: tokens.color.surface.default,
          alignItems: "center",
          justifyContent: "center",
          ...tokens.shadow.sm,
        }}
      >
        {icon}
      </View>
      {tooltipTitle && (
        <Text style={{ fontSize: tokens.fontSize.xs, color: tokens.color.text.secondary }}>
          {tooltipTitle}
        </Text>
      )}
    </Pressable>
  );
}
