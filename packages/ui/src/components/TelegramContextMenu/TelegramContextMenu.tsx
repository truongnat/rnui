import React, { useCallback } from "react";
import { View, Text, Pressable, StyleSheet, Modal, useWindowDimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { useTokens } from "@truongdq01/headless";

// ─── Types ────────────────────────────────────────────────────────

export interface TelegramContextMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onPress?: () => void;
  destructive?: boolean;
  disabled?: boolean;
}

export interface TelegramContextMenuProps {
  open: boolean;
  onClose: () => void;
  items: TelegramContextMenuItem[];
  anchor?: { x: number; y: number; width: number; height: number } | null;
}

// ─── Telegram Context Menu ────────────────────────────────────────

export function TelegramContextMenu({
  open,
  onClose,
  items,
  anchor,
}: TelegramContextMenuProps) {
  const tokens = useTokens();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [mounted, setMounted] = React.useState(open);
  const [menuSize, setMenuSize] = React.useState({ width: 200, height: 0 });

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);

  const animateIn = useCallback(() => {
    opacity.value = withTiming(1, { duration: 180 });
    scale.value = withSpring(1, { damping: 18, stiffness: 320 });
  }, []);

  const animateOut = useCallback((onDone: () => void) => {
    opacity.value = withTiming(0, { duration: 130 });
    scale.value = withTiming(0.92, { duration: 130 }, (done) => {
      if (done) runOnJS(onDone)();
    });
  }, []);

  React.useEffect(() => {
    if (open) {
      setMounted(true);
      opacity.value = 0;
      scale.value = 0.9;
      requestAnimationFrame(animateIn);
    } else if (mounted) {
      animateOut(() => setMounted(false));
    }
  }, [open]);

  // Position calculation
  const GAP = 8;
  let top = 100;
  let left = windowWidth - 220;

  if (anchor) {
    top = anchor.y + anchor.height + GAP;
    left = anchor.x;

    if (left + menuSize.width > windowWidth - 16) {
      left = windowWidth - menuSize.width - 16;
    }
    if (top + menuSize.height > windowHeight - 16) {
      top = anchor.y - menuSize.height - GAP;
    }
    top = Math.max(16, top);
    left = Math.max(16, left);
  }

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  if (!mounted) return null;

  return (
    <Modal visible={mounted} transparent animationType="none" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose} />
      <Animated.View
        onLayout={(e) => {
          setMenuSize({
            width: e.nativeEvent.layout.width,
            height: e.nativeEvent.layout.height,
          });
        }}
        style={[
          styles.menu,
          animStyle,
          {
            position: "absolute",
            top,
            left,
            backgroundColor: tokens.color.surface.default,
            borderRadius: 14,
            shadowColor: tokens.color.bg.inverse,
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.2,
            shadowRadius: 18,
            elevation: 8,
          },
        ]}
      >
        {items.map((item, index) => (
          <Pressable
            key={item.id}
            onPress={() => {
              item.onPress?.();
              onClose();
            }}
            disabled={item.disabled}
            style={({ pressed }) => [
              styles.item,
              index === 0 && { borderTopLeftRadius: 14, borderTopRightRadius: 14 },
              index === items.length - 1 && { borderBottomLeftRadius: 14, borderBottomRightRadius: 14 },
              pressed && { backgroundColor: tokens.color.surface.hover },
              item.disabled && { opacity: 0.3 },
            ]}
          >
            {item.icon && <View style={styles.itemIcon}>{item.icon}</View>}
            <Text
              style={[
                styles.itemLabel,
                { color: item.destructive ? tokens.color.error.text : tokens.color.text.primary },
              ]}
            >
              {item.label}
            </Text>
          </Pressable>
        ))}
      </Animated.View>
    </Modal>
  );
}

// ─── Styles ───────────────────────────────────────────────────────

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  menu: {
    minWidth: 180,
    overflow: "hidden",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 48,
  },
  itemIcon: {
    marginRight: 12,
    width: 20,
    alignItems: "center",
  },
  itemLabel: {
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 20,
  },
});


