import { View } from 'react-native';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { DemoPage, DemoPreview, DemoSection } from '@/demo/DemoPage';

export default function SeparatorScreen() {
  return (
    <DemoPage
      title="Separator"
      description="Visual separators to group content or define boundaries."
    >
      <DemoSection
        title="Horizontal"
        description="Spacing between stacked sections."
      >
        <DemoPreview>
          <Text variant="muted">Section A</Text>
          <Separator />
          <Text variant="muted">Section B</Text>
          <Separator />
          <Text variant="muted">Section C</Text>
        </DemoPreview>
      </DemoSection>

      <DemoSection
        title="With Labels"
        description="Centered text between content blocks."
      >
        <Text variant="muted" className="text-center">
          Content above
        </Text>
        <View className="my-6 flex-row items-center gap-3">
          <Separator className="flex-1" />
          <Text variant="small" className="text-muted-foreground">
            OR
          </Text>
          <Separator className="flex-1" />
        </View>
        <Text variant="muted" className="text-center">
          Content below
        </Text>
        <View className="mt-4 flex-row items-center gap-3">
          <Separator className="flex-1" />
          <Text variant="small" className="text-muted-foreground">
            CONTINUE WITH
          </Text>
          <Separator className="flex-1" />
        </View>
      </DemoSection>

      <DemoSection
        title="Vertical"
        description="Inline separators in row layouts."
      >
        <DemoPreview>
          <View className="h-12 flex-row items-center gap-3">
            <Text variant="p">Left</Text>
            <Separator orientation="vertical" />
            <Text variant="p">Middle</Text>
            <Separator
              orientation="vertical"
              className="w-0.5 bg-muted-foreground"
            />
            <Text variant="p">Right (Emphasized)</Text>
          </View>
        </DemoPreview>
      </DemoSection>

      <DemoSection
        title="Emphasis"
        description="Standard vs stronger border weight."
      >
        <Text variant="small" className="text-muted-foreground">
          Standard
        </Text>
        <Separator className="my-2" />
        <View className="h-4" />
        <Text variant="small" className="text-muted-foreground">
          Emphasized
        </Text>
        <Separator className="my-2 h-0.5 bg-muted-foreground" />
      </DemoSection>
    </DemoPage>
  );
}
