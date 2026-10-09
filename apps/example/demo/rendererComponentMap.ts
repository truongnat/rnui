import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Chip } from '@/components/ui/chip';
import { Grid, GridItem } from '@/components/ui/grid';
import { Icon } from '@/components/ui/icon';
import { Image } from '@/components/ui/image';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from '@/components/ui/link';
import { List, ListItem, ListSeparator } from '@/components/ui/list';
import { Paper } from '@/components/ui/paper';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Stack } from '@/components/ui/stack';
import { Switch } from '@/components/ui/switch';
import { Text } from '@/components/ui/text';
import { TextField } from '@/components/ui/text-field';
import { Textarea } from '@/components/ui/textarea';
import {
  createDefaultComponentMap,
  type RendererComponentMap,
} from '@rnui/renderer';
import { View } from 'react-native';

/**
 * Component map for RNUISchemaRenderer — vendored registry kit components
 * keyed by schema type name. `Screen` falls back to Stack via
 * createDefaultComponentMap.
 */
export const rendererComponentMap: RendererComponentMap =
  createDefaultComponentMap({
    View,
    Stack,
    Grid,
    GridItem,
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
    Paper,
    Separator,
    Text,
    Link,
    Button,
    Input,
    TextField,
    Textarea,
    Label,
    Checkbox,
    Switch,
    Badge,
    Chip,
    Alert,
    AlertTitle,
    AlertDescription,
    Avatar,
    AvatarImage,
    AvatarFallback,
    Icon,
    Image,
    Progress,
    List,
    ListItem,
    ListSeparator,
  });
