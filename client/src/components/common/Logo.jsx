import Image from 'next/image';
import Link from 'next/link';
import { ICON_SRC } from '@/lib/brand';

export function LogoMark({ size = 32 }) {
  return <Image src={ICON_SRC} alt="" width={size} height={size} className="fsh-brand-mark" priority />;
}

// Horizontal lockup for the nav and footer; the stacked logo is /images/clawkit-logo.png.
export function Logo({ href = '/' }) {
  return (
    <Link href={href} className="fsh-brand" aria-label="CLAWKIT home">
      <LogoMark />
      <span>
        <span className="fsh-brand-claw">CLAW</span>
        <span className="fsh-brand-kit">KIT</span>
      </span>
    </Link>
  );
}
