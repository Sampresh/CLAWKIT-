import Image from 'next/image';
import { PageHeader } from '@/components/common/PageHeader';
import { StoreButtons } from '@/components/common/StoreButtons';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'About',
  description: 'Why we built CLAWKIT: a calm, simple seizure tracker for dogs living with epilepsy.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Built for the dogs who need us most."
        intro="CLAWKIT started with a simple frustration: when a dog has a seizure, the details that matter most are the hardest to remember."
      />
      <div className="container-page grid gap-12 pb-24 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-line">
          <Image
            src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=75"
            alt="A French bulldog in a yellow sweater"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="prose-page">
          <p>
            Vets ask good questions: how long did it last, how often is it happening, have doses been missed? In the
            moment, with a frightened dog in front of you, nobody is taking careful notes. Afterwards, memories blur.
          </p>
          <p>
            CLAWKIT turns those moments into a clear record. Tap to start the timer, add details when you’re ready, and
            over time you get a history that helps you and your vet make better decisions together.
          </p>
          <h2>What we believe</h2>
          <ul>
            <li>Speed and calm matter more than features during a seizure.</li>
            <li>Your dog’s health data belongs to you.</li>
            <li>An app should support your vet, never replace them.</li>
          </ul>
          <div className="mt-10">
            <StoreButtons />
          </div>
        </div>
      </div>
    </>
  );
}
