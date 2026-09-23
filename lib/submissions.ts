import 'server-only';
import { forms, validate, type FormKind, type Values } from './forms';

const webhooks: Record<FormKind, string | undefined> = {
  waitlist: process.env.WAITLIST_WEBHOOK_URL,
  contact: process.env.CONTACT_WEBHOOK_URL,
  careers: process.env.CAREERS_WEBHOOK_URL
};

// Preview mode only: remembers waitlist emails per server instance so the duplicate message can be reviewed.
const previewWaitlist = new Set<string>();

export type Result = { status: 200 | 400 | 409 | 502; body: Record<string, unknown> };

export function isFormKind(value: string): value is FormKind {
  return value in forms;
}

/** Validates and delivers one submission. Returns the HTTP status and body for the API route. */
export async function handleSubmission(kind: FormKind, input: Record<string, unknown>): Promise<Result> {
  // Honeypot: people never see this field, so a value means an automated submission. Accept quietly and drop it.
  if (typeof input.website === 'string' && input.website.trim() !== '') return { status: 200, body: { ok: true } };

  const values: Values = {};
  for (const name of Object.keys(forms[kind])) {
    const raw = input[name];
    values[name] = typeof raw === 'boolean' ? raw : typeof raw === 'string' ? raw.trim() : '';
  }
  const errors = validate(kind, values);
  if (Object.keys(errors).length) return { status: 400, body: { errors } };

  const submission = {
    form: kind,
    ...values,
    email: String(values.email).toLowerCase(),
    consentText: typeof input.consentText === 'string' ? input.consentText.slice(0, 500) : '',
    page: typeof input.page === 'string' ? input.page.slice(0, 200) : '',
    submittedAt: new Date().toISOString()
  };

  const webhook = webhooks[kind];
  if (!webhook) {
    if (kind === 'waitlist') {
      if (previewWaitlist.has(submission.email)) return { status: 409, body: { duplicate: true } };
      previewWaitlist.add(submission.email);
    }
    console.info(`[SiteResolve] Preview mode: ${kind} submission validated but not stored or sent. Set ${kind.toUpperCase()}_WEBHOOK_URL to deliver it.`);
    return { status: 200, body: { ok: true, preview: true } };
  }

  try {
    const res = await fetch(webhook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(submission), signal: AbortSignal.timeout(10_000) });
    if (res.status === 409) return { status: 409, body: { duplicate: true } };
    if (!res.ok) {
      console.error(`[SiteResolve] ${kind} webhook responded with ${res.status}`);
      return { status: 502, body: { error: 'delivery_failed' } };
    }
    return { status: 200, body: { ok: true } };
  } catch (error) {
    console.error(`[SiteResolve] ${kind} webhook request failed`, error);
    return { status: 502, body: { error: 'delivery_failed' } };
  }
}
