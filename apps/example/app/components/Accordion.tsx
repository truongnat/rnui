import { useState } from 'react';
import { View } from 'react-native';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function AccordionScreen() {
  const [multiExpanded, setMultiExpanded] = useState<string[]>(['1']);

  return (
    <DemoPage
      title="Accordion"
      description="Expandable sections for compact content organization."
    >
      <DemoSection
        title="Single Mode"
        description="Only one item expanded at a time."
        flush
      >
        <Accordion defaultValue="1">
          <AccordionItem value="1">
            <AccordionTrigger>What is RNUI?</AccordionTrigger>
            <AccordionContent>
              <Text variant="muted">
                A high-performance, themeable component library for React
                Native.
              </Text>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="2">
            <AccordionTrigger>Can I use it with Expo?</AccordionTrigger>
            <AccordionContent>
              <Text variant="muted">
                Yes — fully compatible with Expo SDK and expo-blur /
                expo-haptics.
              </Text>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </DemoSection>

      <DemoSection
        title="Multiple Mode"
        description="Several items open simultaneously."
        flush
      >
        <Stack direction="row" spacing="sm" className="p-4">
          <Button
            size="sm"
            variant="outline"
            onPress={() => setMultiExpanded(['1', '2', '3'])}
          >
            Expand All
          </Button>
          <Button
            size="sm"
            variant="outline"
            onPress={() => setMultiExpanded([])}
          >
            Collapse All
          </Button>
        </Stack>

        {/* Key remount reapplies defaultValue when Expand/Collapse All changes state. */}
        <Accordion
          key={multiExpanded.join(',')}
          multiple
          defaultValue={multiExpanded}
        >
          <AccordionItem value="1">
            <AccordionTrigger>Item One</AccordionTrigger>
            <AccordionContent>
              <Text variant="muted">
                Compare information across multiple sections.
              </Text>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="2">
            <AccordionTrigger>Item Two</AccordionTrigger>
            <AccordionContent>
              <Text variant="muted">
                Use the value prop to identify items within a group.
              </Text>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="3">
            <AccordionTrigger>Item Three</AccordionTrigger>
            <AccordionContent>
              <Text variant="muted">
                Controlled state enables Expand All actions.
              </Text>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </DemoSection>

      <DemoSection
        title="Bordered"
        description="Containers and separators via className."
        flush
      >
        <Accordion className="rounded-lg border border-border px-4">
          <AccordionItem value="1">
            <AccordionTrigger>Account Settings</AccordionTrigger>
            <AccordionContent>
              <Text variant="muted">
                Manage account preferences and security.
              </Text>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="2" className="border-b-0">
            <AccordionTrigger>Privacy Policy</AccordionTrigger>
            <AccordionContent>
              <Text variant="muted">
                Read our privacy policy for data handling details.
              </Text>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </DemoSection>

      <DemoSection title="Customization">
        <Stack spacing="md">
          <Accordion>
            <AccordionItem value="actions">
              <AccordionTrigger>With Actions</AccordionTrigger>
              <AccordionContent>
                <Text variant="muted">
                  Interactive controls in the accordion footer.
                </Text>
                <View className="mt-3 flex-row justify-end gap-2">
                  <Button variant="ghost" size="sm">
                    Reset
                  </Button>
                  <Button size="sm">Apply</Button>
                </View>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion>
            <AccordionItem value="disabled">
              <AccordionTrigger disabled>Disabled Accordion</AccordionTrigger>
              <AccordionContent>
                <Text>Hidden content</Text>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Stack>
      </DemoSection>
    </DemoPage>
  );
}
