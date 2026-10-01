import Image from 'next/image';
import { StoreButtons } from '@/components/common/StoreButtons';

export function DownloadSection() {
  return (
    <section id="download" className="relative z-10 bg-surface py-24 sm:py-32">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[36px] bg-brand-navy px-6 py-16 text-white sm:px-14 sm:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full opacity-40 blur-3xl"
            style={{ background: 'radial-gradient(circle, rgb(var(--brand)), rgb(var(--brand-paw)) 40%, transparent 70%)' }}
          />
          <div className="relative grid items-center gap-12 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">Download now</p>
              <h2 className="mt-3 font-display text-4xl font-extrabold tracking-[-0.035em] sm:text-6xl">
                Be ready for the next one.
              </h2>
              <p className="mt-5 max-w-lg text-lg leading-8 text-white/70">
                Install CLAWKIT today so the timer is one tap away when your dog needs you.
              </p>
              <StoreButtons onDark className="mt-10" />
            </div>
            <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-[28px] ring-1 ring-white/10">
              <Image
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=75"
                alt="Two happy dogs running down a sunny path"
                fill
                sizes="(min-width: 1024px) 384px, 90vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
