import { useState } from 'react';
import { View } from 'react-native';
import { useTokens } from '@truongdq01/headless';
import {
  Alert,
  Button,
  Input,
  Modal,
  ModalFooter,
  ModalHeader,
  Stack,
  Typography,
} from '@truongdq01/ui';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function ModalScreen() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const [customStyleOpen, setCustomStyleOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const t = useTokens();

  const closeBasic = () => setBasicOpen(false);

  const closeForm = () => {
    setFormOpen(false);
    setName('');
    setEmail('');
  };

  return (
    <DemoPage
      title="Modal"
      description="Focused overlays for confirmations, forms, or full-screen tasks."
    >
      <DemoSection
        title="Basic Modal"
        description="Standard backdrop dismissal with header, body, alert, and actions."
      >
        <Button
          label="Launch Basic Modal"
          variant="solid"
          onPress={() => setBasicOpen(true)}
        />

        <Modal open={basicOpen} onClose={closeBasic}>
          <Stack spacing="md">
            <ModalHeader title="Information Dialog" />
            <Typography variant="body1" color="secondary">
              Use modals for short, focused tasks that require the user&apos;s
              attention.
            </Typography>
            <Alert severity="info" variant="standard">
              Modals respect screen-edge inset and safe-area margins by default.
            </Alert>
            <ModalFooter>
              <Button label="Cancel" variant="outline" onPress={closeBasic} />
              <Button label="Got it" variant="solid" onPress={closeBasic} />
            </ModalFooter>
          </Stack>
        </Modal>
      </DemoSection>

      <DemoSection
        title="Form Modal"
        description="Keyboard-aware layout for short forms with header and footer actions."
      >
        <Button
          label="Add Team Member"
          variant="outline"
          onPress={() => setFormOpen(true)}
        />

        <Modal open={formOpen} onClose={closeForm}>
          <Stack spacing="md">
            <ModalHeader title="Invite Member" />
            <Typography variant="body2" color="secondary">
              Send an invitation to join your workspace.
            </Typography>
            <Input
              label="Full name"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <ModalFooter>
              <Button label="Cancel" variant="outline" onPress={closeForm} />
              <Button label="Send Invite" variant="solid" onPress={closeForm} />
            </ModalFooter>
          </Stack>
        </Modal>
      </DemoSection>

      <DemoSection
        title="Full Screen"
        description="Complex configurations or primary tasks that need total focus."
      >
        <Button
          label="Launch Workspace"
          variant="outline"
          onPress={() => setFullscreenOpen(true)}
        />

        <Modal
          open={fullscreenOpen}
          onClose={() => setFullscreenOpen(false)}
          fullScreen
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              gap: t.spacing[6],
              padding: t.spacing[6],
            }}
          >
            <View style={{ alignItems: 'center', gap: t.spacing[2] }}>
              <Typography variant="h2">Focused View</Typography>
              <Typography
                variant="body1"
                style={{ textAlign: 'center', color: t.color.text.secondary }}
              >
                Full-screen mode minimizes external distractions.
              </Typography>
            </View>
            <Button
              label="Finish Task"
              variant="solid"
              onPress={() => setFullscreenOpen(false)}
            />
          </View>
        </Modal>
      </DemoSection>

      <DemoSection
        title="Custom Styling"
        description="Override contentContainerStyle for brand or high-contrast surfaces."
      >
        <Button
          label="Launch Premium UI"
          variant="ghost"
          onPress={() => setCustomStyleOpen(true)}
        />

        <Modal
          open={customStyleOpen}
          onClose={() => setCustomStyleOpen(false)}
          contentContainerStyle={{
            backgroundColor: t.color.brand.default,
            borderRadius: t.radius.xl,
            padding: t.spacing[8],
          }}
        >
          <Stack spacing="lg">
            <Typography variant="h3" color="inverse">
              Surface Customization
            </Typography>
            <Typography variant="body1" color="inverse" style={{ opacity: 0.85 }}>
              Apply unique designs, high-contrast modes, or specialized branding.
            </Typography>
            <Button
              label="Acknowledged"
              variant="solid"
              style={{ backgroundColor: t.color.text.inverse }}
              labelStyle={{ color: t.color.brand.default }}
              onPress={() => setCustomStyleOpen(false)}
            />
          </Stack>
        </Modal>
      </DemoSection>
    </DemoPage>
  );
}
