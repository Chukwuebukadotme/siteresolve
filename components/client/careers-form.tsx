'use client';

import { experienceAreas } from '@/lib/forms';
import { Alert, Ph } from '../ui';
import { CheckboxField, Honeypot, SelectField, SubmitButton, TextareaField, TextField, useSiteForm } from './form';

export function CareersForm() {
  const form = useSiteForm('careers', { name: '', email: '', areaOfExperience: '', profileLink: '', introduction: '', consent: false });
  return (
    <form ref={form.formRef} onSubmit={form.onSubmit} noValidate aria-labelledby="register-h" className="flex max-w-[760px] flex-col gap-5">
      {form.status === 'success' ? <Alert role="status" tone="ok" title="Your interest has been registered.">Thank you. We will keep your details for future consideration.</Alert> : null}
      {form.status === 'error' ? <Alert role="alert" tone="bad" title="Your details could not be sent.">Check your connection and try again.</Alert> : null}
      <div className="grid gap-5 md:grid-cols-2">
        <TextField form={form} id="cr-name" name="name" label="Name" placeholder="Your name" autoComplete="name" />
        <TextField form={form} id="cr-email" name="email" type="email" label="Email" placeholder="name@example.co.uk" autoComplete="email" />
        <SelectField form={form} id="cr-area" name="areaOfExperience" label="Area of experience" optional options={experienceAreas} />
        <TextField form={form} id="cr-link" name="profileLink" type="url" label="Portfolio or profile link" optional placeholder="https://" autoComplete="url" />
      </div>
      <TextareaField form={form} id="cr-intro" name="introduction" label="Short introduction" />
      <CheckboxField form={form} id="cr-consent">
        I agree that SiteResolve may retain my information for <Ph>[CAREERS RETENTION PERIOD]</Ph> for the purpose of considering future opportunities.
      </CheckboxField>
      <Honeypot id="cr-website" />
      <div><SubmitButton form={form} label="Register interest" busyLabel="Registering interest" /></div>
    </form>
  );
}
