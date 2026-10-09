import { useState } from 'react';
import { ScrollView } from 'react-native';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog';
import { FormDescription, FormField, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function DialogScreen() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [scrollOpen, setScrollOpen] = useState(false);
  const [projectName, setProjectName] = useState('');

  const closeForm = () => {
    setFormOpen(false);
    setProjectName('');
  };

  return (
    <DemoPage
      title="Dialog"
      description="Decision and confirmation surfaces with consistent screen-edge inset."
    >
      <DemoSection
        title="Basic"
        description="Simple information with a single dismissal action."
      >
        <Button className="self-start" onPress={() => setBasicOpen(true)}>
          Open Basic Dialog
        </Button>

        <Dialog open={basicOpen} onOpenChange={setBasicOpen}>
          <DialogTitle>Update Available</DialogTitle>
          <DialogDescription>
            A new version is ready to install with performance improvements and
            bug fixes.
          </DialogDescription>
          <Button className="mt-4 w-full" onPress={() => setBasicOpen(false)}>
            Understand
          </Button>
        </Dialog>
      </DemoSection>

      <DemoSection
        title="Confirmation"
        description="Cancel and confirm decisions in the footer. showClose={false} removes the corner dismiss."
      >
        <Button
          className="self-start"
          variant="outline"
          onPress={() => setConfirmOpen(true)}
        >
          Open Confirmation
        </Button>

        <Dialog
          open={confirmOpen}
          onOpenChange={setConfirmOpen}
          showClose={false}
        >
          <DialogTitle>Discard changes?</DialogTitle>
          <DialogDescription>
            Unsaved changes will be lost if you leave this screen.
          </DialogDescription>
          <DialogFooter>
            <Button variant="ghost" onPress={() => setConfirmOpen(false)}>
              Keep Editing
            </Button>
            <Button variant="destructive" onPress={() => setConfirmOpen(false)}>
              Discard
            </Button>
          </DialogFooter>
        </Dialog>
      </DemoSection>

      <DemoSection
        title="Form in Dialog"
        description="Short input flows with keyboard-aware host layout."
      >
        <Button
          className="self-start"
          variant="outline"
          onPress={() => setFormOpen(true)}
        >
          Rename Project
        </Button>
        <Dialog
          open={formOpen}
          onOpenChange={(open) => (open ? setFormOpen(true) : closeForm())}
        >
          <DialogTitle>Rename Project</DialogTitle>
          <DialogDescription>
            Choose a name your team will recognize.
          </DialogDescription>
          <FormField className="mt-4">
            <FormLabel>Project name</FormLabel>
            <Input
              value={projectName}
              onChangeText={setProjectName}
              placeholder="e.g. Apollo"
            />
            <FormDescription>
              Visible across dashboards and reports.
            </FormDescription>
          </FormField>
          <DialogFooter>
            <Button variant="outline" onPress={closeForm}>
              Cancel
            </Button>
            <Button onPress={closeForm}>Save</Button>
          </DialogFooter>
        </Dialog>
      </DemoSection>

      <DemoSection
        title="Long Content"
        description="Lengthy copy stays within the inset surface; scroll inside if needed."
      >
        <Button
          className="self-start"
          variant="ghost"
          onPress={() => setScrollOpen(true)}
        >
          Open Terms Dialog
        </Button>

        <Dialog open={scrollOpen} onOpenChange={setScrollOpen}>
          <DialogTitle>Terms of Service</DialogTitle>
          <ScrollView
            className="mt-4"
            style={{ maxHeight: 320 }}
            showsVerticalScrollIndicator={false}
          >
            <Stack spacing="md">
              <Text variant="large">1. Introduction</Text>
              <Text variant="muted">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
              <Text variant="large">2. Usage Rules</Text>
              <Text variant="muted">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.
              </Text>
              <Text variant="large">3. Terminations</Text>
              <Text variant="muted">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur.
              </Text>
            </Stack>
          </ScrollView>
          <DialogFooter>
            <Button className="flex-1" onPress={() => setScrollOpen(false)}>
              I Agree
            </Button>
          </DialogFooter>
        </Dialog>
      </DemoSection>
    </DemoPage>
  );
}
