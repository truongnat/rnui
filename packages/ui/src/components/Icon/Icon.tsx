import React from "react";
import { View, Text } from "react-native";
import { useTokens } from "@rnui/headless";
import {
  Star,
  Heart,
  Check,
  Info,
  AlertTriangle,
  AlertCircle,
  ChevronRight,
  Plus,
  X,
  Search,
  Bell,
  User,
  Settings,
  Calendar,
  Clock,
  MapPin,
  Trash2,
  Edit,
  Share,
  Download,
  Image as ImageIcon,
} from "lucide-react-native";

const ICON_MAP: Record<string, React.FC<any>> = {
  star: Star,
  heart: Heart,
  check: Check,
  info: Info,
  warning: AlertTriangle,
  error: AlertCircle,
  chevronRight: ChevronRight,
  plus: Plus,
  close: X,
  search: Search,
  bell: Bell,
  user: User,
  settings: Settings,
  calendar: Calendar,
  clock: Clock,
  mapPin: MapPin,
  trash: Trash2,
  edit: Edit,
  share: Share,
  download: Download,
  image: ImageIcon,
};

export interface IconProps {
  children?: React.ReactNode;
  color?: string;
  size?: number | "small" | "medium" | "large";
  fontSize?: "inherit" | "small" | "medium" | "large";
}

export interface SvgIconProps {
  children: React.ReactElement;
  color?: string;
  fontSize?: "inherit" | "small" | "medium" | "large";
}

const SIZE_MAP = { small: 16, medium: 20, large: 24 } as const;

export function Icon({ children, color, size, fontSize = "medium" }: IconProps) {
  const tokens = useTokens();

  // Handle numeric size or size string
  let resolvedSize: number | undefined;
  if (typeof size === "number") {
    resolvedSize = size;
  } else if (size) {
    resolvedSize = SIZE_MAP[size as keyof typeof SIZE_MAP] || SIZE_MAP[fontSize as keyof typeof SIZE_MAP];
  } else {
    resolvedSize = SIZE_MAP[fontSize as keyof typeof SIZE_MAP] || 20;
  }

  // If children is a lucide icon component, clone it with proper props
  if (React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement, {
      size: resolvedSize || 20,
      color: color ?? tokens.color.text.primary,
    } as any);
  }

  // Handle string names from mapping
  if (typeof children === "string" && ICON_MAP[children]) {
    const IconComponent = ICON_MAP[children];
    return (
      <IconComponent
        size={resolvedSize || 20}
        color={color ?? tokens.color.text.primary}
      />
    );
  }

  // Fallback for text content
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: color ?? tokens.color.text.primary, fontSize: resolvedSize }}>
        {children}
      </Text>
    </View>
  );
}

export function SvgIcon({ children, color, fontSize = "medium" }: SvgIconProps) {
  const tokens = useTokens();
  const size = fontSize === "inherit" ? undefined : SIZE_MAP[fontSize as keyof typeof SIZE_MAP];
  if (!React.isValidElement(children)) return null;
  return React.cloneElement(children, {
    color: (children.props as any)?.color ?? color ?? tokens.color.text.primary,
    size: (children.props as any)?.size ?? size,
  } as any);
}
