import { useDisclosure, useTheme } from '@truongdq01/headless';
import type React from 'react';
import { createContext, useContext, useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Fab } from '../Fab/Fab';

export interface SpeedDialProps {
  ariaLabel: string;
  icon?: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
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
  direction = 'up',
  open: controlledOpen,
  onOpen,
  onClose,
  hidden = false,
  children,
}: SpeedDialProps) {
  const {
    components: { speedDial },
  } = useTheme();
  const disclosure = useDisclosure({ isOpen: controlledOpen, onOpen, onClose });

  const ctxValue = useMemo(
    () => ({ isOpen: disclosure.isOpen, close: disclosure.close }),
    [disclosure.isOpen, disclosure.close]
  );

  if (hidden) return null;

  const stackStyle = {
    flexDirection: (direction === 'left' || direction === 'right'
      ? 'row'
      : 'column') as 'row' | 'column',
    alignItems: 'center' as const,
    gap: speedDial.container.gap,
  };

  return (
    <SpeedDialContext.Provider value={ctxValue}>
      <View style={[speedDial.container, stackStyle]}>
        {disclosure.isOpen && children}
        <Fab
          icon={icon}
          accessibilityLabel={ariaLabel}
          onPress={disclosure.toggle}
        />
      </View>
    </SpeedDialContext.Provider>
  );
}

export function SpeedDialAction({
  icon,
  tooltipTitle,
  onPress,
}: SpeedDialActionProps) {
  const {
    components: { speedDial },
  } = useTheme();
  const ctx = useContext(SpeedDialContext);
  if (!ctx?.isOpen) return null;

  return (
    <Pressable
      onPress={() => {
        onPress?.();
        ctx.close();
      }}
      accessibilityRole="button"
      accessibilityLabel={tooltipTitle ?? 'Action'}
      style={styles.actionHitArea}
    >
      <View style={speedDial.action.iconContainer}>{icon}</View>
      {tooltipTitle ? (
        <Text style={speedDial.action.tooltip}>{tooltipTitle}</Text>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  actionHitArea: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 44,
    minHeight: 44,
  },
});
