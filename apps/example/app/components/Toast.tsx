import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useToast } from '@/components/ui/toast';
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Info,
  Loader,
  Mail,
  TriangleAlert,
} from 'lucide-react-native';
import { DemoGroup, DemoPage, DemoSection } from '@/demo/DemoPage';
import { useIconColor } from '@/lib/utils';

export default function ToastScreen() {
  const { toast } = useToast();
  const iconColor = useIconColor('foreground');

  return (
    <DemoPage
      title="Toast"
      description="Brief, non-blocking messages about app processes. Shown via ToastProvider at the app root."
    >
      <DemoSection
        title="Variants"
        description="Semantic variants for success, error, warning, and info."
      >
        <DemoGroup direction="column" gap={12}>
          <Button
            variant="outline"
            onPress={() => toast.success('Changes saved successfully!')}
          >
            <CheckCircle2 size={18} color={iconColor} />
            <Text>Success Toast</Text>
          </Button>
          <Button
            variant="outline"
            onPress={() => toast.error('Failed to connect to server.')}
          >
            <AlertCircle size={18} color={iconColor} />
            <Text>Error Toast</Text>
          </Button>
          <Button
            variant="outline"
            onPress={() => toast.warning('Your trial ends in 2 days.')}
          >
            <TriangleAlert size={18} color={iconColor} />
            <Text>Warning Toast</Text>
          </Button>
          <Button
            variant="outline"
            onPress={() => toast.info('New update available.')}
          >
            <Info size={18} color={iconColor} />
            <Text>Info Toast</Text>
          </Button>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Customizations"
        description="Optional custom icons and action buttons."
      >
        <DemoGroup direction="column" gap={12}>
          <Button
            variant="outline"
            onPress={() =>
              toast.info('You have 3 new messages', {
                icon: <Mail size={16} color={iconColor} />,
              })
            }
          >
            <Mail size={18} color={iconColor} />
            <Text>Custom Icon</Text>
          </Button>
          <Button
            variant="outline"
            onPress={() =>
              toast('Archived item.', {
                action: {
                  label: 'Undo',
                  onPress: () => toast.info('Restored!'),
                },
              })
            }
          >
            <Clock size={18} color={iconColor} />
            <Text>Action Toast</Text>
          </Button>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Loading & Promise"
        description="Persistent loading toasts and promise-driven updates."
      >
        <DemoGroup direction="column" gap={12}>
          <Button
            variant="outline"
            onPress={() => {
              const id = toast.loading('Uploading…');
              setTimeout(() => toast.dismiss(id), 2000);
            }}
          >
            <Loader size={18} color={iconColor} />
            <Text>Loading (dismiss in 2s)</Text>
          </Button>
          <Button
            variant="outline"
            onPress={() => {
              const { promise, resolve } = Promise.withResolvers<undefined>();
              setTimeout(() => resolve(undefined), 1500);
              toast.promise(promise, {
                loading: 'Saving changes…',
                success: 'Changes saved!',
                error: 'Save failed',
              });
            }}
          >
            <CheckCircle2 size={18} color={iconColor} />
            <Text>Promise Toast</Text>
          </Button>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Durations"
        description="Control how long the toast stays visible."
      >
        <DemoGroup gap={8}>
          <Button
            variant="outline"
            size="sm"
            onPress={() => toast('Quick flash!', { duration: 1000 })}
          >
            Quick (1s)
          </Button>
          <Button
            variant="outline"
            size="sm"
            onPress={() => toast('Staying longer', { duration: 5000 })}
          >
            Long (5s)
          </Button>
        </DemoGroup>
      </DemoSection>
    </DemoPage>
  );
}
