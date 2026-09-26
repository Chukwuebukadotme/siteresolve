import { WaitlistLink, HomeWaitlistForm } from '@/components/client/waitlist';
import { IssueRecord, PhoneMock, PortfolioOverview, TaskMock } from '@/components/mockups';
import { Photo, PhotoPair } from '@/components/photo';
import { Faq, Section } from '@/components/sections';
import { ArrowLink, buttonClass, ButtonLink, Eyebrow, FeatureIcon, Icon } from '@/components/ui';
import { homeFaq } from '@/content/faq';
import { photos, type PhotoAsset } from '@/content/photos';
import { solutions } from '@/content/solutions';
import { homeSteps } from '@/content/workflow';
import { cn } from '@/lib/cn';
import type { IconName } from '@/lib/icons';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'SiteResolve | Defect management from report to verification',
  description: 'Report construction and property defects on site, assign them, collect repair evidence and sign them off with SiteResolve.',
  path: '/'
});

const problems: Array<[IconName, string, string]> = [
  ['image', 'Scattered evidence', 'Photographs sit in personal camera rolls and chat threads, away from the issue they show.'],
  ['user', 'Unclear ownership', 'A defect is raised in a site walk, but nobody is named to fix it or given a date.'],
  ['shield', 'Unchecked repairs', 'Work is marked as done without anyone looking at it, so the same defect appears again at handover.'],
  ['chart', 'Status rebuilt by hand', 'Progress reports are pieced together from emails and spreadsheets, and are out of date when they are sent.']
];

/* One photograph per workflow step. Frames and crop focus follow assets/photos/USAGE.md. */
const stepPhotos: Array<{ photo: PhotoAsset; frame: string; position?: string }> = [
  { photo: photos.reportWall, frame: 'aspect-square', position: 'center 40%' },
  { photo: photos.assignOffice, frame: 'aspect-[3/2]' },
  { photo: photos.resolveDoor, frame: 'aspect-[3/2]', position: 'center 30%' },
  { photo: photos.verifyDoor, frame: 'aspect-[3/2]' }
];

const siteFeatures: Array<[IconName, string]> = [
  ['phone', 'Mobile issue reporting'], ['camera', 'Camera and file uploads'], ['pin', 'Site and location selection'],
  ['offline', 'Offline capture'], ['sync', 'Synchronised updates']
];

/* The representative fire-door scenario. Dates and names match the demonstration data in the issue record. */
const caseStudy = [
  { day: 'Day 1, 09:12', stage: 'Found', who: 'Site manager', text: 'At the Block C handover inspection, the fire door to room C4.12 will not close into its frame. The site manager photographs the closer, pins the room and marks the issue high priority.', recorded: '2 photographs, room C4.12, high priority' },
  { day: 'Day 1, 09:20', stage: 'Assigned', who: 'Site manager', text: 'Eight minutes later the issue is with Northline Doors, the door subcontractor, due by 21 September with an instruction to adjust the closer.', recorded: 'Assignee, due date, instruction' },
  { day: 'Days 4 to 6', stage: 'Repaired', who: 'Northline Doors', text: 'The technician adjusts the closer and checks the hinges, then uploads photographs of the finished door and submits the repair for review.', recorded: 'Completion notes, 2 photographs' },
  { day: 'Day 7, 10:18', stage: 'Verified', who: 'Site manager', text: 'The site manager compares the before and after photographs, tests the door on site and accepts the repair.', recorded: 'Verification decision' },
  { day: 'Day 7, 10:19', stage: 'Closed', who: 'Site manager', text: 'The issue closes. The report, repair evidence and sign-off stay together for the handover file.', recorded: 'Full dated history' }
];

const caseAnswers: Array<[string, string, string]> = [
  ['Who found it?', 'Site manager', 'Day 1, with 2 photographs'],
  ['Who fixed it?', 'Northline Doors', 'Day 6, with repair evidence'],
  ['Who approved it?', 'Site manager', 'Day 7, after an on-site check']
];

export default function HomePage() {
  return (
    <>
      <section aria-labelledby="hero-h" className="pt-14 text-center md:pt-22">
        <div className="wrap flex flex-col items-center gap-6 [&>*]:motion-safe:animate-enter [&>*:nth-child(2)]:[animation-delay:60ms] [&>*:nth-child(3)]:[animation-delay:120ms] [&>*:nth-child(4)]:[animation-delay:180ms] [&>*:nth-child(5)]:[animation-delay:240ms]">
          <Eyebrow pill>Defect management for construction and property teams</Eyebrow>
          <h1 id="hero-h" className="max-w-[960px] text-display">From defect report to verified resolution.</h1>
          <p className="max-w-[60ch] text-lead text-ink-2">
            Report a defect on site, assign it to the right trade, collect evidence of the repair and sign it off in the same record. Everyone involved can see who owns each issue and what has happened to it.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <WaitlistLink className={buttonClass('primary')}>Join the waitlist</WaitlistLink>
            <ButtonLink href="#how-it-works" variant="secondary">See how SiteResolve works</ButtonLink>
          </div>
          <p className="text-[0.9375rem] text-ink-2">Built for construction, property management, facilities, maintenance and inspection teams.</p>
        </div>
        {/* The person on site and the record they create: the dashboard overlaps the open floor of the photograph. */}
        <div className="mt-14 bg-[linear-gradient(to_bottom,transparent_0,transparent_55%,var(--color-night)_55%)] pb-16 md:pb-26">
          <div className="wrap flex flex-col text-left motion-safe:animate-enter motion-safe:[animation-delay:200ms] lg:grid lg:pb-12">
            <Photo
              photo={photos.reportDoor} preload sizes="(min-width: 1024px) 760px, 100vw"
              position="72% center" positionLg="right center"
              className="aspect-[4/5] rounded-2xl sm:aspect-[16/10] lg:col-start-1 lg:row-start-1 lg:w-[63%] lg:justify-self-end lg:aspect-[4/3]"
            />
            <div className="relative -mt-20 sm:-mt-28 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:w-[58%] lg:translate-y-12 lg:self-end">
              <PortfolioOverview compact />
            </div>
          </div>
        </div>
      </section>

      <Section id="problem" eyebrow="The problem" title="Defect management breaks down between steps.">
        <p className="max-w-[60ch] text-lead">A defect may begin as a photograph on one phone, become a task in an email and end up as a status in a spreadsheet. By handover, nobody can say with confidence who fixed it or whether anyone checked.</p>
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

      <Section id="how-it-works" eyebrow="How it works" title="How a defect gets closed in SiteResolve.">
        <ol className="grid border-t border-line">
          {homeSteps.map((step, i) => {
            const flip = i % 2 === 1;
            const visual = stepPhotos[i];
            return (
              <li key={step.name} className={cn('grid items-start gap-10 border-b border-line py-14 lg:gap-14', flip ? 'lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]' : 'lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]')}>
                <div className={cn('flex flex-col gap-3 lg:sticky lg:top-28', flip && 'lg:order-2')}>
                  <p className="text-sm font-semibold text-link">{step.name}</p>
                  <h3 className="text-h3">{step.heading}</h3>
                  <p className="max-w-[52ch] text-ink-2">{step.copy}</p>
                </div>
                <PhotoPair photo={visual.photo} frame={visual.frame} position={visual.position} cardSide={flip ? 'right' : 'left'} sizes="(min-width: 1024px) 560px, 100vw">
                  <TaskMock issue={step.issue} title={step.title} rows={step.rows} actions={step.actions} decision={step.decision} />
                </PhotoPair>
              </li>
            );
          })}
        </ol>
      </Section>

      <Section id="site-work" eyebrow="On site" title="Capture the details while they are still clear.">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
          <div className="flex max-w-[46ch] flex-col gap-8">
            <div className="flex flex-col gap-4 text-lg text-ink-2">
              <p className="text-ink">Use a phone or tablet to record defects at the location where they are found. Add photographs, notes and location details before information is lost or passed between teams.</p>
              <p>Reports save to the phone when there is no signal, in a basement or on a remote plot, and upload when the connection returns.</p>
            </div>
            <ul className="border-t border-line">
              {siteFeatures.map(([icon, label]) => (
                <li key={label} className="flex items-center gap-3 border-b border-line py-3.5 font-semibold"><FeatureIcon name={icon} size="sm" />{label}</li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col sm:grid">
            <Photo photo={photos.offlineUpdate} sizes="(min-width: 1024px) 620px, 100vw" position="left center"
              className="aspect-[4/5] sm:col-start-1 sm:row-start-1 sm:aspect-[4/3]" />
            <PhoneMock className="relative mx-auto -mt-28 w-[272px] sm:col-start-1 sm:row-start-1 sm:mt-0 sm:mr-5 sm:translate-y-14 sm:self-end sm:justify-self-end" />
          </div>
        </div>
      </Section>

      <Section id="case-study" eyebrow="Representative scenario" title="A fire door that would not close."
        intro="A worked example of one defect over one week. The site, the people and the subcontractor are made up for illustration.">
        <ol className="grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-5">
          {caseStudy.map((c) => (
            <li key={c.stage} className="flex flex-col gap-2.5 border-t-2 border-ink pt-4">
              <span className="font-mono text-[0.8125rem] font-semibold text-ink-2">{c.day}</span>
              <h3 className="text-xl leading-tight font-semibold tracking-[-0.015em]">{c.stage}</h3>
              <p className="text-sm font-semibold text-link">{c.who}</p>
              <p className="text-ink-2">{c.text}</p>
              <p className="mt-auto flex items-start gap-2 pt-2 text-sm font-semibold"><Icon name="check" className="mt-0.5 size-4 shrink-0 text-ok" />Recorded: {c.recorded}</p>
            </li>
          ))}
        </ol>
        <IssueRecord />
        <dl className="grid border-y border-line sm:grid-cols-3">
          {caseAnswers.map(([q, who, detail], i) => (
            <div key={q} className={cn('flex flex-col gap-1 py-6 sm:px-6', i > 0 ? 'border-line max-sm:border-t sm:border-l' : 'sm:pl-0')}>
              <dt className="text-sm font-semibold text-ink-2">{q}</dt>
              <dd className="text-2xl font-semibold tracking-[-0.015em]">{who}</dd>
              <dd className="text-ink-2">{detail}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="solutions" eyebrow="Solutions" title="The same four steps on a building site, an estate or a plant room.">
        <ul className="grid border-t border-line">
          {solutions.map((s) => (
            <li key={s.id} className="grid grid-cols-[40px_minmax(0,1fr)] items-center gap-x-6 gap-y-2 border-b border-line py-6 lg:grid-cols-[40px_260px_minmax(0,1fr)_auto] lg:gap-x-8">
              <FeatureIcon name={s.icon} />
              <h3 className="text-[1.375rem] leading-tight font-semibold tracking-[-0.01em]">{s.name}</h3>
              <p className="text-ink-2 max-lg:col-start-2">{s.preview}</p>
              <span className="max-lg:col-start-2 lg:justify-self-end"><ArrowLink href={`/solutions#${s.id}`}>{s.linkLabel}</ArrowLink></span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="faq" title="Frequently asked questions">
        <Faq items={homeFaq} />
      </Section>

      <section id="waitlist" aria-labelledby="waitlist-h" className="dk py-20 text-center md:py-30">
        <div className="wrap flex flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-4">
            <h2 id="waitlist-h" className="max-w-[24ch] text-h2">Know who owns every defect, and who signed it off.</h2>
            <p className="max-w-[60ch] text-lead text-ink-2">Join the SiteResolve waitlist for product updates and access information.</p>
          </div>
          <HomeWaitlistForm />
        </div>
      </section>
    </>
  );
}
