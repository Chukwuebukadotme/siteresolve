'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { contactReasons } from '@/lib/forms';
import { site } from '@/lib/site';
import { Alert, Ph } from '../ui';
import { CheckboxField, Honeypot, SelectField, SubmitButton, TextareaField, TextField, useSiteForm } from './form';

export function ContactForm() {
  const form = useSiteForm('contact', { name: '', email: '', company: '', role: '', reason: '', message: '', consent: false });
  const params = useSearchParams();
  const wanted = params.get('reason');
  const { set } = form;

  // contact?reason=pricing preselects the matching reason.
  useEffect(() => {
    const match = contactReasons.find((r) => r.toLowerCase() === wanted?.toLowerCase());
    if (match) set('reason', match);
  }, [wanted]);

  return (
    <form ref={form.formRef} onSubmit={form.onSubmit} noValidate aria-labelledby="contact-form-h" className="flex max-w-[760px] flex-col gap-5">
      <h2 id="contact-form-h" className="sr-only">Contact form</h2>
      {form.status === 'success' ? <Alert role="status" tone="ok" title="Your enquiry has been sent.">Thank you. We will respond using the email address you provided.</Alert> : null}
      {form.status === 'error' ? (
        <Alert role="alert" tone="bad" title="Your enquiry could not be sent.">Check your connection and try again. If the problem continues, contact <Ph>{site.contactEmail}</Ph>.</Alert>
      ) : null}
      <div className="grid gap-5 md:grid-cols-2">
        <TextField form={form} id="ct-name" name="name" label="Name" placeholder="Your name" autoComplete="name" />
        <TextField form={form} id="ct-email" name="email" type="email" label="Work email" placeholder="name@company.co.uk" autoComplete="email" />
        <TextField form={form} id="ct-company" name="company" label="Company" optional placeholder="Company name" autoComplete="organization" />
        <TextField form={form} id="ct-role" name="role" label="Role" optional placeholder="Your role" autoComplete="organization-title" />
      </div>
      <SelectField form={form} id="ct-reason" name="reason" label="What would you like to discuss?" options={contactReasons} />
      <TextareaField form={form} id="ct-message" name="message" label="Message" placeholder="Tell us about your sites, current process or question." />
      <div>
        <CheckboxField form={form} id="ct-consent">I agree that SiteResolve may use this information to respond to my enquiry.</CheckboxField>
        <p className="text-sm text-ink-2">Read our <Link href="/privacy">Privacy Policy</Link> for more information.</p>
      </div>
      <Honeypot id="ct-website" />
      <div><SubmitButton form={form} label="Send enquiry" busyLabel="Sending enquiry" /></div>
    </form>
  );
}
