import { useState } from 'react';
import { View } from 'react-native';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { Text } from '@/components/ui/text';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function PopoverScreen() {
  const [emailUpdates, setEmailUpdates] = useState(true);
  return (
    <DemoPage
      title="Popover"
      description="Tap a trigger to open its panel. Tap outside to close."
    >
      <DemoSection
        title="Anchor to Element"
        description="The trigger measures itself and positions the content below."
      >
        <View className="items-start">
          <Popover>
            <PopoverTrigger asChild>
              <Button>Open Popover</Button>
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <Text variant="small">Popover Content</Text>
              <Text variant="muted" className="mt-1">
                Anchored to the button above.
              </Text>
            </PopoverContent>
          </Popover>
        </View>
      </DemoSection>

      <DemoSection
        title="Side Offset"
        description="Increase the gap between trigger and content."
      >
        <View className="flex-row gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Default</Button>
            </PopoverTrigger>
            <PopoverContent className="w-48">
              <Text variant="muted">sideOffset = 8 (default)</Text>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Offset 24</Button>
            </PopoverTrigger>
            <PopoverContent sideOffset={24} className="w-48">
              <Text variant="muted">sideOffset = 24</Text>
            </PopoverContent>
          </Popover>
        </View>
      </DemoSection>

      <DemoSection
        title="Account Preferences"
        description="Changes apply immediately and remain after closing the panel."
      >
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary" className="self-start min-h-14">
              Account
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Text variant="small">Alex Nguyen</Text>
            <Text variant="muted" className="mt-1">
              alex@example.com
            </Text>
            <View className="my-3 h-px bg-border" />
            <View className="min-h-14 flex-row items-center justify-between gap-4">
              <Text variant="small" className="flex-1">
                Email updates
              </Text>
              <Switch
                accessibilityLabel="Email updates"
                checked={emailUpdates}
                onCheckedChange={setEmailUpdates}
              />
            </View>
            <Button
              variant="outline"
              className="mt-3 min-h-14"
              onPress={() => setEmailUpdates(true)}
            >
              Reset preferences
            </Button>
          </PopoverContent>
        </Popover>
        <Text variant="muted" className="mt-3" accessibilityLiveRegion="polite">
          Email updates: {emailUpdates ? 'On' : 'Off'}
        </Text>
      </DemoSection>

      <DemoSection
        title="Disabled Trigger"
        description="asChild preserves the child button's disabled state; activation does not open the popover."
      >
        <Popover>
          <PopoverTrigger asChild>
            <Button disabled variant="outline" className="self-start">
              Unavailable action
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Text variant="muted">This disabled trigger must stay closed.</Text>
          </PopoverContent>
        </Popover>
      </DemoSection>
    </DemoPage>
  );
}
