import { useCallback, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@truongdq01/headless';
import {
  AnimatedOverlay,
  Button,
  Typography,
  type OverlayAnimationType,
} from '@truongdq01/ui';
import { DemoPage, DemoGroup, DemoSection } from '@/demo/DemoPage';

export default function AnimatedOverlayScreen() {
  const { tokens } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [animationType, setAnimationType] =
    useState<OverlayAnimationType>('fade');

  const styles = useMemo(
    () =>
      StyleSheet.create({
        actionButton: {
          minWidth: '47%',
        },
        infoBox: {
          padding: tokens.spacing[4],
          borderRadius: tokens.radius.lg,
          marginTop: tokens.spacing[5],
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: tokens.color.border.subtle,
        },
        modalContent: {
          width: '85%',
          padding: tokens.spacing[6],
          ...tokens.shadow.lg,
        },
        modalText: {
          marginBottom: tokens.spacing[6],
          lineHeight: tokens.fontSize.md * 1.45,
        },
      }),
    [tokens],
  );

  const showOverlay = useCallback((type: OverlayAnimationType) => {
    setAnimationType(type);
    setIsVisible(true);
  }, []);

  const hideOverlay = useCallback(() => {
    setIsVisible(false);
  }, []);

  const renderModalContent = () => (
    <View
      style={[
        styles.modalContent,
        {
          backgroundColor: tokens.color.bg.default,
          borderRadius: tokens.radius.lg,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: tokens.color.border.default,
        },
      ]}
    >
      <Typography
        variant="h5"
        align="center"
        style={{
          fontWeight: tokens.fontWeight.bold,
          marginBottom: tokens.spacing[4],
        }}
      >
        {animationType.charAt(0).toUpperCase() + animationType.slice(1)}
      </Typography>
      <Typography
        variant="body1"
        align="center"
        color="secondary"
        style={styles.modalText}
      >
        Shared motion language across Dialog, Modal, Menu, Snackbar, Drawer, and
        BottomSheet.
      </Typography>

      <Button label="Dismiss" onPress={hideOverlay} fullWidth size="lg" />
    </View>
  );

  return (
    <DemoPage
      title="Animated Overlay"
      description="Reanimated overlay primitive for modals, sheets, and tooltips."
      floatingContent={
        <AnimatedOverlay
          isVisible={isVisible}
          animationType={animationType}
          onBackdropPress={hideOverlay}
          backdropOpacity={0.6}
        >
          {renderModalContent()}
        </AnimatedOverlay>
      }
    >
      <DemoSection
        title="Animation Presets"
        description="Optimized for high-refresh displays."
      >
        <DemoGroup gap={tokens.spacing[3]}>
          {(['fade', 'scale', 'slideUp', 'slideDown', 'none'] as const).map(
            (type) => (
              <Button
                key={type}
                label={
                  type === 'none'
                    ? 'None'
                    : type.charAt(0).toUpperCase() + type.slice(1)
                }
                onPress={() => showOverlay(type)}
                variant="outline"
                style={styles.actionButton}
              />
            ),
          )}
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Timing"
        description="Design-system curves — ease-out enter, ease-in exit."
      >
        <DemoGroup gap={tokens.spacing[3]}>
          <Button
            label="Scale"
            onPress={() => {
              setAnimationType('scale');
              setIsVisible(true);
            }}
            variant="outline"
            color="secondary"
            style={styles.actionButton}
          />
          <Button
            label="Slide Up"
            onPress={() => {
              setAnimationType('slideUp');
              setIsVisible(true);
            }}
            variant="outline"
            color="secondary"
            style={styles.actionButton}
          />
        </DemoGroup>
      </DemoSection>

      <View
        style={[
          styles.infoBox,
          { backgroundColor: tokens.color.surface.default },
        ]}
      >
        <Typography
          variant="body2"
          color="secondary"
          style={{ lineHeight: tokens.fontSize.md * 1.45 }}
        >
          Dialog, Modal, Menu, Snackbar, Drawer, and BottomSheet share these
          timing presets for consistent motion.
        </Typography>
      </View>
    </DemoPage>
  );
}
