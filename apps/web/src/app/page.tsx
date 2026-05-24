import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="landing">
      <p className="eyebrow">RNUI</p>
      <h1>Design system + AI screen builder</h1>
      <p className="landing-copy">
        Phase 3C MVP — generate ScreenSchema with mock AI, preview RNUI on the
        web, validate, and export TSX. No live AI API yet.
      </p>
      <Link href="/builder" className="landing-cta">
        Open builder
      </Link>
    </main>
  );
}
