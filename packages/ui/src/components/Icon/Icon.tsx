import React from "react";
import { View, Text } from "react-native";
import { useTokens, useComponentTokens } from "@truongdq01/headless";
import {
  // Navigation & Actions
  Star,
  Heart,
  Check,
  Info,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  X,
  XCircle,
  Menu,
  MoreVertical,
  MoreHorizontal,
  Search,
  Settings,
  Bell,
  Home,
  User,
  Plus,
  Minus,
  Edit,
  Trash,
  Share,
  Download,
  Upload,
  RefreshCw,
  ExternalLink,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Calendar,
  Clock,
  MapPin,
  Camera,
  Image,
  Video,
  FileText,
  Copy,
  Layout,
  Grid,
  List,
  Layers,
  Box,
  Package,
  ShoppingCart,
  CreditCard,
  Mail,
  Phone,
  MessageSquare,
  Send,
  Zap,
  Flame,
  StarHalf,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react-native";

export const ICON_MAP = {
  star: Star,
  heart: Heart,
  check: Check,
  info: Info,
  warning: AlertTriangle,
  error: AlertCircle,
  checkCircle: CheckCircle,
  close: X,
  closeCircle: XCircle,
  menu: Menu,
  moreVertical: MoreVertical,
  moreHorizontal: MoreHorizontal,
  search: Search,
  settings: Settings,
  bell: Bell,
  home: Home,
  user: User,
  plus: Plus,
  minus: Minus,
  edit: Edit,
  trash: Trash,
  share: Share,
  download: Download,
  upload: Upload,
  refresh: RefreshCw,
  externalLink: ExternalLink,
  chevronUp: ChevronUp,
  chevronDown: ChevronDown,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  arrowUp: ArrowUp,
  arrowDown: ArrowDown,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  eye: Eye,
  eyeOff: EyeOff,
  lock: Lock,
  unlock: Unlock,
  calendar: Calendar,
  clock: Clock,
  mapPin: MapPin,
  camera: Camera,
  image: Image,
  video: Video,
  file: FileText,
  copy: Copy,
  layout: Layout,
  grid: Grid,
  list: List,
  layers: Layers,
  box: Box,
  package: Package,
  cart: ShoppingCart,
  card: CreditCard,
  mail: Mail,
  phone: Phone,
  message: MessageSquare,
  send: Send,
  zap: Zap,
  flame: Flame,
  starHalf: StarHalf,
  thumbsUp: ThumbsUp,
  thumbsDown: ThumbsDown,
} as const;

export type IconName = keyof typeof ICON_MAP;

export interface IconProps {
  /** The name of the icon. Can also be passed as children. */
  name?: IconName | string;
  /** The name of the icon as text children. */
  children?: IconName | string | React.ReactNode;
  /** Size of the icon. Can be a number or a theme preset. */
  size?: number | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "small" | "medium" | "large";
  /** Color of the icon. Can be a raw hex or a theme preset. */
  color?: string;
  style?: any;
}

/**
 * A standardized Icon component that wraps lucide-react-native icons.
 * Provides theme-aware sizing and colors.
 */
export function Icon({ name, children, size, color, style }: IconProps) {
  const { icon: iconTokens } = useComponentTokens();
  const tokens = useTokens();
  
  // Resolve the icon name from either prop or children
  const iconNameString = (name ?? (typeof children === "string" ? children : undefined)) as IconName;
  
  const resolvedSize = typeof size === "number" 
    ? size 
    : iconTokens.size[(size ?? "md") as keyof typeof iconTokens.size] ?? 20;
    
  const resolvedColor = iconTokens.color[color as keyof typeof iconTokens.color] ?? color ?? tokens.color.text.primary;

  const IconComp = ICON_MAP[iconNameString as keyof typeof ICON_MAP] || Info;

  return (
    <View style={[{ width: resolvedSize, height: resolvedSize, alignItems: "center", justifyContent: "center" }, style]}>
      <IconComp size={resolvedSize} color={resolvedColor} />
    </View>
  );
}

/**
 * A helper to wrap any icon with standard sizing and colors.
 */
export function IconWrapper({ children, size, color }: { children: React.ReactNode; size?: number; color?: string }) {
  const tokens = useTokens();
  if (!React.isValidElement<Partial<{ color: string; size: number }>>(children)) return null;
  return React.cloneElement(children, {
    color: children.props.color ?? color ?? tokens.color.text.primary,
    size: children.props.size ?? size,
  });
}
