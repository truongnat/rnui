import { useState } from 'react';
import { View } from 'react-native';
import { SegmentedControl } from '@/components/ui/segmented-control';
import { ContactsDemo } from '@/demo/animatedList/ContactsDemo';
import { SocialDemo } from '@/demo/animatedList/SocialDemo';
import { TimelineDemo } from '@/demo/animatedList/TimelineDemo';
import { DemoPage } from '@/demo/DemoPage';

const DEMO_MODE_OPTIONS = ['Contacts', 'Social Feed', 'Timeline'] as const;

type DemoMode = (typeof DEMO_MODE_OPTIONS)[number];

/**
 * Each mode renders a fully self-contained demo component with its own state
 * (data, insert/remove). Switching modes unmounts the previous demo, so no
 * state ever leaks between Contacts / Social / Timeline.
 */
export default function AnimatedListScreen() {
  const [mode, setMode] = useState<DemoMode>('Contacts');

  return (
    <DemoPage
      scrollable={false}
      title="Animated List"
      description="Insert and remove rows without losing your place. Motion follows each change."
    >
      <View className="flex-1">
        <View className="pb-3">
          <SegmentedControl<DemoMode>
            options={DEMO_MODE_OPTIONS}
            value={mode}
            onValueChange={setMode}
            className="self-stretch"
          />
        </View>
        {mode === 'Contacts' ? (
          <ContactsDemo />
        ) : mode === 'Social Feed' ? (
          <SocialDemo />
        ) : (
          <TimelineDemo />
        )}
      </View>
    </DemoPage>
  );
}
