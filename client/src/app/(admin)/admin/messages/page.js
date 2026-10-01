'use client';

import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Pagination } from '@/components/admin/Pagination';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { errorMessage } from '@/services/api';
import { adminService } from '@/services';

const formatDateTime = (iso) =>
  new Date(iso).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });

export default function AdminMessagesPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [openId, setOpenId] = useState(null);

  const params = { page, pageSize: 20, ...(unreadOnly && { unread: 'true' }) };
  const { data, isLoading, error } = useQuery({
    queryKey: ['admin', 'messages', params],
    queryFn: () => adminService.messages(params),
    placeholderData: keepPreviousData,
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['admin'] });
  const mark = useMutation({ mutationFn: ({ id, read }) => adminService.markMessage(id, read), onSuccess: invalidate });
  const remove = useMutation({ mutationFn: adminService.deleteMessage, onSuccess: invalidate });

  const toggle = (msg) => {
    setOpenId(openId === msg.id ? null : msg.id);
    if (!msg.read) mark.mutate({ id: msg.id, read: true });
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink">Messages</h1>
        <label className="flex items-center gap-2 text-sm text-muted">
          <input
            type="checkbox"
            checked={unreadOnly}
            onChange={(e) => {
              setUnreadOnly(e.target.checked);
              setPage(1);
            }}
            className="h-4 w-4 accent-[rgb(var(--brand))]"
          />
          Unread only
        </label>
      </div>

      <div className="mt-8">
        {error && <Alert tone="error">{errorMessage(error)}</Alert>}
        {isLoading && <p className="text-muted">Loading…</p>}
        {data && data.items.length === 0 && <Alert>No messages yet.</Alert>}
        {data && data.items.length > 0 && (
          <ul className="divide-y divide-line overflow-hidden rounded-3xl border border-line bg-surface">
            {data.items.map((msg) => (
              <li key={msg.id}>
                <button onClick={() => toggle(msg)} className="flex w-full items-start gap-4 p-5 text-left hover:bg-bg">
                  <span className={`mt-2 h-2 w-2 shrink-0 rounded-full ${msg.read ? 'bg-transparent' : 'bg-brand'}`} aria-label={msg.read ? 'Read' : 'Unread'} />
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className={`text-ink ${msg.read ? '' : 'font-semibold'}`}>
                        {msg.name} <span className="font-normal text-muted">· {msg.email}</span>
                      </span>
                      <span className="text-xs text-muted">{formatDateTime(msg.createdAt)}</span>
                    </span>
                    <span className="mt-1 flex gap-2 text-sm text-muted">
                      <span className="rounded-full bg-ink/5 px-2 py-0.5 text-xs capitalize">{msg.topic}</span>
                      {msg.dogName && <span>Dog: {msg.dogName}</span>}
                    </span>
                    {openId !== msg.id && <span className="mt-2 block truncate text-sm text-muted">{msg.message}</span>}
                  </span>
                </button>
                {openId === msg.id && (
                  <div className="px-5 pb-5 pl-11">
                    <p className="whitespace-pre-wrap text-[15px] leading-7 text-ink">{msg.message}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button href={`mailto:${msg.email}?subject=${encodeURIComponent('Re: your CLAWKIT message')}`} size="sm">
                        Reply by email
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => mark.mutate({ id: msg.id, read: false })}>
                        Mark unread
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        loading={remove.isPending && remove.variables === msg.id}
                        onClick={() => remove.mutate(msg.id)}
                      >
                        <Trash2 className="h-4 w-4" aria-hidden /> Delete
                      </Button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
        {data && <Pagination page={data.page} pages={data.pages} onChange={setPage} />}
      </div>
    </>
  );
}
