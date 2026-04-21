import React from 'react';
import { View } from 'react-native';
import { Button, Tooltip, Typography } from '@truongdq01/ui';
import { useTheme } from '@truongdq01/headless';
import { Info, HelpCircle, Settings } from 'lucide-react-native';
import { DemoPage, DemoSection, DemoGroup } from './_shared/DemoPage';

export default function TooltipScreen() {
  const { tokens } = useTheme();

  return (
    <DemoPage
      title="Tooltip"
      description="Tooltips provide brief, informative messages when a user interacts with an element. They are ideal for conveying secondary information without cluttering the UI."
    >
      <DemoSection title="Basic Interaction">
        <Typography variant="body2" color="secondary" style={{ marginBottom: 12 }}>
          Tooltips appear on press to provide additional context for icons or ambiguous labels.
        </Typography>
        <DemoGroup gap={20}>
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

      <DemoSection title="Button Tooltips">
        <Typography variant="body2" color="secondary" style={{ marginBottom: 12 }}>
          Perfect for icon-only buttons or actions that require more explanation.
        </Typography>
        <DemoGroup gap={12}>
          <Tooltip title="Save changes to cloud">
            <Button label="Save" size="sm" />
          </Tooltip>
          
          <Tooltip title="Permanently delete this item">
            <Button label="Delete" size="sm" variant="destructive" />
          </Tooltip>
        </DemoGroup>
      </DemoSection>

      <DemoSection title="Complex Anchors">
        <Typography variant="body2" color="secondary" style={{ marginBottom: 12 }}>
          Tooltips can be attached to any component including complex custom views.
        </Typography>
        <Tooltip title="Settings allow you to customize your experience, including theme, notifications, and privacy preferences.">
          <View 
            style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              gap: 12, 
              padding: 16, 
              backgroundColor: tokens.color.bg.default, 
              borderRadius: tokens.radius.lg, 
              borderWidth: 1, 
              borderColor: tokens.color.border.subtle 
            }}
          >
            <Settings size={20} color={tokens.color.text.primary} />
            <Typography variant="body1" fontWeight="500">Account Preferences</Typography>
          </View>
        </Tooltip>
      </DemoSection>
    </DemoPage>
  );
}

