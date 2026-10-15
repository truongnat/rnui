import { useState } from 'react';
import { Bookmark, Star } from 'lucide-react-native';
import { Toggle } from '@/components/ui/toggle';
import { DemoGroup, DemoPage, DemoSection } from '@/demo/DemoPage';
import { useIconColor } from '@/lib/utils';

export default function ToggleScreen() {
  const [saved, setSaved] = useState(false);
  const [starred, setStarred] = useState(true);
  const iconColor = useIconColor();

  return (
    <DemoPage
      title="Toggle"
      description="A two-state pressable for persistent on/off choices."
    >
      <DemoSection
        title="Variants"
        description="Use the outline variant when the control needs a clearer boundary."
      >
        <DemoGroup>
          <Toggle pressed={saved} onPressedChange={setSaved}>
            Save
          </Toggle>
          <Toggle
            variant="outline"
            pressed={starred}
            onPressedChange={setStarred}
          >
            Starred
          </Toggle>
        </DemoGroup>
        <DemoGroup>
          <Toggle size="sm" pressed={saved} onPressedChange={setSaved}>
            Compact
          </Toggle>
          <Toggle
            size="lg"
            variant="outline"
            pressed={starred}
            onPressedChange={setStarred}
          >
            Large
          </Toggle>
        </DemoGroup>
      </DemoSection>
      <DemoSection
        title="Icon toggle"
        description="Icon controls preserve an accessible text label."
      >
        <DemoGroup>
          <Toggle
            accessibilityLabel={saved ? 'Remove bookmark' : 'Add bookmark'}
            pressed={saved}
            onPressedChange={setSaved}
          >
            <Bookmark size={18} color={iconColor} />
          </Toggle>
          <Toggle
            accessibilityLabel={starred ? 'Unstar item' : 'Star item'}
            variant="outline"
            pressed={starred}
            onPressedChange={setStarred}
          >
            <Star size={18} color={iconColor} />
          </Toggle>
        </DemoGroup>
      </DemoSection>
    </DemoPage>
  );
}
