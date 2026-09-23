import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { icons, type IconName } from '@/lib/icons';
import { site } from '@/lib/site';

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg className={cn('size-5 shrink-0 fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.75]', className)} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={icons[name]} />
    </svg>
  );
}

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

export function buttonClass(variant: ButtonVariant = 'primary', size: 'md' | 'sm' = 'md', extra?: string) {
  return cn(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border font-semibold leading-tight no-underline transition-colors duration-[120ms] ease-standard cursor-pointer aria-busy:cursor-progress aria-busy:opacity-75',
    size === 'md' ? 'min-h-11 px-5 text-[0.9375rem]' : 'min-h-9 px-3.5 text-[0.8125rem]',
    variant === 'primary' && 'border-transparent bg-brand text-white hover:bg-brand-hover active:bg-brand-active',
    variant === 'secondary' && 'border-line-strong bg-surface-100 text-ink hover:bg-surface-200',
    variant === 'ghost' && 'border-transparent bg-transparent text-link hover:bg-surface-200',
    variant === 'danger' && 'border-bad bg-surface-100 text-bad hover:bg-bad-subtle',
    extra
  );
}

export function ButtonLink({ variant, size, className, ...props }: ComponentProps<typeof Link> & { variant?: ButtonVariant; size?: 'md' | 'sm' }) {
  return <Link className={buttonClass(variant, size, className)} {...props} />;
}

/** A button-shaped label inside a product mock-up. Not interactive. */
export function MockButton({ children, variant = 'primary' }: { children: ReactNode; variant?: ButtonVariant }) {
  return <span className={buttonClass(variant, 'sm', 'pointer-events-none')}>{children}</span>;
}

export function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="group inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] font-semibold underline decoration-1">
      <span>{children}</span>
      <Icon name="arrow" className="size-[18px] transition-transform duration-[120ms] group-hover:translate-x-[3px]" />
    </Link>
  );
}

export type Tone = 'info' | 'ok' | 'warn' | 'bad' | 'closed';
const toneClass: Record<Tone, string> = {
  info: 'bg-brand-subtle text-link',
  ok: 'bg-ok-subtle text-ok',
  warn: 'bg-warn-subtle text-warn',
  bad: 'bg-bad-subtle text-bad',
  closed: 'bg-surface-300 text-ink-2'
};

export function StatusLabel({ tone = 'info', children, className }: { tone?: Tone; children: ReactNode; className?: string }) {
  return (
    <span className={cn('inline-flex h-6 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 text-xs font-semibold leading-none before:size-1.5 before:shrink-0 before:rounded-full before:bg-current', toneClass[tone], className)}>
      {children}
    </span>
  );
}

export function Priority({ children }: { children: ReactNode }) {
  return <span className="inline-flex h-[22px] items-center whitespace-nowrap rounded-sm bg-surface-300 px-2 text-xs font-semibold text-ink">{children}</span>;
}

export function Assignee({ initials, name, unassigned, compact }: { initials: string; name: string; unassigned?: boolean; compact?: boolean }) {
  return (
    <span className={cn('inline-flex max-w-full items-center gap-2 overflow-hidden whitespace-nowrap rounded-full border bg-surface-100 pr-2.5 pl-[3px]', compact ? 'h-6 text-xs' : 'h-7 text-[0.8125rem]', unassigned ? 'border-dashed border-line-strong text-ink-2' : 'border-line text-ink')}>
      <span className={cn('inline-flex shrink-0 items-center justify-center rounded-full font-bold tracking-wide', compact ? 'size-[18px] text-[0.5625rem]' : 'size-[22px] text-[0.625rem]', unassigned ? 'bg-surface-300 text-ink-2' : 'bg-brand-subtle text-link')}>{initials}</span>
      {name}
    </span>
  );
}

export function DemoTag() {
  return (
    <span className="striped inline-flex h-6 items-center gap-1.5 whitespace-nowrap rounded-sm border border-dashed border-line-strong px-2.5 text-xs font-semibold text-ink-2 before:size-1.5 before:rounded-[1px] before:border-[1.5px] before:border-current">
      Demonstration data
    </span>
  );
}

export function FeatureIcon({ name, size = 'md' }: { name: IconName; size?: 'sm' | 'md' | 'lg' }) {
  return (
    <span className={cn('inline-flex shrink-0 items-center justify-center rounded-md bg-brand-subtle text-link', size === 'sm' ? 'size-9' : size === 'lg' ? 'size-12' : 'size-10')}>
      <Icon name={name} />
    </span>
  );
}

const alertClass: Record<Exclude<Tone, 'closed'>, [string, string]> = {
  info: ['border-brand bg-brand-subtle', 'text-link'],
  ok: ['border-ok bg-ok-subtle', 'text-ok'],
  warn: ['border-warn bg-warn-subtle', 'text-warn'],
  bad: ['border-bad bg-bad-subtle', 'text-bad']
};
const alertIcon: Record<Exclude<Tone, 'closed'>, IconName> = { info: 'info', ok: 'check', warn: 'alert', bad: 'alert' };

export function Alert({ tone = 'info', title, children, role }: { tone?: Exclude<Tone, 'closed'>; title: ReactNode; children?: ReactNode; role?: 'status' | 'alert' }) {
  const [box, icon] = alertClass[tone];
  return (
    <div className={cn('flex items-start gap-3 rounded-lg border px-4 py-3.5 text-ink', box)} role={role}>
      <Icon name={alertIcon[tone]} className={cn('mt-0.5', icon)} />
      <div>
        <p className="font-semibold leading-snug">{title}</p>
        {children ? <p className="mt-0.5 text-[0.9375rem] leading-normal">{children}</p> : null}
      </div>
    </div>
  );
}

/** Renders text with [BRACKETED PLACEHOLDERS] highlighted so unfinished values stay visible. */
export function Ph({ children }: { children: string }) {
  const parts = children.split(/(\[[A-Z][^\]]*\])/);
  return (
    <>
      {parts.map((part, i) =>
        /^\[[A-Z][^\]]*\]$/.test(part) ? (
          <span key={i} className="rounded-sm border border-dashed border-current bg-warn-subtle px-1.5 py-px font-mono text-[0.875em] text-warn [box-decoration-break:clone]">{part}</span>
        ) : (
          part
        )
      )}
    </>
  );
}

/** Content that only appears while draft notices are switched on. */
export function DraftOnly({ children }: { children: ReactNode }) {
  return site.showDraftNotices ? <>{children}</> : null;
}

export function Eyebrow({ children, pill, className }: { children: ReactNode; pill?: boolean; className?: string }) {
  return (
    <p className={cn('text-sm font-semibold leading-tight', pill ? 'inline-flex min-h-8 items-center rounded-full border border-line px-3.5 text-ink-2' : 'text-link', className)}>
      {children}
    </p>
  );
}

export function Ticks({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={cn('grid gap-2.5', className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 leading-normal before:mt-2 before:size-2 before:shrink-0 before:rounded-full before:bg-ok">
          {item}
        </li>
      ))}
    </ul>
  );
}
