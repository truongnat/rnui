import { useTokens } from '@truongdq01/headless';
import { Paper, Stack, Typography } from '@truongdq01/ui';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function PaperScreen() {
  const t = useTokens();

  return (
    <DemoPage
      title="Paper"
      description="Settings and profile surfaces — default border + soft shadow, optional elevation."
    >
      <DemoSection
        title="Account profile"
        description="Default Paper is visible on app background without custom styling."
      >
        <Paper style={{ padding: t.spacing[4] }}>
          <Stack spacing="sm">
            <Typography variant="h5">Alex Nguyen</Typography>
            <Typography variant="body2" color="secondary">
              Product designer · San Francisco
            </Typography>
            <Typography variant="caption" color="tertiary">
              Member since March 2024
            </Typography>
          </Stack>
        </Paper>
      </DemoSection>

      <DemoSection title="Elevation" bare>
        <Stack spacing="md">
          <Paper elevation="none" style={{ padding: t.spacing[4] }}>
            <Typography variant="subtitle2">None</Typography>
            <Typography variant="body2" color="secondary">
              Border only — flat panels on raised cards.
            </Typography>
          </Paper>
          <Paper elevation="sm" style={{ padding: t.spacing[4] }}>
            <Typography variant="subtitle2">Small elevation</Typography>
            <Typography variant="body2" color="secondary">
              Default depth for list sections.
            </Typography>
          </Paper>
          <Paper elevation="md" style={{ padding: t.spacing[4] }}>
            <Typography variant="subtitle2">Medium elevation</Typography>
            <Typography variant="body2" color="secondary">
              Emphasized blocks such as payment summaries.
            </Typography>
          </Paper>
        </Stack>
      </DemoSection>

      <DemoSection title="Outlined & flat" bare>
        <Stack spacing="md">
          <Paper variant="outlined" style={{ padding: t.spacing[4] }}>
            <Typography variant="subtitle2">Outlined</Typography>
            <Typography variant="body2" color="secondary">
              Secondary emphasis without extra shadow.
            </Typography>
          </Paper>
          <Paper variant="flat" style={{ padding: t.spacing[4] }}>
            <Typography variant="subtitle2">Flat</Typography>
            <Typography variant="body2" color="secondary">
              Sunken sections inside a card.
            </Typography>
          </Paper>
        </Stack>
      </DemoSection>
    </DemoPage>
  );
}
