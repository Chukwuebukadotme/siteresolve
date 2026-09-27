import Link from 'next/link';
import type { ReactNode } from 'react';
import { site } from '@/lib/site';
import { solutions } from '@/content/solutions';
import { CookieSettingsButton } from './client/consent';
import { Brand } from './client/header';
import { WaitlistLink } from './client/waitlist';

const linkClass = 'inline-flex min-h-9 items-center text-left text-[0.9375rem] text-ink-2 no-underline hover:text-link hover:underline cursor-pointer';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-surface-200 pt-18 pb-10">
      <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
        <div className="flex max-w-[36ch] flex-col gap-4">
          <Brand />
          <p className="text-ink-2">{site.statement}</p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <FooterColumn title="Product">
            <li><Link className={linkClass} href="/product">Product</Link></li>
            <li><Link className={linkClass} href="/solutions">Solutions</Link></li>
            <li><Link className={linkClass} href="/pricing">Pricing</Link></li>
            <li><WaitlistLink className={linkClass}>Join the waitlist</WaitlistLink></li>
          </FooterColumn>
          <FooterColumn title="Solutions">
            {solutions.map((s) => (
              <li key={s.id}><Link className={linkClass} href={`/solutions#${s.id}`}>{s.name}</Link></li>
            ))}
          </FooterColumn>
          <FooterColumn title="Company">
            <li><Link className={linkClass} href="/about">About</Link></li>
            <li><Link className={linkClass} href="/contact">Contact</Link></li>
            <li><Link className={linkClass} href="/careers">Careers</Link></li>
          </FooterColumn>
          <FooterColumn title="Legal">
            <li><Link className={linkClass} href="/privacy">Privacy Policy</Link></li>
            <li><Link className={linkClass} href="/cookies">Cookie Policy</Link></li>
            <li><Link className={linkClass} href="/terms">Terms of Use</Link></li>
            <li><CookieSettingsButton className={linkClass} /></li>
          </FooterColumn>
        </nav>
        <p className="pt-4 text-sm text-ink-2 lg:col-span-2">© {year} SiteResolve. All rights reserved.</p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="mb-2 text-sm font-semibold">{title}</h2>
      <ul>{children}</ul>
    </div>
  );
}
