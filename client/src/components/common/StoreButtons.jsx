import { site } from '@/lib/site';

function AppleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M16.37 12.62c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.77-3.32-1.8-1.41-.14-2.76.83-3.48.83-.72 0-1.82-.81-3-.79-1.54.02-2.97.9-3.76 2.28-1.6 2.78-.41 6.9 1.15 9.16.76 1.1 1.67 2.34 2.86 2.3 1.15-.05 1.58-.74 2.97-.74 1.38 0 1.78.74 2.99.72 1.24-.02 2.02-1.12 2.77-2.23.88-1.28 1.24-2.52 1.26-2.59-.03-.01-2.4-.92-2.42-3.66zM14.1 5.86c.63-.77 1.06-1.83.94-2.89-.91.04-2.02.61-2.67 1.37-.58.67-1.1 1.76-.96 2.8 1.02.08 2.06-.52 2.69-1.28z" />
    </svg>
  );
}

function PlayIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path fill="#00d7fe" d="M3.6 2.2c-.25.27-.4.68-.4 1.21v17.18c0 .53.15.94.41 1.2l9.62-9.79z" />
      <path fill="#ffce00" d="m16.43 15.2-3.2-3.2 3.2-3.2 3.87 2.2c1.1.63 1.1 1.66 0 2.29z" />
      <path fill="#ff3a44" d="M16.52 15.15 13.23 12l-9.62 9.79c.36.38.95.43 1.62.05z" />
      <path fill="#00f076" d="M16.52 8.85 5.23 2.17c-.67-.38-1.26-.33-1.62.05L13.23 12z" />
    </svg>
  );
}

const TONES = {
  solid: 'bg-ink text-white hover:bg-ink/90',
  outline: 'border border-line bg-surface text-ink hover:border-ink/30',
  light: 'bg-white text-ink hover:bg-white/90',
  glass: 'border border-white/15 bg-white/10 text-white hover:bg-white/15',
};

function StoreButton({ href, icon, small, big, tone }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex h-14 min-w-[180px] items-center gap-3 rounded-2xl px-5 transition hover:-translate-y-0.5 ${TONES[tone]}`}
    >
      {icon}
      <span className="flex flex-col leading-none">
        <span className="text-[11px] opacity-70">{small}</span>
        <span className="mt-1 text-lg font-semibold tracking-tight">{big}</span>
      </span>
    </a>
  );
}

// onDark: for use on the dark download panel.
export function StoreButtons({ onDark = false, className = '' }) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <StoreButton
        tone={onDark ? 'light' : 'solid'}
        href={site.appStoreUrl}
        icon={<AppleIcon className="h-7 w-7" />}
        small="Download on the"
        big="App Store"
      />
      <StoreButton
        tone={onDark ? 'glass' : 'outline'}
        href={site.playStoreUrl}
        icon={<PlayIcon className="h-6 w-6" />}
        small="Get it on"
        big="Google Play"
      />
    </div>
  );
}
