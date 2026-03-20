import styles from "./page.module.css";

const COMPONENTS = [
  "Button", "Input", "Card", "Badge", "Modal", "BottomSheet", "Toast",
  "Tabs", "Accordion", "Select", "Checkbox", "Switch", "Slider", "Avatar",
  "Skeleton", "Tooltip", "Drawer", "Dialog", "Snackbar", "FAB", "Stepper",
  "Timeline", "Rating", "Pagination", "Table", "Chip", "Divider", "Progress",
  "Spinner", "Text", "Heading", "Icon", "Image", "List", "Menu",
  "Popover", "Radio", "ScrollView", "SearchBar", "Sheet", "Tag",
  "TextArea", "Toggle", "ActionSheet", "Alert", "Banner", "Breadcrumb",
  "Calendar", "ColorPicker", "DatePicker", "Empty", "Form", "Grid",
  "Header", "KeyboardAvoidingView",
];

const FEATURES = [
  {
    icon: "🎨",
    title: "Design Tokens",
    desc: "Primitive → semantic → component tokens. Full theme override support at every level.",
  },
  {
    icon: "♿",
    title: "Accessibility First",
    desc: "ARIA roles, focus management, and screen reader support built-in by default.",
  },
  {
    icon: "⚡",
    title: "New Architecture",
    desc: "Built for RN 0.83+. Powered by Reanimated 3 & Gesture Handler 2.",
  },
  {
    icon: "🎭",
    title: "55+ Components",
    desc: "Button, Input, Modal, BottomSheet, Toast, and many more production-ready components.",
  },
  {
    icon: "🌙",
    title: "Dark & Light Mode",
    desc: "System-aware theming out of the box. Switch themes at runtime with no flicker.",
  },
  {
    icon: "🔧",
    title: "Fully Typed",
    desc: "TypeScript first. Complete type definitions. Autocomplete everywhere.",
  },
];

export default function Home() {
  return (
    <main className={styles.main}>
      {/* NAV */}
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <a href="/" className={styles.logo}>
            <span className={styles.logoMark}>RN</span>
            <span className={styles.logoText}>UI</span>
          </a>
          <div className={styles.navLinks}>
            <a href="https://github.com/truongnat/rnui" className={styles.navLink}>Docs</a>
            <a href="https://github.com/truongnat/rnui" className={styles.navLink}>Components</a>
            <a href="https://github.com/truongnat/rnui" className={styles.navLink}>GitHub</a>
          </div>
          <a
            href="https://github.com/truongnat/rnui"
            className={styles.navCta}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Started
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={styles.heroBadge}>
            <span className={styles.heroBadgeDot} />
            New Architecture Ready
          </div>
          <h1 className={styles.heroH1}>
            The React Native UI Framework
            <br />
            <span className={styles.heroGradient}>for Modern Apps</span>
          </h1>
          <p className={styles.heroSub}>
            Dual-layer design system. 55+ components. iOS &amp; Android.
            <br />
            Built for performance.
          </p>
          <div className={styles.heroCtas}>
            <a
              href="https://github.com/truongnat/rnui"
              className={styles.ctaPrimary}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Started <span>→</span>
            </a>
            <a
              href="https://github.com/truongnat/rnui"
              className={styles.ctaSecondary}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
          </div>
          <div className={styles.heroInstall}>
            <span className={styles.installPrompt}>$</span>
            <code className={styles.installCode}>bun add @rnui/ui</code>
            <button className={styles.installCopy} aria-label="Copy install command" title="Copy">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <div className={styles.statsBar}>
        <div className={styles.statsInner}>
          <div className={styles.statItem}>
            <span className={styles.statNum}>55+</span>
            <span className={styles.statLabel}>Components</span>
          </div>
          <div className={styles.statSep} aria-hidden="true" />
          <div className={styles.statItem}>
            <span className={styles.statNum}>3</span>
            <span className={styles.statLabel}>Packages</span>
          </div>
          <div className={styles.statSep} aria-hidden="true" />
          <div className={styles.statItem}>
            <span className={styles.statNum}>New Arch</span>
            <span className={styles.statLabel}>First</span>
          </div>
        </div>
      </div>

      {/* DUAL LAYER */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Choose Your Layer</h2>
            <p className={styles.sectionSub}>
              Use styled components out of the box, or take full control with headless hooks.
            </p>
          </div>
          <div className={styles.dualGrid}>
            {/* Styled */}
            <div className={styles.codeCard}>
              <div className={styles.codeCardHeader}>
                <div className={styles.codeCardDots}>
                  <span className={styles.dot} style={{background:"#FF5F57"}}/>
                  <span className={styles.dot} style={{background:"#FEBC2E"}}/>
                  <span className={styles.dot} style={{background:"#28C840"}}/>
                </div>
                <div className={styles.codeCardTitle}>
                  <span className={styles.pkgBadge}>@rnui/ui</span>
                  <span className={styles.pkgDesc}>Styled out of the box</span>
                </div>
              </div>
              <pre className={styles.codeBlock}><code>{`<span class="cm">// Styled Layer</span>
<span class="ck">import</span> <span class="cp">{'{'}</span> <span class="cn">Button</span> <span class="cp">{'}'}</span> <span class="ck">from</span> <span class="cs">"@rnui/ui"</span><span class="cp">;</span>

<span class="cm">// Full-featured, themed component</span>
<span class="cp">&lt;</span><span class="cn">Button</span>
  <span class="ca">label</span><span class="cp">=</span><span class="cs">"Save changes"</span>
  <span class="ca">variant</span><span class="cp">=</span><span class="cs">"solid"</span>
  <span class="ca">colorScheme</span><span class="cp">=</span><span class="cs">"violet"</span>
  <span class="ca">onPress</span><span class="cp">={'{'}save{'}'}</span>
<span class="cp">/&gt;</span>

<span class="cm">// With loading state</span>
<span class="cp">&lt;</span><span class="cn">Button</span>
  <span class="ca">label</span><span class="cp">=</span><span class="cs">"Submitting..."</span>
  <span class="ca">isLoading</span><span class="cp">={'{'}true{'}'}</span>
  <span class="ca">variant</span><span class="cp">=</span><span class="cs">"solid"</span>
<span class="cp">/&gt;</span>`}</code></pre>
            </div>

            {/* Headless */}
            <div className={styles.codeCard}>
              <div className={styles.codeCardHeader}>
                <div className={styles.codeCardDots}>
                  <span className={styles.dot} style={{background:"#FF5F57"}}/>
                  <span className={styles.dot} style={{background:"#FEBC2E"}}/>
                  <span className={styles.dot} style={{background:"#28C840"}}/>
                </div>
                <div className={styles.codeCardTitle}>
                  <span className={styles.pkgBadge} style={{background:"rgba(79,70,229,0.15)",color:"#818CF8",borderColor:"rgba(79,70,229,0.3)"}}>@rnui/headless</span>
                  <span className={styles.pkgDesc}>Bring your own styles</span>
                </div>
              </div>
              <pre className={styles.codeBlock}><code>{`<span class="cm">// Headless Layer</span>
<span class="ck">import</span> <span class="cp">{'{'}</span> <span class="cn">usePressable</span> <span class="cp">{'}'}</span> <span class="ck">from</span> <span class="cs">"@rnui/headless"</span><span class="cp">;</span>

<span class="cm">// Zero-style, full control</span>
<span class="ck">const</span> <span class="cp">{'{'}</span>
  <span class="cn">gesture</span><span class="cp">,</span>
  <span class="cn">animatedStyle</span><span class="cp">,</span>
  <span class="cn">isPressed</span><span class="cp">,</span>
<span class="cp">{'}'}</span> <span class="ck">=</span> <span class="cn">usePressable</span><span class="cp">({'{}'}
  <span class="ca">onPress</span><span class="cp">:</span> <span class="cn">save</span><span class="cp">,</span>
  <span class="ca">feedbackMode</span><span class="cp">:</span> <span class="cs">"scale"</span><span class="cp">,</span>
<span class="cp">{'}'});</span>

<span class="cm">// Apply to your own component</span>
<span class="cp">&lt;</span><span class="cn">Animated</span><span class="cp">.</span><span class="cn">View</span> <span class="ca">style</span><span class="cp">={'{'}[myStyle, animatedStyle]{'}'}</span><span class="cp">&gt;</span>
  <span class="cp">&lt;</span><span class="cn">Text</span><span class="cp">&gt;</span>Save<span class="cp">&lt;/</span><span class="cn">Text</span><span class="cp">&gt;</span>
<span class="cp">&lt;/</span><span class="cn">Animated</span><span class="cp">.</span><span class="cn">View</span><span class="cp">&gt;</span>`}</code></pre>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className={styles.section} style={{background:"var(--surface-1)"}}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Built for the Modern Stack</h2>
            <p className={styles.sectionSub}>
              Everything you need to build world-class React Native apps.
            </p>
          </div>
          <div className={styles.featuresGrid}>
            {FEATURES.map((f) => (
              <div key={f.title} className={styles.featureCard}>
                <div className={styles.featureIcon}>{f.icon}</div>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPONENTS SHOWCASE */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Everything You Need</h2>
            <p className={styles.sectionSub}>
              55+ components. More shipping every week.
            </p>
          </div>
          <div className={styles.chipsGrid}>
            {COMPONENTS.map((c) => (
              <span key={c} className={styles.chip}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* GETTING STARTED */}
      <section className={styles.section} style={{background:"var(--surface-1)"}}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Up and running in minutes</h2>
            <p className={styles.sectionSub}>
              Three steps to your first RNUI component.
            </p>
          </div>
          <div className={styles.stepsGrid}>
            <div className={styles.stepCard}>
              <div className={styles.stepNum}>1</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Install packages</h3>
                <p className={styles.stepDesc}>Add RNUI and design tokens to your project.</p>
                <pre className={styles.stepCode}><code><span className={styles.cPrompt}>$</span>{" bun add @rnui/ui @rnui/tokens"}</code></pre>
              </div>
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepNum}>2</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Wrap your app</h3>
                <p className={styles.stepDesc}>Add ThemeProvider at the root of your application.</p>
                <pre className={styles.stepCode}><code>{`import { ThemeProvider } from "@rnui/ui";

export default function App() {
  return (
    <ThemeProvider colorScheme="system">
      <YourApp />
    </ThemeProvider>
  );
}`}</code></pre>
              </div>
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepNum}>3</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Start building</h3>
                <p className={styles.stepDesc}>Import components and use them in your screens.</p>
                <pre className={styles.stepCode}><code>{`import { Button, Input, Card } from "@rnui/ui";

export function LoginScreen() {
  return (
    <Card>
      <Input placeholder="Email" />
      <Button label="Sign in" variant="solid" />
    </Card>
  );
}`}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaGlow} aria-hidden="true" />
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>Start building with RNUI</h2>
          <p className={styles.ctaSub}>Open source. Free forever.</p>
          <div className={styles.ctaBtns}>
            <a
              href="https://github.com/truongnat/rnui"
              className={styles.ctaPrimary}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read the Docs <span>→</span>
            </a>
            <a
              href="https://github.com/truongnat/rnui"
              className={styles.ctaSecondary}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <a href="/" className={styles.logo}>
              <span className={styles.logoMark}>RN</span>
              <span className={styles.logoText}>UI</span>
            </a>
            <p className={styles.footerTagline}>
              The React Native UI Framework for Modern Apps.
            </p>
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
