import { View } from 'react-native';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Text } from '@/components/ui/text';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function PopoverScreen() {
  return (
    <DemoPage
      title="Popover"
      description="Content overlay anchored to a trigger element."
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
        title="Rich Content"
        description="Compose any views inside PopoverContent."
      >
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary">Account</Button>
          </PopoverTrigger>
          <PopoverContent>
            <Text variant="small">Alex Nguyen</Text>
            <Text variant="muted" className="mt-1">
              alex@example.com
            </Text>
            <View className="my-3 h-px bg-border" />
            <Button size="sm" variant="outline">
              View Profile
            </Button>
          </PopoverContent>
        </Popover>
      </DemoSection>
    </DemoPage>
  );
}
