'use client';

import { LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

export function AdminRoute({ children }) {
  const router = useRouter();
  const { status, user, bootstrap } = useAuthStore();

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  const allowed = status === 'authenticated' && user?.role === 'ADMIN';

  useEffect(() => {
    if (status === 'anonymous' || (status === 'authenticated' && !allowed)) router.replace('/login');
  }, [status, allowed, router]);

  if (!allowed) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoaderCircle className="h-6 w-6 animate-spin text-muted" aria-label="Loading" />
      </div>
    );
  }
  return children;
}
