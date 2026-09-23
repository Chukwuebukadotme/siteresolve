import type { Metadata } from 'next';
import { ArrowLink, ButtonLink } from '@/components/ui';

export const metadata: Metadata = { title: 'Page not found | SiteResolve', robots: { index: false } };

export default function NotFound() {
  return (
    <section aria-labelledby="nf-h" className="py-24 text-center md:py-36">
      <div className="wrap mx-auto flex max-w-[calc(720px+2*var(--gutter))] flex-col items-center gap-5">
        <p className="font-mono text-sm text-ink-2">Error 404</p>
        <h1 id="nf-h" className="text-h1">This page could not be found.</h1>
        <p className="text-lead text-ink-2">The address may be incorrect, or the page may have moved.</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href="/">Return to the homepage</ButtonLink>
          <ArrowLink href="/contact">Contact SiteResolve</ArrowLink>
        </div>
      </div>
    </section>
  );
}
