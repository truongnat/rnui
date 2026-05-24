import type { RendererComponentMap } from '@truongdq01/renderer';
import { Alert } from '../../../../packages/ui/src/components/Alert';
import { Avatar } from '../../../../packages/ui/src/components/Avatar';
import { Badge } from '../../../../packages/ui/src/components/Badge';
import { Box } from '../../../../packages/ui/src/components/Box';
import { Button } from '../../../../packages/ui/src/components/Button';
import { Card } from '../../../../packages/ui/src/components/Card';
import { Checkbox } from '../../../../packages/ui/src/components/Checkbox';
import { Chip } from '../../../../packages/ui/src/components/Chip';
import { Divider } from '../../../../packages/ui/src/components/Divider';
import { Input } from '../../../../packages/ui/src/components/Input';
import { Paper } from '../../../../packages/ui/src/components/Paper';
import { Stack } from '../../../../packages/ui/src/components/Stack';
import { Switch } from '../../../../packages/ui/src/components/Switch';
import { Typography } from '../../../../packages/ui/src/components/Typography';
import { TextField } from '@/mocks/text-field';

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
  Input,
  TextField,
  Checkbox,
  Switch,
  Badge,
  Chip,
  Alert,
  Avatar,
};
