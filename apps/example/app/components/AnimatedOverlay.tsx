import { Button, Typography, AnimatedOverlay, type OverlayAnimationType } from '@truongdq01/ui';
import { useTheme } from '@truongdq01/headless';
import React, { useState, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { DemoPage, DemoSection, DemoGroup } from './_shared/DemoPage';

export default function AnimatedOverlayScreen() {
  const { tokens } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [animationType, setAnimationType] = useState<OverlayAnimationType>('fade');
  const [showBottomAction, setShowBottomAction] = useState(false);

  const showOverlay = useCallback((type: OverlayAnimationType) => {
    setAnimationType(type);
    setShowBottomAction(false);
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
          borderWidth: 1,
          borderColor: tokens.color.border.default,
        }
      ]}
    >
      <Typography variant="h5" align="center" style={{ fontWeight: '700', marginBottom: 16 }}>
        {animationType.charAt(0).toUpperCase() + animationType.slice(1)}
      </Typography>
      <Typography variant="body1" align="center" color="secondary" style={styles.modalText}>
        This primitive ensures all overlays in the design system use the same motion language and physics.
      </Typography>

      <Button
        label="Dismiss"
        onPress={hideOverlay}
        fullWidth
        size="lg"
      />
    </View>
  );

  return (
    <DemoPage
      title="Animated Overlay"
      description="A highly flexible overlay primitive for building modals, sheets, and tooltips with premium Reanimated 3 transitions."
      floatingContent={
        <AnimatedOverlay
          isVisible={isVisible}
          animationType={animationType}
          onBackdropPress={hideOverlay}
          backdropOpacity={0.6}
          useSpring={animationType === 'slideUp' || animationType === 'slideDown' || animationType === 'scale'}
        >
          {renderModalContent()}
        </AnimatedOverlay>
      }
    >
      <DemoSection title="Animation Presets">
        <Typography variant="body2" color="tertiary" style={{ marginBottom: 12 }}>
          Choose a preset to see the transition in action. These are optimized for high-refresh rate displays.
        </Typography>
        <DemoGroup gap={12}>
          {(['fade', 'scale', 'slideUp', 'slideDown', 'none'] as const).map((type) => (
            <Button
              key={type}
              label={type === 'none' ? 'None' : type.charAt(0).toUpperCase() + type.slice(1)}
              onPress={() => showOverlay(type)}
              variant="outline"
              style={styles.actionButton}
            />
          ))}
        </DemoGroup>
      </DemoSection>

      <DemoSection title="Physics & Interaction">
        <Typography variant="body2" color="tertiary" style={{ marginBottom: 12 }}>
          Our overlays use spring physics (elastic) or timing (linear/cubic) depending on the intent.
        </Typography>
        <DemoGroup gap={12}>
          <Button
            label="Scale with Spring"
            onPress={() => {
              setAnimationType('scale');
              setIsVisible(true);
            }}
            variant="outline"
            color="secondary"
            style={styles.actionButton}
          />
          <Button
            label="Slide with Spring"
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
          { backgroundColor: tokens.color.surface.default }
        ]}
      >
        <Typography variant="body2" color="secondary" style={{ lineHeight: 20 }}>
          <Typography variant="body2" style={{ fontWeight: '700' }}>Pro Tip: </Typography>
          Slide transitions use high-precision spring physics for a natural, elastic feel that matches native system logic.
        </Typography>
      </View>
    </DemoPage>
  );
}

const styles = StyleSheet.create({
  actionButton: {
    minWidth: '47%',
  },
  infoBox: {
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  modalContent: {
    width: '85%',
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  modalText: {
    marginBottom: 24,
    lineHeight: 22,
  },
});
