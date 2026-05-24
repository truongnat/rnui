import { useState } from 'react';
import { Button, Dialog, Input, Stack, Typography } from '@truongdq01/ui';
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
        <Button label="Open Basic Dialog" onPress={() => setBasicOpen(true)} />

        <Dialog
          open={basicOpen}
          onClose={() => setBasicOpen(false)}
          title="Update Available"
        >
          <Typography variant="body1" color="secondary">
            A new version is ready to install with performance improvements and
            bug fixes.
          </Typography>
          <Button
            label="Understand"
            style={{ marginTop: 16 }}
            onPress={() => setBasicOpen(false)}
            fullWidth
          />
        </Dialog>
      </DemoSection>

      <DemoSection
        title="Confirmation"
        description="Use the actions slot for cancel and confirm decisions."
      >
        <Button
          label="Open Confirmation"
          variant="outline"
          onPress={() => setConfirmOpen(true)}
        />

        <Dialog
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          title="Discard changes?"
          actions={
            <Stack direction="row" spacing="md">
              <Button
                label="Keep Editing"
                variant="ghost"
                onPress={() => setConfirmOpen(false)}
              />
              <Button
                label="Discard"
                variant="destructive"
                onPress={() => setConfirmOpen(false)}
              />
            </Stack>
          }
        >
          <Typography variant="body1" color="secondary">
            Unsaved changes will be lost if you leave this screen.
          </Typography>
        </Dialog>
      </DemoSection>

      <DemoSection
        title="Form in Dialog"
        description="Short input flows with keyboard-aware host layout."
      >
        <Button
          label="Rename Project"
          variant="outline"
          onPress={() => setFormOpen(true)}
        />

        <Dialog
          open={formOpen}
          onClose={closeForm}
          title="Rename Project"
          actions={
            <Stack direction="row" spacing="md">
              <Button label="Cancel" variant="outline" onPress={closeForm} />
              <Button label="Save" onPress={closeForm} />
            </Stack>
          }
        >
          <Typography variant="body2" color="secondary">
            Choose a name your team will recognize.
          </Typography>
          <Input
            label="Project name"
            value={projectName}
            onChangeText={setProjectName}
            style={{ marginTop: 16 }}
          />
        </Dialog>
      </DemoSection>

      <DemoSection
        title="Long Content"
        description="Lengthy copy stays within the inset surface; scroll inside if needed."
      >
        <Button
          label="Open Terms Dialog"
          variant="ghost"
          onPress={() => setScrollOpen(true)}
        />

        <Dialog
          open={scrollOpen}
          onClose={() => setScrollOpen(false)}
          title="Terms of Service"
          actions={
            <Button label="I Agree" onPress={() => setScrollOpen(false)} fullWidth />
          }
        >
          <Stack spacing="md">
            <Typography variant="h4">1. Introduction</Typography>
            <Typography variant="body2" color="secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
            <Typography variant="h4">2. Usage Rules</Typography>
            <Typography variant="body2" color="secondary">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Typography>
            <Typography variant="h4">3. Terminations</Typography>
            <Typography variant="body2" color="secondary">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur.
            </Typography>
          </Stack>
        </Dialog>
      </DemoSection>
    </DemoPage>
  );
}
