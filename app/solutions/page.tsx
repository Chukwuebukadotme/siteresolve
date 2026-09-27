import { SolutionsIndex } from '@/components/client/solutions-index';
import { WaitlistLink } from '@/components/client/waitlist';
import { Photo } from '@/components/photo';
import { CtaBand, PageHeader } from '@/components/sections';
import { ArrowLink, buttonClass, Eyebrow, FeatureIcon, Icon, Ticks } from '@/components/ui';
import { photos, type PhotoAsset } from '@/content/photos';
import { solutions } from '@/content/solutions';
import { cn } from '@/lib/cn';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Solutions | SiteResolve',
  description: 'See how construction, property, facilities, maintenance and inspection teams can manage defects with SiteResolve.',
  path: '/solutions'
});

/* Alternate solutions carry a portrait photograph, cropped to 4:5 around the work being done. */
const solutionPhotos: Record<string, { photo: PhotoAsset; position?: string }> = {
  construction: { photo: photos.resolveDoor, position: '55% center' },
  'facilities-management': { photo: photos.facilitiesLeak },
  inspections: { photo: photos.verifyDoor, position: '45% center' }
};

export default function SolutionsPage() {
  return (
    <>
      <PageHeader eyebrow="Solutions" title="How different teams use SiteResolve."
        lead="A snag on a new build, a leak in a plant room and a failed inspection item follow the same steps. Someone reports it, someone is assigned to fix it, the work is done and someone checks it.">
        <WaitlistLink className={buttonClass('primary')}>Join the waitlist</WaitlistLink>
      </PageHeader>

      <div className="wrap grid items-start gap-8 pt-20 pb-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
        <SolutionsIndex items={solutions} />
        <div className="flex flex-col">
          {solutions.map((s) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="grid scroll-mt-26 gap-6 pb-24 last:pb-0">
              <div className={cn('grid items-start gap-8', solutionPhotos[s.id] && 'md:grid-cols-[minmax(0,1fr)_260px] xl:grid-cols-[minmax(0,1fr)_320px]')}>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    <FeatureIcon name={s.icon} size="lg" />
                    <Eyebrow>{s.name}</Eyebrow>
                    <h2 id={`${s.id}-h`} className="text-h2">{s.heading}</h2>
                  </div>
                  <p className="max-w-[60ch] text-lead text-ink-2">{s.copy}</p>
                </div>
                {solutionPhotos[s.id] ? (
                  <Photo photo={solutionPhotos[s.id].photo} position={solutionPhotos[s.id].position} sizes="(min-width: 1280px) 320px, (min-width: 768px) 260px, 100vw" className="aspect-[4/5]" />
                ) : null}
              </div>
              <div className="flex flex-col gap-3.5">
                <h3 className="text-sm font-semibold">Use cases</h3>
                <Ticks items={s.useCases} className="gap-x-6 sm:grid-cols-2" />
              </div>
              <p className="flex items-start gap-3 rounded-xl bg-surface-200 p-6 text-lg leading-normal font-semibold">
                <Icon name="check" className="mt-[3px] text-ok" />
                <span>{s.outcome}</span>
              </p>
              {s.productLink ? <p><ArrowLink href="/product">Explore the product</ArrowLink></p> : null}
            </section>
          ))}
        </div>
      </div>

      <CtaBand title="Tell us which of these sounds like your team." text="Join the waitlist and tell us about the sites you manage.">
        <WaitlistLink className={buttonClass('primary')}>Join the waitlist</WaitlistLink>
      </CtaBand>
    </>
  );
}
