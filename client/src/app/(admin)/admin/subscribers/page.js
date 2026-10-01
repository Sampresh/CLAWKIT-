'use client';

import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Download, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Pagination } from '@/components/admin/Pagination';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { errorMessage } from '@/services/api';
import { adminService } from '@/services';

export default function AdminSubscribersPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const params = { page, pageSize: 50 };

  const { data, isLoading, error } = useQuery({
    queryKey: ['admin', 'subscribers', params],
    queryFn: () => adminService.subscribers(params),
    placeholderData: keepPreviousData,
  });

  const remove = useMutation({
    mutationFn: adminService.deleteSubscriber,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin'] }),
  });

  const exportCsv = useMutation({
    mutationFn: adminService.exportSubscribers,
    onSuccess: (blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'clawkit-subscribers.csv';
      a.click();
      URL.revokeObjectURL(url);
    },
  });

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink">
          Subscribers {data && <span className="text-muted">({data.total})</span>}
        </h1>
        <Button variant="outline" size="sm" loading={exportCsv.isPending} onClick={() => exportCsv.mutate()}>
          <Download className="h-4 w-4" aria-hidden /> Export CSV
        </Button>
      </div>

      <div className="mt-8">
        {error && <Alert tone="error">{errorMessage(error)}</Alert>}
        {isLoading && <p className="text-muted">Loading…</p>}
        {data && data.items.length === 0 && <Alert>No subscribers yet.</Alert>}
        {data && data.items.length > 0 && (
          <div className="overflow-x-auto rounded-3xl border border-line bg-surface">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-line text-muted">
                <tr>
                  <th className="px-5 py-3 font-medium">Email</th>
                  <th className="px-5 py-3 font-medium">Subscribed</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {data.items.map((s) => (
                  <tr key={s.id}>
                    <td className="px-5 py-3 text-ink">{s.email}</td>
                    <td className="px-5 py-3 text-muted">{new Date(s.createdAt).toLocaleDateString('en-US', { dateStyle: 'medium' })}</td>
                    <td className="px-5 py-3 text-right">
                      <Button
                        variant="danger"
                        size="sm"
                        aria-label={`Remove ${s.email}`}
                        loading={remove.isPending && remove.variables === s.id}
                        onClick={() => remove.mutate(s.id)}
                      >
                        <Trash2 className="h-4 w-4" aria-hidden />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {data && <Pagination page={data.page} pages={data.pages} onChange={setPage} />}
      </div>
    </>
  );
}
