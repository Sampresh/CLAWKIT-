import { posts } from '@/content/posts';
import { site } from '@/lib/site';

export default function sitemap() {
  const pages = ['', '/about', '/blog', '/contact', '/privacy', '/terms'].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: path === '' || path === '/blog' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.6,
  }));
  const articles = posts.map((p) => ({
    url: `${site.url}/blog/${p.slug}`,
    lastModified: new Date(`${p.date}T00:00:00Z`),
    changeFrequency: 'yearly',
    priority: 0.5,
  }));
  return [...pages, ...articles];
}
