import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Snackbar, SnackbarAction } from '@/components/ui/snackbar';
import { DemoPage, DemoGroup, DemoSection } from '@/demo/DemoPage';

type Anchor = {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
};

const anchorClasses: Record<Anchor['vertical'], string> = {
  top: 'top-6 bottom-auto',
  bottom: 'bottom-6',
};

const alignClasses: Record<Anchor['horizontal'], string> = {
  left: 'left-4 right-auto w-64',
  center: 'left-4 right-4',
  right: 'left-auto right-4 w-64',
};

export default function SnackbarScreen() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [actionOpen, setActionOpen] = useState(false);
  const [position, setPosition] = useState<Anchor | null>(null);

  return (
    <DemoPage
      title="Snackbar"
      description="Brief bottom-of-screen messages that inform without interrupting."
      floatingContent={
        <>
          <Snackbar open={basicOpen} onDismiss={() => setBasicOpen(false)}>
            Message archived
          </Snackbar>

          <Snackbar
            open={actionOpen}
            onDismiss={() => setActionOpen(false)}
            action={
              <SnackbarAction
                label="Undo"
                onPress={() => setActionOpen(false)}
              />
            }
          >
            1 item deleted from your list
          </Snackbar>

          {position ? (
            <Snackbar
              open
              duration={2000}
              onDismiss={() => setPosition(null)}
              className={`${anchorClasses[position.vertical]} ${alignClasses[position.horizontal]}`}
            >
              {`Position: ${position.vertical} ${position.horizontal}`}
            </Snackbar>
          ) : null}
        </>
      }
    >
      <DemoSection
        title="Core Behavior"
        description="Auto-dismiss after 4s or close manually."
      >
        <Button onPress={() => setBasicOpen(true)}>Show Simple Snackbar</Button>
      </DemoSection>

      <DemoSection
        title="With Actions"
        description="Inline buttons for immediate follow-up."
      >
        <Button variant="outline" onPress={() => setActionOpen(true)}>
          Show with Undo
        </Button>
      </DemoSection>

      <DemoSection
        title="Positioning"
        description="Anchor to top, bottom, or horizontal alignment."
      >
        <DemoGroup direction="row">
          <Button
            size="sm"
            variant="ghost"
            onPress={() =>
              setPosition({ vertical: 'top', horizontal: 'center' })
            }
          >
            Top Center
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onPress={() =>
              setPosition({ vertical: 'bottom', horizontal: 'right' })
            }
          >
            Bottom Right
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onPress={() =>
              setPosition({ vertical: 'bottom', horizontal: 'left' })
            }
          >
            Bottom Left
          </Button>
        </DemoGroup>
      </DemoSection>
    </DemoPage>
  );
}
