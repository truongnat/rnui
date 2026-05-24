import { useTokens } from '@truongdq01/headless';
import { Alert, AlertTitle, Button, Stack, Typography } from '@truongdq01/ui';
import { Info } from 'lucide-react-native';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function AlertScreen() {
  const t = useTokens();

  return (
    <DemoPage
      title="Alert"
      description="Contextual feedback for user actions — info, success, warning, and error."
    >
      <DemoSection
        title="Standard"
        description="Subtle colors for status updates without interrupting flow."
      >
        <Stack spacing="md">
          <Alert severity="info" onClose={() => {}}>
            <AlertTitle>Information</AlertTitle>
            <Typography variant="body2">
              Informational alert for slight feedback.
            </Typography>
          </Alert>

          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            <Typography variant="body2">
              Your changes have been saved successfully.
            </Typography>
          </Alert>

          <Alert severity="warning">
            <AlertTitle>Warning</AlertTitle>
            <Typography variant="body2">
              Check your connection before proceeding.
            </Typography>
          </Alert>

          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            <Typography variant="body2">
              Failed to upload images. Please try again later.
            </Typography>
          </Alert>
        </Stack>
      </DemoSection>

      <DemoSection
        title="Filled"
        description="Rich background colors for high visibility."
      >
        <Stack spacing="md">
          <Alert severity="error" variant="filled">
            <Typography variant="body2" color="inverse">
              Critical error that needs immediate attention.
            </Typography>
          </Alert>

          <Alert severity="success" variant="filled">
            <Typography variant="body2" color="inverse">
              Everything is working as expected.
            </Typography>
          </Alert>
        </Stack>
      </DemoSection>

      <DemoSection
        title="Outlined"
        description="Secondary feedback and embedded layouts."
      >
        <Stack spacing="md">
          <Alert severity="info" variant="outlined">
            <Typography variant="body2">
              Outlined variant for secondary feedback.
            </Typography>
          </Alert>

          <Alert severity="warning" variant="outlined">
            <Typography variant="body2">
              Verify security in your account settings.
            </Typography>
          </Alert>
        </Stack>
      </DemoSection>

      <DemoSection title="Customizations" description="Actions and custom icons.">
        <Stack spacing="md">
          <Alert
            severity="info"
            action={
              <Button
                label="UNDO"
                variant="ghost"
                size="sm"
                onPress={() => {}}
              />
            }
          >
            <Typography variant="body2">
              The item has been deleted from your library.
            </Typography>
          </Alert>

          <Alert
            severity="info"
            icon={<Info color={t.color.info.icon} size={20} />}
          >
            <Typography variant="body2">
              Custom Lucide info icon.
            </Typography>
          </Alert>
        </Stack>
      </DemoSection>
    </DemoPage>
  );
}
