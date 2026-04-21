import { useToast, useTokens } from '@truongdq01/headless';
import { OTPInput, Typography, Stack } from '@truongdq01/ui';
import React, { useState } from 'react';
import { View } from 'react-native';
import { DemoPage, DemoSection } from './_shared/DemoPage';

export default function OTPInputScreen() {
  const t = useTokens();
  const toast = useToast();
  const [otp6, setOtp6] = useState('');
  const [otp4, setOtp4] = useState('');

  return (
    <DemoPage
      title="OTP Input"
      description="A specialized input component for one-time passwords, verification codes, and PINs with automatic focus management."
    >
      <DemoSection title="Standard Verification">
        <Typography variant="body2" color="tertiary" style={{ marginBottom: 16 }}>
          Common 6-digit verification code format used for 2FA and account security.
        </Typography>
        <View style={{ alignItems: 'center' }}>
          <OTPInput
            length={6}
            value={otp6}
            onChange={setOtp6}
            onComplete={(code) => toast.success(`Verified: ${code}`)}
          />
        </View>
      </DemoSection>

      <DemoSection title="PIN Entry">
        <Typography variant="body2" color="tertiary" style={{ marginBottom: 16 }}>
          Short 4-digit format ideal for transaction PINs or simple login codes.
        </Typography>
        <View style={{ alignItems: 'center' }}>
          <OTPInput
            length={4}
            value={otp4}
            onChange={setOtp4}
            onComplete={(code) => toast.info(`PIN entered: ${code}`)}
          />
        </View>
      </DemoSection>

      <DemoSection title="Component States">
        <Stack spacing="lg">
          <View>
            <Typography variant="subtitle2" style={{ marginBottom: 8 }}>Disabled</Typography>
            <View style={{ alignItems: 'center' }}>
              <OTPInput
                length={6}
                value="123"
                onChange={() => {}}
                disabled
              />
            </View>
          </View>
        </Stack>
      </DemoSection>
    </DemoPage>
  );
}
