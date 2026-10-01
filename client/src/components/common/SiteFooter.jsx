import Link from 'next/link';
import { site } from '@/lib/site';
import { Logo } from './Logo';
import { NewsletterForm } from './NewsletterForm';

const columns = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/#features' },
      { label: 'How it works', href: '/#how-it-works' },
      { label: 'Download', href: '/#download' },
      { label: 'FAQ', href: '/#faq' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-[1.4fr_2fr]">
        <div className="space-y-5">
          <Logo />
          <p className="max-w-sm text-sm leading-6 text-muted">
            Seizure tracking for dogs, built to be calm and quick when it matters most.
          </p>
          <div>
            <p className="mb-3 text-sm font-semibold text-ink">Tips for epileptic dog care, monthly.</p>
            <NewsletterForm />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold text-ink">{col.title}</p>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-muted transition hover:text-ink">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>CLAWKIT is a tracking tool, not a substitute for veterinary advice.</p>
        </div>
      </div>
    </footer>
  );
}
