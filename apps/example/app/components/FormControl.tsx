import React, { useState } from 'react';
import { 
  FormControl, 
  FormLabel, 
  FormHelperText, 
  FormControlLabel,
  Input,
  Checkbox,
  Radio,
  RadioGroup,
  Switch,
  Typography, 
  Divider,
  Stack
} from '@truongdq01/ui';
import { View, StyleSheet, ScrollView } from 'react-native';
import { DemoPage, DemoSection } from './_shared/DemoPage';
import { useTokens } from '@truongdq01/headless';

export default function FormControlScreen() {
  const t = useTokens();
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('one');
  const [switchValue, setSwitchValue] = useState(false);

  return (
    <DemoPage
      title="FormControl"
      description="Components for organizing and labeling form inputs including labels, helper text, and state management."
    >
      <DemoSection title="Basic Input Layout">
        <FormControl fullWidth margin="normal">
          <FormLabel>Email Address</FormLabel>
          <Input placeholder="name@example.com" />
          <FormHelperText>We will never share your email.</FormHelperText>
        </FormControl>
      </DemoSection>

      <DemoSection title="States">
        <FormControl error fullWidth margin="normal">
          <FormLabel>Password</FormLabel>
          <Input placeholder="Enter password" secureTextEntry />
          <FormHelperText>Incorrect password. Please try again.</FormHelperText>
        </FormControl>

        <Divider spacing="md" />

        <FormControl disabled fullWidth margin="normal">
          <FormLabel>Username</FormLabel>
          <Input value="truongdang" disabled />
          <FormHelperText>This field cannot be changed.</FormHelperText>
        </FormControl>
      </DemoSection>

      <DemoSection title="Control Labels">
        <Stack gap={12}>
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={setChecked} />}
            label="I agree to the terms and conditions"
          />

          <FormControlLabel
            control={<Switch value={switchValue} onValueChange={setSwitchValue} />}
            label="Enable Push Notifications"
          />

          <Divider />

          <Typography variant="subtitle2" style={{ marginBottom: 4 }}>Label Placements</Typography>
          <FormControlLabel
            control={<Checkbox checked={true} onChange={() => {}} />}
            label="End (Default)"
            labelPlacement="end"
          />
          <FormControlLabel
            control={<Checkbox checked={true} onChange={() => {}} />}
            label="Start"
            labelPlacement="start"
          />
          <FormControlLabel
            control={<Checkbox checked={true} onChange={() => {}} />}
            label="Top"
            labelPlacement="top"
          />
        </Stack>
      </DemoSection>

      <DemoSection title="Radio Group Integration">
        <FormControl>
          <FormLabel>Subscription Plan</FormLabel>
          <RadioGroup value={radioValue} onValueChange={setRadioValue}>
            <Stack gap={8}>
              <FormControlLabel value="one" control={<Radio />} label="Free Tier" />
              <FormControlLabel value="two" control={<Radio />} label="Pro ($10/mo)" />
              <FormControlLabel value="three" control={<Radio />} label="Enterprise" />
            </Stack>
          </RadioGroup>
        </FormControl>
      </DemoSection>
    </DemoPage>
  );
}

const styles = StyleSheet.create({});
