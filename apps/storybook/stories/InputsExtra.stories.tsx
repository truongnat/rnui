import type { StoryObj } from "@storybook/react-native";
import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import {
  ThemeProvider,
  Button,
  ButtonGroup,
  Fab,
  TextField,
  Autocomplete,
  Rating,
  ToggleButtonGroup,
  ToggleButton,
  FormControl,
  FormLabel,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  Switch,
  Input,
} from "@truongnat/ui";

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <ScrollView contentContainerStyle={{ padding: 24, gap: 24 }}>
      {children}
    </ScrollView>
  </ThemeProvider>
);

const meta = {
  title: "Components/Inputs",
  component: View,
  decorators: [(Story: React.ComponentType) => <Wrap><Story /></Wrap>],
};

export default meta;

export const ButtonGroupStory: StoryObj = {
  name: "ButtonGroup",
  render: () => (
    <ButtonGroup variant="outlined">
      <Button label="Left" onPress={() => { }} />
      <Button label="Center" onPress={() => { }} />
      <Button label="Right" onPress={() => { }} />
    </ButtonGroup>
  ),
};

export const FabStory: StoryObj = {
  name: "Fab",
  render: () => (
    <Fab label="Create" onPress={() => { }} />
  ),
};

export const TextFieldStory: StoryObj = {
  name: "TextField",
  render: () => (
    <View style={{ gap: 12 }}>
      <TextField label="Email" placeholder="name@example.com" />
      <TextField label="Error" helperText="Invalid" error />
      <TextField label="Multiline" multiline minRows={3} />
    </View>
  ),
};

export const AutocompleteStory: StoryObj = {
  name: "Autocomplete",
  render: () => (
    <Autocomplete options={["React", "Vue", "Svelte", "Angular"]} />
  ),
};

export const RatingStory: StoryObj = {
  name: "Rating",
  render: () => {
    const [value, setValue] = useState(3);
    return <Rating value={value} onChange={setValue} />;
  },
};

export const ToggleButtonStory: StoryObj = {
  name: "ToggleButton",
  render: () => {
    const [value, setValue] = useState("left");
    return (
      <ToggleButtonGroup value={value} exclusive onChange={(val: any) => setValue(val as string)}>
        <ToggleButton value="left">Left</ToggleButton>
        <ToggleButton value="center">Center</ToggleButton>
        <ToggleButton value="right">Right</ToggleButton>
      </ToggleButtonGroup>
    );
  },
};

export const FormControlStory: StoryObj = {
  name: "FormControl",
  render: () => {
    const [terms, setTerms] = useState(false);
    const [notify, setNotify] = useState(true);

    return (
      <View style={{ gap: 12 }}>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input placeholder="your name" />
          <FormHelperText>Helper text</FormHelperText>
        </FormControl>

        <FormControl error required>
          <FormLabel>Email</FormLabel>
          <Input placeholder="name@example.com" error="Invalid" />
          <FormHelperText>Invalid email</FormHelperText>
        </FormControl>

        <FormControl>
          <FormControlLabel
            label="Accept terms"
            control={<Checkbox checked={terms} onChange={setTerms} />}
          />
        </FormControl>

        <FormControl>
          <FormControlLabel
            label="Enable notifications"
            control={<Switch on={notify} onChange={setNotify} />}
          />
        </FormControl>
      </View>
    );
  },
};
