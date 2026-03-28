import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { SpeedDial, SpeedDialAction } from "../SpeedDial";
import { ThemeProvider } from "@truongdq01/headless";

describe("SpeedDial Component", () => {
  it("renders correctly and Fab button is accessible", () => {
    const { getByLabelText } = render(
      <ThemeProvider>
        <SpeedDial ariaLabel="SpeedDial Fab" />
      </ThemeProvider>
    );
    expect(getByLabelText("SpeedDial Fab")).toBeTruthy();
  });

  it("returns null when hidden=true", () => {
    const { queryByLabelText } = render(
      <ThemeProvider>
        <SpeedDial ariaLabel="SpeedDial Fab" hidden={true} />
      </ThemeProvider>
    );
    expect(queryByLabelText("SpeedDial Fab")).toBeNull();
  });

  it("toggles the open state, showing children (SpeedDialAction)", () => {
    const { getByLabelText, queryByText } = render(
      <ThemeProvider>
        <SpeedDial ariaLabel="SpeedDial Fab">
          <SpeedDialAction tooltipTitle="Action 1" onPress={() => {}} />
        </SpeedDial>
      </ThemeProvider>
    );

    expect(queryByText("Action 1")).toBeNull();

    fireEvent.press(getByLabelText("SpeedDial Fab"));

    expect(queryByText("Action 1")).toBeTruthy();
  });

  it("triggers onPress callback and closes the SpeedDial when pressing a SpeedDialAction", () => {
    const onPressMock = jest.fn();
    const { getByLabelText, getByText, queryByText } = render(
      <ThemeProvider>
        <SpeedDial ariaLabel="SpeedDial Fab">
          <SpeedDialAction tooltipTitle="Action 1" onPress={onPressMock} />
        </SpeedDial>
      </ThemeProvider>
    );

    // Open it
    fireEvent.press(getByLabelText("SpeedDial Fab"));
    expect(queryByText("Action 1")).toBeTruthy();

    // Click action
    fireEvent.press(getByText("Action 1"));

    expect(onPressMock).toHaveBeenCalledTimes(1);
    expect(queryByText("Action 1")).toBeNull();
  });

  it("handles controlled open state", () => {
    const onOpenMock = jest.fn();
    const onCloseMock = jest.fn();
    const { getByLabelText, queryByText, rerender } = render(
      <ThemeProvider>
        <SpeedDial ariaLabel="SpeedDial Fab" open={true} onOpen={onOpenMock} onClose={onCloseMock}>
          <SpeedDialAction tooltipTitle="Action 1" />
        </SpeedDial>
      </ThemeProvider>
    );

    expect(queryByText("Action 1")).toBeTruthy();

    fireEvent.press(getByLabelText("SpeedDial Fab"));
    expect(onCloseMock).toHaveBeenCalledTimes(1);

    rerender(
      <ThemeProvider>
        <SpeedDial ariaLabel="SpeedDial Fab" open={false} onOpen={onOpenMock} onClose={onCloseMock}>
          <SpeedDialAction tooltipTitle="Action 1" />
        </SpeedDial>
      </ThemeProvider>
    );

    expect(queryByText("Action 1")).toBeNull();

    fireEvent.press(getByLabelText("SpeedDial Fab"));
    expect(onOpenMock).toHaveBeenCalledTimes(1);
  });
});
