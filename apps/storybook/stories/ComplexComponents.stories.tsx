import type { StoryObj } from "@storybook/react-native";
import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import {
  ThemeProvider,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  TableSortLabel,
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineContent,
  TimelineDot,
  TimelineConnector,
  Stepper,
  Step,
  StepLabel,
  DatePicker,
  OTPInput,
  useTable,
} from "@rnui/ui";

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>
    <ScrollView style={{ flex: 1 }}>
      <View style={{ padding: 24, gap: 40 }}>
        {children}
      </View>
    </ScrollView>
  </ThemeProvider>
);

const meta = {
  title: "Components/Complex",
  decorators: [(Story: React.ComponentType) => <Wrap><Story /></Wrap>],
};

export default meta;

// ─── Table Story ─────────────────────────────────────────────────
const TableDemo = () => {
  const data = [
    { id: 1, name: "Frozen yoghurt", calories: 159, fat: 6.0 },
    { id: 2, name: "Ice cream sandwich", calories: 237, fat: 9.0 },
    { id: 3, name: "Eclair", calories: 262, fat: 16.0 },
    { id: 4, name: "Cupcake", calories: 305, fat: 3.7 },
    { id: 5, name: "Gingerbread", calories: 356, fat: 16.0 },
  ];

  const {
    paginatedData,
    page,
    rowsPerPage,
    setPage,
    sort,
    handleSort,
    isSelected,
    toggleSelect,
  } = useTable({ data, rowsPerPage: 3 });

  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 12 }}>Table with useTable Hook</Text>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell variant="head" style={{ width: 150 }}>
                <TableSortLabel
                  active={sort?.key === "name"}
                  direction={sort?.direction}
                  onClick={() => handleSort("name")}
                >
                  Dessert
                </TableSortLabel>
              </TableCell>
              <TableCell variant="head" align="right">Calories</TableCell>
              <TableCell variant="head" align="right">Fat (g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow key={row.id} selected={isSelected(row.id)}>
                <TableCell onPress={() => toggleSelect(row.id)}>{row.name}</TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        count={data.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
      />
    </View>
  );
};

export const TableShowcase: StoryObj = {
  render: () => <TableDemo />,
};

// ─── Timeline Story ──────────────────────────────────────────────
export const TimelineShowcase: StoryObj = {
  render: () => (
    <View>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 12 }}>Timeline</Text>
      <Timeline position="right">
        <TimelineItem>
          <TimelineSeparator status="completed">
            <TimelineDot status="completed" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Text style={{ fontWeight: "600" }}>Ordered</Text>
            <Text style={{ color: "gray" }}>Mar 20, 09:00 AM</Text>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator status="active">
            <TimelineDot status="active" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Text style={{ fontWeight: "600" }}>Shipped</Text>
            <Text style={{ color: "gray" }}>Mar 21, 02:30 PM</Text>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator status="pending">
            <TimelineDot status="pending" />
          </TimelineSeparator>
          <TimelineContent>
            <Text style={{ fontWeight: "600" }}>Delivered</Text>
            <Text style={{ color: "gray" }}>Expected tomorrow</Text>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </View>
  ),
};

// ─── Stepper Story ───────────────────────────────────────────────
export const StepperShowcase: StoryObj = {
  render: () => {
    const [activeStep, setActiveStep] = useState(1);
    return (
      <View>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 12 }}>Stepper</Text>
        <Stepper activeStep={activeStep}>
          <Step index={0} label="Select Plan" />
          <Step index={1} label="Payment" />
          <Step index={2} label="Confirmation" />
        </Stepper>
        <View style={{ flexDirection: "row", gap: 8, marginTop: 16 }}>
          <Text onPress={() => setActiveStep(Math.max(0, activeStep - 1))}>Prev</Text>
          <Text onPress={() => setActiveStep(Math.min(2, activeStep + 1))}>Next</Text>
        </View>
      </View>
    );
  },
};

// ─── OTP & Date Story ────────────────────────────────────────────
export const InputsShowcase: StoryObj = {
  render: () => {
    const [otp, setOtp] = useState("");
    const [date, setDate] = useState<Date | null>(new Date());
    return (
      <View style={{ gap: 32 }}>
        <View>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 12 }}>OTP Input</Text>
          <OTPInput length={4} value={otp} onChange={setOtp} onComplete={(v) => console.log("Done", v)} />
        </View>
        <View>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 12 }}>Date Picker</Text>
          <DatePicker label="Birthday" date={date} onChange={setDate} />
        </View>
      </View>
    );
  },
};
