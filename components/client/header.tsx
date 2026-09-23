'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';
import { buttonClass, Icon } from '../ui';
import { WaitlistLink } from './waitlist';

export const primaryNav = [
  { href: '/product', label: 'Product' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' }
] as const;

export function Brand() {
  return (
    <Link href="/" className="inline-flex min-h-11 shrink-0 items-center gap-2.5 text-ink no-underline hover:text-ink">
      <Image src="/logo-ink.png" alt="" width={34} height={20} className="h-5 w-auto" priority />
      <span className="text-[1.0625rem] font-bold tracking-[-0.015em]">SiteResolve</span>
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!menuRef.current?.contains(target) && !buttonRef.current?.contains(target)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, [open]);

  const current = (href: string) => (pathname === href ? 'page' : undefined);

  return (
    <header className="pointer-events-none sticky top-0 z-50 px-3 pt-2 md:px-(--gutter) md:pt-3">
      <div className="pointer-events-auto relative mx-auto flex h-16 max-w-[1120px] items-center justify-between gap-3 rounded-xl border border-line bg-surface-100 pr-2.5 pl-5 shadow-raised lg:gap-6">
        <Brand />
        <nav aria-label="Primary" className="hidden min-w-0 flex-1 justify-center md:flex">
          <ul className="flex items-center gap-0.5">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={current(item.href)}
                  className="inline-flex min-h-11 items-center rounded-md px-2.5 text-sm font-semibold whitespace-nowrap text-ink-2 no-underline transition-colors hover:bg-surface-200 hover:text-link aria-[current=page]:bg-brand-subtle aria-[current=page]:text-ink lg:px-3.5 lg:text-[0.9375rem]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <WaitlistLink className={buttonClass('primary', 'md', 'max-md:hidden')}>Join the waitlist</WaitlistLink>
          <button
            ref={buttonRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-md border border-line-strong bg-surface-100 px-3.5 text-[0.9375rem] font-semibold text-ink md:hidden"
          >
            <Icon name={open ? 'close' : 'menu'} />
            <span>Menu</span>
          </button>
        </div>
        <div ref={menuRef} id="mobile-menu" hidden={!open} className={cn('absolute inset-x-0 top-[calc(100%+8px)] z-60 animate-pop rounded-lg border border-line bg-surface-100 p-2 shadow-overlay md:hidden')}>
          <nav aria-label="Mobile">
            <ul className="flex flex-col">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} aria-current={current(item.href)} onClick={() => setOpen(false)} className="flex min-h-12 items-center rounded-md px-3 font-semibold text-ink no-underline hover:bg-surface-200 aria-[current=page]:bg-brand-subtle">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <WaitlistLink onClick={() => setOpen(false)} className={buttonClass('primary', 'md', 'mt-2 w-full')}>Join the waitlist</WaitlistLink>
        </div>
      </div>
    </header>
  );
}
