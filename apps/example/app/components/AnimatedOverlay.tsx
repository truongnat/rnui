import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  AnimatedOverlay,
  type OverlayAnimationType,
} from '@/components/ui/animated-overlay';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { DemoPage, DemoGroup, DemoSection } from '@/demo/DemoPage';

export default function AnimatedOverlayScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [animationType, setAnimationType] =
    useState<OverlayAnimationType>('fade');

  const modalContent = (
    <View
      className="rounded-lg border border-border bg-background"
      style={styles.modalContent}
    >
      <Text variant="h4" style={{ textAlign: 'center', marginBottom: 16 }}>
        {animationType.charAt(0).toUpperCase() + animationType.slice(1)}
      </Text>
      <Text
        variant="p"
        className="text-muted-foreground"
        style={[styles.modalText, { textAlign: 'center' }]}
      >
        Shared motion language across Dialog, Modal, Menu, Snackbar, Drawer, and
        BottomSheet.
      </Text>

      <Button size="lg" className="w-full" onPress={() => setIsVisible(false)}>
        Dismiss
      </Button>
    </View>
  );

  return (
    <DemoPage
      title="Animated Overlay"
      description="Animated overlay primitive for modals, sheets, and tooltips."
      floatingContent={
        <AnimatedOverlay
          visible={isVisible}
          animationType={animationType}
          onBackdropPress={() => setIsVisible(false)}
          backdropOpacity={0.6}
        >
          {modalContent}
        </AnimatedOverlay>
      }
    >
      <DemoSection
        title="Animation Presets"
        description="Optimized for high-refresh displays."
      >
        <DemoGroup gap={12}>
          {(['fade', 'scale', 'slideUp', 'slideDown', 'none'] as const).map(
            (type) => (
              <Button
                key={type}
                onPress={() => {
                  setAnimationType(type);
                  setIsVisible(true);
                }}
                variant="outline"
                style={styles.actionButton}
              >
                {type === 'none'
                  ? 'None'
                  : type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
            )
          )}
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Timing"
        description="Design-system curves — ease-out enter, ease-in exit."
      >
        <DemoGroup gap={12}>
          <Button
            onPress={() => {
              setAnimationType('scale');
              setIsVisible(true);
            }}
            variant="secondary"
            style={styles.actionButton}
          >
            Scale
          </Button>
          <Button
            onPress={() => {
              setAnimationType('slideUp');
              setIsVisible(true);
            }}
            variant="secondary"
            style={styles.actionButton}
          >
            Slide Up
          </Button>
        </DemoGroup>
      </DemoSection>

      <View className="mt-5 rounded-lg border border-border bg-muted p-4">
        <Text variant="muted" style={{ lineHeight: 22 }}>
          Dialog, Modal, Menu, Snackbar, Drawer, and BottomSheet share these
          timing presets for consistent motion.
        </Text>
      </View>
    </DemoPage>
  );
}

const styles = StyleSheet.create({
  actionButton: {
    minWidth: '47%',
  },
  modalContent: {
    width: '85%',
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
  },
  modalText: {
    marginBottom: 24,
  },
});
