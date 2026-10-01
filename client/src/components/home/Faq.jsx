import Link from 'next/link';
import { Plus } from 'lucide-react';
import { faqs } from '@/content/faq';
import { SectionHeading } from './SectionHeading';

export function Faq() {
  return (
    <section id="faq" className="relative z-10 bg-bg py-24 sm:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <SectionHeading eyebrow="FAQ" title="Questions, answered." />
          <p className="mt-5 text-muted">
            Still unsure?{' '}
            <Link href="/contact" className="font-medium text-brand underline underline-offset-4">
              Get in touch
            </Link>
            .
          </p>
        </div>
        <div className="divide-y divide-line border-y border-line">
          {faqs.map(({ q, a }) => (
            <details key={q} className="group py-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold text-ink">
                {q}
                <Plus className="h-5 w-5 shrink-0 text-muted transition group-open:rotate-45" aria-hidden />
              </summary>
              <p className="mt-4 max-w-2xl leading-7 text-muted">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
