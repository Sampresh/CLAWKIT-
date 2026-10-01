import { PageHeader } from '@/components/common/PageHeader';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata = buildMetadata({ title: 'Terms of Use', path: '/terms' });

const UPDATED = 'October 1, 2026';

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms of Use" intro={`Last updated ${UPDATED}`} />
      <div className="prose-page container-page max-w-3xl pb-24">
        <p>By using this website you agree to these terms. If you don’t agree, please don’t use the site.</p>
        <h2>Not veterinary advice</h2>
        <p>
          {site.name} is a record-keeping tool. Content on this website and in the app is general information and is not
          a substitute for professional veterinary diagnosis or treatment. Always seek the advice of your veterinarian
          with questions about your dog’s health, and contact an emergency clinic if your dog needs urgent care.
        </p>
        <h2>Use of the website</h2>
        <p>
          Don’t misuse the site, for example by sending spam through the contact form, trying to access areas you are
          not authorized to use, or interfering with its operation.
        </p>
        <h2>Intellectual property</h2>
        <p>
          The {site.name} name, logo and website content belong to us or our licensors. Photos are used under their
          respective licences.
        </p>
        <h2>Liability</h2>
        <p>
          The website is provided “as is”. To the extent permitted by law, we are not liable for any loss arising from
          your use of it.
        </p>
        <h2>Contact</h2>
        <p>
          Questions about these terms: <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </div>
    </>
  );
}
