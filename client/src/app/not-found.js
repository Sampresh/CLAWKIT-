import { SiteFooter } from '@/components/common/SiteFooter';
import { SiteHeader } from '@/components/common/SiteHeader';
import { Button } from '@/components/ui/Button';

export const metadata = { title: 'Page not found · CLAWKIT' };

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <p className="eyebrow">404</p>
        <h1 className="section-title mt-3">This page wandered off.</h1>
        <p className="mt-4 max-w-md text-muted">We couldn’t find what you were looking for.</p>
        <Button href="/" className="mt-8">
          Back to home
        </Button>
      </main>
      <SiteFooter />
    </>
  );
}
