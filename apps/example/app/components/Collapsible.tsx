import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react-native';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Text } from '@/components/ui/text';
import { DemoPage, DemoSection } from '@/demo/DemoPage';
import { useIconColor } from '@/lib/utils';

export default function CollapsibleScreen() {
  const [open, setOpen] = useState(false);
  const iconColor = useIconColor();

  return (
    <DemoPage
      title="Collapsible"
      description="Reveal supporting content in place without navigating away."
    >
      <DemoSection
        title="Project details"
        description="The trigger exposes its expanded state to assistive technology."
      >
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger className="min-h-12 flex-row items-center justify-between rounded-lg border border-border px-4">
            <Text className="font-medium text-foreground">
              RNUI component registry
            </Text>
            {open ? (
              <ChevronDown size={18} color={iconColor} />
            ) : (
              <ChevronRight size={18} color={iconColor} />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="gap-2 px-4 pb-3 pt-3">
            <Text className="text-sm leading-5 text-muted-foreground">
              Copy the source for the component you need, then customize it
              directly in your app.
            </Text>
            <Text className="text-sm font-medium text-foreground">
              Package: @truongdq01/ui
            </Text>
          </CollapsibleContent>
        </Collapsible>
      </DemoSection>
    </DemoPage>
  );
}
