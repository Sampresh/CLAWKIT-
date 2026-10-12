import { CalendarDays, Check, Clock, Mail, ShieldCheck, Smartphone, Trash2, X } from 'lucide-react';
import { LegalBlocks } from '@/components/legal/LegalBlocks';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

// Linked from the App Store / Google Play listings as the account deletion URL.
// Steps and wording mirror the app's Account screen (Settings → Account → Delete my account).

const UPDATED = 'October 12, 2026';
const UPDATED_ISO = '2026-10-12';

export const metadata = buildMetadata({
  title: 'Delete Your Account',
  description:
    'How to permanently delete your Clawkit account and the data stored with it, from inside the app or by email.',
  path: '/account-delete',
});

const steps = [
  { title: 'Open Settings', text: 'Open Clawkit and tap the Settings tab at the bottom of the screen.' },
  { title: 'Tap Account', text: 'Under the Account section, tap the row showing your email address.' },
  { title: 'Tap “Delete my account”', text: 'You’ll find it under Deleting data, marked “Permanent, on every device.”' },
  { title: 'Confirm', text: 'Read the confirmation, then tap “Delete everything.” You’ll be signed out on every device.' },
];

const deleted = [
  'Your account, sign-in details and email address',
  'Every dog profile and pet photo',
  'All seizure records, symptoms and notes',
  'Daily check-ins, mood, appetite and sleep entries',
  'Medications, doses and schedules',
  'Vet and emergency contacts',
  'Seizure videos stored inside Clawkit on the phone you delete from',
];

const kept = [
  'Vet reports you already exported, printed or sent',
  'Videos you saved to your Photos or Gallery',
  'Anything you copied outside the Clawkit app',
];

function SectionHeading({ eyebrow, title }) {
  return (
    <>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-2 font-display text-2xl font-bold tracking-[-0.025em] text-ink sm:text-[28px]">{title}</h2>
    </>
  );
}

function ListCard({ icon: Icon, tone, title, items }) {
  const danger = tone === 'danger';
  return (
    <div className={`rounded-[28px] border bg-surface p-6 sm:p-8 ${danger ? 'border-danger/20' : 'border-line'}`}>
      <p className="font-semibold text-ink">{title}</p>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[15px] leading-6 text-ink/75">
            <span
              className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                danger ? 'bg-danger/10 text-danger' : 'bg-success/10 text-success'
              }`}
            >
              <Icon className="h-3 w-3" strokeWidth={3} aria-hidden />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AccountDeletePage() {
  return (
    <div className="pb-24">
      <header className="container-page max-w-4xl pb-12 pt-16 sm:pt-24">
        <p className="eyebrow">Account</p>
        <h1 className="mt-3 max-w-3xl font-display text-5xl font-extrabold tracking-[-0.045em] text-ink sm:text-6xl">
          Delete your account
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
          You can permanently delete your Clawkit account and everything stored with it at any time, straight from the
          app. No email or waiting needed.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 text-sm">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-ink">
            <CalendarDays className="h-4 w-4 text-brand" aria-hidden />
            Last updated <time dateTime={UPDATED_ISO}>{UPDATED}</time>
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-ink">
            <ShieldCheck className="h-4 w-4 text-brand" aria-hidden />
            Ausasi LLC · Texas, USA
          </span>
        </div>
      </header>

      <div className="container-page max-w-4xl space-y-6">
        <LegalBlocks
          blocks={[
            {
              callout: {
                tone: 'warning',
                title: 'Deleting your account cannot be undone',
                text: 'Every dog, every seizure record and every check-in is erased on every device. If you want to keep a copy for your vet, export a vet report from the app before you delete.',
              },
            },
          ]}
        />

        <section className="rounded-[28px] border border-line bg-surface p-6 sm:p-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <SectionHeading eyebrow="Option 1 · Fastest" title="Delete from the app" />
            </div>
            <span className="hidden h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-soft text-brand sm:grid">
              <Smartphone className="h-6 w-6" aria-hidden />
            </span>
          </div>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2">
            {steps.map((step, i) => (
              <li key={step.title} className="flex gap-4 rounded-2xl border border-line bg-bg p-5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand font-display text-sm font-bold text-brand-ink">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-ink">{step.title}</p>
                  <p className="mt-1 text-[15px] leading-6 text-muted">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-6 flex items-center gap-2 text-sm text-muted">
            <Trash2 className="h-4 w-4 shrink-0 text-danger" aria-hidden />
            Deletion starts immediately. Your data is removed from our servers and from the phone you’re using.
          </p>
        </section>

        <section className="rounded-[28px] border border-line bg-surface p-6 sm:p-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <SectionHeading eyebrow="Option 2" title="Can’t open the app? Email us" />
            </div>
            <span className="hidden h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-soft text-brand sm:grid">
              <Mail className="h-6 w-6" aria-hidden />
            </span>
          </div>
          <p className="mt-5 max-w-2xl leading-7 text-ink/75">
            If you no longer have the app installed or can’t sign in, send a deletion request from the email address
            on your account. We may ask you to confirm it’s you before deleting anything.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent('Clawkit account deletion request')}`}
              className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-brand-ink shadow-[0_12px_30px_-14px_rgb(var(--brand)/0.8)] transition hover:bg-brand-navy"
            >
              <Mail className="h-4 w-4" aria-hidden />
              Request deletion by email
            </a>
            <span className="break-all text-sm text-muted">{site.email}</span>
          </div>
          <p className="mt-4 text-sm text-muted">
            Use the subject “Clawkit account deletion request.”
          </p>
        </section>

        <section className="pt-6">
          <SectionHeading eyebrow="What happens" title="What gets deleted, and what doesn’t" />
          <div className="mt-6 grid gap-6 md:grid-cols-[1.4fr_1fr]">
            <ListCard icon={X} tone="danger" title="Permanently deleted" items={deleted} />
            <ListCard icon={Check} tone="kept" title="Not affected" items={kept} />
          </div>
        </section>

        <section className="rounded-[28px] border border-line bg-surface p-6 sm:p-10">
          <div className="flex gap-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand">
              <Clock className="h-5 w-5" aria-hidden />
            </span>
            <div className="min-w-0">
              <h2 className="font-display text-xl font-bold tracking-[-0.02em] text-ink">Retention</h2>
              <div className="mt-3">
                <LegalBlocks
                  blocks={[
                    {
                      p: 'Your data is removed from our active systems as soon as you confirm. Copies may remain in encrypted backups for up to 30 days before they are permanently deleted or overwritten, unless the law requires us to keep something longer.',
                    },
                    {
                      p: 'Seizure videos never leave your phone, so if Clawkit is installed on another device, open the app there too, or uninstall it, to clear any videos stored on that device.',
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        <LegalBlocks
          blocks={[
            {
              callout: {
                tone: 'note',
                title: 'Sharing an account with someone?',
                text: 'Only the designated account holder can delete a shared account. Other people with access can sign out, or use “Remove data from this phone” under Settings → Account, which clears the device but keeps the account.',
              },
            },
            {
              p: [
                'Read more in our ',
                { link: 'Privacy Policy', href: '/privacy' },
                ' and ',
                { link: 'Terms of Service', href: '/terms#ending-your-use' },
                '.',
              ],
            },
          ]}
        />
      </div>
    </div>
  );
}
