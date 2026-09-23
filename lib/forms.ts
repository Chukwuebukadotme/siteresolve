/** Form definitions shared by the browser (instant feedback) and the API routes (authoritative checks). */

export type FormKind = 'waitlist' | 'contact' | 'careers';
export type Rule = 'required' | 'email' | 'checked' | 'url' | 'option';
export type FieldSpec = { rule?: Rule; message?: string; maxLength: number; options?: readonly string[] };
export type Values = Record<string, string | boolean>;
export type Errors = Record<string, string>;

export const industries = ['Construction', 'Property management', 'Facilities management', 'Maintenance', 'Inspections', 'Independent contractor', 'Other'] as const;
export const organisationSizes = ['Independent', '2 to 10 people', '11 to 50 people', '51 to 250 people', 'More than 250 people', 'Prefer not to say'] as const;
export const processes = ['Spreadsheets', 'Email', 'Messaging applications', 'Construction-management software', 'Property-management software', 'Maintenance software', 'Paper forms', 'A combination of tools', 'Other'] as const;
export const contactReasons = ['Product access', 'Defect-management requirements', 'Pricing', 'Integration requirements', 'Partnership', 'Careers', 'Privacy question', 'Other'] as const;
export const experienceAreas = ['Product design', 'Frontend engineering', 'Backend engineering', 'Mobile product development', 'Construction technology', 'Property operations', 'Customer implementation', 'Data protection and security'] as const;

const workEmail = { rule: 'email', message: 'Enter a valid work email address.', maxLength: 254 } as const;

export const forms: Record<FormKind, Record<string, FieldSpec>> = {
  waitlist: {
    email: workEmail,
    name: { maxLength: 120 },
    company: { maxLength: 160 },
    role: { maxLength: 120 },
    industry: { rule: 'option', options: industries, maxLength: 60 },
    organisationSize: { rule: 'option', options: organisationSizes, maxLength: 60 },
    currentProcess: { rule: 'option', options: processes, maxLength: 60 },
    consent: { rule: 'checked', message: 'Confirm that you agree to receive product updates by email.', maxLength: 5 }
  },
  contact: {
    name: { rule: 'required', message: 'Enter your name.', maxLength: 120 },
    email: workEmail,
    company: { maxLength: 160 },
    role: { maxLength: 120 },
    reason: { rule: 'required', message: 'Select a reason for contact.', options: contactReasons, maxLength: 60 },
    message: { rule: 'required', message: 'Enter a message.', maxLength: 5000 },
    consent: { rule: 'checked', message: 'Confirm that we may use your information to respond.', maxLength: 5 }
  },
  careers: {
    name: { rule: 'required', message: 'Enter your name.', maxLength: 120 },
    email: { rule: 'email', message: 'Enter a valid email address.', maxLength: 254 },
    areaOfExperience: { rule: 'option', options: experienceAreas, maxLength: 60 },
    profileLink: { rule: 'url', message: 'Enter a web address that starts with http:// or https://.', maxLength: 500 },
    introduction: { rule: 'required', message: 'Enter a short introduction.', maxLength: 3000 },
    consent: { rule: 'checked', message: 'Confirm that we may retain your information.', maxLength: 5 }
  }
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const URL_RE = /^https?:\/\/[^\s.]+\.[^\s]{2,}$/i;

export function checkField(spec: FieldSpec, value: string | boolean | undefined): string | null {
  const text = typeof value === 'string' ? value.trim() : '';
  const fail = spec.message ?? 'Check this field.';
  if (spec.rule === 'checked') return value === true ? null : fail;
  if (text.length > spec.maxLength) return `Use ${spec.maxLength} characters or fewer.`;
  if (spec.rule === 'required' && !text) return fail;
  if (spec.rule === 'email' && !EMAIL.test(text)) return fail;
  if (spec.rule === 'url' && text && !URL_RE.test(text)) return fail;
  if (spec.options && text && !spec.options.includes(text)) return spec.rule === 'required' ? fail : 'Select an option from the list.';
  return null;
}

export function validate(kind: FormKind, values: Values): Errors {
  const errors: Errors = {};
  for (const [name, spec] of Object.entries(forms[kind])) {
    const problem = checkField(spec, values[name]);
    if (problem) errors[name] = problem;
  }
  return errors;
}
