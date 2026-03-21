# OTP Input

A specialized input for One-Time Passwords with automatic focus management and numeric filtering.

## Basic Usage

```tsx
import { OTPInput } from "@rnui/ui";

const MyForm = () => {
  const [otp, setOtp] = useState("");
  
  return (
    <OTPInput 
      length={6} 
      value={otp} 
      onChange={setOtp} 
      onComplete={(value) => console.log("Ready to verify:", value)}
    />
  );
};
```

## Advanced Usage (Headless)

Use the `useOTPInput` hook to wire up your own custom OTP cells while keeping the core logic (focus jumping, numeric-only, clipboard support).

```tsx
import { useOTPInput } from "@rnui/ui";
import { TextInput, View } from "react-native";

const CustomOTP = () => {
  const { inputRef, getOtpProps, handlePress } = useOTPInput({
    length: 4,
    onChange: (val) => console.log(val),
  });

  return (
    <View onTouchStart={handlePress}>
      {/* Hidden master input */}
      <TextInput ref={inputRef} {...getOtpProps()} style={{ opacity: 0, position: 'absolute' }} />
      
      {/* Your custom UI cells here */}
    </View>
  );
};
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `length` | `number` | `6` | Number of OTP cells |
| `value` | `string` | - | Current value |
| `onChange` | `(value: string) => void` | - | Callback on change |
| `onComplete` | `(value: string) => void` | - | Callback when all cells are filled |
| `disabled` | `boolean` | `false` | Disable input |
