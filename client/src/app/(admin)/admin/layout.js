import { AdminRoute } from '@/components/admin/AdminRoute';
import { AdminShell } from '@/components/admin/AdminShell';
import { noIndex } from '@/lib/seo';

export const metadata = { title: 'Admin · CLAWKIT', ...noIndex };

export default function AdminLayout({ children }) {
  return (
    <AdminRoute>
      <AdminShell>{children}</AdminShell>
    </AdminRoute>
  );
}
