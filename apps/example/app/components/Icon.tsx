import type { ReactNode } from 'react';
import { View } from 'react-native';
import { Icon, type IconName } from '@/components/ui/icon';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';
import { DemoPage, DemoPreview, DemoSection } from '@/demo/DemoPage';

function IconRow({ children }: { children: ReactNode }) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
      {children}
    </View>
  );
}

const NAVIGATION_ICONS: IconName[] = [
  'home',
  'search',
  'bell',
  'user',
  'settings',
];

export default function IconScreen() {
  return (
    <DemoPage
      title="Icons"
      description="Lucide icons for navigation, actions, and status feedback."
    >
      <DemoSection
        title="Navigation"
        description="Common tab and header icons."
      >
        <DemoPreview>
          <IconRow>
            {NAVIGATION_ICONS.map((name) => (
              <Icon key={name} name={name} size="lg" />
            ))}
          </IconRow>
        </DemoPreview>
      </DemoSection>
      <DemoSection title="Status" description="Semantic colors for feedback.">
        <Stack spacing="md">
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Icon name="checkCircle" size="md" tone="success" />
            <Text>Success</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Icon name="error" size="md" tone="destructive" />
            <Text>Error</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Icon name="info" size="md" tone="primary" />
            <Text>Information</Text>
          </View>
        </Stack>
      </DemoSection>

      <DemoSection
        title="Sizing & Colors"
        description="Preset sizes; brand and semantic tones."
      >
        <Stack spacing="lg">
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <Icon name="heart" size="sm" tone="destructive" />
            <Icon name="heart" size="lg" tone="destructive" />
            <Icon name="heart" size="xl" tone="destructive" />
            <Icon name="heart" size="2xl" tone="destructive" />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <Icon name="share" size="lg" tone="muted" />
            <Icon name="trash" size="lg" tone="destructive" />
            <Icon name="edit" size="lg" tone="warning" />
          </View>
        </Stack>
      </DemoSection>
    </DemoPage>
  );
}
