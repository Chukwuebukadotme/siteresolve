import { WaitlistLink } from '@/components/client/waitlist';
import { CtaBand, Faq, PageHeader, Section } from '@/components/sections';
import { buttonClass, ButtonLink, Icon } from '@/components/ui';
import { pricingFaq } from '@/content/faq';
import { plans } from '@/content/plans';
import { cn } from '@/lib/cn';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Pricing | SiteResolve',
  description: 'SiteResolve is billed as an annual subscription per organisation. Compare the Starter, Operations and Enterprise plans.',
  path: '/pricing'
});

const billing: Array<[string, string]> = [
  ['One subscription per organisation', 'SiteResolve is billed once a year. Everyone who works in SiteResolve for your organisation is covered by the same plan.'],
  ['The tier sets the controls', 'Starter, Operations and Enterprise differ in permissions, reporting, configuration and support, as listed above.'],
  ['Your size sets the price', 'Within a tier, the annual price reflects the number of users and active sites. External collaborators, storage and integration needs can also affect it.']
];

export default function PricingPage() {
  return (
    <>
      <PageHeader eyebrow="Pricing" title="One annual plan for your whole organisation."
        lead="SiteResolve is billed as an annual subscription that covers your organisation. Choose the tier that matches the controls you need. The price within it reflects how many users and active sites it covers.">
        <WaitlistLink className={buttonClass('primary')}>Join the waitlist</WaitlistLink>
      </PageHeader>

      <section aria-label="Plans" className="sec py-20 md:py-24">
        <p className="wrap mb-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.9375rem] font-semibold">
          <span className="inline-flex items-center gap-2"><Icon name="cal" className="size-[18px] text-link" />Every plan is an annual subscription</span>
          <span className="inline-flex items-center gap-2"><Icon name="building" className="size-[18px] text-link" />Billed once per organisation</span>
          <span className="inline-flex items-center gap-2"><Icon name="users" className="size-[18px] text-link" />Priced on users and active sites</span>
        </p>
        <ul className="wrap grid gap-4">
          {plans.map((plan) => (
            <li key={plan.name} className="tile grid items-start gap-5 p-7 md:p-9 lg:grid-cols-[minmax(0,4fr)_minmax(0,5fr)_minmax(0,3fr)] lg:gap-8">
              <div className="flex flex-col gap-1.5">
                <h2 className="text-[2rem] leading-tight font-semibold tracking-[-0.025em]">{plan.name}</h2>
                <p className="text-ink-2">{plan.audience}</p>
                {plan.price ? <p className="mt-3 text-2xl font-semibold tracking-[-0.015em]">{plan.price}</p> : null}
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

      <Section id="how-pricing-works" title="How pricing works">
        <ul className="grid gap-4 md:grid-cols-3">
          {billing.map(([title, text]) => (
            <li key={title} className="tile flex flex-col gap-2.5 p-6">
              <h3 className="text-xl leading-tight font-semibold tracking-[-0.015em]">{title}</h3>
              <p className="text-ink-2">{text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="pricing-questions" title="Pricing questions">
        <Faq items={pricingFaq} />
      </Section>

      <CtaBand title="Tell us how your team manages defects." text="Join the waitlist and share your team size, number of sites and current process.">
        <WaitlistLink className={buttonClass('primary')}>Join the waitlist</WaitlistLink>
      </CtaBand>
    </>
  );
}
