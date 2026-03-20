import React from "react";
import styles from "./page.module.css";

const COMPONENTS = [
  "Button","Input","Card","Badge","Modal","BottomSheet","Toast","Tabs",
  "Accordion","Select","Checkbox","Switch","Slider","Avatar","Skeleton",
  "Tooltip","Drawer","Dialog","Snackbar","FAB","Stepper","Timeline",
  "Rating","Pagination","Table","Chip","Divider","Progress","Spinner",
  "Text","Icon","List","Menu","Popover","Radio","SearchBar","TextArea",
  "Toggle","Alert","Banner","Breadcrumb","Form","Grid","AppBar",
  "BottomNav","SpeedDial","ImageList","AutoComplete","Link","Paper",
  "Pressable","ToggleButton","FormField","PasswordInput","EmptyState",
];

const FEATURES = [
  { n:"01", title:"Design Tokens", desc:"Primitive → semantic → component tokens. Override at any level for full brand customization." },
  { n:"02", title:"Accessibility First", desc:"ARIA roles, focus management, and screen reader support built into every component." },
  { n:"03", title:"New Architecture", desc:"Built for RN 0.83+. Powered by Reanimated 3 & Gesture Handler 2 from day one." },
  { n:"04", title:"55+ Components", desc:"Button to Timeline. Every component you need to ship a production React Native app." },
  { n:"05", title:"Dark & Light Mode", desc:"System-aware theming out of the box. Switch at runtime with zero flicker." },
  { n:"06", title:"Fully Typed", desc:"TypeScript first. Complete type definitions and autocomplete for every prop." },
];

export default function Home() {
  return (
    <main className={styles.main}>
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <a href="/" className={styles.logo}>RNUI</a>
          <div className={styles.navLinks}>
            <a href="https://github.com/truongnat/rnui" className={styles.navLink}>Docs</a>
            <a href="https://github.com/truongnat/rnui" className={styles.navLink}>Components</a>
            <a href="https://github.com/truongnat/rnui" target="_blank" rel="noopener noreferrer" className={styles.navLink}>GitHub</a>
          </div>
          <a href="https://github.com/truongnat/rnui" target="_blank" rel="noopener noreferrer" className={styles.navCta}>Get Started →</a>
        </div>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroLeft}>
            <span className={styles.badge}>NEW ARCH READY</span>
            <h1 className={styles.h1}>The React Native<br />UI Framework.</h1>
            <p className={styles.heroSub}>Dual-layer design system for iOS &amp; Android. Use styled components out of the box, or take full control with zero-style headless hooks.</p>
            <div className={styles.heroCtas}>
              <a href="https://github.com/truongnat/rnui" target="_blank" rel="noopener noreferrer" className={styles.ctaPrimary}>Get Started →</a>
              <a href="https://github.com/truongnat/rnui" target="_blank" rel="noopener noreferrer" className={styles.ctaSecondary}>View on GitHub</a>
            </div>
          </div>
          <div className={styles.heroRight}>
            <div className={styles.terminalCard}>
              <div className={styles.terminalHeader}><span className={styles.terminalTitle}>terminal</span></div>
              <pre className={styles.terminalBody}><code><span className={styles.cPrompt}>$</span>{" bun add @rnui/ui @rnui/tokens\n"}<span className={styles.cMuted}>{"  installing...\n\n"}</span><span className={styles.cGreen}>{"  ✓"}</span>{" @rnui/tokens\n"}<span className={styles.cGreen}>{"  ✓"}</span>{" @rnui/headless\n"}<span className={styles.cGreen}>{"  ✓"}</span>{" @rnui/ui\n\n"}<span className={styles.cMuted}>{"  3 packages installed"}</span></code></pre>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.stats}>
        <div className={styles.statsInner}>
          <div className={styles.statItem}><span className={styles.statNum}>55+</span><span className={styles.statLabel}>Components</span></div>
          <div className={styles.statDiv} />
          <div className={styles.statItem}><span className={styles.statNum}>3</span><span className={styles.statLabel}>Packages</span></div>
          <div className={styles.statDiv} />
          <div className={styles.statItem}><span className={styles.statNum}>iOS &amp; Android</span><span className={styles.statLabel}>New Architecture</span></div>
        </div>
      </div>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>Choose your layer.</h2>
            <p className={styles.sectionSub}>Styled components when you want speed. Headless hooks when you want control.</p>
          </div>
          <div className={styles.codeGrid}>
            <div className={styles.codeCard}>
              <div className={styles.codeCardTop}><span className={styles.codeFile}>@rnui/ui</span><span className={styles.codeBadge}>Styled</span></div>
              <pre className={styles.codeBlock}><code><span className={styles.iRed}>import</span>{" { Button } "}<span className={styles.iRed}>from</span>{" "}<span className={styles.iBrown}>&quot;@rnui/ui&quot;</span>{"\n\n"}<span className={styles.iMuted}>{"// Full-featured, themed"}</span>{"\n"}{"<"}<span className={styles.iBlue}>Button</span>{"\n  "}<span className={styles.iGreen}>label</span>{"="}<span className={styles.iBrown}>&quot;Save changes&quot;</span>{"\n  "}<span className={styles.iGreen}>variant</span>{"="}<span className={styles.iBrown}>&quot;solid&quot;</span>{"\n  "}<span className={styles.iGreen}>onPress</span>{"={save}\n/>"}</code></pre>
            </div>
            <div className={styles.codeCard}>
              <div className={styles.codeCardTop}><span className={styles.codeFile}>@rnui/headless</span><span className={styles.codeBadge}>Headless</span></div>
              <pre className={styles.codeBlock}><code><span className={styles.iRed}>import</span>{" { usePressable } "}<span className={styles.iRed}>from</span>{"\n  "}<span className={styles.iBrown}>&quot;@rnui/headless&quot;</span>{"\n\n"}<span className={styles.iMuted}>{"// Zero styles, full control"}</span>{"\n"}<span className={styles.iRed}>const</span>{" { gesture, animatedStyle } =\n  usePressable({\n    "}<span className={styles.iGreen}>onPress</span>{": save,\n    "}<span className={styles.iGreen}>feedbackMode</span>{": "}<span className={styles.iBrown}>&quot;scale&quot;</span>{",\n  });"}</code></pre>
            </div>
          </div>
        </div>
      </section>

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

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>55+ Components.</h2>
            <p className={styles.sectionSub}>More shipping every week.</p>
          </div>
          <p className={styles.componentList}>{COMPONENTS.join(" · ")}</p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>Up and running in minutes.</h2>
            <p className={styles.sectionSub}>Three steps to your first component.</p>
          </div>
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepNum}>1</div>
              <div className={styles.stepBody}>
                <h3 className={styles.stepTitle}>Install packages</h3>
                <p className={styles.stepDesc}>Add RNUI to your React Native project.</p>
                <pre className={styles.stepCode}><code><span className={styles.cPrompt}>$</span>{" bun add @rnui/ui @rnui/tokens"}</code></pre>
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>2</div>
              <div className={styles.stepBody}>
                <h3 className={styles.stepTitle}>Wrap your app</h3>
                <p className={styles.stepDesc}>Add ThemeProvider at the root.</p>
                <pre className={styles.stepCode}><code><span className={styles.iRed}>import</span>{" { ThemeProvider } "}<span className={styles.iRed}>from</span>{" "}<span className={styles.iBrown}>&quot;@rnui/ui&quot;</span>{"\n\n<"}<span className={styles.iBlue}>ThemeProvider</span>{" "}<span className={styles.iGreen}>colorScheme</span>{"="}<span className={styles.iBrown}>&quot;system&quot;</span>{">\n  <YourApp />\n</"}<span className={styles.iBlue}>ThemeProvider</span>{">"}</code></pre>
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>3</div>
              <div className={styles.stepBody}>
                <h3 className={styles.stepTitle}>Start building</h3>
                <p className={styles.stepDesc}>Import and use components anywhere.</p>
                <pre className={styles.stepCode}><code><span className={styles.iRed}>import</span>{" { Button, Input, Card }\n  "}<span className={styles.iRed}>from</span>{" "}<span className={styles.iBrown}>&quot;@rnui/ui&quot;</span>{"\n\n<"}<span className={styles.iBlue}>Card</span>{">\n  <"}<span className={styles.iBlue}>Input</span>{" "}<span className={styles.iGreen}>placeholder</span>{"="}<span className={styles.iBrown}>&quot;Email&quot;</span>{" />\n  <"}<span className={styles.iBlue}>Button</span>{" "}<span className={styles.iGreen}>label</span>{"="}<span className={styles.iBrown}>&quot;Sign in&quot;</span>{" />\n</"}<span className={styles.iBlue}>Card</span>{">"}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* BRAND SWITCHER PREVIEW */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>Brand Presets.</h2>
            <p className={styles.sectionSub}>6 ready-made brand themes. Swap with one line. Build your own with <code>createBrand()</code>.</p>
          </div>

          <div className={styles.brandGrid}>
            {[
              { name:"Default",  desc:"Violet & Amber",  primary:"#7C3AED", secondary:"#F59E0B", bg:"#FAFAF9",  pkg:"defaultBrand"  },
              { name:"Love",     desc:"Rose & Blush",    primary:"#E11D48", secondary:"#FB7185", bg:"#FFF1F2",  pkg:"loveBrand"     },
              { name:"Ocean",    desc:"Teal & Cyan",     primary:"#0D9488", secondary:"#06B6D4", bg:"#F0FDFA",  pkg:"oceanBrand"    },
              { name:"Forest",   desc:"Emerald & Lime",  primary:"#059669", secondary:"#84CC16", bg:"#F0FDF4",  pkg:"forestBrand"   },
              { name:"Sunset",   desc:"Orange & Amber",  primary:"#EA580C", secondary:"#F59E0B", bg:"#FFF7ED",  pkg:"sunsetBrand"   },
              { name:"Midnight", desc:"Purple & Blue",   primary:"#7E22CE", secondary:"#3B82F6", bg:"#0D0D1A",  pkg:"midnightBrand" },
            ].map((brand) => (
              <div key={brand.name} className={styles.brandCard} style={{"--brand-primary": brand.primary, "--brand-secondary": brand.secondary} as React.CSSProperties}>
                <div className={styles.brandPreview} style={{background: brand.bg}}>
                  <div className={styles.brandDotRow}>
                    <div className={styles.brandDot} style={{background: brand.primary}} />
                    <div className={styles.brandDot} style={{background: brand.secondary, opacity: 0.7}} />
                    <div className={styles.brandDot} style={{background: brand.primary, opacity: 0.3}} />
                  </div>
                  <div className={styles.brandMockButton} style={{background: brand.primary}}>
                    <span style={{color: "#fff", fontSize: 11, fontWeight: 600}}>Button</span>
                  </div>
                  <div className={styles.brandMockBadge} style={{background: brand.secondary + "33", borderColor: brand.secondary}}>
                    <span style={{color: brand.name === "Midnight" ? brand.secondary : brand.primary, fontSize: 10, fontWeight: 700}}>Badge</span>
                  </div>
                </div>
                <div className={styles.brandInfo}>
                  <span className={styles.brandName}>{brand.name}</span>
                  <span className={styles.brandDesc}>{brand.desc}</span>
                  <code className={styles.brandPkg}>{brand.pkg}</code>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.brandCodeSnippet}>
            <pre className={styles.stepCode}>
              <code>
                <span className={styles.iRed}>import</span>{" { loveBrand } "}<span className={styles.iRed}>from</span>{" "}<span className={styles.iBrown}>&quot;@rnui/themes&quot;</span>{`

`}
                {"<"}<span className={styles.iBlue}>ThemeProvider</span>{" "}<span className={styles.iGreen}>brand</span>{"={loveBrand}>"}{`
`}
                {"  <App />"}{`
`}
                {"</"}<span className={styles.iBlue}>ThemeProvider</span>{">"}
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* TOKEN PREVIEW */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>Design Tokens.</h2>
            <p className={styles.sectionSub}>Every color, size, and motion value — all in one system.</p>
          </div>

          {/* COLORS */}
          <div className={styles.tokenBlock}>
            <h3 className={styles.tokenBlockTitle}>Brand</h3>
            <div className={styles.swatchRow}>
              {[["50","#F5F3FF"],["100","#EDE9FE"],["200","#DDD6FE"],["300","#C4B5FD"],["400","#A78BFA"],["500","#8B5CF6"],["600","#7C3AED"],["700","#6D28D9"],["800","#5B21B6"],["900","#4C1D95"],["950","#2E1065"]].map(([n,c])=>(
                <div key={n} className={styles.swatch}>
                  <div className={styles.swatchColor} style={{background:c}} />
                  <span className={styles.swatchLabel}>{n}</span>
                  <span className={styles.swatchHex}>{c}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.tokenBlock}>
            <h3 className={styles.tokenBlockTitle}>Accent — Amber</h3>
            <div className={styles.swatchRow}>
              {[["50","#FFFBEB"],["100","#FEF3C7"],["200","#FDE68A"],["300","#FCD34D"],["400","#FBBF24"],["500","#F59E0B"],["600","#D97706"],["700","#B45309"],["800","#92400E"],["900","#78350F"]].map(([n,c])=>(
                <div key={n} className={styles.swatch}>
                  <div className={styles.swatchColor} style={{background:c,border:parseInt(n)<200?"1px solid #E2E8F0":undefined}} />
                  <span className={styles.swatchLabel}>{n}</span>
                  <span className={styles.swatchHex}>{c}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.tokenBlock}>
            <h3 className={styles.tokenBlockTitle}>Neutrals</h3>
            <div className={styles.swatchRow}>
              {[["50","#F8FAFC"],["100","#F1F5F9"],["200","#E2E8F0"],["300","#CBD5E1"],["400","#94A3B8"],["500","#64748B"],["600","#475569"],["700","#334155"],["800","#1E293B"],["900","#0F172A"],["950","#020617"]].map(([n,c])=>(
                <div key={n} className={styles.swatch}>
                  <div className={styles.swatchColor} style={{background:c,border: parseInt(n)<200 ? "1px solid #E2E8F0":undefined}} />
                  <span className={styles.swatchLabel}>{n}</span>
                  <span className={styles.swatchHex}>{c}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.tokenBlock}>
            <h3 className={styles.tokenBlockTitle}>Feedback</h3>
            <div className={styles.feedbackRow}>
              {[
                {label:"Success",bg:"#F0FDF4",border:"#22C55E",text:"#14532D",dot:"#16A34A"},
                {label:"Warning",bg:"#FFFBEB",border:"#F59E0B",text:"#78350F",dot:"#D97706"},
                {label:"Error",bg:"#FEF2F2",border:"#EF4444",text:"#7F1D1D",dot:"#DC2626"},
                {label:"Info",bg:"#EFF6FF",border:"#3B82F6",text:"#1E3A8A",dot:"#2563EB"},
              ].map((f)=>(
                <div key={f.label} className={styles.feedbackCard} style={{background:f.bg,borderColor:f.border}}>
                  <span className={styles.feedbackDot} style={{background:f.dot}} />
                  <span className={styles.feedbackCardLabel} style={{color:f.text}}>{f.label}</span>
                  <span className={styles.feedbackCardBg} style={{color:f.text}}>{f.bg}</span>
                </div>
              ))}
            </div>
          </div>

          {/* TYPOGRAPHY */}
          <div className={styles.tokenBlock}>
            <h3 className={styles.tokenBlockTitle}>Typography</h3>
            <div className={styles.typeScale}>
              {[["xs","11px"],["sm","13px"],["md","15px"],["lg","17px"],["xl","20px"],["2xl","24px"],["3xl","30px"],["4xl","36px"]].map(([name,size])=>(
                <div key={name} className={styles.typeRow}>
                  <span className={styles.typeToken}>{name}</span>
                  <span className={styles.typeSize}>{size}</span>
                  <span className={styles.typeSample} style={{fontSize:size}}>The quick brown fox</span>
                </div>
              ))}
            </div>
          </div>

          {/* SPACING */}
          <div className={styles.tokenBlock}>
            <h3 className={styles.tokenBlockTitle}>Spacing <span className={styles.tokenNote}>(4px base)</span></h3>
            <div className={styles.spacingRow}>
              {[[1,4],[2,8],[3,12],[4,16],[5,20],[6,24],[8,32],[10,40],[12,48],[16,64],[20,80],[24,96]].map(([t,v])=>(
                <div key={t} className={styles.spacingItem}>
                  <div className={styles.spacingBar} style={{width:Math.min(v,96),height:8}} />
                  <span className={styles.spacingLabel}>{t} · {v}px</span>
                </div>
              ))}
            </div>
          </div>

          {/* RADIUS */}
          <div className={styles.tokenBlock}>
            <h3 className={styles.tokenBlockTitle}>Border Radius</h3>
            <div className={styles.radiusRow}>
              {[["none",0],["xs",2],["sm",4],["md",8],["lg",12],["xl",16],["2xl",24],["full",9999]].map(([n,v])=>(
                <div key={n} className={styles.radiusItem}>
                  <div className={styles.radiusBox} style={{borderRadius:v===9999?9999:v}} />
                  <span className={styles.radiusLabel}>{n}</span>
                  <span className={styles.radiusValue}>{v===9999?"∞":v+"px"}</span>
                </div>
              ))}
            </div>
          </div>

          {/* MOTION */}
          <div className={styles.tokenBlock}>
            <h3 className={styles.tokenBlockTitle}>Motion Presets</h3>
            <div className={styles.motionRow}>
              {[
                {name:"snappy",desc:"Buttons, toggles",d:20,s:400,use:"damping: 20 · stiffness: 400"},
                {name:"bouncy",desc:"FAB, badges",d:12,s:300,use:"damping: 12 · stiffness: 300"},
                {name:"gentle",desc:"Modals, sheets",d:28,s:200,use:"damping: 28 · stiffness: 200"},
                {name:"stiff",desc:"Tooltips, dropdowns",d:32,s:500,use:"damping: 32 · stiffness: 500"},
              ].map((m)=>(
                <div key={m.name} className={styles.motionCard}>
                  <div className={styles.motionDot} data-spring={m.name} />
                  <div className={styles.motionInfo}>
                    <span className={styles.motionName}>{m.name}</span>
                    <span className={styles.motionDesc}>{m.desc}</span>
                    <span className={styles.motionSpec}>{m.use}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SHADOWS */}
          <div className={styles.tokenBlock}>
            <h3 className={styles.tokenBlockTitle}>Shadows</h3>
            <div className={styles.shadowRow}>
              {[
                {n:"none",s:"none",e:"0"},
                {n:"sm",s:"0 1px 3px rgba(0,0,0,0.08)",e:"2"},
                {n:"md",s:"0 4px 8px rgba(0,0,0,0.12)",e:"4"},
                {n:"lg",s:"0 8px 16px rgba(0,0,0,0.16)",e:"8"},
                {n:"xl",s:"0 16px 32px rgba(0,0,0,0.20)",e:"16"},
              ].map(({n,s,e})=>(
                <div key={n} className={styles.shadowItem}>
                  <div className={styles.shadowBox} style={{boxShadow:s}} />
                  <span className={styles.shadowLabel}>{n}</span>
                  <span className={styles.swatchHex}>elev. {e}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SEMANTIC LAYER */}
          <div className={styles.tokenBlock}>
            <h3 className={styles.tokenBlockTitle}>Semantic Tokens — Light Mode</h3>
            <div className={styles.semanticGrid}>
              {[
                {group:"Background", tokens:[
                  {name:"bg.default",   color:"#FFFFFF",    label:"Default"},
                  {name:"bg.subtle",    color:"#F8FAFC",    label:"Subtle"},
                  {name:"bg.hover",     color:"#F1F5F9",    label:"Hover"},
                  {name:"bg.disabled",  color:"#F1F5F9",    label:"Disabled",border:true},
                  {name:"bg.inverse",   color:"#0F172A",    label:"Inverse"},
                ]},
                {group:"Brand — Active", tokens:[
                  {name:"brand.subtle",  color:"var(--brand-subtle)",  label:"Subtle",border:true, cssvar:true},
                  {name:"brand.muted",   color:"var(--brand-subtle)",  label:"Muted", border:true, cssvar:true},
                  {name:"brand.default", color:"var(--brand)",         label:"Default", cssvar:true},
                  {name:"brand.hover",   color:"var(--brand-hover)",   label:"Hover", cssvar:true},
                  {name:"brand.text",    color:"var(--brand-text)",    label:"Text", cssvar:true},
                ]},
                {group:"Accent — Active", tokens:[
                  {name:"accent.subtle", color:"var(--accent-subtle)", label:"Subtle",border:true, cssvar:true},
                  {name:"accent.default",color:"var(--accent)",        label:"Default", cssvar:true},
                  {name:"accent.hover",  color:"var(--accent-hover)",  label:"Hover", cssvar:true},
                  {name:"accent.text",   color:"var(--accent-text)",   label:"Text", cssvar:true},
                ]},
                {group:"Text", tokens:[
                  {name:"text.primary",   color:"#020617",  label:"Primary"},
                  {name:"text.secondary", color:"#334155",  label:"Secondary"},
                  {name:"text.tertiary",  color:"#64748B",  label:"Tertiary"},
                  {name:"text.disabled",  color:"#64748B",  label:"Disabled"},
                  {name:"text.onBrand",   color:"#FFFFFF",  label:"onBrand",border:true},
                ]},
              ].map(({group,tokens})=>(
                <div key={group} className={styles.semanticGroup}>
                  <span className={styles.semanticGroupTitle}>{group}</span>
                  <div className={styles.semanticTokens}>
                    {tokens.map(({name,color,label,border})=>(
                      <div key={name} className={styles.semanticToken}>
                        <div className={styles.semanticSwatch} style={{background:color,borderWidth:border?1:0,borderColor:"var(--border)",borderStyle:"solid"}} />
                        <div className={styles.semanticInfo}>
                          <span className={styles.semanticName}>{name}</span>
                          <span className={styles.semanticHex}>{color}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TIMING PRESETS */}
          <div className={styles.tokenBlock}>
            <h3 className={styles.tokenBlockTitle}>Timing Presets</h3>
            <div className={styles.timingRow}>
              {[
                {name:"fadeIn",   dur:"100ms", easing:"easeOut", use:"Overlays, tooltips"},
                {name:"popIn",    dur:"200ms", easing:"easeOut", use:"Micro interactions"},
                {name:"slideIn",  dur:"300ms", easing:"easeOut", use:"Panels, sheets"},
                {name:"color",    dur:"100ms", easing:"linear",  use:"Theme switch, hover"},
              ].map((t)=>(
                <div key={t.name} className={styles.timingCard}>
                  <div className={styles.timingBar}>
                    <div className={styles.timingFill} style={{animationDuration:t.dur}} data-timing={t.name} />
                  </div>
                  <span className={styles.motionName}>{t.name}</span>
                  <span className={styles.motionDesc}>{t.dur} · {t.easing}</span>
                  <span className={styles.motionSpec}>{t.use}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>&ldquo;Start building.&rdquo;</h2>
          <p className={styles.ctaSub}>Open source. Free forever. No lock-in.</p>
          <div className={styles.ctaBtns}>
            <a href="https://github.com/truongnat/rnui" target="_blank" rel="noopener noreferrer" className={styles.ctaPrimaryDark}>Read the Docs →</a>
            <a href="https://github.com/truongnat/rnui" target="_blank" rel="noopener noreferrer" className={styles.ctaSecondaryDark}>GitHub</a>
          </div>
        </div>
      </section>

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
        <div className={styles.footerBottom}><p>© 2025 RNUI. Open source under MIT License.</p></div>
      </footer>
    </main>
  );
}
