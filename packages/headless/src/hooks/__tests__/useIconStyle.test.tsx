import { renderHook } from "@testing-library/react-native";
import { useIconStyle } from "../useIconStyle";
import { useTokens } from "../../theme";

jest.mock("../../theme", () => ({
  useTokens: jest.fn(),
}));

describe("useIconStyle", () => {
  const mockTokens = {
    fontSize: {
      md: 16,
      lg: 20,
    },
    color: {
      text: {
        primary: "primary",
        secondary: "secondary",
        tertiary: "tertiary",
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useTokens as jest.Mock).mockReturnValue(mockTokens);
  });

  it("should return button icon defaults", () => {
    const { result } = renderHook(() => useIconStyle("button"));
    expect(result.current).toEqual({ size: 16, color: "inherit" });
  });

  it("should return input icon defaults", () => {
    const { result } = renderHook(() => useIconStyle("input"));
    expect(result.current).toEqual({ size: 20, color: "tertiary" });
  });

  it("should return select icon defaults", () => {
    const { result } = renderHook(() => useIconStyle("select"));
    expect(result.current).toEqual({ size: 20, color: "tertiary" });
  });

  it("should return list icon defaults", () => {
    const { result } = renderHook(() => useIconStyle("list"));
    expect(result.current).toEqual({ size: 16, color: "secondary" });
  });
});
