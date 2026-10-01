export function SectionHeading({ eyebrow, title, intro, center = false }) {
  return (
    <div className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="section-title mt-3">{title}</h2>
      {intro && <p className="mt-5 text-lg leading-8 text-muted">{intro}</p>}
    </div>
  );
}
