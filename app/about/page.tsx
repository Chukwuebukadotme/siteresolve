import { WaitlistLink } from '@/components/client/waitlist';
import { Photo } from '@/components/photo';
import { CtaBand, PageHeader, Section } from '@/components/sections';
import { buttonClass } from '@/components/ui';
import { photos } from '@/content/photos';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'About SiteResolve',
  description: 'Why SiteResolve exists and the principles behind how it records, assigns and verifies defects.',
  path: '/about'
});

const principles = [
  ['Capture useful information', 'A defect report should contain enough context for another person to understand the issue and act on it.'],
  ['Make ownership visible', 'Every open issue should show who is responsible for the next action and when it is due.'],
  ['Keep the evidence with the issue', 'Photographs, files, comments and decisions should remain attached to the relevant issue.'],
  ['Verify before closure', 'Completed work should be reviewed before an issue is considered closed.'],
  ['Support the people on site', 'The product should remain clear and usable on phones, tablets and desktop devices.'],
  ['Handle records responsibly', 'People should see what their role needs and nothing more, with a history of who changed what.']
];

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About SiteResolve" title="Defects get lost between phones, inboxes and spreadsheets."
        lead="SiteResolve keeps the report, the owner, the repair evidence and the sign-off for each defect in one place that everyone involved can see." />

      <Section id="why" title="Why SiteResolve exists">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-14">
          <div className="flex max-w-[58ch] flex-col gap-4 text-lead text-ink-2">
            <p>Construction and property teams often manage defects across photographs, calls, emails, messaging applications and spreadsheets. Each tool may hold part of the record, but no single place shows the full state of the issue.</p>
            <p>SiteResolve puts the report, the people responsible, the repair, the evidence and the final decision in the same record.</p>
          </div>
          <Photo photo={photos.verifyDoor} sizes="(min-width: 1024px) 580px, 100vw" className="aspect-[4/5] sm:aspect-[3/2]" position="45% center" />
        </div>
      </Section>

      <Section id="principles" title="Principles">
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {principles.map(([title, text]) => (
            <li key={title} className="tile flex flex-col gap-2.5 p-6">
              <h3 className="text-lg leading-tight font-semibold">{title}</h3>
              <p className="text-ink-2">{text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="who" title="Who SiteResolve is for">
        <div className="flex max-w-[58ch] flex-col gap-4 text-lead text-ink-2">
          <p>SiteResolve is intended for construction companies, property managers, facilities teams, maintenance teams, inspectors, contractors and subcontractors.</p>
          <p>It works for a small contractor with a few live jobs and for an organisation running issues across many sites.</p>
        </div>
      </Section>

      <CtaBand title="Tell us how your team closes defects today." text="Join the waitlist and tell us how your organisation currently reports and closes site issues.">
        <WaitlistLink className={buttonClass('primary')}>Join the waitlist</WaitlistLink>
      </CtaBand>
    </>
  );
}
