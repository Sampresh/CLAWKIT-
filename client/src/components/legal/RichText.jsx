import Link from 'next/link';

// Renders 'plain' | [ 'plain', { b }, { link, href } ] from content files.
export function RichText({ value }) {
  const parts = Array.isArray(value) ? value : [value];
  return parts.map((part, i) => {
    if (typeof part === 'string') return part;
    if (part.b) {
      return (
        <strong key={i} className="font-semibold text-ink">
          {part.b}
        </strong>
      );
    }
    if (part.link) {
      return (
        <Link key={i} href={part.href} className="font-medium text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand">
          {part.link}
        </Link>
      );
    }
    return null;
  });
}
