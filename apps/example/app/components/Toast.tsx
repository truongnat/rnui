import { useEffect, useRef, useState } from 'react';
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
  const primaryIconColor = useIconColor('onPrimary');
  const [uploading, setUploading] = useState(false);
  const uploadId = useRef<number | undefined>(undefined);
  const uploadTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const timers = useRef(new Set<ReturnType<typeof setTimeout>>());
  const pendingIds = useRef(new Set<number>());

  useEffect(() => {
    const pendingTimers = timers.current;
    const ids = pendingIds.current;
    return () => {
      pendingTimers.forEach(clearTimeout);
      pendingTimers.clear();
      ids.forEach((id) => {
        toast.dismiss(id);
      });
      ids.clear();
    };
  }, [toast]);

  const schedule = (callback: () => void, delay: number) => {
    const timer = setTimeout(() => {
      timers.current.delete(timer);
      callback();
    }, delay);
    timers.current.add(timer);
    return timer;
  };

  const cancelUpload = () => {
    clearTimeout(uploadTimer.current);
    if (uploadTimer.current !== undefined)
      timers.current.delete(uploadTimer.current);
    if (uploadId.current !== undefined) {
      toast.dismiss(uploadId.current);
      pendingIds.current.delete(uploadId.current);
    }
    uploadId.current = undefined;
    uploadTimer.current = undefined;
    setUploading(false);
  };

  return (
    <DemoPage
      title="Toast"
      description="Brief, non-blocking messages about app processes. Shown via ToastProvider at the app root."
    >
      <DemoSection
        title="Variants"
        description="Status icons make each outcome recognizable. Titles and details remain readable in either theme."
        bare
      >
        <DemoGroup direction="column">
          <DemoGroup direction="row">
            <Button
              className="flex-1"
              variant="outline"
              onPress={() => toast.success('Changes saved successfully!')}
            >
              <CheckCircle2 size={18} color={iconColor} />
              <Text>Success</Text>
            </Button>
            <Button
              className="flex-1"
              variant="outline"
              onPress={() => toast.error('Failed to connect to server.')}
            >
              <AlertCircle size={18} color={iconColor} />
              <Text>Error</Text>
            </Button>
          </DemoGroup>
          <DemoGroup direction="row">
            <Button
              className="flex-1"
              variant="outline"
              onPress={() => toast.warning('Your trial ends in 2 days.')}
            >
              <TriangleAlert size={18} color={iconColor} />
              <Text>Warning</Text>
            </Button>
            <Button
              className="flex-1"
              variant="outline"
              onPress={() => toast.info('New update available.')}
            >
              <Info size={18} color={iconColor} />
              <Text>Info</Text>
            </Button>
          </DemoGroup>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Customizations"
        description="Optional custom icons, supporting detail, and follow-up actions. The close control is always available."
        bare
      >
        <DemoGroup direction="column">
          <Button
            variant="outline"
            onPress={() =>
              toast.info('You have 3 new messages', {
                icon: <Mail size={20} color={iconColor} />,
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
                description: 'Undo to restore it.',
                action: {
                  label: 'Undo',
                  onPress: () => toast.info('Restored!'),
                },
                cancel: { label: 'Dismiss' },
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
        description="Loading stays visible until completion or dismissal. Promise results update the same toast, rather than adding another."
        bare
      >
        <DemoGroup direction="column">
          <Button
            variant="outline"
            onPress={() => {
              clearTimeout(uploadTimer.current);
              if (uploadTimer.current !== undefined)
                timers.current.delete(uploadTimer.current);
              const id = toast.loading('Uploading…', { id: uploadId.current });
              uploadId.current = id;
              pendingIds.current.add(id);
              setUploading(true);
              uploadTimer.current = schedule(() => {
                toast.dismiss(id);
                pendingIds.current.delete(id);
                uploadId.current = undefined;
                uploadTimer.current = undefined;
                setUploading(false);
              }, 2000);
            }}
          >
            <Loader size={18} color={iconColor} />
            <Text>
              {uploading ? 'Restart loading timer' : 'Loading (dismiss in 2s)'}
            </Text>
          </Button>
          <Button variant="ghost" disabled={!uploading} onPress={cancelUpload}>
            Cancel loading toast
          </Button>
          <Button
            onPress={() => {
              const promise = new Promise<undefined>((resolve) => {
                schedule(() => resolve(undefined), 1500);
              });
              const id = toast.promise(promise, {
                loading: 'Saving changes…',
                success: 'Changes saved!',
                error: 'Save failed',
              });
              pendingIds.current.add(id);
              void promise.then(() => pendingIds.current.delete(id));
            }}
          >
            <CheckCircle2 size={18} color={primaryIconColor} />
            <Text>Promise Toast</Text>
          </Button>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Durations"
        description="Compare short and longer feedback, or dismiss the whole stack while it is moving."
        bare
      >
        <DemoGroup direction="column">
          <DemoGroup direction="row">
            <Button
              className="flex-1"
              variant="outline"
              onPress={() => toast('Quick flash!', { duration: 1000 })}
            >
              Quick (1s)
            </Button>
            <Button
              className="flex-1"
              variant="outline"
              onPress={() => toast('Staying longer', { duration: 5000 })}
            >
              Long (5s)
            </Button>
          </DemoGroup>
          <Button variant="ghost" onPress={() => toast.dismiss()}>
            Dismiss all toasts
          </Button>
        </DemoGroup>
      </DemoSection>
    </DemoPage>
  );
}
