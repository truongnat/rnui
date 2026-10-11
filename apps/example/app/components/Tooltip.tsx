import { View } from 'react-native';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { HelpCircle, Info, Settings } from 'lucide-react-native';
import { DemoGroup, DemoPage, DemoSection } from '@/demo/DemoPage';
import { useThemeColor } from '@/lib/utils';

export default function TooltipScreen() {
  const colors = useThemeColor();

  return (
    <DemoPage
      title="Tooltip"
      description="Brief messages on press for icons or ambiguous labels."
    >
      <DemoSection
        title="Basic"
        description="Tap to reveal contextual information."
      >
        <DemoGroup gap={20}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Tap for info</Button>
            </TooltipTrigger>
            <TooltipContent>This is a simple tooltip message</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              accessibilityLabel="Feature help"
              className="h-11 w-11 items-center justify-center"
            >
              <HelpCircle size={22} color={colors.mutedForeground} />
            </TooltipTrigger>
            <TooltipContent>
              Helpful information about this feature
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              accessibilityLabel="System information"
              className="h-11 w-11 items-center justify-center"
            >
              <Info size={22} color={colors.mutedForeground} />
            </TooltipTrigger>
            <TooltipContent>System Information</TooltipContent>
          </Tooltip>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Buttons"
        description="Explain icon-only or destructive actions."
      >
        <DemoGroup gap={12}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="sm">Save</Button>
            </TooltipTrigger>
            <TooltipContent>Save changes to cloud</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="sm" variant="destructive">
                Delete
              </Button>
            </TooltipTrigger>
            <TooltipContent>Permanently delete this item</TooltipContent>
          </Tooltip>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Complex Anchors"
        description="Attach to any custom view."
      >
        <Tooltip>
          <TooltipTrigger>
            <View className="flex-row items-center gap-3 py-4">
              <Settings size={20} color={colors.foreground} />
              <Text className="font-medium">Account Preferences</Text>
            </View>
          </TooltipTrigger>
          <TooltipContent>
            Customize theme, notifications, and privacy preferences.
          </TooltipContent>
        </Tooltip>
      </DemoSection>
    </DemoPage>
  );
}
