import Image from 'next/image';
import type { CSSProperties, ReactNode } from 'react';
import type { PhotoAsset } from '@/content/photos';
import { cn } from '@/lib/cn';

/**
 * A worksite photograph filling its frame. The frame's size and aspect ratio come from `className`.
 * `position` sets the crop focus, and `positionLg` overrides it from the lg breakpoint.
 */
export function Photo({ photo, sizes, className, position = 'center', positionLg, preload }: {
  photo: PhotoAsset; sizes: string; className?: string; position?: string; positionLg?: string; preload?: boolean;
}) {
  return (
    <div className={cn('relative overflow-hidden rounded-xl bg-surface-300', className)}>
      <Image
        src={photo.src} alt={photo.alt} fill sizes={sizes} placeholder="blur" preload={preload}
        className="object-cover [object-position:var(--pos)] lg:[object-position:var(--pos-lg)]"
        style={{ '--pos': position, '--pos-lg': positionLg ?? position } as CSSProperties}
      />
    </div>
  );
}

/**
 * A photograph with a product card overlapping its lower edge: the work on site above,
 * what SiteResolve records below. `cardSide` sets which side the card leans towards.
 */
export function PhotoPair({ photo, sizes, frame, position, cardSide = 'left', children }: {
  photo: PhotoAsset; sizes: string; frame: string; position?: string; cardSide?: 'left' | 'right'; children: ReactNode;
}) {
  const left = cardSide === 'left';
  return (
    <div className="flex flex-col">
      <Photo photo={photo} sizes={sizes} position={position} className={cn(frame, 'w-full sm:w-[86%]', left && 'sm:ml-auto')} />
      <div className={cn('relative mx-3 -mt-14 sm:mx-0 sm:-mt-20 sm:w-[78%] sm:max-w-[480px]', !left && 'sm:ml-auto')}>{children}</div>
    </div>
  );
}
