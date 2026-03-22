// src/brands/default.ts
import { defineBrand } from "@rnui/tokens";
var defaultBrand = defineBrand({
  id: "default",
  name: "Default",
  description: "Violet & Amber \u2014 premium, warm, developer-focused",
  preview: {
    primary: "#7C3AED",
    secondary: "#F59E0B",
    background: "#FAFAF9"
  },
  light: {
    bg: {
      default: "#FFFFFF",
      subtle: "#F8FAFC",
      muted: "#E2E8F0",
      emphasis: "#94A3B8",
      inverse: "#0F172A",
      overlay: "rgba(0,0,0,0.6)",
      hover: "#F1F5F9",
      disabled: "#F1F5F9"
    },
    surface: {
      default: "#FFFFFF",
      raised: "#FFFFFF",
      overlay: "#FFFFFF",
      sunken: "#F1F5F9",
      hover: "#F8FAFC",
      disabled: "#F1F5F9"
    },
    text: {
      primary: "#020617",
      secondary: "#334155",
      tertiary: "#64748B",
      disabled: "#94A3B8",
      inverse: "#FFFFFF",
      link: "#7C3AED",
      onBrand: "#FFFFFF",
      onAccent: "#1C1917"
    },
    border: {
      default: "#E2E8F0",
      subtle: "#F1F5F9",
      strong: "#94A3B8",
      input: "#CBD5E1",
      focus: "#7C3AED",
      error: "#EF4444"
    },
    brand: {
      default: "#7C3AED",
      hover: "#6D28D9",
      active: "#5B21B6",
      subtle: "#EDE9FE",
      muted: "#DDD6FE",
      text: "#5B21B6"
    },
    accent: {
      default: "#F59E0B",
      hover: "#D97706",
      active: "#B45309",
      subtle: "#FFFBEB",
      muted: "#FEF3C7",
      text: "#92400E",
      onAccent: "#1C1917"
    },
    success: {
      bg: "#F0FDF4",
      text: "#166534",
      border: "#22C55E",
      icon: "#16A34A"
    },
    warning: {
      bg: "#FFFBEB",
      text: "#92400E",
      border: "#F59E0B",
      icon: "#D97706"
    },
    error: {
      bg: "#FEF2F2",
      text: "#991B1B",
      border: "#EF4444",
      icon: "#DC2626"
    },
    info: {
      bg: "#EFF6FF",
      text: "#1E3A8A",
      border: "#3B82F6",
      icon: "#2563EB"
    }
  },
  dark: {
    bg: {
      default: "#0D0D14",
      subtle: "#131320",
      muted: "#1E1E2E",
      emphasis: "#3A3A50",
      inverse: "#F0EFF5",
      overlay: "rgba(0,0,0,0.8)",
      hover: "#1A1A28",
      disabled: "#16161F"
    },
    surface: {
      default: "#131320",
      raised: "#1A1A28",
      overlay: "#16162A",
      sunken: "#0A0A10",
      hover: "#1A1A28",
      disabled: "#0D0D14"
    },
    text: {
      primary: "#F0EFF5",
      secondary: "#C4C3D0",
      tertiary: "#7C7A90",
      disabled: "#4A485A",
      inverse: "#0D0D14",
      link: "#A78BFA",
      onBrand: "#FFFFFF",
      onAccent: "#1C1917"
    },
    border: {
      default: "#2A2A3E",
      subtle: "#1E1E2E",
      strong: "#404058",
      input: "#35354A",
      focus: "#A78BFA",
      error: "#F87171"
    },
    brand: {
      default: "#A78BFA",
      hover: "#C4B5FD",
      active: "#DDD6FE",
      subtle: "#2E1065",
      muted: "#3B1585",
      text: "#C4B5FD"
    },
    accent: {
      default: "#FBBF24",
      hover: "#FCD34D",
      active: "#FDE68A",
      subtle: "rgba(251,191,36,0.12)",
      muted: "rgba(251,191,36,0.20)",
      text: "#FBBF24",
      onAccent: "#1C1917"
    },
    success: {
      bg: "rgba(34,197,94,0.12)",
      text: "#4ADE80",
      border: "#16A34A",
      icon: "#4ADE80"
    },
    warning: {
      bg: "rgba(245,158,11,0.12)",
      text: "#FBBF24",
      border: "#D97706",
      icon: "#FBBF24"
    },
    error: {
      bg: "rgba(239,68,68,0.12)",
      text: "#F87171",
      border: "#DC2626",
      icon: "#F87171"
    },
    info: {
      bg: "rgba(59,130,246,0.12)",
      text: "#60A5FA",
      border: "#2563EB",
      icon: "#60A5FA"
    }
  }
});

// src/brands/love.ts
import { defineBrand as defineBrand2 } from "@rnui/tokens";
var loveBrand = defineBrand2({
  id: "love",
  name: "Love",
  description: "Rose & Blush \u2014 romantic, warm, tender",
  preview: {
    primary: "#E11D48",
    secondary: "#FB7185",
    background: "#FFF1F2"
  },
  light: {
    bg: {
      default: "#FFFFFF",
      subtle: "#FFF5F6",
      muted: "#FFE4E6",
      emphasis: "#FDA4AF",
      inverse: "#1A0810",
      overlay: "rgba(50,0,20,0.6)",
      hover: "#FFF0F1",
      disabled: "#FFF0F1"
    },
    surface: {
      default: "#FFFFFF",
      raised: "#FFFFFF",
      overlay: "#FFFFFF",
      sunken: "#FFF0F1",
      hover: "#FFF5F6",
      disabled: "#FFF0F1"
    },
    text: {
      primary: "#1A0810",
      secondary: "#6B2035",
      tertiary: "#A87080",
      disabled: "#CDA0A8",
      inverse: "#FFFFFF",
      link: "#E11D48",
      onBrand: "#FFFFFF",
      onAccent: "#FFFFFF"
    },
    border: {
      default: "#FECDD3",
      subtle: "#FFE4E6",
      strong: "#FDA4AF",
      input: "#FCA5A5",
      focus: "#E11D48",
      error: "#DC2626"
    },
    brand: {
      default: "#E11D48",
      hover: "#BE123C",
      active: "#9F1239",
      subtle: "#FFE4E6",
      muted: "#FECDD3",
      text: "#9F1239"
    },
    accent: {
      default: "#FB7185",
      hover: "#F43F5E",
      active: "#E11D48",
      subtle: "#FFF1F2",
      muted: "#FFE4E6",
      text: "#9F1239",
      onAccent: "#1C1917"
    },
    success: {
      bg: "#F0FDF4",
      text: "#166534",
      border: "#22C55E",
      icon: "#16A34A"
    },
    warning: {
      bg: "#FFFBEB",
      text: "#92400E",
      border: "#F59E0B",
      icon: "#D97706"
    },
    error: {
      bg: "#FEF2F2",
      text: "#991B1B",
      border: "#EF4444",
      icon: "#DC2626"
    },
    info: {
      bg: "#EFF6FF",
      text: "#1E3A8A",
      border: "#3B82F6",
      icon: "#2563EB"
    }
  },
  dark: {
    bg: {
      default: "#150608",
      subtle: "#1E0A0D",
      muted: "#2A1018",
      emphasis: "#5A2030",
      inverse: "#FFF0F2",
      overlay: "rgba(0,0,0,0.85)",
      hover: "#220B10",
      disabled: "#1A0810"
    },
    surface: {
      default: "#1E0A0D",
      raised: "#280C12",
      overlay: "#220A10",
      sunken: "#100408",
      hover: "#280C12",
      disabled: "#150608"
    },
    text: {
      primary: "#FFF0F2",
      secondary: "#F4A0B0",
      tertiary: "#A85060",
      disabled: "#5A2030",
      inverse: "#150608",
      link: "#FDA4AF",
      onBrand: "#FFFFFF",
      onAccent: "#1A0810"
    },
    border: {
      default: "#3D1520",
      subtle: "#2A1018",
      strong: "#6B2535",
      input: "#5A2030",
      focus: "#FB7185",
      error: "#F87171"
    },
    brand: {
      default: "#FB7185",
      hover: "#FDA4AF",
      active: "#FECDD3",
      subtle: "#4C0519",
      muted: "#881337",
      text: "#FDA4AF"
    },
    accent: {
      default: "#FDA4AF",
      hover: "#FECDD3",
      active: "#FFE4E6",
      subtle: "rgba(251,113,133,0.12)",
      muted: "rgba(251,113,133,0.20)",
      text: "#FDA4AF",
      onAccent: "#1A0810"
    },
    success: {
      bg: "rgba(34,197,94,0.12)",
      text: "#4ADE80",
      border: "#16A34A",
      icon: "#4ADE80"
    },
    warning: {
      bg: "rgba(245,158,11,0.12)",
      text: "#FBBF24",
      border: "#D97706",
      icon: "#FBBF24"
    },
    error: {
      bg: "rgba(239,68,68,0.12)",
      text: "#F87171",
      border: "#DC2626",
      icon: "#F87171"
    },
    info: {
      bg: "rgba(59,130,246,0.12)",
      text: "#60A5FA",
      border: "#2563EB",
      icon: "#60A5FA"
    }
  }
});

// src/brands/ocean.ts
import { defineBrand as defineBrand3 } from "@rnui/tokens";
var oceanBrand = defineBrand3({
  id: "ocean",
  name: "Ocean",
  description: "Teal & Cyan \u2014 calm, deep, trustworthy",
  preview: {
    primary: "#0D9488",
    secondary: "#06B6D4",
    background: "#F0FDFA"
  },
  light: {
    bg: {
      default: "#FFFFFF",
      subtle: "#F0FDFB",
      muted: "#CCFBF1",
      emphasis: "#5EEAD4",
      inverse: "#042F2E",
      overlay: "rgba(0,20,20,0.6)",
      hover: "#E6FBF6",
      disabled: "#E6FBF6"
    },
    surface: {
      default: "#FFFFFF",
      raised: "#FFFFFF",
      overlay: "#FFFFFF",
      sunken: "#E6FBF6",
      hover: "#F0FDFB",
      disabled: "#E6FBF6"
    },
    text: {
      primary: "#042F2E",
      secondary: "#134E4A",
      tertiary: "#2DD4BF",
      disabled: "#7ED8CE",
      inverse: "#FFFFFF",
      link: "#0D9488",
      onBrand: "#FFFFFF",
      onAccent: "#083344"
    },
    border: {
      default: "#99F6E4",
      subtle: "#CCFBF1",
      strong: "#2DD4BF",
      input: "#5EEAD4",
      focus: "#0D9488",
      error: "#EF4444"
    },
    brand: {
      default: "#0D9488",
      hover: "#0F766E",
      active: "#115E59",
      subtle: "#CCFBF1",
      muted: "#99F6E4",
      text: "#115E59"
    },
    accent: {
      default: "#06B6D4",
      hover: "#0891B2",
      active: "#0E7490",
      subtle: "#CFFAFE",
      muted: "#A5F3FC",
      text: "#164E63",
      onAccent: "#FFFFFF"
    },
    success: {
      bg: "#F0FDF4",
      text: "#166534",
      border: "#22C55E",
      icon: "#16A34A"
    },
    warning: {
      bg: "#FFFBEB",
      text: "#92400E",
      border: "#F59E0B",
      icon: "#D97706"
    },
    error: {
      bg: "#FEF2F2",
      text: "#991B1B",
      border: "#EF4444",
      icon: "#DC2626"
    },
    info: {
      bg: "#CFFAFE",
      text: "#164E63",
      border: "#06B6D4",
      icon: "#0891B2"
    }
  },
  dark: {
    bg: {
      default: "#030F0E",
      subtle: "#071614",
      muted: "#0D1F1D",
      emphasis: "#134E4A",
      inverse: "#ECFCF9",
      overlay: "rgba(0,0,0,0.85)",
      hover: "#0D1F1D",
      disabled: "#071614"
    },
    surface: {
      default: "#071614",
      raised: "#0D1F1D",
      overlay: "#0A1A18",
      sunken: "#020B0A",
      hover: "#0D1F1D",
      disabled: "#030F0E"
    },
    text: {
      primary: "#ECFCF9",
      secondary: "#99F6E4",
      tertiary: "#2DD4BF",
      disabled: "#0F766E",
      inverse: "#030F0E",
      link: "#2DD4BF",
      onBrand: "#FFFFFF",
      onAccent: "#083344"
    },
    border: {
      default: "#134E4A",
      subtle: "#0D1F1D",
      strong: "#0F766E",
      input: "#0F766E",
      focus: "#2DD4BF",
      error: "#F87171"
    },
    brand: {
      default: "#2DD4BF",
      hover: "#5EEAD4",
      active: "#99F6E4",
      subtle: "#042F2E",
      muted: "#134E4A",
      text: "#5EEAD4"
    },
    accent: {
      default: "#22D3EE",
      hover: "#67E8F9",
      active: "#A5F3FC",
      subtle: "rgba(34,211,238,0.12)",
      muted: "rgba(34,211,238,0.20)",
      text: "#22D3EE",
      onAccent: "#083344"
    },
    success: {
      bg: "rgba(34,197,94,0.12)",
      text: "#4ADE80",
      border: "#16A34A",
      icon: "#4ADE80"
    },
    warning: {
      bg: "rgba(245,158,11,0.12)",
      text: "#FBBF24",
      border: "#D97706",
      icon: "#FBBF24"
    },
    error: {
      bg: "rgba(239,68,68,0.12)",
      text: "#F87171",
      border: "#DC2626",
      icon: "#F87171"
    },
    info: {
      bg: "rgba(34,211,238,0.12)",
      text: "#22D3EE",
      border: "#0891B2",
      icon: "#22D3EE"
    }
  }
});

// src/brands/forest.ts
import { defineBrand as defineBrand4 } from "@rnui/tokens";
var forestBrand = defineBrand4({
  id: "forest",
  name: "Forest",
  description: "Emerald & Lime \u2014 fresh, natural, growth",
  preview: {
    primary: "#059669",
    secondary: "#84CC16",
    background: "#F0FDF4"
  },
  light: {
    bg: {
      default: "#FFFFFF",
      subtle: "#F0FDF4",
      muted: "#D1FAE5",
      emphasis: "#6EE7B7",
      inverse: "#022C22",
      overlay: "rgba(0,20,10,0.6)",
      hover: "#ECFDF5",
      disabled: "#ECFDF5"
    },
    surface: {
      default: "#FFFFFF",
      raised: "#FFFFFF",
      overlay: "#FFFFFF",
      sunken: "#ECFDF5",
      hover: "#F0FDF4",
      disabled: "#ECFDF5"
    },
    text: {
      primary: "#022C22",
      secondary: "#065F46",
      tertiary: "#34D399",
      disabled: "#86EFAC",
      inverse: "#FFFFFF",
      link: "#059669",
      onBrand: "#FFFFFF",
      onAccent: "#1A2E05"
    },
    border: {
      default: "#A7F3D0",
      subtle: "#D1FAE5",
      strong: "#34D399",
      input: "#6EE7B7",
      focus: "#059669",
      error: "#EF4444"
    },
    brand: {
      default: "#059669",
      hover: "#047857",
      active: "#065F46",
      subtle: "#D1FAE5",
      muted: "#A7F3D0",
      text: "#065F46"
    },
    accent: {
      default: "#84CC16",
      hover: "#65A30D",
      active: "#4D7C0F",
      subtle: "#F7FEE7",
      muted: "#ECFCCB",
      text: "#3F6212",
      onAccent: "#1A2E05"
    },
    success: {
      bg: "#F0FDF4",
      text: "#166534",
      border: "#22C55E",
      icon: "#16A34A"
    },
    warning: {
      bg: "#FFFBEB",
      text: "#92400E",
      border: "#F59E0B",
      icon: "#D97706"
    },
    error: {
      bg: "#FEF2F2",
      text: "#991B1B",
      border: "#EF4444",
      icon: "#DC2626"
    },
    info: {
      bg: "#EFF6FF",
      text: "#1E3A8A",
      border: "#3B82F6",
      icon: "#2563EB"
    }
  },
  dark: {
    bg: {
      default: "#030E09",
      subtle: "#07160D",
      muted: "#0D2016",
      emphasis: "#064E3B",
      inverse: "#ECFDF7",
      overlay: "rgba(0,0,0,0.85)",
      hover: "#0D2016",
      disabled: "#07160D"
    },
    surface: {
      default: "#07160D",
      raised: "#0D2016",
      overlay: "#0A1A10",
      sunken: "#020B06",
      hover: "#0D2016",
      disabled: "#030E09"
    },
    text: {
      primary: "#ECFDF7",
      secondary: "#A7F3D0",
      tertiary: "#34D399",
      disabled: "#065F46",
      inverse: "#030E09",
      link: "#34D399",
      onBrand: "#FFFFFF",
      onAccent: "#1A2E05"
    },
    border: {
      default: "#064E3B",
      subtle: "#0D2016",
      strong: "#047857",
      input: "#047857",
      focus: "#34D399",
      error: "#F87171"
    },
    brand: {
      default: "#34D399",
      hover: "#6EE7B7",
      active: "#A7F3D0",
      subtle: "#022C22",
      muted: "#064E3B",
      text: "#6EE7B7"
    },
    accent: {
      default: "#A3E635",
      hover: "#BEF264",
      active: "#D9F99D",
      subtle: "rgba(163,230,53,0.12)",
      muted: "rgba(163,230,53,0.20)",
      text: "#A3E635",
      onAccent: "#1A2E05"
    },
    success: {
      bg: "rgba(34,197,94,0.12)",
      text: "#4ADE80",
      border: "#16A34A",
      icon: "#4ADE80"
    },
    warning: {
      bg: "rgba(245,158,11,0.12)",
      text: "#FBBF24",
      border: "#D97706",
      icon: "#FBBF24"
    },
    error: {
      bg: "rgba(239,68,68,0.12)",
      text: "#F87171",
      border: "#DC2626",
      icon: "#F87171"
    },
    info: {
      bg: "rgba(59,130,246,0.12)",
      text: "#60A5FA",
      border: "#2563EB",
      icon: "#60A5FA"
    }
  }
});

// src/brands/sunset.ts
import { defineBrand as defineBrand5 } from "@rnui/tokens";
var sunsetBrand = defineBrand5({
  id: "sunset",
  name: "Sunset",
  description: "Orange & Amber \u2014 warm, energetic, creative",
  preview: {
    primary: "#EA580C",
    secondary: "#F59E0B",
    background: "#FFF7ED"
  },
  light: {
    bg: {
      default: "#FFFFFF",
      subtle: "#FFFAF5",
      muted: "#FFEDD5",
      emphasis: "#FDBA74",
      inverse: "#1C0E05",
      overlay: "rgba(40,10,0,0.6)",
      hover: "#FFF5ED",
      disabled: "#FFF5ED"
    },
    surface: {
      default: "#FFFFFF",
      raised: "#FFFFFF",
      overlay: "#FFFFFF",
      sunken: "#FFF5ED",
      hover: "#FFFAF5",
      disabled: "#FFF5ED"
    },
    text: {
      primary: "#1C0E05",
      secondary: "#7C2D12",
      tertiary: "#B07050",
      disabled: "#D4A880",
      inverse: "#FFFFFF",
      link: "#EA580C",
      onBrand: "#FFFFFF",
      onAccent: "#1C1917"
    },
    border: {
      default: "#FED7AA",
      subtle: "#FFEDD5",
      strong: "#FDBA74",
      input: "#FCA5A5",
      focus: "#EA580C",
      error: "#DC2626"
    },
    brand: {
      default: "#EA580C",
      hover: "#C2410C",
      active: "#9A3412",
      subtle: "#FFEDD5",
      muted: "#FED7AA",
      text: "#9A3412"
    },
    accent: {
      default: "#F59E0B",
      hover: "#D97706",
      active: "#B45309",
      subtle: "#FFFBEB",
      muted: "#FEF3C7",
      text: "#92400E",
      onAccent: "#1C1917"
    },
    success: {
      bg: "#F0FDF4",
      text: "#166534",
      border: "#22C55E",
      icon: "#16A34A"
    },
    warning: {
      bg: "#FFFBEB",
      text: "#92400E",
      border: "#F59E0B",
      icon: "#D97706"
    },
    error: {
      bg: "#FEF2F2",
      text: "#991B1B",
      border: "#EF4444",
      icon: "#DC2626"
    },
    info: {
      bg: "#EFF6FF",
      text: "#1E3A8A",
      border: "#3B82F6",
      icon: "#2563EB"
    }
  },
  dark: {
    bg: {
      default: "#130900",
      subtle: "#1C0E05",
      muted: "#261508",
      emphasis: "#7C2D12",
      inverse: "#FFF5ED",
      overlay: "rgba(0,0,0,0.85)",
      hover: "#261508",
      disabled: "#1C0E05"
    },
    surface: {
      default: "#1C0E05",
      raised: "#261508",
      overlay: "#201005",
      sunken: "#0E0600",
      hover: "#261508",
      disabled: "#130900"
    },
    text: {
      primary: "#FFF5ED",
      secondary: "#FED7AA",
      tertiary: "#FB923C",
      disabled: "#7C2D12",
      inverse: "#130900",
      link: "#FB923C",
      onBrand: "#FFFFFF",
      onAccent: "#1C1917"
    },
    border: {
      default: "#7C2D12",
      subtle: "#261508",
      strong: "#9A3412",
      input: "#9A3412",
      focus: "#FB923C",
      error: "#F87171"
    },
    brand: {
      default: "#FB923C",
      hover: "#FDBA74",
      active: "#FED7AA",
      subtle: "#431407",
      muted: "#7C2D12",
      text: "#FDBA74"
    },
    accent: {
      default: "#FBBF24",
      hover: "#FCD34D",
      active: "#FDE68A",
      subtle: "rgba(251,191,36,0.12)",
      muted: "rgba(251,191,36,0.20)",
      text: "#FBBF24",
      onAccent: "#1C1917"
    },
    success: {
      bg: "rgba(34,197,94,0.12)",
      text: "#4ADE80",
      border: "#16A34A",
      icon: "#4ADE80"
    },
    warning: {
      bg: "rgba(245,158,11,0.12)",
      text: "#FBBF24",
      border: "#D97706",
      icon: "#FBBF24"
    },
    error: {
      bg: "rgba(239,68,68,0.12)",
      text: "#F87171",
      border: "#DC2626",
      icon: "#F87171"
    },
    info: {
      bg: "rgba(59,130,246,0.12)",
      text: "#60A5FA",
      border: "#2563EB",
      icon: "#60A5FA"
    }
  }
});

// src/brands/midnight.ts
import { defineBrand as defineBrand6 } from "@rnui/tokens";
var midnightBrand = defineBrand6({
  id: "midnight",
  name: "Midnight",
  description: "Deep Purple & Electric Blue \u2014 mysterious, luxury, focus",
  preview: {
    primary: "#7E22CE",
    secondary: "#3B82F6",
    background: "#0D0D1A"
  },
  light: {
    bg: {
      default: "#FFFFFF",
      subtle: "#FAFAFF",
      muted: "#EDE9FE",
      emphasis: "#C4B5FD",
      inverse: "#0E0820",
      overlay: "rgba(10,0,30,0.6)",
      hover: "#F5F3FF",
      disabled: "#F5F3FF"
    },
    surface: {
      default: "#FFFFFF",
      raised: "#FFFFFF",
      overlay: "#FFFFFF",
      sunken: "#F5F3FF",
      hover: "#FAFAFF",
      disabled: "#F5F3FF"
    },
    text: {
      primary: "#0E0820",
      secondary: "#3B1F6B",
      tertiary: "#8060A8",
      disabled: "#B8A8D8",
      inverse: "#FFFFFF",
      link: "#7E22CE",
      onBrand: "#FFFFFF",
      onAccent: "#FFFFFF"
    },
    border: {
      default: "#E9D5FF",
      subtle: "#F3E8FF",
      strong: "#C4B5FD",
      input: "#D8B4FE",
      focus: "#7E22CE",
      error: "#EF4444"
    },
    brand: {
      default: "#7E22CE",
      hover: "#6B21A8",
      active: "#581C87",
      subtle: "#F3E8FF",
      muted: "#E9D5FF",
      text: "#581C87"
    },
    accent: {
      default: "#3B82F6",
      hover: "#2563EB",
      active: "#1D4ED8",
      subtle: "#EFF6FF",
      muted: "#DBEAFE",
      text: "#1E3A8A",
      onAccent: "#FFFFFF"
    },
    success: {
      bg: "#F0FDF4",
      text: "#166534",
      border: "#22C55E",
      icon: "#16A34A"
    },
    warning: {
      bg: "#FFFBEB",
      text: "#92400E",
      border: "#F59E0B",
      icon: "#D97706"
    },
    error: {
      bg: "#FEF2F2",
      text: "#991B1B",
      border: "#EF4444",
      icon: "#DC2626"
    },
    info: {
      bg: "#EFF6FF",
      text: "#1E3A8A",
      border: "#3B82F6",
      icon: "#2563EB"
    }
  },
  dark: {
    bg: {
      default: "#0D0D1A",
      subtle: "#12122A",
      muted: "#16163A",
      emphasis: "#2A2060",
      inverse: "#F0EEFF",
      overlay: "rgba(0,0,0,0.9)",
      hover: "#1A1838",
      disabled: "#0F0F20"
    },
    surface: {
      default: "#12122A",
      raised: "#16163A",
      overlay: "#14143A",
      sunken: "#0A0A18",
      hover: "#1A1838",
      disabled: "#0D0D1A"
    },
    text: {
      primary: "#F0EEFF",
      secondary: "#C4B5FD",
      tertiary: "#9080C8",
      disabled: "#483878",
      inverse: "#0D0D1A",
      link: "#C084FC",
      onBrand: "#FFFFFF",
      onAccent: "#1E3A8A"
    },
    border: {
      default: "#2A2060",
      subtle: "#16163A",
      strong: "#483878",
      input: "#3D2E70",
      focus: "#C084FC",
      error: "#F87171"
    },
    brand: {
      default: "#C084FC",
      hover: "#D8B4FE",
      active: "#E9D5FF",
      subtle: "#3B0764",
      muted: "#581C87",
      text: "#D8B4FE"
    },
    accent: {
      default: "#60A5FA",
      hover: "#93C5FD",
      active: "#BFDBFE",
      subtle: "rgba(96,165,250,0.12)",
      muted: "rgba(96,165,250,0.20)",
      text: "#60A5FA",
      onAccent: "#1E3A8A"
    },
    success: {
      bg: "rgba(34,197,94,0.12)",
      text: "#4ADE80",
      border: "#16A34A",
      icon: "#4ADE80"
    },
    warning: {
      bg: "rgba(245,158,11,0.12)",
      text: "#FBBF24",
      border: "#D97706",
      icon: "#FBBF24"
    },
    error: {
      bg: "rgba(239,68,68,0.12)",
      text: "#F87171",
      border: "#DC2626",
      icon: "#F87171"
    },
    info: {
      bg: "rgba(96,165,250,0.12)",
      text: "#60A5FA",
      border: "#2563EB",
      icon: "#60A5FA"
    }
  }
});

// src/index.ts
import { defineBrand as defineBrand7 } from "@rnui/tokens";
var allBrands = [
  defaultBrand,
  loveBrand,
  oceanBrand,
  forestBrand,
  sunsetBrand,
  midnightBrand
];
function getBrandById(id) {
  const found = allBrands.find((b) => b.id === id);
  if (!found) throw new Error(`[RNUI] Unknown brand id: "${id}"`);
  return found;
}
export {
  allBrands,
  defaultBrand,
  defineBrand7 as defineBrand,
  forestBrand,
  getBrandById,
  loveBrand,
  midnightBrand,
  oceanBrand,
  sunsetBrand
};
//# sourceMappingURL=index.mjs.map