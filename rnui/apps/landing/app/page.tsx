import styles from "./page.module.css";

const COMPONENTS = [
  "Button","Input","Card","Badge","Modal","BottomSheet","Toast","Tabs",
  "Accordion","Select","Checkbox","Switch","Slider","Avatar","Skeleton",
  "Tooltip","Drawer","Dialog","Snackbar","FAB","Stepper","Timeline",
  "Rating","Pagination","Table","Chip","Divider","Progress","Spinner",
  "Text","Icon","List","Menu","Popover","Radio","SearchBar","TextArea",
  "Toggle","Alert","Banner","Breadcrumb","Form","Grid","Header",
  "AppBar","BottomNav","SpeedDial","ImageList","AutoComplete","Link",
  "Paper","Pressable","ToggleButton","FormField","PasswordInput","EmptyState",
];

const FEATURES = [
  {
    n: "01",
    title: "Design Tokens",
    desc: "Primitive → semantic → component tokens. Override at any level for full brand customization.",
  },
  {
    n: "02",
    title: "Accessibility First",
    desc: "ARIA roles, focus management, and screen reader support built into every component.",
  },
  {
    n: "03",
    title: "New Architecture",
    desc: "Built for RN 0.83+. Powered by Reanimated 3 & Gesture Handler 2 from day one.",
  },
  {
    n: "04",
    title: "55+ Components",
    desc: "Button to Timeline. Every component you need to ship a production React Native app.",
  },
  {
    n: "05",
    title: "Dark & Light Mode",
    desc: "System-aware theming out of the box. Switch at runtime with zero flicker.",
  },
  {
    n: "06",
    title: "Fully Typed",
    desc: "TypeScript first. Complete type definitions and autocomplete for every prop.",
  },
];

export default function Home() {
  return (
    <main className={styles.main}>

      {/* NAV */}
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <a href="/" className={styles.logo}>RNUI</a>
          <div className={styles.navLinks}>
            <a href="https://github.com/truongnat/rnui" className={styles.navLink}>Docs</a>
            <a href="https://github.com/truongnat/rnui" className={styles.navLink}>Components</a>
            <a href="https://github.com/truongnat/rnui" target="_blank" rel="noopener noreferrer" className={styles.navLink}>GitHub</a>
          </div>
          <a href="https://github.com/truongnat/rnui" target="_blank" rel="noopener noreferrer" className={styles.navCta}>
            Get Started →
          </a>
        </div>
      </nav>

      {/* HERO — centered layout */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.badge}>New Architecture Ready</span>
          <h1 className={styles.h1}>
            The React Native<br />UI Framework.
          </h1>
          <p className={styles.heroSub}>
            Dual-layer design system for iOS &amp; Android.
            Use styled components out of the box, or take full
            control with zero-style headless hooks.
          </p>
          <div className={styles.heroCtas}>
            <a href="https://github.com/truongnat/rnui" target="_blank" rel="noopener noreferrer" className={styles.ctaPrimary}>
              Get Started →
            </a>
            <a href="https://github.com/truongnat/rnui" target="_blank" rel="noopener noreferrer" className={styles.ctaSecondary}>
              View on GitHub
            </a>
          </div>
          {/* Terminal card centered below hero text */}
          <div className={styles.terminalCard}>
            <div className={styles.terminalHeader}>
              <span className={styles.terminalDot} />
              <span className={styles.terminalDot} />
              <span className={styles.terminalDot} />
              <span className={styles.terminalTitle}>terminal</span>
            </div>
            <pre className={styles.terminalBody}>
              <code>
                <span className={styles.cPrompt}>$</span>{" bun add @rnui/ui @rnui/tokens\n"}
                <span className={styles.cMuted}>{"  "}installing...</span>{"\n\n"}
                <span className={styles.cGreen}>{"  ✓"}</span>{" @rnui/tokens\n"}
                <span className={styles.cGreen}>{"  ✓"}</span>{" @rnui/headless\n"}
                <span className={styles.cGreen}>{"  ✓"}</span>{" @rnui/ui\n\n"}
                <span className={styles.cMuted}>{"  "}3 packages installed</span>
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className={styles.stats}>
        <div className={styles.statsInner}>
          <div className={styles.statItem}>
            <span className={styles.statNum}>55+</span>
            <span className={styles.statLabel}>Components</span>
          </div>
          <div className={styles.statDiv} />
          <div className={styles.statItem}>
            <span className={styles.statNum}>3</span>
            <span className={styles.statLabel}>Packages</span>
          </div>
          <div className={styles.statDiv} />
          <div className={styles.statItem}>
            <span className={styles.statNum}>iOS &amp; Android</span>
            <span className={styles.statLabel}>New Architecture</span>
          </div>
        </div>
      </div>

      {/* DUAL LAYER */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>Choose your layer.</h2>
            <p className={styles.sectionSub}>
              Styled components when you want speed. Headless hooks when you want control.
            </p>
          </div>
          <div className={styles.codeGrid}>
            <div className={styles.codeCard}>
              <div className={styles.codeCardTop}>
                <span className={styles.codeFile}>@rnui/ui</span>
                <span className={styles.codeBadge}>Styled</span>
              </div>
              <pre className={styles.codeBlock}>
                <code>
                  <span className={styles.iRed}>import</span>{" { Button } "}<span className={styles.iRed}>from</span>{" "}<span className={styles.iBrown}>&quot;@rnui/ui&quot;</span>{"\n\n"}
                  <span className={styles.iMuted}>{"// Full-featured, themed"}</span>{"\n"}
                  {"<"}<span className={styles.iBlue}>Button</span>{"\n"}
                  {"  "}<span className={styles.iGreen}>label</span>{"="}<span className={styles.iBrown}>&quot;Save changes&quot;</span>{"\n"}
                  {"  "}<span className={styles.iGreen}>variant</span>{"="}<span className={styles.iBrown}>&quot;solid&quot;</span>{"\n"}
                  {"  "}<span className={styles.iGreen}>onPress</span>{"={save}"}{"\n"}
                  {"/>"}
                </code>
              </pre>
            </div>
            <div className={styles.codeCard}>
              <div className={styles.codeCardTop}>
                <span className={styles.codeFile}>@rnui/headless</span>
                <span className={styles.codeBadge}>Headless</span>
              </div>
              <pre className={styles.codeBlock}>
                <code>
                  <span className={styles.iRed}>import</span>{" { usePressable } "}<span className={styles.iRed}>from</span>{"\n"}
                  {"  "}<span className={styles.iBrown}>&quot;@rnui/headless&quot;</span>{"\n\n"}
                  <span className={styles.iMuted}>{"// Zero styles, full control"}</span>{"\n"}
                  <span className={styles.iRed}>const</span>{" { gesture, animatedStyle } ="}{"\n"}
                  {"  usePressable({"}{"\n"}
                  {"    "}<span className={styles.iGreen}>onPress</span>{": save,"}{"\n"}
                  {"    "}<span className={styles.iGreen}>feedbackMode</span>{": "}<span className={styles.iBrown}>&quot;scale&quot;</span>{","}{"\n"}
                  {"  });"}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>Built for the modern stack.</h2>
            <p className={styles.sectionSub}>Everything you need to ship world-class React Native apps.</p>
          </div>
          <div className={styles.featGrid}>
            {FEATURES.map((f) => (
              <div key={f.n} className={styles.featCard}>
                <span className={styles.featNum}>{f.n}</span>
                <h3 className={styles.featTitle}>{f.title}</h3>
                <p className={styles.featDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPONENTS */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>55+ Components.</h2>
            <p className={styles.sectionSub}>More shipping every week.</p>
          </div>
          <p className={styles.componentList}>
            {COMPONENTS.join(" · ")}
          </p>
        </div>
      </section>

      {/* GETTING STARTED */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>Up and running in minutes.</h2>
            <p className={styles.sectionSub}>Three steps to your first component.</p>
          </div>
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepNum}>01</div>
              <div className={styles.stepBody}>
                <h3 className={styles.stepTitle}>Install packages</h3>
                <p className={styles.stepDesc}>Add RNUI to your React Native project.</p>
                <pre className={styles.stepCode}>
                  <code><span className={styles.cPrompt}>$</span>{" bun add @rnui/ui @rnui/tokens"}</code>
                </pre>
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>02</div>
              <div className={styles.stepBody}>
                <h3 className={styles.stepTitle}>Wrap your app</h3>
                <p className={styles.stepDesc}>Add ThemeProvider at the root.</p>
                <pre className={styles.stepCode}>
                  <code>
                    <span className={styles.iRed}>import</span>{" { ThemeProvider } "}<span className={styles.iRed}>from</span>{" "}<span className={styles.iBrown}>&quot;@rnui/ui&quot;</span>{"\n\n"}
                    {"<"}<span className={styles.iBlue}>ThemeProvider</span>{" "}<span className={styles.iGreen}>colorScheme</span>{"="}<span className={styles.iBrown}>&quot;system&quot;</span>{">"}{"\n"}
                    {"  <YourApp />"}{"\n"}
                    {"</"}<span className={styles.iBlue}>ThemeProvider</span>{">"}
                  </code>
                </pre>
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>03</div>
              <div className={styles.stepBody}>
                <h3 className={styles.stepTitle}>Start building</h3>
                <p className={styles.stepDesc}>Import and use components anywhere.</p>
                <pre className={styles.stepCode}>
                  <code>
                    <span className={styles.iRed}>import</span>{" { Button, Input, Card }"}{"\n"}
                    {"  "}<span className={styles.iRed}>from</span>{" "}<span className={styles.iBrown}>&quot;@rnui/ui&quot;</span>{"\n\n"}
                    {"<"}<span className={styles.iBlue}>Card</span>{">"}{"\n"}
                    {"  <"}<span className={styles.iBlue}>Input</span>{" "}<span className={styles.iGreen}>placeholder</span>{"="}<span className={styles.iBrown}>&quot;Email&quot;</span>{" />"}{"\n"}
                    {"  <"}<span className={styles.iBlue}>Button</span>{" "}<span className={styles.iGreen}>label</span>{"="}<span className={styles.iBrown}>&quot;Sign in&quot;</span>{" />"}{"\n"}
                    {"</"}<span className={styles.iBlue}>Card</span>{">"}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>Start building.</h2>
          <p className={styles.ctaSub}>Open source. Free forever. No lock-in.</p>
          <div className={styles.ctaBtns}>
            <a href="https://github.com/truongnat/rnui" target="_blank" rel="noopener noreferrer" className={styles.ctaPrimaryDark}>
              Read the Docs →
            </a>
            <a href="https://github.com/truongnat/rnui" target="_blank" rel="noopener noreferrer" className={styles.ctaSecondaryDark}>
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <a href="/" className={styles.logo}>RNUI</a>
            <p className={styles.footerTagline}>The React Native UI Framework for modern apps.</p>
          </div>
          <div className={styles.footerLinks}>
            <a href="https://github.com/truongnat/rnui" className={styles.footerLink}>Docs</a>
            <a href="https://github.com/truongnat/rnui" className={styles.footerLink}>GitHub</a>
            <a href="https://github.com/truongnat/rnui" className={styles.footerLink}>Components</a>
            <a href="https://github.com/truongnat/rnui" className={styles.footerLink}>Getting Started</a>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>© 2025 RNUI. Open source under MIT License.</p>
        </div>
      </footer>

    </main>
  );
}
