import { useToast } from '@truongdq01/headless';
import { Button, Stack } from '@truongdq01/ui';
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Info,
  Mail,
  TriangleAlert,
} from 'lucide-react-native';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function ToastScreen() {
  const toast = useToast();

  return (
    <DemoPage
      title="Toast"
      description="Brief, non-blocking messages about app processes. Shown via ToastContainer at the app root."
    >
      <DemoSection
        title="Variants"
        description="Semantic variants for success, error, warning, and info."
      >
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

      <DemoSection
        title="Customizations"
        description="Optional custom icons and action buttons."
      >
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

      <DemoSection
        title="Durations"
        description="Control how long the toast stays visible."
      >
        <Stack direction="row" spacing="sm">
          <Button
            label="Quick (1s)"
            variant="outline"
            size="sm"
            onPress={() =>
              toast.show({ message: 'Quick flash!', duration: 1000 })
            }
          />
          <Button
            label="Long (5s)"
            variant="outline"
            size="sm"
            onPress={() =>
              toast.show({ message: 'Staying longer', duration: 5000 })
            }
          />
        </Stack>
      </DemoSection>
    </DemoPage>
  );
}
