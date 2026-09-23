'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useState, type ComponentProps, type ReactNode } from 'react';
import { industries, organisationSizes, processes } from '@/lib/forms';
import { Alert, Icon } from '../ui';
import { Dialog } from './dialog';
import { CheckboxField, Honeypot, SelectField, SubmitButton, TextField, useSiteForm, type SiteForm } from './form';

const WaitlistContext = createContext<() => void>(() => {});

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <WaitlistContext.Provider value={() => setOpen(true)}>
      {children}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        labelledBy="wl-title"
        className="fixed inset-y-0 right-0 left-auto m-0 flex h-full max-h-none max-w-none w-[min(480px,100%)] animate-slide flex-col border-l border-line shadow-overlay max-md:top-auto max-md:left-0 max-md:h-auto max-md:max-h-[92vh] max-md:w-full max-md:animate-rise max-md:rounded-t-xl max-md:border-t max-md:border-l-0 [&:not([open])]:hidden"
      >
        <div className="flex items-center justify-between gap-3 border-b border-line py-4 pr-4 pl-6">
          <h2 id="wl-title" className="text-h3">Join the SiteResolve waitlist</h2>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close waitlist form" className="inline-flex size-11 items-center justify-center rounded-md hover:bg-surface-200"><Icon name="close" /></button>
        </div>
        <FullWaitlistForm onDone={() => setOpen(false)} />
      </Dialog>
    </WaitlistContext.Provider>
  );
}

/** Opens the waitlist panel. Without JavaScript it is a normal link to the form on the home page. */
export function WaitlistLink({ onClick, ...props }: Omit<ComponentProps<typeof Link>, 'href'>) {
  const open = useContext(WaitlistContext);
  return (
    <Link
      href="/#waitlist"
      aria-haspopup="dialog"
      onClick={(e) => {
        onClick?.(e);
        e.preventDefault();
        open();
      }}
      {...props}
    />
  );
}

function WaitlistStatus({ form }: { form: SiteForm }) {
  if (form.status === 'duplicate') return <Alert role="status" title="This email address is already on the waitlist." />;
  if (form.status === 'error') return <Alert role="alert" tone="bad" title="We could not add you to the waitlist. Check your connection and try again." />;
  return null;
}

function useWaitlistForm(onDone?: () => void) {
  const router = useRouter();
  return useSiteForm('waitlist', { email: '', name: '', company: '', role: '', industry: '', organisationSize: '', currentProcess: '', consent: false }, () => {
    onDone?.();
    router.push('/waitlist-confirmation');
  });
}

function FullWaitlistForm({ onDone }: { onDone: () => void }) {
  const form = useWaitlistForm(onDone);
  return (
    <form ref={form.formRef} onSubmit={form.onSubmit} noValidate aria-labelledby="wl-title" className="flex min-h-0 flex-1 flex-col">
      <div className="flex flex-1 flex-col gap-5 overflow-y-auto p-6">
        <p className="text-ink-2">Receive product updates and information about access. You can also tell us how your team currently manages defects.</p>
        <WaitlistStatus form={form} />
        <TextField form={form} id="wl-email" name="email" type="email" label="Work email" placeholder="name@company.co.uk" autoComplete="email" autoFocus />
        <TextField form={form} id="wl-name" name="name" label="Name" optional autoComplete="name" />
        <div className="grid gap-5 md:grid-cols-2">
          <TextField form={form} id="wl-company" name="company" label="Company" optional autoComplete="organization" />
          <TextField form={form} id="wl-role" name="role" label="Role" optional autoComplete="organization-title" />
        </div>
        <SelectField form={form} id="wl-industry" name="industry" label="Industry" optional options={industries} />
        <SelectField form={form} id="wl-size" name="organisationSize" label="Organisation size" optional options={organisationSizes} />
        <SelectField form={form} id="wl-process" name="currentProcess" label="How do you currently manage defects?" optional options={processes} />
        <div>
          <CheckboxField form={form} id="wl-consent">I agree to receive SiteResolve product updates by email. I can unsubscribe at any time.</CheckboxField>
          <p className="text-sm text-ink-2">We use your information as explained in our <Link href="/privacy">Privacy Policy</Link>.</p>
        </div>
        <Honeypot id="wl-website" />
      </div>
      <div className="border-t border-line px-6 py-4">
        <SubmitButton form={form} label="Join the waitlist" busyLabel="Joining the waitlist" className="w-full" />
      </div>
    </form>
  );
}

/** The short waitlist form at the foot of the home page. */
export function HomeWaitlistForm() {
  const form = useWaitlistForm();
  return (
    <form ref={form.formRef} onSubmit={form.onSubmit} noValidate aria-label="Join the waitlist" className="flex w-full max-w-[520px] flex-col gap-4 rounded-xl border border-line bg-surface-200 px-5 py-6 text-left md:p-8">
      <WaitlistStatus form={form} />
      <TextField form={form} id="hc-email" name="email" type="email" label="Work email" placeholder="name@company.co.uk" autoComplete="email" />
      <CheckboxField form={form} id="hc-consent">I agree to receive SiteResolve product updates. I can unsubscribe at any time.</CheckboxField>
      <Honeypot id="hc-website" />
      <SubmitButton form={form} label="Join the waitlist" busyLabel="Joining the waitlist" />
      <p className="text-sm text-ink-2">Read our <Link href="/privacy">Privacy Policy</Link> to understand how we use your information.</p>
    </form>
  );
}
