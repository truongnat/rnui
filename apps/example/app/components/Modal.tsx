import { useState } from 'react';
import { View } from 'react-native';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@/components/ui/modal';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function ModalScreen() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [bottomOpen, setBottomOpen] = useState(false);
  const [customStyleOpen, setCustomStyleOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

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
        <Button onPress={() => setBasicOpen(true)}>Launch Basic Modal</Button>

        <Modal open={basicOpen} onOpenChange={setBasicOpen}>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Information Dialog</ModalTitle>
              <ModalDescription>
                Use modals for short, focused tasks that require the user&apos;s
                attention.
              </ModalDescription>
            </ModalHeader>
            <Alert>
              <AlertDescription>
                Modals respect screen-edge inset and safe-area margins by
                default.
              </AlertDescription>
            </Alert>
            <ModalFooter>
              <Button variant="outline" onPress={() => setBasicOpen(false)}>
                Cancel
              </Button>
              <Button onPress={() => setBasicOpen(false)}>Got it</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </DemoSection>

      <DemoSection
        title="Form Modal"
        description="Keyboard-aware layout for short forms with header and footer actions."
      >
        <Button variant="outline" onPress={() => setFormOpen(true)}>
          Add Team Member
        </Button>

        <Modal open={formOpen} onOpenChange={setFormOpen}>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Invite Member</ModalTitle>
              <ModalDescription>
                Send an invitation to join your workspace.
              </ModalDescription>
            </ModalHeader>
            <Stack spacing="md">
              <View className="gap-1.5">
                <Label nativeID="modal-name">Full name</Label>
                <Input
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                  accessibilityLabelledBy="modal-name"
                />
              </View>
              <View className="gap-1.5">
                <Label nativeID="modal-email">Email</Label>
                <Input
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  accessibilityLabelledBy="modal-email"
                />
              </View>
            </Stack>
            <ModalFooter>
              <Button variant="outline" onPress={closeForm}>
                Cancel
              </Button>
              <Button onPress={closeForm}>Send Invite</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </DemoSection>

      <DemoSection
        title="Bottom Position"
        description="The `bottom` position slides up and docks to the screen edge."
      >
        <Button variant="outline" onPress={() => setBottomOpen(true)}>
          Launch Bottom Modal
        </Button>

        <Modal open={bottomOpen} onOpenChange={setBottomOpen} position="bottom">
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Focused View</ModalTitle>
              <ModalDescription>
                Bottom-anchored mode minimizes external distractions.
              </ModalDescription>
            </ModalHeader>
            <Button onPress={() => setBottomOpen(false)}>Finish Task</Button>
          </ModalContent>
        </Modal>
      </DemoSection>

      <DemoSection
        title="Custom Styling"
        description="Override ModalContent className for brand or high-contrast surfaces."
      >
        <Button variant="ghost" onPress={() => setCustomStyleOpen(true)}>
          Launch Premium UI
        </Button>

        <Modal open={customStyleOpen} onOpenChange={setCustomStyleOpen}>
          <ModalContent className="border-0 bg-primary">
            <Stack spacing="lg">
              <Stack spacing="sm">
                <Text variant="h3" className="text-primary-foreground">
                  Surface Customization
                </Text>
                <Text variant="p" className="text-primary-foreground/80">
                  Apply unique designs, high-contrast modes, or specialized
                  branding.
                </Text>
              </Stack>
              <Button
                variant="secondary"
                onPress={() => setCustomStyleOpen(false)}
              >
                Acknowledged
              </Button>
            </Stack>
          </ModalContent>
        </Modal>
      </DemoSection>
    </DemoPage>
  );
}
