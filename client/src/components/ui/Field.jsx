import { forwardRef } from 'react';

const cx = (...c) => c.filter(Boolean).join(' ');

const control =
  'w-full rounded-2xl border border-line bg-surface px-4 text-[15px] text-ink placeholder:text-muted/60 ' +
  'transition focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/15 aria-[invalid=true]:border-danger';

export function Field({ label, error, hint, htmlFor, children }) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={htmlFor} className="block text-sm font-medium text-ink">
          {label}
        </label>
      )}
      {children}
      {error ? (
        <p className="text-sm text-danger" role="alert">
          {error}
        </p>
      ) : (
        hint && <p className="text-sm text-muted">{hint}</p>
      )}
    </div>
  );
}

export const Input = forwardRef(function Input({ className, ...props }, ref) {
  return <input ref={ref} className={cx(control, 'h-12', className)} {...props} />;
});

export const Textarea = forwardRef(function Textarea({ className, ...props }, ref) {
  return <textarea ref={ref} className={cx(control, 'min-h-36 py-3', className)} {...props} />;
});

export const Select = forwardRef(function Select({ className, children, ...props }, ref) {
  return (
    <select ref={ref} className={cx(control, 'h-12 appearance-none bg-no-repeat pr-10', className)} {...props}>
      {children}
    </select>
  );
});

// Hidden from humans; bots that fill every field trip it. The API silently discards those submissions.
export const Honeypot = forwardRef(function Honeypot(props, ref) {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Website
        <input ref={ref} type="text" tabIndex={-1} autoComplete="off" {...props} />
      </label>
    </div>
  );
});
