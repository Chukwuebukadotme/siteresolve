'use client';

import { useRef, useState, type FormEvent, type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { checkField, forms, validate, type Errors, type FormKind, type Values } from '@/lib/forms';
import { Icon } from '../ui';

export type Outcome = 'success' | 'duplicate' | 'invalid' | 'error';

/** State and submission for one site form. Validates in the browser, then posts JSON to /api/forms/[kind]. */
export function useSiteForm(kind: FormKind, initial: Values, onSuccess?: () => void) {
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'busy' | Outcome>('idle');

  const set = (name: string, value: string | boolean) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name] && !checkField(forms[kind][name], value)) {
      setErrors(({ [name]: _cleared, ...rest }) => rest);
    }
    if (status === 'success' || status === 'duplicate' || status === 'error') setStatus('idle');
  };

  const focusFirst = (errs: Errors) => {
    const first = Object.keys(forms[kind]).find((name) => errs[name]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'busy') return;
    const errs = validate(kind, values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      setStatus('idle');
      focusFirst(errs);
      return;
    }
    setStatus('busy');
    const form = formRef.current;
    const consentLabel = form?.querySelector('[name="consent"]')?.closest('label');
    const payload = {
      ...values,
      website: (form?.elements.namedItem('website') as HTMLInputElement | null)?.value ?? '',
      consentText: consentLabel?.textContent?.replace(/\s+/g, ' ').trim() ?? '',
      page: window.location.pathname
    };
    let outcome: Outcome = 'error';
    try {
      const res = await fetch(`/api/forms/${kind}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (res.ok) outcome = 'success';
      else if (res.status === 409) outcome = 'duplicate';
      else if (res.status === 400) {
        const body = (await res.json().catch(() => ({}))) as { errors?: Errors };
        if (body.errors && Object.keys(body.errors).length) {
          setErrors(body.errors);
          focusFirst(body.errors);
          outcome = 'invalid';
        }
      }
    } catch {
      outcome = 'error';
    }
    if (outcome === 'success') {
      setValues(initial);
      if (onSuccess) {
        onSuccess();
        return;
      }
    }
    setStatus(outcome === 'invalid' ? 'idle' : outcome);
  };

  return { formRef, values, errors, status, busy: status === 'busy', set, onSubmit };
}

export type SiteForm = ReturnType<typeof useSiteForm>;

const inputClass =
  'block w-full rounded-md border border-line-strong bg-surface-300 px-3.5 text-base text-ink placeholder:text-ink-3 transition-[border-color,box-shadow] duration-[120ms] focus:border-brand focus:shadow-[0_0_0_3px_rgb(35_108_255/0.35)] focus:outline-none aria-invalid:border-bad';

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="flex items-start gap-2 text-sm leading-snug font-medium text-bad">
      <Icon name="alert" className="mt-0.5 size-4" />
      <span>{message}</span>
    </p>
  );
}

function Label({ htmlFor, children, optional }: { htmlFor: string; children: ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="text-sm leading-tight font-semibold text-ink">
      {children}
      {optional ? <span className="ml-1.5 font-medium text-ink-2">Optional</span> : null}
    </label>
  );
}

type FieldProps = { form: SiteForm; id: string; name: string; label: string; optional?: boolean; placeholder?: string; className?: string };

function a11y(form: SiteForm, id: string, name: string) {
  const error = form.errors[name];
  return { 'aria-invalid': error ? true : undefined, 'aria-describedby': error ? `${id}-err` : undefined };
}

export function TextField({ form, id, name, label, optional, placeholder, className, type = 'text', autoComplete, autoFocus }: FieldProps & { type?: 'text' | 'email' | 'url'; autoComplete?: string; autoFocus?: boolean }) {
  return (
    <div className={cn('flex min-w-0 flex-col gap-2', className)}>
      <Label htmlFor={id} optional={optional}>{label}</Label>
      <input
        id={id} name={name} type={type} autoComplete={autoComplete} data-autofocus={autoFocus || undefined} placeholder={placeholder} spellCheck={type === 'text' ? undefined : false}
        required={!optional} className={cn(inputClass, 'h-12')} value={String(form.values[name] ?? '')}
        onChange={(e) => form.set(name, e.target.value)} {...a11y(form, id, name)}
      />
      <FieldError id={`${id}-err`} message={form.errors[name]} />
    </div>
  );
}

export function TextareaField({ form, id, name, label, optional, placeholder, className }: FieldProps) {
  return (
    <div className={cn('flex min-w-0 flex-col gap-2', className)}>
      <Label htmlFor={id} optional={optional}>{label}</Label>
      <textarea
        id={id} name={name} rows={5} placeholder={placeholder} required={!optional}
        className={cn(inputClass, 'min-h-34 resize-y py-3 leading-relaxed')} value={String(form.values[name] ?? '')}
        onChange={(e) => form.set(name, e.target.value)} {...a11y(form, id, name)}
      />
      <FieldError id={`${id}-err`} message={form.errors[name]} />
    </div>
  );
}

export function SelectField({ form, id, name, label, optional, options, className }: FieldProps & { options: readonly string[] }) {
  return (
    <div className={cn('flex min-w-0 flex-col gap-2', className)}>
      <Label htmlFor={id} optional={optional}>{label}</Label>
      <div className="relative">
        <select
          id={id} name={name} required={!optional} className={cn(inputClass, 'h-12 cursor-pointer appearance-none pr-11')}
          value={String(form.values[name] ?? '')} onChange={(e) => form.set(name, e.target.value)} {...a11y(form, id, name)}
        >
          <option value="">Select an option</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <Icon name="chev" className="pointer-events-none absolute top-3.5 right-3.5 text-ink-2" />
      </div>
      <FieldError id={`${id}-err`} message={form.errors[name]} />
    </div>
  );
}

export function CheckboxField({ form, id, name = 'consent', children }: { form: SiteForm; id: string; name?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="flex min-h-11 cursor-pointer items-start gap-3 py-2.5 leading-normal">
        <input
          id={id} name={name} type="checkbox" required className="mt-0.5 size-5 shrink-0 cursor-pointer accent-brand"
          checked={form.values[name] === true} onChange={(e) => form.set(name, e.target.checked)} {...a11y(form, id, name)}
        />
        <span>{children}</span>
      </label>
      <FieldError id={`${id}-err`} message={form.errors[name]} />
    </div>
  );
}

/** Hidden field that people never see. Automated submissions that fill it are dropped by the server. */
export function Honeypot({ id }: { id: string }) {
  return (
    <div className="sr-only" aria-hidden="true">
      <label htmlFor={id}>Leave this field empty</label>
      <input id={id} name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
    </div>
  );
}

export function SubmitButton({ form, label, busyLabel, className }: { form: SiteForm; label: string; busyLabel: string; className?: string }) {
  return (
    <button type="submit" aria-busy={form.busy || undefined} className={cn('inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-md bg-brand px-5 text-[0.9375rem] font-semibold whitespace-nowrap text-white transition-colors hover:bg-brand-hover active:bg-brand-active aria-busy:cursor-progress aria-busy:opacity-75', className)}>
      {form.busy ? busyLabel : label}
    </button>
  );
}
