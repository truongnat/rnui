import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function DropdownMenuScreen() {
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showActivityBar, setShowActivityBar] = useState(false);

  return (
    <DemoPage
      title="Dropdown Menu"
      description="Temporary surfaces with a list of choices."
    >
      <DemoSection
        title="Basic Dropdown"
        description="Select an action from a list."
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="self-start">
              Account Options
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem>View Profile</DropdownMenuItem>
            <DropdownMenuItem>Account Settings</DropdownMenuItem>
            <DropdownMenuItem>Privacy Policy</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </DemoSection>

      <DemoSection
        title="With Icons"
        description="Icons help users scan actions faster; shortcuts sit at the row end."
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Icon name="moreVertical" size={20} tone="foreground" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuLabel>Object Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Icon name="edit" size={16} tone="muted" />
              <Text className="text-sm text-foreground">Edit Object</Text>
              <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icon name="copy" size={16} tone="muted" />
              <Text className="text-sm text-foreground">Duplicate</Text>
              <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icon name="share" size={16} tone="muted" />
              <Text className="text-sm text-foreground">Share Link</Text>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem destructive>
              <Icon name="trash" size={16} tone="destructive" />
              <Text className="text-sm text-destructive">Move to Trash</Text>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </DemoSection>

      <DemoSection
        title="Checkbox Items"
        description="Toggle settings inline; keep the menu open with closeOnPress={false}."
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="self-start">
              Panel Preferences
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={showStatusBar}
              onCheckedChange={setShowStatusBar}
              closeOnPress={false}
            >
              Status Bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showActivityBar}
              onCheckedChange={setShowActivityBar}
              closeOnPress={false}
            >
              Activity Bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>Panel (locked)</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </DemoSection>

      <DemoSection
        title="Guidelines"
        description="Group logically; place destructive actions last. Portal and safe areas handled automatically."
      />
    </DemoPage>
  );
}
