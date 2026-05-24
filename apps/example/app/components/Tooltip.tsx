import { View } from 'react-native';
import { Button, Tooltip, Typography } from '@truongdq01/ui';
import { useTheme } from '@truongdq01/headless';
import { Info, HelpCircle, Settings } from 'lucide-react-native';
import { DemoPage, DemoSection, DemoGroup } from '@/demo/DemoPage';

export default function TooltipScreen() {
  const { tokens } = useTheme();

  return (
    <DemoPage
      title="Tooltip"
      description="Brief messages on press for icons or ambiguous labels."
    >
      <DemoSection title="Basic" description="Tap to reveal contextual information.">
        <DemoGroup gap={tokens.spacing[5]}>
          <Tooltip title="This is a simple tooltip message">
            <Typography variant="body1" color="brand" fontWeight="600">
              Tap for info
            </Typography>
          </Tooltip>

          <Tooltip title="Helpful information about this feature">
            <HelpCircle size={22} color={tokens.color.text.secondary} />
          </Tooltip>

          <Tooltip title="System Information">
            <Info size={22} color={tokens.color.text.secondary} />
          </Tooltip>
        </DemoGroup>
      </DemoSection>

      <DemoSection title="Buttons" description="Explain icon-only or destructive actions.">
        <DemoGroup gap={tokens.spacing[3]}>
          <Tooltip title="Save changes to cloud">
            <Button label="Save" size="sm" />
          </Tooltip>

          <Tooltip title="Permanently delete this item">
            <Button label="Delete" size="sm" variant="destructive" />
          </Tooltip>
        </DemoGroup>
      </DemoSection>

      <DemoSection title="Complex Anchors" description="Attach to any custom view.">
        <Tooltip title="Customize theme, notifications, and privacy preferences.">
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: tokens.spacing[3],
              padding: tokens.spacing[4],
              backgroundColor: tokens.color.bg.default,
              borderRadius: tokens.radius.lg,
              borderWidth: 1,
              borderColor: tokens.color.border.subtle,
            }}
          >
            <Settings size={20} color={tokens.color.text.primary} />
            <Typography variant="body1" fontWeight="500">
              Account Preferences
            </Typography>
          </View>
        </Tooltip>
      </DemoSection>
    </DemoPage>
  );
}
