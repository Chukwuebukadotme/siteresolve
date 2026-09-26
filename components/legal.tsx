import type { ReactNode } from 'react';
import { CookieSettingsButton } from './client/consent';
import { Alert, buttonClass, DraftOnly, Ph } from './ui';

export type LegalSection = { title: string; body: ReactNode };

export function LegalDocument({ title, draftNote, sections }: { title: string; draftNote: string; sections: LegalSection[] }) {
  return (
    <section aria-labelledby="legal-h" className="py-20 md:pt-26 md:pb-30">
      <div className="wrap flex max-w-[calc(760px+2*var(--gutter))] flex-col gap-12">
        <header className="flex flex-col gap-4">
          <h1 id="legal-h" className="text-h1">{title}</h1>
          <p className="font-medium text-ink-2"><Ph>Effective date: [EFFECTIVE DATE]</Ph></p>
          <DraftOnly><Alert tone="warn" title="Draft for review">{draftNote}</Alert></DraftOnly>
        </header>
        <nav aria-label="On this page" className="flex flex-col gap-2 rounded-xl bg-surface-200 p-6">
          <p className="text-sm font-semibold">On this page</p>
          <ul className="grid gap-x-6 md:grid-cols-2">
            {sections.map((s, i) => (
              <li key={s.title}>
                <a href={`#s${i + 1}`} className="flex min-h-9 items-center text-sm leading-snug text-ink-2 no-underline hover:text-link hover:underline">{s.title}</a>
              </li>
            ))}
          </ul>
        </nav>
        <article className="flex flex-col gap-10">
          {sections.map((s, i) => (
            <section key={s.title} id={`s${i + 1}`} aria-labelledby={`s${i + 1}-h`} className="flex scroll-mt-26 flex-col gap-3.5 [&_p]:max-w-[68ch]">
              <h2 id={`s${i + 1}-h`} className="text-xl leading-tight font-semibold">{s.title}</h2>
              {s.body}
            </section>
          ))}
        </article>
      </div>
    </section>
  );
}

/** A paragraph whose [PLACEHOLDERS] are highlighted. */
export function P({ children }: { children: string }) {
  return <p><Ph>{children}</Ph></p>;
}

export function Sub({ children }: { children: string }) {
  return <h3 className="mt-1.5 font-semibold">{children}</h3>;
}

export function List({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-1.5 pl-1">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 before:mt-2.5 before:size-1.5 before:shrink-0 before:rounded-full before:bg-ink-2">{item}</li>
      ))}
    </ul>
  );
}

export function Table({ rows }: { rows: Array<[string, string]> }) {
  return (
    <dl className="grid overflow-hidden rounded-lg border border-line sm:grid-cols-[minmax(160px,auto)_minmax(0,1fr)]">
      {rows.map(([k, v], i) => (
        <div key={k} className={`contents ${i < rows.length - 1 ? '[&>*]:border-b [&>*]:border-line' : ''}`}>
          <dt className="bg-surface-200 px-4 py-3 text-[0.9375rem] font-semibold max-sm:border-b-0! max-sm:pb-1">{k}</dt>
          <dd className="px-4 py-3"><Ph>{v}</Ph></dd>
        </div>
      ))}
    </dl>
  );
}

export function Purposes({ rows }: { rows: Array<[string, string, string]> }) {
  return (
    <div className="grid gap-3">
      {rows.map(([heading, purpose, basis]) => (
        <div key={heading} className="grid gap-2 rounded-lg border border-line px-5 py-4">
          <h3 className="font-semibold">{heading}</h3>
          <p className="grid gap-0.5 text-[0.9375rem] sm:grid-cols-[120px_minmax(0,1fr)] sm:gap-3"><span className="font-semibold text-ink-2">Purpose</span><span>{purpose}</span></p>
          <p className="grid gap-0.5 text-[0.9375rem] sm:grid-cols-[120px_minmax(0,1fr)] sm:gap-3"><span className="font-semibold text-ink-2">Lawful basis</span><span><Ph>{basis}</Ph></span></p>
        </div>
      ))}
    </div>
  );
}

export function Address({ lines }: { lines: string[] }) {
  return (
    <address className="flex flex-col items-start gap-1 rounded-lg bg-surface-200 px-5 py-4 not-italic">
      {lines.map((line) => <span key={line}><Ph>{line}</Ph></span>)}
    </address>
  );
}

export function ManageCookies() {
  return <p><CookieSettingsButton className={buttonClass('secondary')}>Manage cookies</CookieSettingsButton></p>;
}
