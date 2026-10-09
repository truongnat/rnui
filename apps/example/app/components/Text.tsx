import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';
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
          <CardContent className="pt-6">
            <Stack spacing="sm">
              <Text className="text-xs uppercase tracking-wide text-primary">
                Order #4821
              </Text>
              <Text variant="h2">Payment received</Text>
              <Text variant="muted">
                Your subscription renews on June 12. You can manage billing
                anytime in Settings.
              </Text>
              <Separator />
              <Text variant="muted" className="text-xs">
                Receipt sent to alex@company.com
              </Text>
            </Stack>
          </CardContent>
        </Card>
      </DemoSection>

      <DemoSection title="Headings">
        <Stack spacing="xs">
          <Text variant="h1">Heading 1</Text>
          <Text variant="h2">Heading 2</Text>
          <Text variant="h3">Heading 3</Text>
          <Text variant="h4">Heading 4</Text>
        </Stack>
      </DemoSection>

      <DemoSection title="Body & labels">
        <Text variant="p">
          Body — primary reading size for descriptions and settings copy.
        </Text>
        <Separator className="my-4" />
        <Text variant="muted">
          Muted — secondary metadata, timestamps, and helper text.
        </Text>
        <Separator className="my-4" />
        <Text variant="small">Form label style</Text>
        <Text variant="muted" className="text-xs">
          Caption — fine print that stays readable, not washed out.
        </Text>
      </DemoSection>

      <DemoSection title="Semantic colors">
        <Stack spacing="xs">
          <Text variant="p">Default</Text>
          <Text variant="muted">Muted</Text>
          <Text variant="p" className="text-primary">
            Brand accent
          </Text>
          <Text variant="p" className="text-destructive">
            Payment failed
          </Text>
        </Stack>
      </DemoSection>

      <DemoSection title="Layout helpers">
        <DemoPreview>
          <Text variant="h4" className="mb-2">
            Notification preferences
          </Text>
          <Text variant="muted" className="mb-3">
            Choose how we contact you about orders and account security.
          </Text>
          <Text variant="muted">Changes save automatically.</Text>
        </DemoPreview>
      </DemoSection>
    </DemoPage>
  );
}
