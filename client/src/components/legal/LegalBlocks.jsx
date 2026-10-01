import { Info, TriangleAlert } from 'lucide-react';
import { RichText } from './RichText';

const CALLOUTS = {
  warning: {
    icon: TriangleAlert,
    box: 'border-danger/20 bg-danger/[0.05]',
    iconBox: 'bg-danger/10 text-danger',
  },
  note: {
    icon: Info,
    box: 'border-brand/20 bg-brand-soft/60',
    iconBox: 'bg-brand/10 text-brand',
  },
};

function Callout({ tone = 'note', title, text }) {
  const { icon: Icon, box, iconBox } = CALLOUTS[tone];
  return (
    <div role={tone === 'warning' ? 'note' : undefined} className={`flex gap-4 rounded-2xl border p-5 sm:p-6 ${box}`}>
      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${iconBox}`}>
        <Icon className="h-[18px] w-[18px]" aria-hidden />
      </span>
      <div>
        {title && <p className="font-semibold text-ink">{title}</p>}
        <p className={`leading-7 text-ink/75 ${title ? 'mt-1' : ''}`}>
          <RichText value={text} />
        </p>
      </div>
    </div>
  );
}

export function LegalBlocks({ blocks }) {
  return (
    <div className="space-y-5 text-[16px] leading-7 text-ink/75">
      {blocks.map((block, i) => {
        if (block.h3) {
          return (
            <h3 key={i} className="pt-3 text-lg font-semibold tracking-tight text-ink">
              {block.h3}
            </h3>
          );
        }
        if (block.ul) {
          return (
            <ul key={i} className="space-y-2.5">
              {block.ul.map((item, j) => (
                <li key={j} className="flex gap-3">
                  <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                  <span>
                    <RichText value={item} />
                  </span>
                </li>
              ))}
            </ul>
          );
        }
        if (block.callout) return <Callout key={i} {...block.callout} />;
        return (
          <p key={i}>
            <RichText value={block.p} />
          </p>
        );
      })}
    </div>
  );
}
