import { CareersForm } from '@/components/client/careers-form';
import { PageHeader, Section } from '@/components/sections';
import { Icon } from '@/components/ui';
import { experienceAreas } from '@/lib/forms';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Careers | SiteResolve',
  description: 'Register your interest in future opportunities with SiteResolve.',
  path: '/careers'
});

export default function CareersPage() {
  return (
    <>
      <PageHeader eyebrow="Careers" title="Work on practical software for physical sites."
        lead="We are building SiteResolve for the people who find, assign and close defects on construction and property sites." />

      <Section id="opportunities" title="Current opportunities">
        <div className="flex flex-col items-center gap-2.5 rounded-lg border border-dashed border-line-strong px-6 py-10 text-center">
          <Icon name="list" className="size-7 text-ink-3" />
          <p className="font-semibold">No roles are listed at present.</p>
          <p className="max-w-[48ch] text-[0.9375rem] text-ink-2">Future opportunities will appear on this page.</p>
        </div>
      </Section>

      <Section id="areas" title="Skills that may be relevant to SiteResolve">
        <ul className="flex flex-wrap gap-2">
          {experienceAreas.map((area) => (
            <li key={area} className="inline-flex min-h-10 items-center rounded-md border border-line px-3.5 text-[0.9375rem] font-semibold">{area}</li>
          ))}
        </ul>
        <p className="max-w-[58ch] text-lead text-ink-2">This list describes relevant areas of work. It does not represent current vacancies.</p>
      </Section>

      <Section id="register" title="Register your interest"
        intro="If your experience fits, send a short introduction and we will keep it on file for future roles.">
        <CareersForm />
      </Section>
    </>
  );
}
