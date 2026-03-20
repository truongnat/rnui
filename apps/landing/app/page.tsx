"use client";

import React from "react";
import "./globals.css";

const COMPONENTS = [
  "Button", "Input", "Card", "Badge", "Modal", "BottomSheet", "Toast", "Tabs",
  "Accordion", "Select", "Checkbox", "Switch", "Slider", "Avatar", "Skeleton",
  "Tooltip", "Drawer", "Dialog", "Snackbar", "FAB", "Stepper", "Timeline",
  "Rating", "Pagination", "Table", "Chip", "Divider", "Progress", "Spinner",
  "Text", "Icon", "List", "Menu", "Popover", "Radio", "SearchBar", "TextArea",
  "Toggle", "Alert", "Banner", "Breadcrumb", "Form", "Grid", "AppBar",
  "BottomNav", "SpeedDial", "ImageList", "AutoComplete", "Link", "Paper",
  "Pressable", "ToggleButton", "FormField", "PasswordInput", "EmptyState",
  "Carousel", "DatePicker", "OTPInput", "SegmentedControl", "TextField",
];

const FEATURES = [
  { n: "01", title: "Design Tokens", desc: "Primitive → semantic → component tokens. Override at any level." },
  { n: "02", title: "62+ Components", desc: "Everything you need to ship production React Native apps." },
  { n: "03", title: "120+ Icons", desc: "Full lucide-react-native library built-in." },
  { n: "04", title: "Dark & Light", desc: "System-aware theming with zero flicker." },
  { n: "05", title: "Headless Hooks", desc: "Zero-style logic hooks for full control." },
  { n: "06", title: "Multi-Brand", desc: "6 preset themes. Create custom brands easily." },
];

const BRANDS = [
  { name: "Default", desc: "Violet & Amber", primary: "#8B5CF6", secondary: "#F59E0B", pkg: "defaultBrand" },
  { name: "Love", desc: "Rose & Blush", primary: "#E11D48", secondary: "#FB7185", pkg: "loveBrand" },
  { name: "Ocean", desc: "Teal & Cyan", primary: "#0D9488", secondary: "#06B6D4", pkg: "oceanBrand" },
  { name: "Forest", desc: "Emerald & Lime", primary: "#059669", secondary: "#84CC16", pkg: "forestBrand" },
  { name: "Sunset", desc: "Orange & Amber", primary: "#EA580C", secondary: "#F59E0B", pkg: "sunsetBrand" },
  { name: "Midnight", desc: "Purple & Blue", primary: "#7E22CE", secondary: "#3B82F6", pkg: "midnightBrand" },
];

export default function Home() {
  return (
    <main className="main">
      {/* Header */}
      <header className="header">
        <div className="headerInner">
          <a href="#" className="logo">RNUI</a>
          <nav className="nav">
            <a href="#features" className="navLink">Features</a>
            <a href="#components" className="navLink">Components</a>
            <a href="#themes" className="navLink">Themes</a>
            <a href="https://github.com/rnui/rnui" className="navLink">GitHub</a>
          </nav>
          <div className="headerActions">
            <a href="https://github.com/rnui/rnui" className="btnSmall btnSmallSecondary">Docs</a>
            <a href="https://github.com/rnui/rnui" className="btnSmall btnSmallPrimary">Get Started</a>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="heroInner">
          <div>
            <div className="heroBadge">v0.1.0 Now Available</div>
            <h1 className="heroTitle">
              The React Native<br />
              <span className="heroTitleGradient">UI Framework</span>
            </h1>
            <p className="heroSubtitle">
              Dual-layer design system for iOS & Android. Use styled components out of the box, 
              or take full control with zero-style headless hooks.
            </p>
            <div className="heroCTAs">
              <a href="https://github.com/rnui/rnui" className="btnPrimary">Get Started →</a>
              <a href="https://github.com/rnui/rnui" className="btnSecondary">View on GitHub</a>
            </div>
          </div>
          
          <div className="heroVisual">
            <div className="codeWindow">
              <div className="codeHeader">
                <div className="codeDot"></div>
                <div className="codeDot"></div>
                <div className="codeDot"></div>
                <span className="codeTitle">terminal</span>
              </div>
              <div className="codeContent">
                <span className="codeLine">
                  <span className="codeKeyword">$</span> bun add @rnui/ui @rnui/tokens
                </span>
                <span className="codeLine">
                  <span className="codeComment">  installing...</span>
                </span>
                <span className="codeLine">
                  <span className="codeKeyword">✓</span> @rnui/tokens
                </span>
                <span className="codeLine">
                  <span className="codeKeyword">✓</span> @rnui/headless
                </span>
                <span className="codeLine">
                  <span className="codeKeyword">✓</span> @rnui/ui
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="statsBar">
        <div className="statsInner">
          <div className="statItem">
            <span className="statNumber">62+</span>
            <span className="statLabel">Components</span>
          </div>
          <div className="statItem">
            <span className="statNumber">120+</span>
            <span className="statLabel">Icons</span>
          </div>
          <div className="statItem">
            <span className="statNumber">4</span>
            <span className="statLabel">Packages</span>
          </div>
          <div className="statItem">
            <span className="statNumber">100%</span>
            <span className="statLabel">TypeScript</span>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="sectionInner">
          <div className="sectionHeader">
            <h2 className="sectionTitle">Built for Modern Apps</h2>
            <p className="sectionSubtitle">Everything you need to ship world-class React Native apps.</p>
          </div>
          <div className="featureGrid">
            {FEATURES.map((f) => (
              <div key={f.n} className="featureCard">
                <span className="featureNumber">{f.n}</span>
                <h3 className="featureTitle">{f.title}</h3>
                <p className="featureDesc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sectionAlt">
        <div className="sectionInner">
          <div className="sectionHeader">
            <h2 className="sectionTitle">62+ Components</h2>
            <p className="sectionSubtitle">More shipping every week.</p>
          </div>
          <div className="componentCloud">
            {COMPONENTS.map((c) => (
              <span key={c} className="componentTag">{c}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="sectionInner">
          <div className="sectionHeader">
            <h2 className="sectionTitle">Brand Presets</h2>
            <p className="sectionSubtitle">6 ready-made themes. Swap with one line.</p>
          </div>
          <div className="brandGrid">
            {BRANDS.map((brand) => (
              <div key={brand.name} className="brandCard">
                <div className="brandPreview" style={{ background: `${brand.primary}11` }}>
                  <div className="brandDots">
                    <div className="brandDot" style={{ background: brand.primary }} />
                    <div className="brandDot" style={{ background: brand.secondary, opacity: 0.7 }} />
                    <div className="brandDot" style={{ background: brand.primary, opacity: 0.3 }} />
                  </div>
                  <div className="brandButton" style={{ background: brand.primary }}>Button</div>
                  <div className="brandBadge" style={{ background: `${brand.secondary}22`, borderColor: brand.secondary, color: brand.secondary }}>Badge</div>
                </div>
                <div className="brandInfo">
                  <span className="brandName">{brand.name}</span>
                  <span className="brandDesc">{brand.desc}</span>
                  <code className="brandPkg">{brand.pkg}</code>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footerContent">
          <div className="footerLinks">
            <a href="https://github.com/rnui/rnui" className="footerLink">GitHub</a>
            <a href="https://rnui.dev" className="footerLink">Documentation</a>
            <a href="https://github.com/rnui/rnui/issues" className="footerLink">Issues</a>
            <a href="https://github.com/rnui/rnui/blob/main/CHANGELOG.md" className="footerLink">Changelog</a>
          </div>
          <p className="footerCopyright">© 2026 RNUI Project. MIT License.</p>
        </div>
      </footer>
    </main>
  );
}
