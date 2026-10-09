import { View } from 'react-native';
import { ExternalLink } from 'lucide-react-native';
import { Link } from '@/components/ui/link';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';
import { useToast } from '@/components/ui/toast';
import { useThemeColor } from '@/lib/utils';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function LinkScreen() {
  const colors = useThemeColor();
  const { toast } = useToast();

  return (
    <DemoPage
      title="Link"
      description="Interactive text for navigation or triggering actions."
    >
      <DemoSection
        title="Basic"
        description="Inline or standalone navigation links."
      >
        <Stack spacing="md" alignItems="flex-start">
          <Link onPress={() => toast.info('Navigating to profile…')}>
            My Profile
          </Link>
          <Link variant="muted" onPress={() => toast.info('Opening settings…')}>
            Account Settings
          </Link>
        </Stack>
      </DemoSection>

      <DemoSection
        title="External"
        description="Often paired with an external-link icon."
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Link href="https://github.com">Visit GitHub Repository</Link>
          <ExternalLink size={14} color={colors.primary} />
        </View>
      </DemoSection>

      <DemoSection
        title="Typography Variants"
        description="Wrap in Text for different sizes."
      >
        <Stack spacing="md" alignItems="flex-start">
          <Text variant="h4">
            <Link onPress={() => {}}>Header Link</Link>
          </Text>
          <Text variant="p">
            <Link onPress={() => {}}>Small Body Link</Link>
          </Text>
          <Text variant="small">
            <Link onPress={() => {}}>Caption Link Style</Link>
          </Text>
        </Stack>
      </DemoSection>

      <DemoSection title="Inline Usage">
        <Text variant="p">
          Read our <Link onPress={() => {}}>Privacy Policy</Link> and{' '}
          <Link onPress={() => {}}>Terms of Service</Link> to learn how we
          protect your data.
        </Text>
      </DemoSection>
    </DemoPage>
  );
}
