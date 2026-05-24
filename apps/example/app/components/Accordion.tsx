import { useTokens } from '@truongdq01/headless';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Button,
  Stack,
  Typography,
} from '@truongdq01/ui';
import { Plus } from 'lucide-react-native';
import { useState } from 'react';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function AccordionScreen() {
  const t = useTokens();
  const [multiExpanded, setMultiExpanded] = useState<string[]>(['1']);

  return (
    <DemoPage
      title="Accordion"
      description="Expandable sections for compact content organization."
    >
      <DemoSection title="Single Mode" description="Only one item expanded at a time." flush>
        <AccordionGroup variant="single">
          <Accordion id="1" defaultExpanded>
            <AccordionSummary>What is RNUI?</AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="secondary">
                A high-performance, themeable component library for React Native.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion id="2">
            <AccordionSummary>Can I use it with Expo?</AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="secondary">
                Yes — fully compatible with Expo SDK and expo-blur / expo-haptics.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </AccordionGroup>
      </DemoSection>

      <DemoSection title="Multiple Mode" description="Several items open simultaneously." flush>
        <Stack direction="row" spacing="sm" style={{ marginBottom: t.spacing[4] }}>
          <Button
            label="Expand All"
            size="sm"
            variant="outline"
            onPress={() => setMultiExpanded(['1', '2', '3'])}
          />
          <Button
            label="Collapse All"
            size="sm"
            variant="outline"
            onPress={() => setMultiExpanded([])}
          />
        </Stack>

        <AccordionGroup
          variant="multiple"
          expandedIds={multiExpanded}
          onChange={setMultiExpanded}
        >
          <Accordion id="1">
            <AccordionSummary>Item One</AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="secondary">
                Compare information across multiple sections.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion id="2">
            <AccordionSummary>Item Two</AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="secondary">
                Use the ID prop to manage state within a group.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion id="3">
            <AccordionSummary>Item Three</AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="secondary">
                Controlled state enables Expand All actions.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </AccordionGroup>
      </DemoSection>

      <DemoSection title="Bordered" description="Containers and separators via bordered prop." flush>
        <AccordionGroup bordered>
          <Accordion id="1">
            <AccordionSummary>Account Settings</AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="secondary">
                Manage account preferences and security.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion id="2">
            <AccordionSummary>Privacy Policy</AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="secondary">
                Read our privacy policy for data handling details.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </AccordionGroup>
      </DemoSection>

      <DemoSection title="Customization">
        <Stack spacing="md">
          <Accordion>
            <AccordionSummary expandIcon={<Plus size={24} color={t.color.brand.default} />}>
              Custom Expand Icon
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="secondary">
                Pass any node to expandIcon — rotates 180° when expanded.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary>With Actions</AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="secondary">
                Interactive controls in the accordion footer.
              </Typography>
            </AccordionDetails>
            <AccordionActions>
              <Button label="Reset" variant="ghost" size="sm" />
              <Button label="Apply" size="sm" />
            </AccordionActions>
          </Accordion>

          <Accordion disabled>
            <AccordionSummary>Disabled Accordion</AccordionSummary>
            <AccordionDetails>
              <Typography>Hidden content</Typography>
            </AccordionDetails>
          </Accordion>
        </Stack>
      </DemoSection>
    </DemoPage>
  );
}
