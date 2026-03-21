import React from "react";
import { View, Text } from "react-native";
import { useComponentTokens, useTokens } from "@rnui/headless";
import {
  // Navigation & Actions
  Star,
  Heart,
  Check,
  Info,
  AlertTriangle,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Plus,
  X,
  Minus,
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
  Upload,
  Image as ImageIcon,
  Video,
  Camera,
  Mail,
  Phone,
  Home,
  LogOut,
  LogIn,
  Menu,
  MoreVertical,
  MoreHorizontal,
  Filter,
  SortAsc,
  Grid,
  List,
  Layout,
  Folder,
  File,
  FileText,
  Copy,
  Clipboard,
  ExternalLink,
  Link as LinkIcon,
  Unlink,
  // Feedback & Status
  CheckCircle,
  XCircle,
  HelpCircle,
  Loader,
  RefreshCw,
  RotateCcw,
  Play,
  Pause,
  StopCircle,
  SkipForward,
  SkipBack,
  FastForward,
  Rewind,
  // Commerce & Data
  ShoppingCart,
  CreditCard,
  DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Flame,
  Award,
  Target,
  Bookmark,
  Tag,
  // Communication
  MessageCircle,
  MessageSquare,
  Send,
  Inbox,
  Archive,
  Hash,
  AtSign,
  // Media Controls
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Headphones,
  Radio,
  Tv,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  // Weather & Nature
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudSnow,
  Wind,
  Thermometer,
  Droplet,
  // Locks & Security
  Lock,
  Unlock,
  Key,
  Shield,
  Eye,
  EyeOff,
  // Arrows
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ArrowDownLeft,
  Move,
  Maximize2,
  Minimize2,
  // UI Elements
  Square,
  Circle,
  Triangle,
  Hexagon,
  Box,
  Package,
  Gift,
  ShoppingBag,
  // Tools
  Hammer,
  Wrench,
  Scissors,
  Printer,
  Power,
  Battery,
  Wifi,
  Bluetooth,
  // Social
  Github,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react-native";

const ICON_MAP: Record<string, React.FC<any>> = {
  // Navigation & Actions
  star: Star,
  heart: Heart,
  check: Check,
  checkCircle: CheckCircle,
  info: Info,
  warning: AlertTriangle,
  error: AlertCircle,
  helpCircle: HelpCircle,
  chevronRight: ChevronRight,
  chevronLeft: ChevronLeft,
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  plus: Plus,
  minus: Minus,
  close: X,
  xCircle: XCircle,
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
  upload: Upload,
  image: ImageIcon,
  video: Video,
  camera: Camera,
  mail: Mail,
  phone: Phone,
  home: Home,
  logOut: LogOut,
  logIn: LogIn,
  menu: Menu,
  moreVertical: MoreVertical,
  moreHorizontal: MoreHorizontal,
  filter: Filter,
  sortAsc: SortAsc,
  grid: Grid,
  list: List,
  layout: Layout,
  folder: Folder,
  file: File,
  fileText: FileText,
  copy: Copy,
  clipboard: Clipboard,
  externalLink: ExternalLink,
  link: LinkIcon,
  unlink: Unlink,
  // Feedback & Status
  loader: Loader,
  refreshCw: RefreshCw,
  rotateCcw: RotateCcw,
  play: Play,
  pause: Pause,
  stopCircle: StopCircle,
  skipForward: SkipForward,
  skipBack: SkipBack,
  fastForward: FastForward,
  rewind: Rewind,
  // Commerce & Data
  shoppingCart: ShoppingCart,
  creditCard: CreditCard,
  dollarSign: DollarSign,
  trendingUp: TrendingUp,
  trendingDown: TrendingDown,
  barChart3: BarChart3,
  pieChart: PieChart,
  activity: Activity,
  zap: Zap,
  flame: Flame,
  award: Award,
  target: Target,
  bookmark: Bookmark,
  tag: Tag,
  // Communication
  messageCircle: MessageCircle,
  messageSquare: MessageSquare,
  send: Send,
  inbox: Inbox,
  archive: Archive,
  hash: Hash,
  atSign: AtSign,
  // Media Controls
  volume2: Volume2,
  volumeX: VolumeX,
  mic: Mic,
  micOff: MicOff,
  headphones: Headphones,
  radio: Radio,
  tv: Tv,
  monitor: Monitor,
  smartphone: Smartphone,
  tablet: Tablet,
  laptop: Laptop,
  // Weather & Nature
  sun: Sun,
  moon: Moon,
  cloud: Cloud,
  cloudRain: CloudRain,
  cloudSnow: CloudSnow,
  wind: Wind,
  thermometer: Thermometer,
  droplet: Droplet,
  // Locks & Security
  lock: Lock,
  unlock: Unlock,
  key: Key,
  shield: Shield,
  eye: Eye,
  eyeOff: EyeOff,
  // Arrows
  arrowUp: ArrowUp,
  arrowDown: ArrowDown,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  arrowUpRight: ArrowUpRight,
  arrowDownLeft: ArrowDownLeft,
  move: Move,
  maximize2: Maximize2,
  minimize2: Minimize2,
  // UI Elements
  square: Square,
  circle: Circle,
  triangle: Triangle,
  hexagon: Hexagon,
  box: Box,
  package: Package,
  gift: Gift,
  shoppingBag: ShoppingBag,
  // Tools
  hammer: Hammer,
  wrench: Wrench,
  scissors: Scissors,
  printer: Printer,
  power: Power,
  battery: Battery,
  wifi: Wifi,
  bluetooth: Bluetooth,
  // Social
  github: Github,
  twitter: Twitter,
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
};

export interface IconProps {
  children?: React.ReactNode;
  color?: string;
  size?: number | "xs" | "sm" | "md" | "lg" | "xl" | "small" | "medium" | "large";
  fontSize?: "inherit" | "xs" | "sm" | "md" | "lg" | "xl" | "small" | "medium" | "large";
}

export interface SvgIconProps {
  children: React.ReactElement;
  color?: string;
  fontSize?: "inherit" | "xs" | "sm" | "md" | "lg" | "xl" | "small" | "medium" | "large";
}

export function Icon({ children, color, size, fontSize = "medium" }: IconProps) {
  const { icon } = useComponentTokens();

  // Handle numeric size or size string
  let resolvedSize: number | undefined;
  if (typeof size === "number") {
    resolvedSize = size;
  } else if (size) {
    resolvedSize = (icon.size as any)[size] || (icon.size as any)[fontSize];
  } else {
    resolvedSize = (icon.size as any)[fontSize] || icon.size.md;
  }

  const resolvedColor = color ?? icon.color.primary;

  // If children is a lucide icon component, clone it with proper props
  if (React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement, {
      size: resolvedSize || 20,
      color: resolvedColor,
    } as any);
  }

  // Handle string names from mapping
  if (typeof children === "string" && ICON_MAP[children]) {
    const IconComponent = ICON_MAP[children];
    return (
      <IconComponent
        size={resolvedSize || 20}
        color={resolvedColor}
      />
    );
  }

  // Fallback for text content
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: resolvedColor, fontSize: resolvedSize }}>
        {children}
      </Text>
    </View>
  );
}

export function SvgIcon({ children, color, fontSize = "medium" }: SvgIconProps) {
  const { icon } = useComponentTokens();
  const size = fontSize === "inherit" ? undefined : (icon.size as any)[fontSize];
  if (!React.isValidElement(children)) return null;
  return React.cloneElement(children, {
    color: (children.props as any)?.color ?? color ?? icon.color.primary,
    size: (children.props as any)?.size ?? size,
  } as any);
}
