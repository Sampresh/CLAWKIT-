import { site } from './site';

// Per-page metadata with canonical URL and matching Open Graph / Twitter tags.
export function buildMetadata({ title, description = site.description, path = '/', image, type = 'website' } = {}) {
  const fullTitle = title ? `${title} · ${site.name}` : `${site.name} — ${site.tagline}`;
  const images = image ? [{ url: image, width: 1200, height: 630 }] : undefined;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: path },
    openGraph: { title: fullTitle, description, url: path, siteName: site.name, type, images },
    twitter: { card: image ? 'summary_large_image' : 'summary', title: fullTitle, description, images },
  };
}

export const noIndex = { robots: { index: false, follow: false } };
