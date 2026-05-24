import { View } from 'react-native';
import { Link, Typography, Stack } from '@truongdq01/ui';
import { useTheme, useToast } from '@truongdq01/headless';
import { DemoPage, DemoSection } from '@/demo/DemoPage';
import { ExternalLink } from 'lucide-react-native';

export default function LinkScreen() {
  const { tokens } = useTheme();
  const toast = useToast();

  return (
    <DemoPage
      title="Link"
      description="Interactive text for navigation or triggering actions."
    >
      <DemoSection title="Basic" description="Inline or standalone navigation links.">
        <Stack spacing="md" alignItems="flex-start">
          <Link onPress={() => toast.info('Navigating to profile…')}>
            My Profile
          </Link>
          <Link
            color={tokens.color.text.secondary}
            onPress={() => toast.info('Opening settings…')}
          >
            Account Settings
          </Link>
        </Stack>
      </DemoSection>

      <DemoSection title="External" description="Often paired with an external-link icon.">
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing[1] }}>
          <Link onPress={() => toast.info('Opening browser…')}>
            Visit GitHub Repository
          </Link>
          <ExternalLink size={14} color={tokens.color.brand.default} />
        </View>
      </DemoSection>

      <DemoSection title="Typography Variants" description="Wrap in Typography for different sizes.">
        <Stack spacing="md" alignItems="flex-start">
          <Typography variant="h4">
            <Link onPress={() => {}}>Header Link</Link>
          </Typography>
          <Typography variant="body2">
            <Link onPress={() => {}}>Small Body Link</Link>
          </Typography>
          <Typography variant="caption">
            <Link onPress={() => {}}>Caption Link Style</Link>
          </Typography>
        </Stack>
      </DemoSection>

      <DemoSection title="Inline Usage">
        <Typography variant="body1">
          Read our <Link onPress={() => {}}>Privacy Policy</Link> and{' '}
          <Link onPress={() => {}}>Terms of Service</Link> to learn how we
          protect your data.
        </Typography>
      </DemoSection>
    </DemoPage>
  );
}
