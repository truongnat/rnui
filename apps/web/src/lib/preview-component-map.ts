import type { RendererComponentMap } from '@rnui/renderer';
import {
  PreviewAlert,
  PreviewAvatar,
  PreviewBadge,
  PreviewBox,
  PreviewButton,
  PreviewCard,
  PreviewCheckbox,
  PreviewChip,
  PreviewDivider,
  PreviewInput,
  PreviewPaper,
  PreviewScreen,
  PreviewStack,
  PreviewSwitch,
  PreviewTextField,
  PreviewTypography,
} from '@/lib/preview-kit';

/**
 * Builder preview component map — HTML/CSS approximations (preview-kit) of the
 * registry UI kit. Screen resolves to Stack via the renderer.
 */
export const previewComponentMap: RendererComponentMap = {
  Screen: PreviewScreen,
  Stack: PreviewStack,
  Box: PreviewBox,
  Card: PreviewCard,
  Paper: PreviewPaper,
  Divider: PreviewDivider,
  Separator: PreviewDivider,
  Typography: PreviewTypography,
  Text: PreviewTypography,
  Button: PreviewButton,
  Input: PreviewInput,
  TextField: PreviewTextField,
  Checkbox: PreviewCheckbox,
  Switch: PreviewSwitch,
  Badge: PreviewBadge,
  Chip: PreviewChip,
  Alert: PreviewAlert,
  Avatar: PreviewAvatar,
};
