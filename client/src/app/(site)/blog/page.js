import Image from 'next/image';
import Link from 'next/link';
import { PageHeader } from '@/components/common/PageHeader';
import { formatDate, posts } from '@/content/posts';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Blog',
  description: 'Practical guides on canine epilepsy, seizure first aid and working with your vet.',
  path: '/blog',
});

export default function BlogPage() {
  return (
    <>
      <PageHeader eyebrow="Blog" title="Guides for epileptic dog care." intro="Practical, vet-informed reading for owners." />
      <div className="container-page grid gap-8 pb-24 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group overflow-hidden rounded-[28px] border border-line bg-surface transition hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgb(var(--ink)/0.3)]"
          >
            <div className="relative aspect-[16/10] bg-line">
              <Image src={post.image} alt={post.imageAlt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="p-6">
              <p className="text-xs text-muted">
                {formatDate(post.date)} · {post.readMinutes} min read
              </p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight text-ink group-hover:text-brand">{post.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
