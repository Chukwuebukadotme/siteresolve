import { WaitlistLink } from '@/components/client/waitlist';
import { Photo } from '@/components/photo';
import { CtaBand, PageHeader, Section } from '@/components/sections';
import { buttonClass } from '@/components/ui';
import { photos } from '@/content/photos';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'About SiteResolve',
  description: 'Learn why SiteResolve is focused on clearer ownership, evidence and verification in defect management.',
  path: '/about'
});

const principles = [
  ['Capture useful information', 'A defect report should contain enough context for another person to understand the issue and act on it.'],
  ['Make ownership visible', 'Every open issue should show who is responsible for the next action and when it is due.'],
  ['Keep the evidence connected', 'Photographs, files, comments and decisions should remain attached to the relevant issue.'],
  ['Verify before closure', 'Completed work should be reviewed before an issue is considered closed.'],
  ['Support the people on site', 'The product should remain clear and usable on phones, tablets and desktop devices.'],
  ['Use records responsibly', 'Permissions, activity history and reporting should make information easier to manage without creating unnecessary complexity.']
];

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About SiteResolve" title="Defect management should not depend on scattered updates."
        lead="SiteResolve is focused on one practical problem: keeping the full path from reported defect to verified resolution clear and accessible." />

      <Section id="why" title="Why SiteResolve exists">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-14">
          <div className="flex max-w-[58ch] flex-col gap-4 text-lead text-ink-2">
            <p>Construction and property teams often manage defects across photographs, calls, emails, messaging applications and spreadsheets. Each tool may hold part of the record, but no single place shows the full state of the issue.</p>
            <p>SiteResolve is designed to connect the report, responsible parties, corrective work, supporting evidence and final decision.</p>
          </div>
          <Photo photo={photos.verifyDoor} sizes="(min-width: 1024px) 580px, 100vw" className="aspect-[4/5] sm:aspect-[3/2]" position="45% center" />
        </div>
      </Section>

      <Section id="principles" title="Principles">
        <ol className="grid gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {principles.map(([title, text], i) => (
            <li key={title} className="flex flex-col gap-2.5 border-t border-line pt-5">
              <span aria-hidden="true" className="font-mono text-[0.8125rem] font-semibold text-ink-2">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="text-lg leading-tight font-semibold">{title}</h3>
              <p className="text-ink-2">{text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="who" title="Designed for the built environment.">
        <div className="flex max-w-[58ch] flex-col gap-4 text-lead text-ink-2">
          <p>SiteResolve is intended for construction companies, property managers, facilities teams, maintenance teams, inspectors, contractors and subcontractors.</p>
          <p>It can support a small contractor managing a few active jobs or a larger organisation coordinating issues across several sites.</p>
        </div>
      </Section>

      <CtaBand title="Help shape a clearer defect workflow." text="Join the waitlist and tell us how your organisation currently reports and closes site issues.">
        <WaitlistLink className={buttonClass('primary')}>Join the waitlist</WaitlistLink>
      </CtaBand>
    </>
  );
}
