import { SiteFooter } from '@/components/common/SiteFooter';
import { ClawkitHero } from '@/components/home/ClawkitHero';
import { DownloadSection } from '@/components/home/DownloadSection';
import { Faq } from '@/components/home/Faq';
import { Features } from '@/components/home/Features';
import { HowItWorks } from '@/components/home/HowItWorks';
import { Intro } from '@/components/home/Intro';
import { faqs } from '@/content/faq';
import { site } from '@/lib/site';

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: site.name,
    description: site.description,
    operatingSystem: 'iOS, Android',
    applicationCategory: 'HealthApplication',
    url: site.url,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  },
];

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <ClawkitHero />
      <main>
        <Intro />
        <Features />
        <HowItWorks />
        <DownloadSection />
        <Faq />
      </main>
      <SiteFooter />
    </>
  );
}
