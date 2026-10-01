import { Logo } from '@/components/common/Logo';
import { noIndex } from '@/lib/seo';

export const metadata = { title: 'Admin · CLAWKIT', ...noIndex };

export default function AuthLayout({ children }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
      <Logo />
      <div className="mt-10 w-full max-w-md rounded-[28px] border border-line bg-surface p-8 shadow-[0_30px_60px_-30px_rgb(var(--ink)/0.25)]">
        {children}
      </div>
    </main>
  );
}
