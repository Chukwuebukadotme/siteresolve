import { Suspense } from 'react';
import { ContactForm } from '@/components/client/contact-form';
import { WaitlistLink } from '@/components/client/waitlist';
import { PageHeader } from '@/components/sections';
import { buttonClass, Ph } from '@/components/ui';
import { pageMetadata } from '@/lib/metadata';
import { site } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Contact | SiteResolve',
  description: 'Contact SiteResolve about defect management, product access or organisational requirements.',
  path: '/contact'
});

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Contact" title="Tell us what your team needs to manage."
        lead="Share the type of sites you operate, how defects are currently handled and what you need from SiteResolve." />
      <section aria-label="Contact form" className="py-20 md:py-30">
        <div className="wrap grid items-start gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]">
          <Suspense>
            <ContactForm />
          </Suspense>
          <aside aria-label="Other contact details" className="flex flex-col gap-6 rounded-xl bg-surface-200 p-6">
            <div className="flex flex-col gap-1.5"><h2 className="text-sm font-semibold">Email</h2><p><Ph>{site.contactEmail}</Ph></p></div>
            <div className="flex flex-col gap-1.5"><h2 className="text-sm font-semibold">Privacy questions</h2><p><Ph>[PRIVACY CONTACT EMAIL]</Ph></p></div>
            <div className="flex flex-col gap-1.5">
              <h2 className="text-sm font-semibold">Product access</h2>
              <p className="text-ink-2">Join the waitlist to receive product updates and information about access.</p>
              <p><WaitlistLink className={buttonClass('secondary')}>Join the waitlist</WaitlistLink></p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
