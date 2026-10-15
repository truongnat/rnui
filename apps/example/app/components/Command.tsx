import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Command, type CommandItemData } from '@/components/ui/command';
import { Text } from '@/components/ui/text';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

const commandItems: CommandItemData[] = [
  { label: 'Open dashboard', value: 'dashboard', group: 'Navigation' },
  { label: 'View components', value: 'components', group: 'Navigation' },
  { label: 'Change theme', value: 'theme', group: 'Preferences' },
  { label: 'Keyboard shortcuts', value: 'shortcuts', group: 'Help' },
];

export default function CommandScreen() {
  const [open, setOpen] = useState(false);
  const [selectedCommand, setSelectedCommand] = useState('');

  return (
    <DemoPage
      title="Command"
      description="Search and run an action from a focused command palette."
    >
      <DemoSection
        title="Command palette"
        description="Search the list, then select an action to close the palette."
      >
        <Button variant="outline" onPress={() => setOpen(true)}>
          Open command palette
        </Button>
        <Text variant="muted" accessibilityLiveRegion="polite">
          {selectedCommand
            ? `Last action: ${selectedCommand}`
            : 'No action selected yet.'}
        </Text>
      </DemoSection>
      <Command
        open={open}
        onOpenChange={setOpen}
        items={commandItems}
        placeholder="Search commands…"
        onSelect={(item) => setSelectedCommand(item.label)}
      />
    </DemoPage>
  );
}
