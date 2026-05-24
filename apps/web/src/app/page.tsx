import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="landing">
      <p className="eyebrow">RNUI</p>
      <h1>Design system + AI screen builder</h1>
      <p className="landing-copy">
        Phase 3E — polished builder UI, light/dark preview, production screen
        templates. Mock AI only; no live API yet.
      </p>
      <Link href="/builder" className="landing-cta">
        Open builder
      </Link>
    </main>
  );
}
