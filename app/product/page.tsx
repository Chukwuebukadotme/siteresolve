import { WaitlistLink } from '@/components/client/waitlist';
import { IssuesView, OversightDashboard, TaskMock } from '@/components/mockups';
import { CtaBand, PageHeader, Section } from '@/components/sections';
import { Photo } from '@/components/photo';
import { buttonClass, ButtonLink, Icon, StatusLabel, Ticks } from '@/components/ui';
import { photos } from '@/content/photos';
import { productCapabilities } from '@/content/workflow';
import type { IconName } from '@/lib/icons';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Product | SiteResolve defect management',
  description: 'How SiteResolve handles each defect: reporting on site, assignment, repair evidence, verification and reports.',
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
      <PageHeader eyebrow="The SiteResolve platform" title="Report, assign, fix and sign off defects in one place."
        lead="Each defect has one record holding the original report, who owns it, every update, the repair evidence and the final decision. People on site can report and update quickly, and managers can see where every issue stands.">
        <WaitlistLink className={buttonClass('primary')}>Join the waitlist</WaitlistLink>
        <ButtonLink href="#report" variant="secondary">Explore the workflow</ButtonLink>
      </PageHeader>

      <Section id="overview" title="One record for each defect."
        intro="Each issue starts as a structured report and stays in the same record until it is verified and closed. Permissions control who can see it and what they can do.">
        <IssuesView />
      </Section>

      {productCapabilities.map((c) => (
          <Section key={c.id} id={c.id} eyebrow={c.eyebrow} title={c.heading}>
            <div className="grid gap-8 lg:grid-cols-2">
              <p className="max-w-[56ch] text-lg">{c.copy}</p>
              <Ticks items={c.features} className="gap-x-6 sm:grid-cols-2" />
            </div>
            {c.id === 'assign' ? (
              <div className="grid items-center gap-8 lg:grid-cols-2">
                <Photo photo={photos.assignOffice} sizes="(min-width: 1024px) 520px, 100vw" className="aspect-[4/3] lg:aspect-[3/2]" position="40% center" />
                <TaskMock title={c.title} rows={c.rows} actions={c.actions} />
              </div>
            ) : (
              <TaskMock title={c.title} rows={c.rows} actions={c.actions} />
            )}
          </Section>
      ))}

      <Section id="oversight" eyebrow="Oversight" title="See what needs attention across every site."
        intro="Use portfolio and project views to find open, overdue and awaiting-verification issues. Filter records by site, location, company, assignee, category, priority and status.">
        <OversightDashboard />
      </Section>

      <Section id="reports" title="Reports for reviews, contractors, clients and handover."
        intro="Filter issues and export them as a report for an internal review, a contractor, a client update or a handover pack.">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {reports.map(([icon, label]) => (
            <li key={label} className="tile flex flex-col gap-2.5 p-4 leading-snug font-semibold">
              <Icon name={icon} className="text-link" />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="permissions" title="Give each person the access their role requires."
        intro="Permissions separate reporting, assignment, updating, verification and administration. External organisations can be limited to the issues relevant to their work.">
        <ul aria-label="Role examples" className="flex flex-wrap gap-2">
          {roles.map((role) => (
            <li key={role} className="tile inline-flex min-h-10 items-center gap-2 rounded-md px-3.5 text-[0.9375rem] font-semibold">
              <Icon name="user" className="size-[18px] text-link" />{role}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="mobile" title="Work from the site or the office."
        intro="SiteResolve works on phones, tablets and desktop computers. Reporting and updates keep working when the signal is weak or missing.">
        <p aria-label="Synchronisation states" className="flex flex-wrap items-center gap-2 text-ink-2">
          <StatusLabel tone="closed">Saved on this device</StatusLabel><Icon name="arrow" className="size-4" />
          <StatusLabel tone="warn">Waiting to synchronise</StatusLabel><Icon name="arrow" className="size-4" />
          <StatusLabel>Synchronising</StatusLabel><Icon name="arrow" className="size-4" />
          <StatusLabel tone="ok">Synchronised</StatusLabel>
        </p>
        <Photo photo={photos.offlineUpdate} sizes="(min-width: 1280px) 1060px, 100vw" position="left center" positionLg="center"
          className="aspect-[4/5] sm:aspect-[16/9]" />
      </Section>

      <Section id="integrations" title="Integrations"
        intro="Site, issue and user records are stored in a structured form so they can be shared with other systems. Integrations will be listed here once they are confirmed." />

      <CtaBand title="Be first to hear when SiteResolve opens." text="Join the waitlist and tell us how your team handles site issues today.">
        <WaitlistLink className={buttonClass('primary')}>Join the waitlist</WaitlistLink>
      </CtaBand>
    </>
  );
}
