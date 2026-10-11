import { useRef, useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import {
  AnimatedOverlay,
  type OverlayAnimationType,
} from '@/components/ui/animated-overlay';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { DemoPage, DemoGroup, DemoSection } from '@/demo/DemoPage';

export default function AnimatedOverlayScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const visibleRef = useRef(isVisible);
  visibleRef.current = isVisible;
  const [animationType, setAnimationType] =
    useState<OverlayAnimationType>('fade');

  const modalContent = (
    <View className="w-full rounded-2xl bg-background p-6">
      <Text variant="h4" style={{ textAlign: 'center', marginBottom: 16 }}>
        {animationType.charAt(0).toUpperCase() + animationType.slice(1)}
      </Text>
      <Text
        variant="p"
        className="text-muted-foreground"
        style={[styles.modalText, { textAlign: 'center' }]}
      >
        A quiet entrance brings the surface into focus. Dismiss to see its
        matching exit.
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
        <Modal
          visible={mounted || isVisible}
          transparent
          animationType="none"
          onRequestClose={() => setIsVisible(false)}
        >
          <AnimatedOverlay
            visible={isVisible}
            animationType={animationType}
            onBackdropPress={() => setIsVisible(false)}
            contentStyle={{ paddingHorizontal: 24 }}
            onAnimationEnd={(entering) => {
              if (!entering && !visibleRef.current) setMounted(false);
            }}
          >
            {modalContent}
          </AnimatedOverlay>
        </Modal>
      }
    >
      <DemoSection
        title="Animation Presets"
        description="Each preset has a matched entrance and exit, with reduced-motion support."
      >
        <DemoGroup gap={12}>
          {(['fade', 'scale', 'slideUp', 'slideDown', 'none'] as const).map(
            (type) => (
              <Button
                key={type}
                onPress={() => {
                  setAnimationType(type);
                  setMounted(true);
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
              setMounted(true);
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
              setMounted(true);
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
          Close while a surface is entering, then open it again. Motion reverses
          from its current position rather than replaying.
        </Text>
      </View>
    </DemoPage>
  );
}

const styles = StyleSheet.create({
  actionButton: {
    minWidth: '47%',
  },
  modalText: {
    marginBottom: 24,
  },
});
