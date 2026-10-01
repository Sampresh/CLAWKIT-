import { SiteFooter } from '@/components/common/SiteFooter';
import { SiteHeader } from '@/components/common/SiteHeader';

export default function SiteLayout({ children }) {
  return (
    <>
      <SiteHeader />
      <main className="min-h-[60vh]">{children}</main>
      <SiteFooter />
    </>
  );
}
