'use client';

import { useQuery } from '@tanstack/react-query';
import { Inbox, Mail, Users } from 'lucide-react';
import Link from 'next/link';
import { adminService } from '@/services';

export default function AdminOverviewPage() {
  const { data, isLoading } = useQuery({ queryKey: ['admin', 'stats'], queryFn: adminService.stats });

  const cards = [
    { label: 'Unread messages', value: data?.unread, icon: Mail, href: '/admin/messages' },
    { label: 'All messages', value: data?.messages, icon: Inbox, href: '/admin/messages' },
    { label: 'Newsletter subscribers', value: data?.subscribers, icon: Users, href: '/admin/subscribers' },
  ];

  return (
    <>
      <h1 className="font-display text-3xl font-bold tracking-tight text-ink">Overview</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {cards.map(({ label, value, icon: Icon, href }) => (
          <Link key={label} href={href} className="rounded-3xl border border-line bg-surface p-6 transition hover:border-ink/20">
            <Icon className="h-5 w-5 text-brand" aria-hidden />
            <p className="mt-6 font-display text-4xl font-bold tabular-nums text-ink">{isLoading ? '–' : value}</p>
            <p className="mt-1 text-sm text-muted">{label}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
