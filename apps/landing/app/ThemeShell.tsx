"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import styles from "./page.module.css";

// ─── Brand definitions ────────────────────────────────────────────
export interface BrandDef {
  name: string;
  emoji: string;
  desc: string;
  pkg: string;
  light: Record<string, string>;
  dark: Record<string, string>;
}

export const BRANDS: BrandDef[] = [
  {
    name: "Default", emoji: "🟣", desc: "Violet & Amber", pkg: "defaultBrand",
    light: {
      "--brand":        "#7C3AED",
      "--brand-hover":  "#6D28D9",
      "--brand-subtle": "#EDE9FE",
      "--brand-text":   "#5B21B6",
      "--accent":       "#F59E0B",
      "--accent-hover": "#D97706",
      "--accent-subtle":"#FFFBEB",
      "--accent-text":  "#92400E",
      "--bg":           "#FAFAF9",
      "--surface":      "#FFFFFF",
      "--surface-2":    "#F5F4F2",
      "--border":       "#E8E6E1",
      "--text":         "#1A1A18",
      "--text-2":       "#6B6B63",
      "--text-3":       "#A8A89E",
    },
    dark: {
      "--brand":        "#A78BFA",
      "--brand-hover":  "#C4B5FD",
      "--brand-subtle": "#2E1065",
      "--brand-text":   "#C4B5FD",
      "--accent":       "#FBBF24",
      "--accent-hover": "#FCD34D",
      "--accent-subtle":"rgba(251,191,36,0.12)",
      "--accent-text":  "#FBBF24",
      "--bg":           "#0D0D14",
      "--surface":      "#131320",
      "--surface-2":    "#1A1A28",
      "--border":       "#2A2A3E",
      "--text":         "#F0EFF5",
      "--text-2":       "#9896A8",
      "--text-3":       "#5C5A70",
    },
  },
  {
    name: "Love", emoji: "💗", desc: "Rose & Blush", pkg: "loveBrand",
    light: {
      "--brand":        "#E11D48",
      "--brand-hover":  "#BE123C",
      "--brand-subtle": "#FFE4E6",
      "--brand-text":   "#9F1239",
      "--accent":       "#FB7185",
      "--accent-hover": "#F43F5E",
      "--accent-subtle":"#FFF1F2",
      "--accent-text":  "#9F1239",
      "--bg":           "#FFF5F6",
      "--surface":      "#FFFFFF",
      "--surface-2":    "#FFF0F1",
      "--border":       "#FECDD3",
      "--text":         "#1A0810",
      "--text-2":       "#6B3040",
      "--text-3":       "#A87080",
    },
    dark: {
      "--brand":        "#FB7185",
      "--brand-hover":  "#FDA4AF",
      "--brand-subtle": "#4C0519",
      "--brand-text":   "#FDA4AF",
      "--accent":       "#FDA4AF",
      "--accent-hover": "#FECDD3",
      "--accent-subtle":"rgba(251,113,133,0.12)",
      "--accent-text":  "#FDA4AF",
      "--bg":           "#150609",
      "--surface":      "#1E080D",
      "--surface-2":    "#280C12",
      "--border":       "#3D1520",
      "--text":         "#FFF0F2",
      "--text-2":       "#D4899A",
      "--text-3":       "#7A4050",
    },
  },
  {
    name: "Ocean", emoji: "🌊", desc: "Teal & Cyan", pkg: "oceanBrand",
    light: {
      "--brand":        "#0D9488",
      "--brand-hover":  "#0F766E",
      "--brand-subtle": "#CCFBF1",
      "--brand-text":   "#115E59",
      "--accent":       "#06B6D4",
      "--accent-hover": "#0891B2",
      "--accent-subtle":"#CFFAFE",
      "--accent-text":  "#164E63",
      "--bg":           "#F0FDFB",
      "--surface":      "#FFFFFF",
      "--surface-2":    "#ECFCF9",
      "--border":       "#99F6E4",
      "--text":         "#051714",
      "--text-2":       "#2A5A54",
      "--text-3":       "#6AADA6",
    },
    dark: {
      "--brand":        "#2DD4BF",
      "--brand-hover":  "#5EEAD4",
      "--brand-subtle": "#042F2E",
      "--brand-text":   "#5EEAD4",
      "--accent":       "#22D3EE",
      "--accent-hover": "#67E8F9",
      "--accent-subtle":"rgba(34,211,238,0.12)",
      "--accent-text":  "#22D3EE",
      "--bg":           "#030F0E",
      "--surface":      "#071614",
      "--surface-2":    "#0D1F1D",
      "--border":       "#134E4A",
      "--text":         "#ECFCF9",
      "--text-2":       "#6AADA6",
      "--text-3":       "#2A5A54",
    },
  },
  {
    name: "Forest", emoji: "🌿", desc: "Emerald & Lime", pkg: "forestBrand",
    light: {
      "--brand":        "#059669",
      "--brand-hover":  "#047857",
      "--brand-subtle": "#D1FAE5",
      "--brand-text":   "#065F46",
      "--accent":       "#84CC16",
      "--accent-hover": "#65A30D",
      "--accent-subtle":"#F7FEE7",
      "--accent-text":  "#3F6212",
      "--bg":           "#F2FDF6",
      "--surface":      "#FFFFFF",
      "--surface-2":    "#ECFDF5",
      "--border":       "#A7F3D0",
      "--text":         "#052E1C",
      "--text-2":       "#1E6644",
      "--text-3":       "#5FAD84",
    },
    dark: {
      "--brand":        "#34D399",
      "--brand-hover":  "#6EE7B7",
      "--brand-subtle": "#022C22",
      "--brand-text":   "#6EE7B7",
      "--accent":       "#A3E635",
      "--accent-hover": "#BEF264",
      "--accent-subtle":"rgba(163,230,53,0.12)",
      "--accent-text":  "#A3E635",
      "--bg":           "#030E09",
      "--surface":      "#07160D",
      "--surface-2":    "#0D2016",
      "--border":       "#064E3B",
      "--text":         "#ECFDF7",
      "--text-2":       "#5FAD84",
      "--text-3":       "#1E6644",
    },
  },
  {
    name: "Sunset", emoji: "🌅", desc: "Orange & Amber", pkg: "sunsetBrand",
    light: {
      "--brand":        "#EA580C",
      "--brand-hover":  "#C2410C",
      "--brand-subtle": "#FFEDD5",
      "--brand-text":   "#9A3412",
      "--accent":       "#F59E0B",
      "--accent-hover": "#D97706",
      "--accent-subtle":"#FFFBEB",
      "--accent-text":  "#92400E",
      "--bg":           "#FFFAF5",
      "--surface":      "#FFFFFF",
      "--surface-2":    "#FFF5ED",
      "--border":       "#FED7AA",
      "--text":         "#1C0E05",
      "--text-2":       "#703010",
      "--text-3":       "#B07050",
    },
    dark: {
      "--brand":        "#FB923C",
      "--brand-hover":  "#FDBA74",
      "--brand-subtle": "#431407",
      "--brand-text":   "#FDBA74",
      "--accent":       "#FBBF24",
      "--accent-hover": "#FCD34D",
      "--accent-subtle":"rgba(251,191,36,0.12)",
      "--accent-text":  "#FBBF24",
      "--bg":           "#130900",
      "--surface":      "#1C0E05",
      "--surface-2":    "#261508",
      "--border":       "#7C2D12",
      "--text":         "#FFF5ED",
      "--text-2":       "#B07050",
      "--text-3":       "#703010",
    },
  },
  {
    name: "Midnight", emoji: "🌙", desc: "Purple & Blue", pkg: "midnightBrand",
    light: {
      "--brand":        "#7E22CE",
      "--brand-hover":  "#6B21A8",
      "--brand-subtle": "#F3E8FF",
      "--brand-text":   "#581C87",
      "--accent":       "#3B82F6",
      "--accent-hover": "#2563EB",
      "--accent-subtle":"#EFF6FF",
      "--accent-text":  "#1E3A8A",
      "--bg":           "#FAFAFF",
      "--surface":      "#FFFFFF",
      "--surface-2":    "#F5F3FF",
      "--border":       "#E9D5FF",
      "--text":         "#0E0820",
      "--text-2":       "#3B1F6B",
      "--text-3":       "#8060A8",
    },
    dark: {
      "--brand":        "#C084FC",
      "--brand-hover":  "#D8B4FE",
      "--brand-subtle": "#3B0764",
      "--brand-text":   "#D8B4FE",
      "--accent":       "#60A5FA",
      "--accent-hover": "#93C5FD",
      "--accent-subtle":"rgba(96,165,250,0.12)",
      "--accent-text":  "#60A5FA",
      "--bg":           "#0D0D1A",
      "--surface":      "#12122A",
      "--surface-2":    "#16163A",
      "--border":       "#2A2060",
      "--text":         "#F0EEFF",
      "--text-2":       "#9080C8",
      "--text-3":       "#483878",
    },
  },
];

// ─── Component ────────────────────────────────────────────────────
export function ThemeShell({ children }: { children: React.ReactNode }) {
  const [brandIdx, setBrandIdx] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const applyTheme = useCallback((idx: number, dark: boolean) => {
    const brand = BRANDS[idx];
    const vars = dark ? brand.dark : brand.light;
    const root = document.documentElement;
    Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
    // Also set fixed vars that don't change per brand
    root.style.setProperty("--border-strong", dark ? "#404060" : "#C8C5BE");
    root.style.setProperty("--text-inverse", dark ? "#0D0D14" : "#FFFFFF");
    root.setAttribute("data-theme", dark ? "dark" : "light");
    root.setAttribute("data-brand", brand.name.toLowerCase());
  }, []);

  useEffect(() => {
    applyTheme(brandIdx, isDark);
  }, [brandIdx, isDark, applyTheme]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleBrand = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBrandIdx(Number(e.target.value));
  };

  const toggleDark = () => setIsDark(d => !d);

  const activeBrandColor = isDark
    ? BRANDS[brandIdx].dark["--brand"]
    : BRANDS[brandIdx].light["--brand"];

  return (
    <>
      {/* Unified nav — logo + brand switcher + dark toggle + GitHub */}
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          {/* Logo */}
          <a href="/" className={styles.logo}>
            <span className={styles.logoDot} style={{ background: activeBrandColor }} />
            RNUI
          </a>

          {/* Brand + mode controls */}
          <div className={styles.navControls}>

            {/* Custom brand dropdown */}
            <div className={styles.brandDropdown} ref={dropdownRef}>
              <button
                className={styles.brandTrigger}
                onClick={() => setOpen(o => !o)}
                aria-haspopup="listbox"
                aria-expanded={open}
              >
                <span className={styles.brandTriggerDot} style={{ background: activeBrandColor }} />
                <span className={styles.brandTriggerName}>{BRANDS[brandIdx].name}</span>
                <svg className={`${styles.brandChevron}${open ? " " + styles.brandChevronOpen : ""}`} width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {open && (
                <div className={styles.brandMenu} role="listbox">
                  {BRANDS.map((b, i) => {
                    const isActive = i === brandIdx;
                    const col = isDark ? b.dark["--brand"] : b.light["--brand"];
                    return (
                      <button
                        key={b.name}
                        role="option"
                        aria-selected={isActive}
                        className={`${styles.brandMenuItem}${isActive ? " " + styles.brandMenuItemActive : ""}`}
                        onClick={() => { setBrandIdx(i); setOpen(false); }}
                      >
                        <span className={styles.brandMenuDot} style={{ background: col }} />
                        <span className={styles.brandMenuText}>
                          <span className={styles.brandMenuName}>{b.name}</span>
                          <span className={styles.brandMenuDesc}>{b.desc}</span>
                        </span>
                        {isActive && (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{marginLeft:"auto",flexShrink:0}}>
                            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Dark mode toggle */}
            <button
              className={styles.darkToggle}
              onClick={toggleDark}
              aria-label="Toggle dark mode"
              title={isDark ? "Switch to Light" : "Switch to Dark"}
            >
              {isDark ? "☀️" : "🌙"}
            </button>

            <a
              href="https://github.com/truongnat/rnui"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.navCta}
            >
              GitHub →
            </a>
          </div>
        </div>
      </nav>
      {children}
    </>
  );
}
