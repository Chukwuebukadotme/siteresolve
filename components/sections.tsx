import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Eyebrow, Icon } from './ui';

/**
 * A numbered "record" section: a running number in the left column, content on the right.
 * Numbers come from a CSS counter reset on <main>, so sections can be added or reordered freely.
 */
export function Section({
  id, title, eyebrow, intro, dark, className, children
}: {
  id: string; title: ReactNode; eyebrow?: ReactNode; intro?: ReactNode; dark?: boolean; className?: string; children?: ReactNode;
}) {
  const headingId = `${id}-h`;
  return (
    <section id={id} aria-labelledby={headingId} className={cn('py-20 md:py-30', dark ? 'dk' : 'sec border-line [.sec+&]:border-t', className)}>
      <div className="wrap grid gap-x-6 gap-y-6 md:grid-cols-[56px_minmax(0,1fr)] lg:grid-cols-[88px_minmax(0,1fr)] lg:gap-x-14">
        <span aria-hidden="true" className="w-12 self-start border-t-2 border-ink pt-3.5 font-mono text-sm font-semibold text-ink before:[counter-increment:sec] before:content-[counter(sec,decimal-leading-zero)] md:w-auto" />
        <div className="flex min-w-0 flex-col gap-8">
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h2 id={headingId} className="max-w-[24ch] text-h2">{title}</h2>
          {intro ? <p className="max-w-[58ch] text-lead text-ink-2">{intro}</p> : null}
          {children}
        </div>
      </div>
    </section>
  );
}

export function PageHeader({ id = 'page-h', eyebrow, title, lead, children }: { id?: string; eyebrow: ReactNode; title: ReactNode; lead: ReactNode; children?: ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-b border-line py-16 text-center md:pt-26 md:pb-24">
      <div className="wrap flex flex-col items-center gap-5">
        <Eyebrow pill>{eyebrow}</Eyebrow>
        <h1 id={id} className="max-w-[22ch] text-h1">{title}</h1>
        <p className="max-w-[60ch] text-lead text-ink-2">{lead}</p>
        {children ? <div className="mt-2 flex flex-wrap items-center justify-center gap-3">{children}</div> : null}
      </div>
    </section>
  );
}

/** Closing call to action on a dark band. */
export function CtaBand({ id = 'cta', title, text, children }: { id?: string; title: ReactNode; text: ReactNode; children: ReactNode }) {
  return (
    <section aria-labelledby={`${id}-h`} className="dk py-20 text-center md:py-30">
      <div className="wrap flex flex-col items-center gap-4">
        <h2 id={`${id}-h`} className="text-h2">{title}</h2>
        <p className="max-w-[56ch] text-ink-2">{text}</p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">{children}</div>
      </div>
    </section>
  );
}

export function Faq({ items }: { items: ReadonlyArray<{ q: string; a: string }> }) {
  return (
    <div className="max-w-[820px] border-t border-line">
      {items.map((item) => (
        <details key={item.q} className="group border-b border-line">
          <summary className="flex min-h-15 cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg leading-snug font-semibold hover:text-link">
            <span>{item.q}</span>
            <Icon name="chev" className="text-ink-2 transition-transform duration-180 group-open:rotate-180" />
          </summary>
          <p className="max-w-[72ch] pb-6 text-ink-2">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
