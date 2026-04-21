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
import React, { useState } from 'react';
import { View } from 'react-native';
import { DemoPage, DemoSection } from './_shared/DemoPage';

export default function AccordionScreen() {
  const t = useTokens();
  const [multiExpanded, setMultiExpanded] = useState<string[]>(['1']);

  return (
    <DemoPage 
      title="Accordion" 
      description="Expandable sections used to organize content in a compact way with support for single and multiple expansion."
    >
      <DemoSection title="Accordion Group (Single mode)">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          In "single" mode (default), only one item can be expanded at a time.
        </Typography>
        <AccordionGroup variant="single">
          <Accordion id="1" defaultExpanded>
            <AccordionSummary>What is RNUI?</AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="secondary">
                RNUI is a high-performance, themeable component library for React Native, 
                designed with a focus on aesthetics and developer experience.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion id="2">
            <AccordionSummary>Can I use it with Expo?</AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="secondary">
                Yes! RNUI is fully compatible with Expo and works seamlessly with 
                Expo SDK and libraries like expo-blur and expo-haptics.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </AccordionGroup>
      </DemoSection>

      <DemoSection title="Accordion Group (Multiple mode)">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Multiple items can be open simultaneously in this mode.
        </Typography>
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
                This mode allows users to compare information across multiple sections.
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
                Controlled state allows for actions like "Expand All".
              </Typography>
            </AccordionDetails>
          </Accordion>
        </AccordionGroup>
      </DemoSection>

      <DemoSection title="Bordered Layout">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          The `bordered` prop on `AccordionGroup` adds containers and separators automatically.
        </Typography>
        <AccordionGroup bordered>
          <Accordion id="1">
            <AccordionSummary>Account Settings</AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="secondary">
                Manage your account preferences and security settings.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion id="2">
            <AccordionSummary>Privacy Policy</AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="secondary">
                Read our privacy policy to understand data handling.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </AccordionGroup>
      </DemoSection>

      <DemoSection title="Customization & Actions">
        <Stack spacing="md">
            <Accordion>
              <AccordionSummary expandIcon={<Plus size={24} color={t.color.brand.default} />}>
                Custom Expand Icon
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="secondary">
                  You can pass any React node to the `expandIcon` prop. 
                  It rotates 180° automatically when expanded.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary>Accordion with Actions</AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="secondary">
                  Add interactive controls within the accordion footer.
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
