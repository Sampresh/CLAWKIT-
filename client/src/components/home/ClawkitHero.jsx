'use client';

import { ChartLine, Pill, Stethoscope, Timer } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { FrameSequenceHero } from '@/components/ui/frame-sequence-hero';
import { heroFrames } from '@/lib/heroFrames';

const steps = [
  {
    from: 0.02, to: 0.27, color: '#ff6a3d', num: '01', total: '04', icon: <Timer size={18} />,
    title: 'Log a seizure in one tap.',
    description: 'Start the timer the moment it begins. CLAWKIT records duration, time and severity while you stay with your dog.',
    label: 'Log',
  },
  {
    from: 0.27, to: 0.52, color: '#ff3d7f', num: '02', total: '04', icon: <ChartLine size={18} />,
    title: 'See the patterns.',
    description: 'Clear charts show frequency, clusters and possible triggers across weeks and months.',
    label: 'Insights',
  },
  {
    from: 0.52, to: 0.77, color: '#8b5cf6', num: '03', total: '04', icon: <Pill size={18} />,
    title: 'Never miss a dose.',
    description: 'Medication reminders and a full dosing history keep anti-seizure meds on schedule.',
    label: 'Meds',
  },
  {
    from: 0.77, to: 1.01, color: '#3b82f6', num: '04', total: '04', icon: <Stethoscope size={18} />,
    title: 'Share with your vet.',
    description: 'Export a clean report and walk into every appointment with the whole picture.',
    label: 'Vet reports',
  },
];

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export function ClawkitHero() {
  return (
    <FrameSequenceHero
      frameCount={heroFrames.count}
      framePath={heroFrames.path}
      eagerCount={heroFrames.eager}
      scrollHeight={heroFrames.scrollHeight}
      brand={<Logo />}
      navLinks={navLinks}
      ctaLabel="Download Now"
      ctaHref="#download"
      title={
        <>
          <span className="fsh-title-dark">CLAW</span>
          <span className="fsh-title-rainbow">KIT</span>
        </>
      }
      subtitle="The seizure tracker for dogs. Scroll to explore."
      steps={steps}
    />
  );
}
