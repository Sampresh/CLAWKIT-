import { Mail, Stethoscope } from 'lucide-react';
import { ContactForm } from '@/components/common/ContactForm';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/Button';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'Contact',
  description: 'Questions about CLAWKIT, feedback, or vet partnerships. We read every message.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Contact" title="We’d love to hear from you." intro="Questions, feedback, or ideas for the app. We read every message." />
      <div className="container-page grid gap-12 pb-24 lg:grid-cols-[1.6fr_1fr]">
        <div className="rounded-[28px] border border-line bg-surface p-6 sm:p-10">
          {site.apiEnabled ? (
            <ContactForm />
          ) : (
            <div>
              <p className="text-lg font-semibold text-ink">Send us an email</p>
              <p className="mt-2 text-muted">
                Write to us at{' '}
                <a href={`mailto:${site.email}`} className="text-brand hover:underline">
                  {site.email}
                </a>{' '}
                and we’ll get back to you.
              </p>
              <Button href={`mailto:${site.email}`} className="mt-6">
                <Mail className="h-4 w-4" aria-hidden />
                Email us
              </Button>
            </div>
          )}
        </div>
        <aside className="space-y-6">
          <div className="rounded-[28px] border border-line bg-surface p-6">
            <Mail className="h-5 w-5 text-brand" aria-hidden />
            <p className="mt-4 font-semibold text-ink">Email us directly</p>
            <a href={`mailto:${site.email}`} className="mt-1 block text-muted hover:text-ink">
              {site.email}
            </a>
          </div>
          <div className="rounded-[28px] border border-danger/20 bg-danger/5 p-6">
            <Stethoscope className="h-5 w-5 text-danger" aria-hidden />
            <p className="mt-4 font-semibold text-ink">Is this an emergency?</p>
            <p className="mt-1 text-sm leading-6 text-muted">
              If your dog’s seizure lasts more than five minutes or they have several in a row, contact your vet or
              nearest emergency clinic now. We can’t give medical advice.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
