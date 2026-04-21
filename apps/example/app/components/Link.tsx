import React from 'react';
import { View } from 'react-native';
import { Link, Typography, Stack } from '@truongdq01/ui';
import { useTheme, useToast } from '@truongdq01/headless';
import { DemoPage, DemoSection } from './_shared/DemoPage';
import { ExternalLink } from 'lucide-react-native';

export default function LinkScreen() {
  const { tokens } = useTheme();
  const toast = useToast();

  return (
    <DemoPage 
      title="Link" 
      description="Interactive text elements used for navigation or triggering actions."
    >
      <DemoSection title="Basic Links">
        <Typography variant="body2" gutterBottom>
            Standard links for inline or standalone navigation.
        </Typography>
        <Stack spacing="md" alignItems="flex-start">
            <Link onPress={() => toast.info('Navigating to profile...')}>
                My Profile
            </Link>
            <Link color="secondary" onPress={() => toast.info('Opening settings...')}>
                Account Settings
            </Link>
        </Stack>
      </DemoSection>

      <DemoSection title="External Links">
        <Typography variant="body2" gutterBottom>
            Links that lead to external resources often include an icon.
        </Typography>
        <Link 
            onPress={() => toast.info('Opening browser...')}
            trailingIcon={<ExternalLink size={14} color={tokens.color.brand.default} />}
        >
            Visit GitHub Repository
        </Link>
      </DemoSection>

      <DemoSection title="Typography Variants">
        <Typography variant="body2" gutterBottom>
            Links can inherit or specify typography styles.
        </Typography>
        <Stack spacing="md" alignItems="flex-start">
             <Link variant="h4">Header Link</Link>
             <Link variant="body2">Small Body Link</Link>
             <Link variant="caption">Caption Link Style</Link>
        </Stack>
      </DemoSection>

      <DemoSection title="Inline Usage">
          <Typography variant="body1">
              Read our <Link onPress={() => {}}>Privacy Policy</Link> and <Link onPress={() => {}}>Terms of Service</Link> to learn how we protect your data.
          </Typography>
      </DemoSection>
    </DemoPage>
  );
}

