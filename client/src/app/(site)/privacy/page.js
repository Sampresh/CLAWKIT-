import { PageHeader } from '@/components/common/PageHeader';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata = buildMetadata({ title: 'Privacy Policy', path: '/privacy' });

const UPDATED = 'October 1, 2026';

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" intro={`Last updated ${UPDATED}`} />
      <div className="prose-page container-page max-w-3xl pb-24">
        <p>
          This policy explains what information {site.name} collects through this website and how we use it. The
          {` ${site.name}`} mobile app is covered by the privacy details shown in the App Store and Google Play listings.
        </p>
        <h2>Information we collect on this website</h2>
        <ul>
          <li>
            <strong>Contact form:</strong> your name, email address, the topic you choose, your dog’s name if you give
            it, and your message.
          </li>
          <li>
            <strong>Newsletter:</strong> your email address and the date you subscribed.
          </li>
          <li>
            <strong>Technical data:</strong> standard server logs such as IP address and browser type, kept briefly for
            security and abuse prevention.
          </li>
        </ul>
        <h2>How we use it</h2>
        <ul>
          <li>To reply to your message and provide support.</li>
          <li>To send the newsletter you asked for. You can unsubscribe at any time.</li>
          <li>To keep the website secure.</li>
        </ul>
        <p>We do not sell your personal information, and we do not use it for advertising.</p>
        <h2>Retention and your rights</h2>
        <p>
          We keep contact messages only as long as needed to help you, and newsletter addresses until you unsubscribe.
          You can ask us to access, correct or delete your information at any time by emailing{' '}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
        <h2>Changes</h2>
        <p>If we change this policy we will update the date above.</p>
      </div>
    </>
  );
}
