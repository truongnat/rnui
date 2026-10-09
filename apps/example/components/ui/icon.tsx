import {
  AlertCircle,
  AlertTriangle,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Bell,
  Box,
  Calendar,
  Camera,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clock,
  Copy,
  CreditCard,
  Download,
  Edit,
  ExternalLink,
  Eye,
  EyeOff,
  FileText,
  Flame,
  Grid,
  Heart,
  Home,
  Image as ImageIcon,
  Info,
  Layers,
  Layout,
  List,
  Lock,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  Minus,
  MoreHorizontal,
  MoreVertical,
  Package,
  Phone,
  Plus,
  RefreshCw,
  Search,
  Send,
  Settings,
  Share,
  ShoppingCart,
  Star,
  StarHalf,
  ThumbsDown,
  ThumbsUp,
  Trash,
  Unlock,
  Upload,
  User,
  Video,
  X,
  XCircle,
  Zap,
  type LucideIcon,
  type LucideProps,
} from 'lucide-react-native';
import { View, type ViewProps } from 'react-native';
import { cn, useIconColor } from '@/lib/utils';

/** String names resolved by `Icon`/`icon` props. Extend as needed. */
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
  image: ImageIcon,
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

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type IconTone =
  | 'default'
  | 'muted'
  | 'primary'
  | 'foreground'
  | 'onPrimary'
  | 'destructive'
  | 'success'
  | 'warning';

const SIZE_MAP: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  '2xl': 40,
};

export interface IconProps
  extends Omit<LucideProps, 'color' | 'size' | 'style'> {
  /** Icon name from ICON_MAP, or a LucideIcon component directly. */
  icon?: IconName | LucideIcon;
  /** Alias for `icon` when passing a string name. */
  name?: IconName;
  /** Pixel size or a preset token. */
  size?: number | IconSize;
  /** Semantic color token. Ignored when `color` is set. */
  tone?: IconTone;
  /** Raw color (hex/rgb), overrides `tone`. */
  color?: string;
  /** className applied to the wrapping View. */
  className?: string;
  /** style applied to the wrapping View. */
  style?: ViewProps['style'];
}

/**
 * Standardized icon wrapper over lucide-react-native.
 * Renders by name (`<Icon name="search" />`), by component
 * (`<Icon icon={Search} />`), or wraps a lucide element child.
 */
export function Icon({
  icon,
  name,
  size = 'md',
  tone = 'default',
  color,
  className,
  style,
  strokeWidth = 2,
  ...props
}: IconProps) {
  const resolvedSize = typeof size === 'number' ? size : SIZE_MAP[size];
  const toneColor = useIconColor(tone);
  const resolvedColor = color ?? toneColor;

  const ref = icon ?? name ?? 'info';
  const IconComp: LucideIcon =
    typeof ref === 'string' ? (ICON_MAP[ref as IconName] ?? Info) : ref;

  return (
    <View
      className={cn('items-center justify-center', className)}
      style={[{ width: resolvedSize, height: resolvedSize }, style]}
    >
      <IconComp
        size={resolvedSize}
        color={resolvedColor}
        strokeWidth={strokeWidth}
        {...props}
      />
    </View>
  );
}
