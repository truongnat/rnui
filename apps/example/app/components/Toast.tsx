import { useToast, useTokens } from '@truongdq01/headless';
import { Button, Stack, Typography } from '@truongdq01/ui';
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Info,
  Mail,
  TriangleAlert,
} from 'lucide-react-native';
import React from 'react';
import { DemoPage, DemoSection } from './_shared/DemoPage';

export default function ToastScreen() {
  const toast = useToast();
  const t = useTokens();

  return (
    <DemoPage
      title="Toast"
      description="Toasts provide brief messages about app processes at the bottom of the screen."
    >
      <DemoSection title="Variants">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Standard variants for success, error, warning, and informational messages.
        </Typography>
        <Stack spacing="md">
          <Button
            label="Success Toast"
            variant="outline"
            leadingIcon={<CheckCircle2 size={18} />}
            onPress={() => toast.success('Changes saved successfully!')}
          />
          <Button
            label="Error Toast"
            variant="outline"
            leadingIcon={<AlertCircle size={18} />}
            onPress={() => toast.error('Failed to connect to server.')}
          />
          <Button
            label="Warning Toast"
            variant="outline"
            leadingIcon={<TriangleAlert size={18} />}
            onPress={() => toast.warning('Your trial ends in 2 days.')}
          />
          <Button
            label="Info Toast"
            variant="outline"
            leadingIcon={<Info size={18} />}
            onPress={() => toast.info('New update available.')}
          />
        </Stack>
      </DemoSection>

      <DemoSection title="Customizations">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Toasts can include custom icons and actionable buttons.
        </Typography>
        <Stack spacing="md">
          <Button
            label="Custom Icon"
            variant="outline"
            leadingIcon={<Mail size={18} />}
            onPress={() =>
              toast.show({
                message: 'You have 3 new messages',
                icon: <Mail size={18} />,
                variant: 'info',
              })
            }
          />
          <Button
            label="Action Toast"
            variant="outline"
            leadingIcon={<Clock size={18} />}
            onPress={() =>
              toast.show({
                message: 'Archived item.',
                action: {
                  label: 'Undo',
                  onPress: () => toast.info('Restored!'),
                },
              })
            }
          />
        </Stack>
      </DemoSection>

      <DemoSection title="Durations">
         <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Control how long the toast stays on screen.
        </Typography>
        <Stack direction="row" spacing="sm">
            <Button
                label="Quick (1s)"
                variant="outline"
                size="sm"
                onPress={() => toast.show({ message: 'Quick flash!', duration: 1000 })}
            />
            <Button
                label="Long (5s)"
                variant="outline"
                size="sm"
                onPress={() => toast.show({ message: 'Staying longer', duration: 5000 })}
            />
        </Stack>
      </DemoSection>
    </DemoPage>
  );
}
