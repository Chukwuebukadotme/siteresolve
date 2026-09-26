'use client';

import Link from 'next/link';
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { loadAnalytics } from '@/lib/analytics';
import { buttonClass, DraftOnly, Icon, Ph, StatusLabel } from '../ui';
import { Dialog } from './dialog';

type Consent = { version: number; preferences: boolean; analytics: boolean; updated: string };
const STORAGE_KEY = 'sr-consent';
const VERSION = 1;

function readConsent(): Consent | null {
  try {
    const value = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? 'null') as Consent | null;
    return value && value.version === VERSION ? value : null;
  } catch {
    return null;
  }
}

const ConsentContext = createContext<{ openSettings: () => void }>({ openSettings: () => {} });

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [banner, setBanner] = useState(false);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState({ preferences: false, analytics: false });
  const analyticsLoaded = useRef(false);

  const apply = useCallback((value: Consent) => {
    if (value.analytics && !analyticsLoaded.current) {
      analyticsLoaded.current = true;
      loadAnalytics();
    }
    document.dispatchEvent(new CustomEvent('sr:consent', { detail: value }));
  }, []);

  useEffect(() => {
    const stored = readConsent();
    if (stored) {
      setConsent(stored);
      apply(stored);
    } else {
      setBanner(true);
    }
  }, [apply]);

  const save = (preferences: boolean, analytics: boolean) => {
    const value: Consent = { version: VERSION, preferences, analytics, updated: new Date().toISOString() };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch {
      /* Storage blocked: the choice applies to this visit only. */
    }
    setConsent(value);
    setBanner(false);
    setOpen(false);
    apply(value);
  };

  const openSettings = useCallback(() => {
    setDraft({ preferences: consent?.preferences ?? false, analytics: consent?.analytics ?? false });
    setOpen(true);
  }, [consent]);

  return (
    <ConsentContext.Provider value={{ openSettings }}>
      {children}

      {banner && !open ? (
        <section aria-labelledby="ck-h" className="fixed bottom-4 left-4 z-70 flex w-[min(440px,calc(100%-32px))] animate-pop flex-col gap-3 rounded-lg border border-line bg-surface-100 p-5 shadow-overlay">
          <h2 id="ck-h" className="font-semibold">Cookie choices</h2>
          <p className="text-[0.9375rem] text-ink-2">
            SiteResolve uses strictly necessary cookies to operate this website. Optional cookies are used only if you accept them. Read our <Link href="/cookies">Cookie Policy</Link>.
          </p>
          <div className="flex flex-wrap gap-2 [&>*]:flex-auto">
            <button type="button" className={buttonClass('secondary')} onClick={() => save(true, true)}>Accept optional cookies</button>
            <button type="button" className={buttonClass('secondary')} onClick={() => save(false, false)}>Reject optional cookies</button>
            <button type="button" className={buttonClass('ghost')} aria-haspopup="dialog" onClick={openSettings}>Manage cookies</button>
          </div>
        </section>
      ) : null}

      <Dialog open={open} onClose={() => setOpen(false)} labelledBy="ck-title" className="w-[min(560px,calc(100%-32px))] max-h-[calc(100vh-48px)] animate-pop overflow-y-auto rounded-lg border border-line shadow-overlay [margin:auto]">
        <div className="flex items-center justify-between gap-3 pt-4 pr-4 pl-6">
          <h2 id="ck-title" className="text-h3">Cookie settings</h2>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close cookie settings" className="inline-flex size-11 items-center justify-center rounded-md hover:bg-surface-200"><Icon name="close" /></button>
        </div>
        <div className="flex flex-col gap-4 px-6 pt-3 pb-6">
          <p className="text-ink-2">You can accept optional cookies, reject optional cookies or manage individual categories. You can change your selection at any time through Cookie settings in the website footer.</p>
          <ul className="rounded-lg border border-line [&>li+li]:border-t [&>li+li]:border-line">
            <li className="flex flex-col gap-1.5 p-4">
              <div className="flex min-h-11 items-center justify-between gap-3">
                <h3 className="font-semibold">Strictly necessary</h3>
                <StatusLabel tone="closed">Always active</StatusLabel>
              </div>
              <p className="text-[0.9375rem] text-ink-2">These technologies are required for website functions such as security, form handling and remembering cookie choices. They cannot be disabled through the SiteResolve cookie controls.</p>
            </li>
            <CookieCategory label="Preferences" checked={draft.preferences} onChange={(v) => setDraft((d) => ({ ...d, preferences: v }))} text="These technologies remember optional choices such as display or interface preferences." note="[CONFIRM WHETHER PREFERENCE COOKIES ARE USED]" />
            <CookieCategory label="Analytics" checked={draft.analytics} onChange={(v) => setDraft((d) => ({ ...d, analytics: v }))} text="These technologies help us understand which pages are visited and how the website is used." note="[CONFIRM ANALYTICS PROVIDER AND CONFIGURATION]" />
          </ul>
        </div>
        <div className="flex flex-wrap justify-end gap-3 border-t border-line px-6 py-4">
          <button type="button" className={buttonClass('secondary')} onClick={() => save(false, false)}>Reject optional cookies</button>
          <button type="button" className={buttonClass('primary')} onClick={() => save(draft.preferences, draft.analytics)}>Save cookie choices</button>
        </div>
      </Dialog>
    </ConsentContext.Provider>
  );
}

function CookieCategory({ label, text, note, checked, onChange }: { label: string; text: string; note: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <li className="flex flex-col gap-1.5 p-4">
      <label className="flex min-h-11 cursor-pointer items-center gap-3 font-semibold">
        <input type="checkbox" className="size-5 cursor-pointer accent-brand" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        {label}
      </label>
      <p className="text-[0.9375rem] text-ink-2">{text}</p>
      <DraftOnly><p className="text-[0.9375rem]"><Ph>{note}</Ph></p></DraftOnly>
    </li>
  );
}

export function CookieSettingsButton({ className, children = 'Cookie settings' }: { className?: string; children?: ReactNode }) {
  const { openSettings } = useContext(ConsentContext);
  return (
    <button type="button" aria-haspopup="dialog" onClick={openSettings} className={className}>
      {children}
    </button>
  );
}
