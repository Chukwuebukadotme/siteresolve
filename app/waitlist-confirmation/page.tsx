import { ButtonLink, Icon } from '@/components/ui';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({ title: 'You are on the SiteResolve waitlist', path: '/waitlist-confirmation', noindex: true });

export default function WaitlistConfirmationPage() {
  return (
    <section aria-labelledby="confirm-h" className="py-24 text-center md:py-36">
      <div className="wrap mx-auto flex max-w-[calc(720px+2*var(--gutter))] flex-col items-center gap-5">
        <span className="inline-flex size-14 items-center justify-center rounded-full bg-ok-subtle text-ok"><Icon name="check" className="size-7" /></span>
        <h1 id="confirm-h" className="text-h1">You are on the waitlist.</h1>
        <p className="text-lead text-ink-2">Thank you for your interest in SiteResolve. We have sent a confirmation to the email address you provided.</p>
        <p className="text-ink-2">We will use your answers to understand the teams and workflows SiteResolve needs to support.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">Return to the homepage</ButtonLink>
          <ButtonLink href="/product" variant="secondary">Explore the product</ButtonLink>
        </div>
      </div>
    </section>
  );
}
