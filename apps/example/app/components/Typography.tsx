import { Typography, Card, Stack, Divider } from '@truongdq01/ui';
import { DemoPage, DemoPreview, DemoSection } from '@/demo/DemoPage';

export default function TypographyScreen() {
  return (
    <DemoPage
      title="Typography"
      description="Mobile-native hierarchy — balanced weights and readable line heights."
    >
      <DemoSection
        title="Order confirmation"
        description="Article-style content block with realistic hierarchy."
      >
        <Card>
          <Stack spacing="sm">
            <Typography variant="overline" color="brand">
              Order #4821
            </Typography>
            <Typography variant="h2">Payment received</Typography>
            <Typography variant="body1" color="secondary">
              Your subscription renews on June 12. You can manage billing anytime in
              Settings.
            </Typography>
            <Divider spacing="sm" />
            <Typography variant="caption" color="tertiary">
              Receipt sent to alex@company.com
            </Typography>
          </Stack>
        </Card>
      </DemoSection>

      <DemoSection title="Headings">
        <Stack spacing="xs">
          <Typography variant="display">Display</Typography>
          <Typography variant="h1">Heading 1</Typography>
          <Typography variant="h2">Heading 2</Typography>
          <Typography variant="h3">Heading 3</Typography>
          <Typography variant="h4">Heading 4</Typography>
        </Stack>
      </DemoSection>

      <DemoSection title="Body & labels">
        <Typography variant="body1">
          Body 1 — primary reading size for descriptions and settings copy.
        </Typography>
        <Divider spacing="md" />
        <Typography variant="body2" color="secondary">
          Body 2 — secondary metadata, timestamps, and helper text.
        </Typography>
        <Divider spacing="md" />
        <Typography variant="label">Form label style</Typography>
        <Typography variant="caption" color="tertiary">
          Caption — fine print that stays readable, not washed out.
        </Typography>
      </DemoSection>

      <DemoSection title="Semantic colors">
        <Stack spacing="xs">
          <Typography variant="body1" color="primary">Primary</Typography>
          <Typography variant="body1" color="secondary">Secondary</Typography>
          <Typography variant="body1" color="brand">Brand accent</Typography>
          <Typography variant="body1" color="error">Payment failed</Typography>
        </Stack>
      </DemoSection>

      <DemoSection title="Layout helpers">
        <DemoPreview>
          <Typography variant="h5" gutterBottom>
            Notification preferences
          </Typography>
          <Typography variant="body2" paragraph>
            Choose how we contact you about orders and account security.
          </Typography>
          <Typography variant="body2">Changes save automatically.</Typography>
        </DemoPreview>
      </DemoSection>
    </DemoPage>
  );
}
