import { useToast } from '@truongdq01/headless';
import { OTPInput } from '@truongdq01/ui';
import { useState } from 'react';
import { View } from 'react-native';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function OTPInputScreen() {
  const toast = useToast();
  const [otp6, setOtp6] = useState('');
  const [otp4, setOtp4] = useState('');

  return (
    <DemoPage
      title="OTP Input"
      description="One-time passwords and PINs with automatic focus management."
    >
      <DemoSection title="6-Digit Code" description="Standard 2FA verification format.">
        <View style={{ alignItems: 'center' }}>
          <OTPInput
            length={6}
            value={otp6}
            onChange={setOtp6}
            onComplete={(code) => toast.success(`Verified: ${code}`)}
          />
        </View>
      </DemoSection>

      <DemoSection title="4-Digit PIN" description="Transaction PINs or simple login codes.">
        <View style={{ alignItems: 'center' }}>
          <OTPInput
            length={4}
            value={otp4}
            onChange={setOtp4}
            onComplete={(code) => toast.info(`PIN entered: ${code}`)}
          />
        </View>
      </DemoSection>

      <DemoSection title="Disabled">
        <View style={{ alignItems: 'center' }}>
          <OTPInput length={6} value="123" onChange={() => {}} disabled />
        </View>
      </DemoSection>
    </DemoPage>
  );
}
