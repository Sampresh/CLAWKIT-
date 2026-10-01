const TONES = {
  success: 'border-success/25 bg-success/10 text-success',
  error: 'border-danger/25 bg-danger/10 text-danger',
  info: 'border-line bg-surface text-muted',
};

export function Alert({ tone = 'info', children }) {
  return (
    <div role={tone === 'error' ? 'alert' : 'status'} className={`rounded-2xl border px-4 py-3 text-sm ${TONES[tone]}`}>
      {children}
    </div>
  );
}
