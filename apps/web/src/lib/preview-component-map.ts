import type { RendererComponentMap } from '@truongdq01/renderer';
import { Alert } from '../../../../packages/ui/src/components/Alert';
import { Avatar } from '../../../../packages/ui/src/components/Avatar';
import { Badge } from '../../../../packages/ui/src/components/Badge';
import { Box } from '../../../../packages/ui/src/components/Box';
import { Button } from '../../../../packages/ui/src/components/Button';
import { Card } from '../../../../packages/ui/src/components/Card';
import { Chip } from '../../../../packages/ui/src/components/Chip';
import { Divider } from '../../../../packages/ui/src/components/Divider';
import { Paper } from '../../../../packages/ui/src/components/Paper';
import { Stack } from '../../../../packages/ui/src/components/Stack';
import { Typography } from '../../../../packages/ui/src/components/Typography';
import { TextField } from '@/mocks/text-field';
import {
  PreviewCheckbox,
  PreviewInput,
  PreviewSwitch,
} from '@/lib/preview-interactive';

/** Slim component map — avoids importing the full @truongdq01/ui barrel on web. */
export const previewComponentMap: RendererComponentMap = {
  Screen: Stack,
  Stack,
  Box,
  Card,
  Paper,
  Divider,
  Typography,
  Button,
  Input: PreviewInput,
  TextField,
  Checkbox: PreviewCheckbox,
  Switch: PreviewSwitch,
  Badge,
  Chip,
  Alert,
  Avatar,
};
