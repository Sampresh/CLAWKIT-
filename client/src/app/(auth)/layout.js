import Image from 'next/image';
import Link from 'next/link';
import { LOGO_SRC } from '@/lib/brand';
import { noIndex } from '@/lib/seo';

export const metadata = { title: 'Admin · CLAWKIT', ...noIndex };

export default function AuthLayout({ children }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
      <Link href="/" aria-label="CLAWKIT home">
        <Image src={LOGO_SRC} alt="CLAWKIT" width={160} height={127} priority />
      </Link>
      <div className="mt-10 w-full max-w-md rounded-[28px] border border-line bg-surface p-8 shadow-[0_30px_60px_-30px_rgb(var(--ink)/0.25)]">
        {children}
      </div>
    </main>
  );
}
