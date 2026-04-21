import type { StoryObj } from '@storybook/react-native';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ThemeProvider,
} from '@truongdq01/ui';
import type React from 'react';
import { View } from 'react-native';

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24 }}>{children}</View>
  </ThemeProvider>
);

const TableWrapper = (props: any) => (
  <TableContainer>
    <Table size={props.size ?? 'medium'}>
      <TableHead>
        <TableRow>
          <TableCell variant="head">Name</TableCell>
          <TableCell variant="head">Role</TableCell>
          <TableCell variant="head" align="right">
            Status
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Ada</TableCell>
          <TableCell>Engineer</TableCell>
          <TableCell align="right">Active</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Grace</TableCell>
          <TableCell>Architect</TableCell>
          <TableCell align="right">Invited</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Alan</TableCell>
          <TableCell>Designer</TableCell>
          <TableCell align="right">Active</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
);

const meta = {
  title: 'Components/Table',
  component: TableWrapper,
  decorators: [
    (Story: React.ComponentType) => (
      <Wrap>
        <Story />
      </Wrap>
    ),
  ],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium'],
    },
  },
  args: {
    size: 'medium',
  },
};

export default meta;
type Story = StoryObj<typeof TableWrapper>;

export const Default: Story = {};

export const Small: Story = {
  args: { size: 'small' },
};
