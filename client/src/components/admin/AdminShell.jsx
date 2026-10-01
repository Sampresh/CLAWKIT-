'use client';

import { Inbox, LayoutDashboard, LogOut, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Logo } from '@/components/common/Logo';
import { useAuthStore } from '@/store/authStore';

const links = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/messages', label: 'Messages', icon: Inbox },
  { href: '/admin/subscribers', label: 'Subscribers', icon: Users },
];

export function AdminShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const onLogout = async () => {
    await logout();
    router.replace('/login');
  };

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[240px_1fr]">
      <aside className="border-b border-line bg-surface lg:min-h-screen lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between p-4 lg:block lg:p-6">
          <Logo href="/admin" />
          <button onClick={onLogout} className="flex items-center gap-2 text-sm text-muted hover:text-ink lg:hidden">
            <LogOut className="h-4 w-4" aria-hidden /> Log out
          </button>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-4 pb-4 lg:flex-col lg:px-3">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  active ? 'bg-ink text-white' : 'text-muted hover:bg-ink/5 hover:text-ink'
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden /> {label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden px-6 pt-6 lg:block">
          <p className="truncate text-xs text-muted">{user?.email}</p>
          <button onClick={onLogout} className="mt-2 flex items-center gap-2 text-sm text-muted hover:text-ink">
            <LogOut className="h-4 w-4" aria-hidden /> Log out
          </button>
        </div>
      </aside>
      <main className="p-4 sm:p-8 lg:p-10">{children}</main>
    </div>
  );
}
