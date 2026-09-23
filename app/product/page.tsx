import { WaitlistLink } from '@/components/client/waitlist';
import { IssuesView, OversightDashboard, TaskMock } from '@/components/mockups';
import { CtaBand, PageHeader, Section } from '@/components/sections';
import { buttonClass, ButtonLink, DraftOnly, Icon, Ph, StatusLabel, Ticks } from '@/components/ui';
import { productCapabilities } from '@/content/workflow';
import type { IconName } from '@/lib/icons';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Product | SiteResolve defect management',
  description: 'See how SiteResolve connects defect reporting, assignment, resolution evidence, verification and reporting.',
  path: '/product'
});

const reports: Array<[IconName, string]> = [
  ['list', 'Issue register'], ['file', 'Open defects'], ['cal', 'Overdue issues'], ['users', 'Contractor report'],
  ['shield', 'Verification report'], ['doc', 'Handover record'], ['sync', 'Activity history'], ['export', 'CSV and PDF export']
];

const roles = ['Reporter', 'Site manager', 'Project manager', 'Contractor', 'Verifier', 'Administrator', 'Read-only stakeholder'];

export default function ProductPage() {
  return (
    <>
      <PageHeader eyebrow="The SiteResolve platform" title="One workflow for every stage of defect resolution."
        lead="SiteResolve keeps the original report, responsibility, updates, evidence and final decision connected. Field teams can act quickly while managers retain a complete view of current work.">
        <WaitlistLink className={buttonClass('primary')}>Join the waitlist</WaitlistLink>
        <ButtonLink href="#report" variant="secondary">Explore the workflow</ButtonLink>
      </PageHeader>

      <Section id="overview" title="A shared record from start to finish."
        intro="Every issue begins with a structured report and remains in one record until it is verified and closed. Permissions determine who can view information and complete each action.">
        <IssuesView />
      </Section>

      {productCapabilities.map((c) => (
          <Section key={c.id} id={c.id} eyebrow={c.eyebrow} title={c.heading}>
            <div className="grid gap-8 lg:grid-cols-2">
              <p className="max-w-[56ch] text-lg">{c.copy}</p>
              <Ticks items={c.features} className="gap-x-6 sm:grid-cols-2" />
            </div>
            <TaskMock title={c.title} rows={c.rows} actions={c.actions} />
          </Section>
      ))}

      <Section id="oversight" eyebrow="Oversight" title="See what needs attention across every site."
        intro="Use portfolio and project views to find open, overdue and awaiting-verification issues. Filter records by site, location, company, assignee, category, priority and status.">
        <OversightDashboard />
      </Section>

      <Section id="reports" title="Prepare records for the people who need them."
        intro="Create filtered reports for internal reviews, contractor follow-up, client updates and handover documentation.">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {reports.map(([icon, label]) => (
            <li key={label} className="flex flex-col gap-2.5 rounded-lg border border-line p-4 leading-snug font-semibold">
              <Icon name={icon} className="text-link" />
              <span>{label}</span>
              {label === 'CSV and PDF export' ? <DraftOnly><span className="text-xs font-medium"><Ph>[CONFIRM SUPPORTED EXPORT FORMATS]</Ph></span></DraftOnly> : null}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="permissions" title="Give each person the access their role requires."
        intro="Permissions separate reporting, assignment, updating, verification and administration. External organisations can be limited to the issues relevant to their work.">
        <ul aria-label="Role examples" className="flex flex-wrap gap-2">
          {roles.map((role) => (
            <li key={role} className="inline-flex min-h-10 items-center gap-2 rounded-md border border-line px-3.5 text-[0.9375rem] font-semibold">
              <Icon name="user" className="size-[18px] text-link" />{role}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="mobile" title="Work from the site or the office."
        intro="Responsive workflows support phones, tablets and desktops. Essential reporting and update tasks are designed to remain usable in low-connectivity environments.">
        <p aria-label="Synchronisation states" className="flex flex-wrap items-center gap-2 text-ink-2">
          <StatusLabel tone="closed">Saved on this device</StatusLabel><Icon name="arrow" className="size-4" />
          <StatusLabel tone="warn">Waiting to synchronise</StatusLabel><Icon name="arrow" className="size-4" />
          <StatusLabel>Synchronising</StatusLabel><Icon name="arrow" className="size-4" />
          <StatusLabel tone="ok">Synchronised</StatusLabel>
        </p>
      </Section>

      <Section id="integrations" title="Connect SiteResolve with the systems around it."
        intro="SiteResolve uses structured site, issue and user data so confirmed integrations can reduce duplicate entry and keep records aligned." />

      <CtaBand title="Bring your defect workflow into one system." text="Join the waitlist and tell us how your team currently manages site issues.">
        <WaitlistLink className={buttonClass('primary')}>Join the waitlist</WaitlistLink>
      </CtaBand>
    </>
  );
}
