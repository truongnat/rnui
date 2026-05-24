import type { ReactNode } from 'react';
import { View } from 'react-native';
import { Typography, Stack } from '@truongdq01/ui';
import { useTheme } from '@truongdq01/headless';
import { DemoPage, DemoPreview, DemoSection } from '@/demo/DemoPage';
import {
  Home,
  Settings,
  User,
  Bell,
  Search,
  Heart,
  Share2,
  Trash2,
  Edit3,
  CheckCircle2,
  AlertCircle,
  Info,
} from 'lucide-react-native';

function IconRow({ children }: { children: ReactNode }) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>{children}</View>
  );
}

export default function IconScreen() {
  const { tokens } = useTheme();

  return (
    <DemoPage
      title="Icons"
      description="Lucide icons for navigation, actions, and status feedback."
    >
      <DemoSection title="Navigation" description="Common tab and header icons.">
        <DemoPreview>
          <IconRow>
            <Home size={24} color={tokens.color.text.primary} />
            <Search size={24} color={tokens.color.text.primary} />
            <Bell size={24} color={tokens.color.text.primary} />
            <User size={24} color={tokens.color.text.primary} />
            <Settings size={24} color={tokens.color.text.primary} />
          </IconRow>
        </DemoPreview>
      </DemoSection>

      <DemoSection title="Status" description="Semantic colors for feedback.">
        <Stack spacing="md">
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing[3] }}>
            <CheckCircle2 size={20} color={tokens.color.status.success} />
            <Typography variant="body2">Success</Typography>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing[3] }}>
            <AlertCircle size={20} color={tokens.color.status.error} />
            <Typography variant="body2">Error</Typography>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing[3] }}>
            <Info size={20} color={tokens.color.status.info} />
            <Typography variant="body2">Information</Typography>
          </View>
        </Stack>
      </DemoSection>

      <DemoSection title="Sizing & Colors" description="16px to 48px; brand and semantic tints.">
        <Stack spacing="lg">
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing[4] }}>
            <Heart size={16} color={tokens.color.brand.default} />
            <Heart size={24} color={tokens.color.brand.default} />
            <Heart size={32} color={tokens.color.brand.default} />
            <Heart size={48} color={tokens.color.brand.default} />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing[4] }}>
            <Share2 size={24} color={tokens.color.border.strong} />
            <Trash2 size={24} color={tokens.color.status.error} />
            <Edit3 size={24} color={tokens.color.status.warning} />
          </View>
        </Stack>
      </DemoSection>
    </DemoPage>
  );
}
