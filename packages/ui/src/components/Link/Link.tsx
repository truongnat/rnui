import React from "react";
import { Text, type TextStyle, Linking } from "react-native";
import { useTokens } from "@rnui/headless";

export interface LinkProps {
  children?: React.ReactNode;
  href?: string;
  onPress?: () => void;
  color?: string;
  underline?: "always" | "hover" | "none";
  style?: TextStyle | TextStyle[];
}

export function Link({
  children,
  href,
  onPress,
  color,
  underline = "always",
  style,
}: LinkProps) {
  const tokens = useTokens();
  const decoration = underline === "none" ? "none" : "underline";

  return (
    <Text
      onPress={async () => {
        if (onPress) onPress();
        if (href) {
          try {
            await Linking.openURL(href);
          } catch {
            // ignore
          }
        }
      }}
      style={[
        { color: color ?? tokens.color.text.link, textDecorationLine: decoration },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
