import { ImageResponse } from 'next/og';
import { brandImageDataUri, LOGO_SRC } from '@/lib/brandAssets';

// 1200×630 share card built from the CLAWKIT logo; default og:image for every page (see lib/seo.js).
export const dynamic = 'force-static';

export async function GET() {
  const logo = await brandImageDataUri(LOGO_SRC);
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f9f8f2',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
      <img src={logo} width={592} height={470} />
    </div>,
    { width: 1200, height: 630 },
  );
}
