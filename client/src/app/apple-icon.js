import { ImageResponse } from 'next/og';
import { brandImageDataUri, ICON_SRC } from '@/lib/brandAssets';

// iOS home-screen icon: the CLAWKIT icon on an opaque background (iOS turns transparency black).
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default async function AppleIcon() {
  const icon = await brandImageDataUri(ICON_SRC);
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#ffffff',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
      <img src={icon} width={148} height={148} />
    </div>,
    size,
  );
}
