import { useTokens } from '@truongdq01/headless';
import { Button, Popover, Typography, Paper, Box } from '@truongdq01/ui';
import React, { useState, useRef } from 'react';
import { View } from 'react-native';
import { DemoPage, DemoSection } from './_shared/DemoPage';

export default function PopoverScreen() {
  const t = useTokens();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const buttonRef = useRef<View>(null);

  const handleOpen = () => {
    buttonRef.current?.measure((x, y, width, height, pageX, pageY) => {
        setAnchorEl({ x: pageX, y: pageY, width, height });
        setOpen(true);
    });
  };

  const [posOpen, setPosOpen] = useState(false);
  const [posAnchor, setPosAnchor] = useState({ top: 300, left: 200 });

  return (
    <DemoPage
      title="Popover"
      description="A Popover can be used to display some content on top of another."
    >
      <DemoSection title="Anchor to Element">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Popovers can be anchored to a specific UI element using its coordinates.
        </Typography>
        <View style={{ alignItems: 'flex-start' }}>
            <View ref={buttonRef} collapsable={false}>
                <Button 
                    label="Open Popover" 
                    onPress={handleOpen} 
                />
            </View>
        </View>

        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={() => setOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          <Paper style={{ padding: t.spacing[4], minWidth: 200 }}>
            <Typography variant="h6" gutterBottom>Popover Content</Typography>
            <Typography variant="body2" color="secondary">
                This content is anchored to the button above.
            </Typography>
            <Button 
                label="Close" 
                variant="ghost" 
                size="sm" 
                style={{ marginTop: t.spacing[3] }} 
                onPress={() => setOpen(false)} 
            />
          </Paper>
        </Popover>
      </DemoSection>

      <DemoSection title="Anchor to Position">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Alternatively, you can provide fixed coordinates for the anchor.
        </Typography>
        <Button 
            label="Open at (300, 200)" 
            onPress={() => setPosOpen(true)} 
        />
        <Popover
          open={posOpen}
          anchorPosition={{ top: 300, left: 100 }}
          onClose={() => setPosOpen(false)}
        >
          <Paper style={{ padding: t.spacing[3] }}>
            <Typography variant="body2">Fixed Position Popover</Typography>
          </Paper>
        </Popover>
      </DemoSection>

      <DemoSection title="Origin Options">
        <Typography variant="body2" color="secondary">
            You can customize both `anchorOrigin` and `transformOrigin` to control exact positioning behavior relative to the anchor.
        </Typography>
      </DemoSection>
    </DemoPage>
  );
}
