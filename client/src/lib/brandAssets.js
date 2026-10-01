import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export { ICON_SRC, LOGO_SRC } from './brand';

// Data URI of a brand image, for next/og ImageResponse at build time.
export async function brandImageDataUri(src) {
  const buf = await readFile(join(process.cwd(), 'public', src));
  return `data:image/png;base64,${buf.toString('base64')}`;
}
