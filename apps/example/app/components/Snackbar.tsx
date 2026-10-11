import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/button';
import { Snackbar, SnackbarAction } from '@/components/ui/snackbar';
import { Text } from '@/components/ui/text';
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
  left: 'left-4 right-auto w-72 max-w-full',
  center: 'left-4 right-4',
  right: 'left-auto right-4 w-72 max-w-full',
};

export default function SnackbarScreen() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('Message archived');
  const [undo, setUndo] = useState(false);
  const [restored, setRestored] = useState(false);
  const [anchor, setAnchor] = useState<Anchor>({
    vertical: 'bottom',
    horizontal: 'center',
  });
  const [duration, setDuration] = useState(4000);

  const show = (
    text: string,
    position: Anchor,
    withUndo = false,
    delay = 4000
  ) => {
    setMessage(text);
    setAnchor(position);
    setUndo(withUndo);
    setDuration(delay);
    setOpen(true);
  };

  return (
    <DemoPage
      title="Snackbar"
      description="Brief bottom-of-screen messages that inform without interrupting."
      floatingContent={
        <SafeAreaProvider
          style={StyleSheet.absoluteFill}
          pointerEvents="box-none"
        >
          <SafeAreaView
            style={StyleSheet.absoluteFill}
            mode="margin"
            pointerEvents="box-none"
          >
            <Snackbar
              open={open}
              duration={duration}
              onDismiss={() => setOpen(false)}
              className={`${anchorClasses[anchor.vertical]} ${alignClasses[anchor.horizontal]}`}
              action={
                <SnackbarAction
                  label={undo ? 'Undo' : 'Dismiss'}
                  onPress={() => {
                    if (undo) setRestored(true);
                    setOpen(false);
                  }}
                />
              }
            >
              {message}
            </Snackbar>
          </SafeAreaView>
        </SafeAreaProvider>
      }
    >
      <DemoSection
        title="Core Behavior"
        description="Appears, stays for four seconds, then exits. You can dismiss it at any time."
        bare
      >
        <DemoGroup direction="column">
          <Button
            onPress={() =>
              show('Message archived', {
                vertical: 'bottom',
                horizontal: 'center',
              })
            }
          >
            Show Simple Snackbar
          </Button>
          <Button
            variant="ghost"
            disabled={!open}
            onPress={() => setOpen(false)}
          >
            Dismiss current message
          </Button>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="With Actions"
        description="Undo closes the notification and restores the item in this demo."
        bare
      >
        <DemoGroup direction="column">
          <Button
            variant="outline"
            onPress={() => {
              setRestored(false);
              show(
                '1 item deleted from your list',
                { vertical: 'bottom', horizontal: 'center' },
                true
              );
            }}
          >
            Show with Undo
          </Button>
          <Text variant="muted" accessibilityLiveRegion="polite">
            {restored
              ? 'Item restored to your list.'
              : 'The action stays readable and easy to reach.'}
          </Text>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Positioning"
        description="One message at a time. Choosing a new position updates the active notification."
        bare
      >
        <DemoGroup direction="column">
          <Button
            variant="outline"
            onPress={() =>
              show(
                'Position: top center',
                { vertical: 'top', horizontal: 'center' },
                false,
                2000
              )
            }
          >
            Top Center
          </Button>
          <DemoGroup direction="row">
            <Button
              className="flex-1"
              variant="outline"
              onPress={() =>
                show(
                  'Position: bottom right',
                  { vertical: 'bottom', horizontal: 'right' },
                  false,
                  2000
                )
              }
            >
              Bottom Right
            </Button>
            <Button
              className="flex-1"
              variant="outline"
              onPress={() =>
                show(
                  'Position: bottom left',
                  { vertical: 'bottom', horizontal: 'left' },
                  false,
                  2000
                )
              }
            >
              Bottom Left
            </Button>
          </DemoGroup>
        </DemoGroup>
      </DemoSection>
    </DemoPage>
  );
}
