import { WaitlistLink, HomeWaitlistForm } from '@/components/client/waitlist';
import { IssueRecord, PhoneMock, PortfolioOverview, TaskMock } from '@/components/mockups';
import { Faq, Section } from '@/components/sections';
import { ArrowLink, buttonClass, ButtonLink, Eyebrow, FeatureIcon } from '@/components/ui';
import { homeFaq } from '@/content/faq';
import { plans } from '@/content/plans';
import { solutions } from '@/content/solutions';
import { homeSteps } from '@/content/workflow';
import { cn } from '@/lib/cn';
import type { IconName } from '@/lib/icons';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'SiteResolve | Defect management from report to verification',
  description: 'Report, assign, resolve and verify construction and property defects in one clear workflow with SiteResolve.',
  path: '/'
});

const problems: Array<[IconName, string, string]> = [
  ['image', 'Scattered evidence', 'Photographs, notes and documents remain attached to the relevant issue.'],
  ['user', 'Unclear ownership', 'Every issue has a named assignee, priority and due date.'],
  ['shield', 'Incomplete follow-up', 'Resolution evidence and verification are part of the same workflow.'],
  ['chart', 'Weak reporting', 'Managers can review current status without reconstructing updates from separate tools.']
];

const capabilities: Array<[IconName, string, string]> = [
  ['file', 'Structured issue records', 'Keep the description, location, priority, evidence, ownership and status in one place.'],
  ['list', 'Evidence timeline', 'See photographs, files, comments, decisions and status changes in chronological order.'],
  ['cal', 'Assignment and deadlines', 'Give each issue a responsible person or company and make due dates visible.'],
  ['shield', 'Verification controls', 'Separate completion from approval so that an issue is not closed before the work has been checked.'],
  ['layers', 'Cross-site overview', 'Review open, overdue and completed issues across projects, buildings and locations.'],
  ['export', 'Reports and exports', 'Prepare clear records for internal reviews, contractors, clients and handovers.']
];

const siteFeatures: Array<[IconName, string]> = [
  ['phone', 'Mobile issue reporting'], ['camera', 'Camera and file uploads'], ['pin', 'Site and location selection'],
  ['offline', 'Offline capture'], ['sync', 'Synchronised updates']
];

const oversight: Array<[IconName, string, string]> = [
  ['lock', 'Role-based permissions', 'Control who can view records and perform each workflow action.'],
  ['list', 'Complete activity history', 'Keep a dated record of updates, evidence and decisions.'],
  ['chart', 'Consistent reporting', 'Use the same issue structure across teams, contractors and sites.'],
  ['plug', 'Integration-ready structure', 'Prepare SiteResolve to exchange project, user and reporting data with other systems as confirmed integrations are introduced.']
];

const walkthrough = [
  ['Report', 'The site manager photographs the door, records the floor and room, marks the issue as high priority and adds a short description.'],
  ['Assign', 'The issue is assigned to the door subcontractor with a due date and repair instruction.'],
  ['Resolve', 'The subcontractor adjusts the door, adds completion notes and uploads photographs showing the completed work.'],
  ['Verify', 'The site manager reviews the evidence, checks the door on site and verifies the resolution.'],
  ['Close', 'The issue is closed with the complete report, evidence and decision history retained.']
];

export default function HomePage() {
  return (
    <>
      <section aria-labelledby="hero-h" className="pt-14 text-center md:pt-22">
        <div className="wrap flex flex-col items-center gap-14">
          <div className="flex max-w-[960px] flex-col items-center gap-6 [&>*]:motion-safe:animate-enter [&>*:nth-child(2)]:[animation-delay:60ms] [&>*:nth-child(3)]:[animation-delay:120ms] [&>*:nth-child(4)]:[animation-delay:180ms] [&>*:nth-child(5)]:[animation-delay:240ms]">
            <Eyebrow pill>Defect management for construction and property teams</Eyebrow>
            <h1 id="hero-h" className="text-display">From defect report to verified resolution.</h1>
            <p className="max-w-[60ch] text-lead text-ink-2">
              SiteResolve brings reporting, assignment, resolution evidence and verification into one clear workflow. Keep every issue, update and decision connected from the moment a defect is found until the work is approved.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <WaitlistLink className={buttonClass('primary')}>Join the waitlist</WaitlistLink>
              <ButtonLink href="#how-it-works" variant="secondary">See how SiteResolve works</ButtonLink>
            </div>
            <p className="text-[0.9375rem] text-ink-2">Built for construction, property management, facilities, maintenance and inspection teams.</p>
          </div>
          <div className="mx-[calc(50%-50vw)] self-stretch bg-[linear-gradient(to_bottom,transparent_0,transparent_80px,var(--color-night)_80px)] px-[calc(50vw-50%)] pb-16 md:bg-[linear-gradient(to_bottom,transparent_0,transparent_140px,var(--color-night)_140px)] md:pb-26">
            <div className="mx-auto max-w-[1120px] motion-safe:animate-enter motion-safe:[animation-delay:200ms]">
              <PortfolioOverview />
            </div>
          </div>
        </div>
      </section>

      <Section id="problem" eyebrow="The problem" title="Defect management breaks down between steps.">
        <div className="flex max-w-[60ch] flex-col gap-5 text-lead">
          <p>A defect may begin as a photograph on one phone, become a task in an email and end up as a status in a spreadsheet. The evidence, responsibility and final decision are often stored in different places.</p>
          <p className="text-ink-2">SiteResolve keeps the complete record together. Teams can see what was reported, who owns the next action, what work was completed and whether the resolution has been accepted.</p>
        </div>
        <ul className="grid border-t border-line md:grid-cols-2">
          {problems.map(([icon, title, text]) => (
            <li key={title} className="flex gap-5 border-b border-line py-7 md:odd:border-r md:odd:pr-6 md:even:pl-7">
              <FeatureIcon name={icon} />
              <div className="flex flex-col gap-1.5">
                <h3 className="text-lg leading-tight font-semibold tracking-[-0.01em]">{title}</h3>
                <p className="text-ink-2">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="how-it-works" eyebrow="How it works" title="Four steps from discovery to closure.">
        <ol className="grid border-t border-line">
          {homeSteps.map((step, i) => (
            <li key={step.name} className="grid items-start gap-12 border-b border-line py-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
              <div className="flex flex-col gap-3 lg:sticky lg:top-28">
                <p className="flex flex-col text-sm font-semibold text-link">
                  <span aria-hidden="true" className="mb-3 font-mono text-[3.5rem] leading-none font-medium tracking-[-0.04em] text-ink">{String(i + 1).padStart(2, '0')}</span>
                  <span>Step {i + 1}: {step.name}</span>
                </p>
                <h3 className="text-h3">{step.heading}</h3>
                <p className="max-w-[52ch] text-ink-2">{step.copy}</p>
              </div>
              <TaskMock title={step.title} rows={step.rows} actions={step.actions} decision={step.decision} />
            </li>
          ))}
        </ol>
      </Section>

      <Section id="capabilities" eyebrow="Product capabilities" title="The information needed to move work forward.">
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map(([icon, title, text], i) => (
            <li key={title} className={cn('flex flex-col gap-3 rounded-xl p-7', i === 0 ? 'dk justify-end md:col-span-2 md:row-span-2 md:p-10' : 'bg-surface-200')}>
              <span className={cn(i === 0 && 'md:mb-auto')}><FeatureIcon name={icon} size={i === 0 ? 'lg' : 'md'} /></span>
              <h3 className={cn('font-semibold tracking-[-0.01em]', i === 0 ? 'max-w-[18ch] text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.15] tracking-[-0.02em]' : 'text-lg leading-tight')}>{title}</h3>
              <p className={cn('text-ink-2', i === 0 && 'max-w-[40ch] text-lg')}>{text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="record" eyebrow="One complete record" title="See the issue, the work and the final decision."
        intro="Each SiteResolve record shows the original report, the responsible parties, every update, submitted evidence and the verification outcome. Teams do not need to search separate conversations to understand what happened.">
        <IssueRecord />
      </Section>

      <Section id="site-work" eyebrow="Designed for site work" title="Capture the details while they are still clear.">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="flex max-w-[40ch] flex-col gap-8">
            <div className="flex flex-col gap-4 text-lg text-ink-2">
              <p className="text-ink">Use a phone or tablet to record defects at the location where they are found. Add photographs, notes and location details before information is lost or passed between teams.</p>
              <p>Low-connectivity support keeps essential work available when site access is unreliable. Updates can synchronise when a connection becomes available.</p>
            </div>
            <ul className="border-t border-line">
              {siteFeatures.map(([icon, label]) => (
                <li key={label} className="flex items-center gap-3 border-b border-line py-3.5 font-semibold"><FeatureIcon name={icon} size="sm" />{label}</li>
              ))}
            </ul>
          </div>
          <PhoneMock />
        </div>
      </Section>

      <Section id="oversight" dark eyebrow="Oversight and control" title="Clear access, status and responsibility."
        intro="SiteResolve gives teams a shared process while preserving appropriate access. Permissions define who can report, assign, update, verify and close issues.">
        <ul className="grid gap-y-7 border-t border-line md:grid-cols-2 lg:grid-cols-4">
          {oversight.map(([icon, title, text], i) => (
            <li key={title} className={cn('flex flex-col gap-3 pt-7 md:pr-6', i > 0 && 'max-md:border-t max-md:border-line', i % 2 === 1 && 'md:border-l md:border-line md:pl-6', i === 2 && 'lg:border-l lg:border-line lg:pl-6', i === 3 && 'lg:border-l')}>
              <FeatureIcon name={icon} />
              <h3 className="text-lg leading-tight font-semibold tracking-[-0.01em]">{title}</h3>
              <p className="text-ink-2">{text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="solutions" eyebrow="Solutions" title="One defect workflow across different site operations.">
        <ul className="grid border-t border-line">
          {solutions.map((s) => (
            <li key={s.id} className="grid grid-cols-[40px_minmax(0,1fr)] items-center gap-x-6 gap-y-2 border-b border-line py-6 lg:grid-cols-[40px_220px_minmax(0,1fr)_300px]">
              <FeatureIcon name={s.icon} />
              <h3 className="text-[1.375rem] leading-tight font-semibold tracking-[-0.01em]">{s.name}</h3>
              <p className="text-ink-2 max-lg:col-start-2">{s.preview}</p>
              <span className="max-lg:col-start-2 lg:justify-self-end"><ArrowLink href={`/solutions#${s.id}`}>{s.linkLabel}</ArrowLink></span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="walkthrough" eyebrow="A defect through SiteResolve" title="From site inspection to approved repair.">
        <div className="flex flex-col gap-4 rounded-xl bg-surface-200 p-8">
          <span className="striped inline-flex h-7 items-center self-start rounded-sm border border-dashed border-line-strong px-3 text-[0.8125rem] font-semibold text-ink-2">Representative workflow</span>
          <p className="max-w-[56ch] text-lead">During a handover inspection, a site manager finds that a fire door does not close correctly.</p>
        </div>
        <ol className="grid">
          {walkthrough.map(([name, text], i) => (
            <li key={name} className="grid grid-cols-[40px_minmax(0,1fr)] items-baseline gap-x-6 gap-y-1.5 border-b border-line py-6 md:grid-cols-[56px_minmax(0,2fr)_minmax(0,5fr)]">
              <span aria-hidden="true" className="font-mono text-[0.8125rem] font-semibold text-ink-2">{i + 1}</span>
              <h3 className="text-2xl font-semibold tracking-[-0.015em]">{name}</h3>
              <p className="text-ink-2 max-md:col-start-2">{text}</p>
            </li>
          ))}
        </ol>
        <p className="max-w-[60ch] text-xl font-semibold">One record shows what was found, who was responsible, what was done and who approved the result.</p>
      </Section>

      <Section id="pricing" eyebrow="Pricing" title="Plans for teams of different sizes."
        intro="SiteResolve plans are structured around the number of users, sites and controls a team requires.">
        <ul className="grid border-y border-line md:grid-cols-3">
          {plans.map((p, i) => (
            <li key={p.name} className={cn('flex flex-col gap-2 py-8 md:pr-6', i > 0 && 'border-line max-md:border-t md:border-l md:pl-6')}>
              <span className="font-mono text-[0.8125rem] text-ink-2">{p.num}</span>
              <span className="text-h2">{p.name}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center gap-5">
          <ButtonLink href="/pricing" variant="secondary">View pricing</ButtonLink>
          <p className="max-w-[52ch] text-[0.9375rem] text-ink-2">Pricing details will be discussed with waitlist members based on their requirements.</p>
        </div>
      </Section>

      <Section id="faq" title="Frequently asked questions">
        <Faq items={homeFaq} />
      </Section>

      <section id="waitlist" aria-labelledby="waitlist-h" className="dk py-20 text-center md:py-30">
        <div className="wrap flex flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-4">
            <h2 id="waitlist-h" className="text-h2">Keep every defect on a clear path to closure.</h2>
            <p className="max-w-[60ch] text-lead text-ink-2">Join the SiteResolve waitlist for product updates and access information.</p>
          </div>
          <HomeWaitlistForm />
        </div>
      </section>
    </>
  );
}
