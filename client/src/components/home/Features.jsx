import { BellRing, ChartLine, FileText, NotebookPen, ShieldCheck, Timer } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

const features = [
  {
    icon: Timer,
    title: 'One-tap seizure timer',
    body: 'Big, easy targets for shaky hands. Start, stop and save without looking away from your dog.',
    color: '#236abb',
  },
  {
    icon: NotebookPen,
    title: 'Detailed episode log',
    body: 'Record seizure type, severity, recovery time and notes, so nothing gets forgotten afterwards.',
    color: '#5586b6',
  },
  {
    icon: ChartLine,
    title: 'Trends and clusters',
    body: 'Understand how often seizures happen and whether treatment is working, at a glance.',
    color: '#0b3c6e',
  },
  {
    icon: BellRing,
    title: 'Medication reminders',
    body: 'Schedule every dose and keep a history of what was given and when.',
    color: '#2b8fc9',
  },
  {
    icon: FileText,
    title: 'Vet-ready reports',
    body: 'Share a tidy summary before appointments instead of scrolling through your camera roll.',
    color: '#3f7fa8',
  },
  {
    icon: ShieldCheck,
    title: 'Private by design',
    body: 'Your dog’s health history belongs to you. We never sell your data.',
    color: '#1d5a96',
  },
];

export function Features() {
  return (
    <section id="features" className="relative z-10 bg-surface py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="Features"
          title="Everything you need between vet visits."
          intro="Designed with owners of epileptic dogs, for the moments that are hardest to remember clearly."
        />
        <div className="mt-16 grid gap-px overflow-hidden rounded-[28px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, body, color }) => (
            <article key={title} className="group bg-surface p-8 transition hover:bg-bg">
              <span
                className="grid h-12 w-12 place-items-center rounded-2xl transition group-hover:scale-105"
                style={{ color, background: `color-mix(in srgb, ${color} 12%, white)` }}
              >
                <Icon size={22} aria-hidden />
              </span>
              <h3 className="mt-6 text-lg font-semibold text-ink">{title}</h3>
              <p className="mt-2 leading-7 text-muted">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
