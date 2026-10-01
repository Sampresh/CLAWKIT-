import { ArrowUp, CalendarDays, Link2, Mail, MapPin, Scale } from 'lucide-react';
import { LegalBlocks } from '@/components/legal/LegalBlocks';
import { LegalToc } from '@/components/legal/LegalToc';
import { termsIntro, termsMeta, termsSections } from '@/content/terms';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: termsMeta.title,
  description: termsMeta.summary,
  path: '/terms',
});

const pad = (n) => String(n).padStart(2, '0');

const tocItems = [
  { id: termsIntro.id, title: termsIntro.title },
  ...termsSections.map((s, i) => ({ id: s.id, title: s.title, num: i + 1 })),
];

function SectionHeading({ id, num, title }) {
  return (
    <h2 className="group flex items-baseline gap-4 font-display text-2xl font-bold tracking-[-0.025em] text-ink sm:text-[28px]">
      {num && <span className="shrink-0 font-sans text-sm font-semibold tabular-nums text-brand">{pad(num)}</span>}
      <span>
        {title}
        <a
          href={`#${id}`}
          aria-label={`Link to section: ${title}`}
          className="ml-2 inline-block align-middle text-muted/50 opacity-0 transition hover:text-brand focus:opacity-100 group-hover:opacity-100"
        >
          <Link2 className="h-4 w-4" aria-hidden />
        </a>
      </span>
    </h2>
  );
}

function ContactCard({ company, location, email }) {
  return (
    <div className="mt-6 grid gap-4 rounded-2xl border border-line bg-bg p-6 sm:grid-cols-2">
      <div className="flex gap-3">
        <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden />
        <div>
          <p className="font-semibold text-ink">{company}</p>
          <p className="text-sm text-muted">{location}</p>
        </div>
      </div>
      <div className="flex gap-3">
        <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden />
        <div>
          <p className="font-semibold text-ink">Email</p>
          <a
            href={`mailto:${email}`}
            className="break-all text-sm text-muted underline-offset-4 hover:text-brand hover:underline"
          >
            {email}
          </a>
        </div>
      </div>
    </div>
  );
}

export default function TermsPage() {
  return (
    <div className="pb-24">
      <header className="container-page pb-12 pt-16 sm:pt-24">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-3 font-display text-5xl font-extrabold tracking-[-0.045em] text-ink sm:text-6xl">
          {termsMeta.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{termsMeta.summary}</p>
        <div className="mt-8 flex flex-wrap gap-3 text-sm">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-ink">
            <CalendarDays className="h-4 w-4 text-brand" aria-hidden />
            Last updated <time dateTime={termsMeta.updatedIso}>{termsMeta.updated}</time>
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-ink">
            <Scale className="h-4 w-4 text-brand" aria-hidden />
            Ausasi LLC · Texas, USA
          </span>
        </div>
      </header>

      <div className="container-page grid gap-10 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-16">
        <aside>
          <LegalToc items={tocItems} />
        </aside>

        <article className="min-w-0 max-w-3xl">
          <section id={termsIntro.id} className="scroll-mt-24 rounded-[28px] border border-line bg-surface p-6 sm:p-10">
            <SectionHeading id={termsIntro.id} title={termsIntro.title} />
            <div className="mt-5">
              <LegalBlocks blocks={termsIntro.blocks} />
            </div>
          </section>

          <div className="mt-6">
            {termsSections.map((section, i) => {
              // Plain sections are separated by a rule, except next to the highlighted card.
              const ruled = i > 0 && !termsSections[i - 1].important;
              return (
                <section
                  key={section.id}
                  id={section.id}
                  className={`scroll-mt-24 py-10 sm:py-12 ${
                    section.important
                      ? 'my-4 rounded-[28px] border border-brand/25 bg-surface px-6 shadow-[0_24px_60px_-36px_rgb(var(--brand)/0.6)] sm:px-10'
                      : ruled
                        ? 'border-t border-line'
                        : ''
                  }`}
                >
                  {section.important && (
                    <p className="mb-4 inline-flex rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand">
                      Most important
                    </p>
                  )}
                  <SectionHeading id={section.id} num={i + 1} title={section.title} />
                  <div className="mt-5">
                    <LegalBlocks blocks={section.blocks} />
                  </div>
                  {section.contact && <ContactCard {...section.contact} />}
                </section>
              );
            })}
          </div>

          <a href="#top" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-ink">
            <ArrowUp className="h-4 w-4" aria-hidden /> Back to top
          </a>
        </article>
      </div>
    </div>
  );
}
