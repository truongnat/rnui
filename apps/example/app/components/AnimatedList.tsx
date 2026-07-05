import { useState } from 'react';
import { View } from 'react-native';
import { useTokens } from '@truongdq01/headless';
import { SegmentedControl } from '@truongdq01/ui';
import { ContactsDemo } from '@/demo/animatedList/ContactsDemo';
import { SocialDemo } from '@/demo/animatedList/SocialDemo';
import { TimelineDemo } from '@/demo/animatedList/TimelineDemo';
import { DemoPage } from '@/demo/DemoPage';

const DEMO_MODE_OPTIONS = ['Contacts', 'Social Feed', 'Timeline'] as const;

/**
 * Each mode renders a fully self-contained demo component with its own state
 * (data, animation preset, insert/remove). Switching modes unmounts the
 * previous demo, so no state ever leaks between Contacts / Social / Timeline.
 */
export default function AnimatedListScreen() {
  const t = useTokens();
  const [modeIndex, setModeIndex] = useState(0);

  return (
    <DemoPage
      scrollable={false}
      title="Animated List"
      description="Feed-style layouts with Reanimated enter and exit animations."
    >
      <View style={{ flex: 1 }}>
        <View style={{ paddingBottom: t.spacing[3] }}>
          <SegmentedControl
            options={[...DEMO_MODE_OPTIONS]}
            selectedIndex={modeIndex}
            onChange={setModeIndex}
          />
        </View>
        {modeIndex === 0 ? (
          <ContactsDemo />
        ) : modeIndex === 1 ? (
          <SocialDemo />
        ) : (
          <TimelineDemo />
        )}
      </View>
    </DemoPage>
  );
}
