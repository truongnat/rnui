import { View } from 'react-native';
import { Divider, Typography } from '@truongdq01/ui';
import { useTheme } from '@truongdq01/headless';
import { DemoPage, DemoPreview, DemoSection } from '@/demo/DemoPage';

export default function DividerScreen() {
  const { tokens } = useTheme();

  return (
    <DemoPage
      title="Divider"
      description="Visual separators to group content or define boundaries."
    >
      <DemoSection title="Horizontal" description="Spacing between stacked sections.">
        <DemoPreview>
          <Typography variant="body2" color="secondary">
            Section A
          </Typography>
          <Divider spacing="md" />
          <Typography variant="body2" color="secondary">
            Section B
          </Typography>
          <Divider spacing="lg" />
          <Typography variant="body2" color="secondary">
            Section C (Large Spacing)
          </Typography>
        </DemoPreview>
      </DemoSection>

      <DemoSection title="With Labels" description="Centered text between content blocks.">
        <Typography variant="body2" color="secondary" style={{ textAlign: 'center' }}>
          Content above
        </Typography>
        <Divider label="OR" spacing="lg" />
        <Typography variant="body2" color="secondary" style={{ textAlign: 'center' }}>
          Content below
        </Typography>
        <View style={{ height: tokens.spacing[4] }} />
        <Divider label="CONTINUE WITH" spacing="lg" />
      </DemoSection>

      <DemoSection title="Vertical" description="Inline separators in row layouts.">
        <DemoPreview>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: tokens.spacing[12],
              gap: tokens.spacing[3],
            }}
          >
            <Typography variant="body2">Left</Typography>
            <Divider orientation="vertical" spacing="none" />
            <Typography variant="body2">Middle</Typography>
            <Divider orientation="vertical" spacing="none" emphasis />
            <Typography variant="body2">Right (Emphasized)</Typography>
          </View>
        </DemoPreview>
      </DemoSection>

      <DemoSection title="Emphasis" description="Standard vs stronger border weight.">
        <Typography variant="caption" color="tertiary">
          Standard
        </Typography>
        <Divider spacing="sm" />
        <View style={{ height: tokens.spacing[4] }} />
        <Typography variant="caption" color="tertiary">
          Emphasized
        </Typography>
        <Divider spacing="sm" emphasis />
      </DemoSection>
    </DemoPage>
  );
}
