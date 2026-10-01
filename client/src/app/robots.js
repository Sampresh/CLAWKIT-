import { site } from '@/lib/site';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/login', '/forgot-password', '/reset-password'],
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
