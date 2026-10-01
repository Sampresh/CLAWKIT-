'use client';

import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

// Table of contents: sticky sidebar on desktop, collapsible panel on mobile.
// Highlights the section currently in view.
export function LegalToc({ items }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((it) => document.getElementById(it.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-80px 0px -65% 0px' },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  const list = (onPick) => (
    <ol className="space-y-0.5">
      {items.map((it) => {
        const isActive = active === it.id;
        return (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              onClick={onPick}
              aria-current={isActive ? 'location' : undefined}
              className={`flex gap-3 rounded-lg border-l-2 py-1.5 pl-3 pr-2 text-sm transition ${
                isActive ? 'border-brand font-medium text-ink' : 'border-transparent text-muted hover:text-ink'
              }`}
            >
              <span className={`w-5 shrink-0 tabular-nums ${isActive ? 'text-brand' : 'text-muted/60'}`}>{it.num ?? '·'}</span>
              <span>{it.title}</span>
            </a>
          </li>
        );
      })}
    </ol>
  );

  return (
    <>
      <details className="group rounded-2xl border border-line bg-surface lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-sm font-semibold text-ink [&::-webkit-details-marker]:hidden">
          Contents
          <ChevronDown className="h-4 w-4 text-muted transition group-open:rotate-180" aria-hidden />
        </summary>
        <nav aria-label="Contents" className="border-t border-line px-2 py-3">
          {list((e) => e.currentTarget.closest('details')?.removeAttribute('open'))}
        </nav>
      </details>

      <nav aria-label="On this page" className="sticky top-[calc(var(--nav-h)+32px)] hidden max-h-[calc(100vh-var(--nav-h)-64px)] overflow-y-auto pb-8 lg:block">
        <p className="mb-3 pl-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">On this page</p>
        {list()}
      </nav>
    </>
  );
}
