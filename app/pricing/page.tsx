import { WaitlistLink } from '@/components/client/waitlist';
import { CtaBand, Faq, PageHeader, Section } from '@/components/sections';
import { buttonClass, ButtonLink } from '@/components/ui';
import { pricingFaq } from '@/content/faq';
import { plans } from '@/content/plans';
import { cn } from '@/lib/cn';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Pricing | SiteResolve',
  description: 'Compare SiteResolve plans for contractors, operational teams and larger organisations.',
  path: '/pricing'
});

export default function PricingPage() {
  return (
    <>
      <PageHeader eyebrow="Pricing" title="Choose the level of control your team needs."
        lead="Plans are based on team size, number of sites and required management controls. Join the waitlist to discuss the right setup for your organisation.">
        <WaitlistLink className={buttonClass('primary')}>Join the waitlist</WaitlistLink>
      </PageHeader>

      <section aria-label="Plans" className="py-24">
        <ul className="wrap grid">
          {plans.map((plan) => (
            <li key={plan.name} className="grid items-start gap-5 border-t border-line py-10 last:border-b lg:grid-cols-[minmax(0,4fr)_minmax(0,5fr)_minmax(0,3fr)] lg:gap-8">
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-[0.8125rem] text-ink-2">{plan.num}</span>
                <h2 className="text-[2rem] leading-tight font-semibold tracking-[-0.025em]">{plan.name}</h2>
                <p className="text-ink-2">{plan.audience}</p>
              </div>
              <ul aria-label={`${plan.name} features`} className="grid gap-x-5 gap-y-2.5 sm:grid-cols-2">
                {plan.features.map((f) => {
                  const inherited = f.startsWith('Everything in');
                  return (
                    <li key={f} className={cn('flex items-start gap-2.5 leading-normal before:mt-2 before:size-2 before:shrink-0 before:rounded-full', inherited ? 'font-semibold before:bg-link' : 'before:bg-ok')}>{f}</li>
                  );
                })}
              </ul>
              {plan.cta.waitlist ? (
                <WaitlistLink className={buttonClass('secondary', 'md', 'w-full')}>{plan.cta.label}</WaitlistLink>
              ) : (
                <ButtonLink href="/contact?reason=pricing" variant="secondary" className="w-full">{plan.cta.label}</ButtonLink>
              )}
            </li>
          ))}
        </ul>
      </section>

      <Section id="what-affects-pricing" title="What affects pricing?"
        intro="Pricing may reflect the number of users, active sites, external collaborators, storage requirements, reporting controls and integration needs." />

      <Section id="pricing-questions" title="Pricing questions">
        <Faq items={pricingFaq} />
      </Section>

      <CtaBand title="Tell us how your team manages defects." text="Join the waitlist and share your team size, number of sites and current process.">
        <WaitlistLink className={buttonClass('primary')}>Join the waitlist</WaitlistLink>
      </CtaBand>
    </>
  );
}
