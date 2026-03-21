import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const FEATURES = [
  {
    title: 'Design Tokens',
    desc: 'A systematic approach to styling. Primitive → semantic → component tokens. Override everything.',
    span: 'span-8',
    n: '01'
  },
  {
    title: '62+ Components',
    desc: 'Crafted for production apps.',
    span: 'span-4',
    n: '02'
  },
  {
    title: '120+ Icons',
    desc: 'Lucide integration built-in.',
    span: 'span-4',
    n: '03'
  },
  {
    title: 'Headless Logic',
    desc: 'Take the logic, bring your own styles. Full control over accessibility and interaction state.',
    span: 'span-8',
    n: '04'
  },
  {
    title: 'Native Performance',
    desc: 'Built with Reanimated 3 and FlashList. 60fps animations on the UI thread.',
    span: 'span-6',
    n: '05'
  },
  {
    title: 'Multi-Brand',
    desc: 'Switch themes with a single prop. Perfect for white-label applications.',
    span: 'span-6',
    n: '06'
  },
];

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Sophisticated UI framework for React Native">
      
      {/* Hero Section */}
      <header className="heroSection">
        <div className="container">
          <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(217, 119, 6, 0.1)', color: '#d97706', borderRadius: '100px', fontSize: '13px', fontWeight: '600', marginBottom: '2rem' }}>
            v0.1.0 Now Available
          </div>
          <h1 className="heroTitle">
            The sophisticated UI<br />
            framework for React Native.
          </h1>
          <p className="heroSubtitle">
            A dual-layer design system crafted for clarity and performance. 
            Styled components for speed, headless hooks for total freedom.
          </p>
          <div className="heroButtons">
            <Link className="btn btnPrimary" to="/docs/getting-started">
              Get Started →
            </Link>
            <Link className="btn btnSecondary" to="https://github.com/rnui/rnui">
              View on GitHub
            </Link>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <main className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', marginBottom: '1rem' }}>Designed for focus.</h2>
            <p style={{ color: '#6b6b64', fontSize: '1.2rem' }}>A library that respects your craft and your users.</p>
          </div>
          
          <div className="bentoGrid">
            {FEATURES.map((f) => (
              <div key={f.n} className={`bentoCard ${f.span}`}>
                <div>
                  <h3 className="cardTitle">{f.title}</h3>
                  <p className="cardDesc">{f.desc}</p>
                </div>
                <span style={{ fontSize: '12px', color: 'var(--border-anthropic)', fontWeight: '600', marginTop: '2rem' }}>{f.n}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="section" style={{ borderTop: '1px solid var(--border-anthropic)', background: 'rgba(217, 119, 6, 0.02)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '2rem' }}>Ready to ship?</h2>
          <Link className="btn btnPrimary" to="/docs/getting-started">
            Start Building
          </Link>
        </div>
      </section>
    </Layout>
  );
}
