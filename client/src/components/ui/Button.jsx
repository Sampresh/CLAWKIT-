import Link from 'next/link';
import { LoaderCircle } from 'lucide-react';

const cx = (...c) => c.filter(Boolean).join(' ');

const VARIANTS = {
  primary: 'bg-ink text-white hover:bg-brand',
  brand: 'bg-brand text-brand-ink hover:bg-brand/90 shadow-[0_10px_24px_-12px_rgb(var(--brand))]',
  outline: 'border border-line bg-surface text-ink hover:border-ink/30',
  ghost: 'text-muted hover:bg-ink/5 hover:text-ink',
  danger: 'text-danger hover:bg-danger/10',
};

const SIZES = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
};

export function Button({ href, variant = 'primary', size = 'md', loading, className, children, ...props }) {
  const classes = cx(
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-60',
    VARIANTS[variant],
    SIZES[size],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={loading || props.disabled} {...props}>
      {loading && <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden />}
      {children}
    </button>
  );
}
