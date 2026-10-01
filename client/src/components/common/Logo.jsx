import Link from 'next/link';
import { PawPrint } from 'lucide-react';

export function LogoMark({ size = 30 }) {
  return (
    <span className="fsh-brand-dot" style={{ width: size, height: size }}>
      <PawPrint size={Math.round(size * 0.55)} strokeWidth={2.4} aria-hidden />
    </span>
  );
}

export function Logo({ href = '/' }) {
  return (
    <Link href={href} className="fsh-brand" aria-label="CLAWKIT home">
      <LogoMark />
      CLAWKIT
    </Link>
  );
}
