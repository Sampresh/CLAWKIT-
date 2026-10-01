import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { StoreButtons } from '@/components/common/StoreButtons';
import { formatDate, getPost, posts } from '@/content/posts';
import { buildMetadata } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }) {
  const post = getPost(params.slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.image,
    type: 'article',
  });
}

function Block({ block }) {
  if (block.h2) return <h2>{block.h2}</h2>;
  if (block.ul)
    return (
      <ul>
        {block.ul.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  return <p>{block.p}</p>;
}

export default function BlogPostPage({ params }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  return (
    <article className="pb-24">
      <header className="container-page max-w-3xl pt-16 sm:pt-24">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink">
          <ArrowLeft className="h-4 w-4" aria-hidden /> All posts
        </Link>
        <p className="mt-8 text-sm text-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readMinutes} min read
        </p>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-[-0.04em] text-ink sm:text-5xl">{post.title}</h1>
        <p className="mt-5 text-lg leading-8 text-muted">{post.excerpt}</p>
      </header>
      <div className="container-page mt-12 max-w-5xl">
        <div className="relative aspect-[16/8] overflow-hidden rounded-[28px] bg-line">
          <Image src={post.image} alt={post.imageAlt} fill sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" priority />
        </div>
      </div>
      <div className="prose-page container-page mt-12 max-w-3xl">
        {post.body.map((block, i) => (
          <Block key={i} block={block} />
        ))}
        <div className="mt-14 rounded-[28px] border border-line bg-surface p-8">
          <p className="font-display text-2xl font-bold tracking-tight text-ink">Track every seizure with CLAWKIT.</p>
          <StoreButtons className="mt-6" />
        </div>
      </div>
    </article>
  );
}
