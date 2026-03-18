import React from "react";
import { Modal, View, Text, Pressable } from "react-native";
import { useTokens } from "@rnui/headless";

export interface DialogProps {
  open: boolean;
  onClose?: () => void;
  fullWidth?: boolean;
  fullScreen?: boolean;
  maxWidth?: number;
  children?: React.ReactNode;
}

export interface DialogTitleProps { children?: React.ReactNode; }
export interface DialogContentProps { children?: React.ReactNode; }
export interface DialogActionsProps { children?: React.ReactNode; }

export function Dialog({ open, onClose, fullWidth = false, fullScreen = false, maxWidth = 400, children }: DialogProps) {
  const tokens = useTokens();

  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={onClose}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 16 }}>
        <Pressable 
          style={{ 
            position: "absolute", 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)" 
          }} 
          onPress={onClose}
        />
        <View
          style={{
            width: fullScreen ? "100%" : fullWidth ? "90%" : "auto",
            maxWidth: fullScreen ? "100%" : maxWidth,
            maxHeight: fullScreen ? "100%" : "80%",
            backgroundColor: tokens.color.surface.default,
            borderRadius: fullScreen ? 0 : tokens.radius.lg,
            padding: tokens.spacing[4],
            ...tokens.shadow.lg,
            zIndex: 1,
          }}
        >
          {children}
        </View>
      </View>
    </Modal>
  );
}

export function DialogTitle({ children }: DialogTitleProps) {
  const tokens = useTokens();
  return (
    <Text 
      style={{ 
        fontSize: tokens.fontSize.xl, 
        fontWeight: tokens.fontWeight.semibold, 
        marginBottom: tokens.spacing[3],
        color: tokens.color.text.primary,
      }}
    >
      {typeof children === "string" ? children : children}
    </Text>
  );
}

export function DialogContent({ children }: DialogContentProps) {
  const tokens = useTokens();
  return (
    <View style={{ marginBottom: tokens.spacing[4] }}>
      {React.Children.map(children, child => 
        typeof child === 'string' ? <Text style={{ color: tokens.color.text.primary, lineHeight: tokens.fontSize.md * 1.5 }}>{child}</Text> : child
      )}
    </View>
  );
}

export function DialogActions({ children }: DialogActionsProps) {
  const tokens = useTokens();
  return (
    <View 
      style={{ 
        flexDirection: "row", 
        justifyContent: "flex-end", 
        gap: tokens.spacing[3],
        marginTop: tokens.spacing[4],
      }}
    >
      {children}
    </View>
  );
}
