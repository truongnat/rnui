import { useState } from 'react';
import { View } from 'react-native';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function AccordionScreen() {
  const [reminders, setReminders] = useState(false);
  return (
    <DemoPage
      title="Accordion"
      description="Reveal details in place. Content and chevrons move together, even when you change your mind."
    >
      <DemoSection
        title="Delivery questions"
        description="Opening a question closes the previous answer."
      >
        <Accordion defaultValue="delivery">
          <AccordionItem value="delivery">
            <AccordionTrigger>When will my order arrive?</AccordionTrigger>
            <AccordionContent>
              Standard delivery takes 3–5 business days. Your tracking link
              appears as soon as the parcel is collected.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="returns">
            <AccordionTrigger>
              Can I return an item that doesn't fit?
            </AccordionTrigger>
            <AccordionContent>
              Keep the packaging and start a return from your order details
              within 30 days of delivery.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="address" className="border-b-0">
            <AccordionTrigger>
              How do I update my delivery address?
            </AccordionTrigger>
            <AccordionContent>
              You can edit the delivery address before your order moves into
              packing.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </DemoSection>
      <DemoSection
        title="Compare details"
        description="Multiple sections can stay open. Tap the headings to compare them."
      >
        <Accordion multiple defaultValue={['materials']}>
          <AccordionItem value="materials">
            <AccordionTrigger>Materials</AccordionTrigger>
            <AccordionContent>
              Organic cotton, with reinforced seams and a soft brushed finish.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="care" className="border-b-0">
            <AccordionTrigger>Care instructions</AccordionTrigger>
            <AccordionContent>
              Machine wash cold with similar colors. Air dry to preserve the
              fit.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </DemoSection>
      <DemoSection
        title="Actions inside content"
        description="Expanded content can contain controls without leaving the page."
      >
        <Accordion>
          <AccordionItem value="reminders">
            <AccordionTrigger>Delivery notifications</AccordionTrigger>
            <AccordionContent>
              <Text variant="muted">
                Choose whether to receive a reminder when your parcel is out for
                delivery.
              </Text>
              <View className="mt-3 items-start gap-2">
                <Button
                  variant="outline"
                  onPress={() => setReminders((current) => !current)}
                >
                  {reminders ? 'Turn reminders off' : 'Turn reminders on'}
                </Button>
                <Text variant="muted" accessibilityLiveRegion="polite">
                  {reminders
                    ? 'Delivery reminders are on.'
                    : 'Delivery reminders are off.'}
                </Text>
              </View>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="unavailable" className="border-b-0">
            <AccordionTrigger disabled>
              Gift wrapping · unavailable
            </AccordionTrigger>
            <AccordionContent>
              Gift wrapping is not available for this order.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </DemoSection>
    </DemoPage>
  );
}
