import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useTokens } from '@truongdq01/headless';
import { Button } from '@truongdq01/ui';
import { ANIMATION_OPTIONS, type AnimationType } from './controller';

type AnimatedListDemoFrameProps = {
  type: AnimationType;
  onChangeType: (type: AnimationType) => void;
  insertLabel: string;
  onInsert: () => void;
  /** The configured <AnimatedList /> for this demo. */
  children: ReactNode;
};

/** Shared chrome for every list demo: preset selector, insert button, list shell. */
export function AnimatedListDemoFrame({
  type,
  onChangeType,
  insertLabel,
  onInsert,
  children,
}: AnimatedListDemoFrameProps) {
  const t = useTokens();

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingVertical: t.spacing[2] }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', gap: t.spacing[2] }}>
            {ANIMATION_OPTIONS.map((option) => (
              <Button
                key={option.key}
                variant={type === option.key ? 'solid' : 'outline'}
                size="sm"
                onPress={() => onChangeType(option.key)}
              >
                {option.label}
              </Button>
            ))}
          </View>
        </ScrollView>
      </View>
      <View style={{ paddingBottom: t.spacing[3] }}>
        <Button onPress={onInsert} variant="solid">
          {insertLabel}
        </Button>
      </View>
      <View
        style={{
          flex: 1,
          minHeight: 0,
          borderRadius: t.radius.lg,
          overflow: 'hidden',
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: t.color.border.subtle,
          backgroundColor: t.color.surface.raised,
        }}
      >
        {children}
      </View>
    </View>
  );
}
