import { Paper } from '@/components/ui/paper';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function PaperScreen() {
  return (
    <DemoPage
      title="Paper"
      description="Settings and profile surfaces — default border + soft shadow, optional elevation."
    >
      <DemoSection
        title="Account profile"
        description="Default Paper is visible on app background without custom styling."
      >
        <Paper>
          <Stack spacing="sm">
            <Text variant="h4">Alex Nguyen</Text>
            <Text variant="muted">Product designer · San Francisco</Text>
            <Text variant="muted" className="text-xs">
              Member since March 2024
            </Text>
          </Stack>
        </Paper>
      </DemoSection>

      <DemoSection title="Elevation" bare>
        <Stack spacing="md">
          <Paper elevation="none">
            <Text variant="large">None</Text>
            <Text variant="muted">
              Border only — flat panels on raised cards.
            </Text>
          </Paper>
          <Paper elevation="sm">
            <Text variant="large">Small elevation</Text>
            <Text variant="muted">Default depth for list sections.</Text>
          </Paper>
          <Paper elevation="md">
            <Text variant="large">Medium elevation</Text>
            <Text variant="muted">
              Emphasized blocks such as payment summaries.
            </Text>
          </Paper>
          <Paper elevation="lg">
            <Text variant="large">Large elevation</Text>
            <Text variant="muted">Maximum depth for hero surfaces.</Text>
          </Paper>
        </Stack>
      </DemoSection>

      <DemoSection title="Outlined & flat" bare>
        <Stack spacing="md">
          <Paper variant="outlined">
            <Text variant="large">Outlined</Text>
            <Text variant="muted">
              Secondary emphasis without extra shadow.
            </Text>
          </Paper>
          <Paper variant="flat">
            <Text variant="large">Flat</Text>
            <Text variant="muted">Sunken sections inside a card.</Text>
          </Paper>
          <Paper variant="outlined" square>
            <Text variant="large">Square</Text>
            <Text variant="muted">Sharp corners via the `square` prop.</Text>
          </Paper>
        </Stack>
      </DemoSection>
    </DemoPage>
  );
}
