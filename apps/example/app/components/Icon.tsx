import React from 'react';
import { View } from 'react-native';
import { Typography, Stack } from '@truongdq01/ui';
import { useTheme } from '@truongdq01/headless';
import { DemoPage, DemoSection } from './_shared/DemoPage';
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
  Info
} from 'lucide-react-native';

export default function IconScreen() {
  const { tokens } = useTheme();

  const IconGroup = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <View style={{ marginBottom: tokens.spacing[6] }}>
        <Typography variant="overline" color="tertiary" style={{ marginBottom: tokens.spacing[3] }}>{title}</Typography>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing[4] }}>
            {children}
        </View>
    </View>
  );

  return (
    <DemoPage 
      title="Icons" 
      description="Visual symbols used to represent concepts, actions, or status information."
    >
      <DemoSection title="Navigation Icons">
        <IconGroup title="Primary Action">
            <Home size={24} color={tokens.color.text.emphasis} />
            <Search size={24} color={tokens.color.text.emphasis} />
            <Bell size={24} color={tokens.color.text.emphasis} />
            <User size={24} color={tokens.color.text.emphasis} />
            <Settings size={24} color={tokens.color.text.emphasis} />
        </IconGroup>
      </DemoSection>

      <DemoSection title="States & Feedback">
         <View style={{ gap: tokens.spacing[4] }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <CheckCircle2 size={20} color={tokens.color.status.success} />
                <Typography variant="body2">Success State</Typography>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <AlertCircle size={20} color={tokens.color.status.error} />
                <Typography variant="body2">Error State</Typography>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <Info size={20} color={tokens.color.status.info} />
                <Typography variant="body2">Information</Typography>
            </View>
         </View>
      </DemoSection>

      <DemoSection title="Sizing & Colors">
        <Stack spacing="lg">
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing[4] }}>
                <Heart size={16} color={tokens.color.brand.default} />
                <Heart size={24} color={tokens.color.brand.default} />
                <Heart size={32} color={tokens.color.brand.default} />
                <Heart size={48} color={tokens.color.brand.default} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing[4] }}>
                <Share2 size={24} color={tokens.color.border.emphasis} />
                <Trash2 size={24} color={tokens.color.status.error} />
                <Edit3 size={24} color={tokens.color.status.warning} />
            </View>
        </Stack>
      </DemoSection>
    </DemoPage>
  );
}

