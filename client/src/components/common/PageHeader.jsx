export function PageHeader({ eyebrow, title, intro }) {
  return (
    <header className="container-page pb-12 pt-16 sm:pt-24">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1 className="mt-3 max-w-3xl font-display text-5xl font-extrabold tracking-[-0.045em] text-ink sm:text-6xl">
        {title}
      </h1>
      {intro && <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{intro}</p>}
    </header>
  );
}
