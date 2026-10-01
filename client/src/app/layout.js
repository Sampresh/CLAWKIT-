import { Bricolage_Grotesque, Inter } from 'next/font/google';
import { Providers } from '@/components/common/Providers';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/lib/site';
import '@/styles/globals.css';

const sans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-display', display: 'swap' });

export const metadata = {
  metadataBase: new URL(site.url),
  ...buildMetadata(),
  applicationName: site.name,
  keywords: ['dog seizure tracker', 'canine epilepsy', 'dog seizure log', 'pet medication reminder', 'CLAWKIT'],
};

export const viewport = {
  themeColor: '#fbfaf7',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className="font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
