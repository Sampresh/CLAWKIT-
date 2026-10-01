import Image from 'next/image';
import { SectionHeading } from './SectionHeading';

const steps = [
  { title: 'Download CLAWKIT', body: 'Free to download on iPhone and Android.' },
  { title: 'Add your dog', body: 'Name, breed, weight, diagnosis and current medications. It takes about a minute.' },
  { title: 'Log as it happens', body: 'Tap to time a seizure, add notes afterwards, and let CLAWKIT build the history.' },
  { title: 'Bring it to your vet', body: 'Share a report so treatment decisions are based on real data, not memory.' },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative z-10 bg-bg py-24 sm:py-32">
      <div className="container-page grid items-center gap-16 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="How it works" title="Up and running before the next walk." />
          <ol className="mt-12 space-y-8">
            {steps.map((step, i) => (
              <li key={step.title} className="flex gap-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink font-display text-sm font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
                  <p className="mt-1 leading-7 text-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] bg-line shadow-[0_40px_80px_-40px_rgb(var(--ink)/0.35)]">
          <Image
            src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=75"
            alt="A golden retriever sitting calmly in a garden"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
