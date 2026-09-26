/*
 * Worksite photographs. Web versions are generated from the PNG masters in assets/photos/masters
 * by `npm run photos`; see assets/photos/USAGE.md for crops, placement and alt text.
 */
import type { StaticImageData } from 'next/image';
import reportDoor from '@/assets/photos/01-hero-report-defect.jpg';
import reportWall from '@/assets/photos/02-report-wall-defect.jpg';
import assignOffice from '@/assets/photos/03-assign-site-office.jpg';
import resolveDoor from '@/assets/photos/04-resolve-fire-door.jpg';
import verifyDoor from '@/assets/photos/05-verify-fire-door.jpg';
import facilitiesLeak from '@/assets/photos/06-facilities-plant-room-v2.jpg';
import offlineUpdate from '@/assets/photos/07-offline-site-update.jpg';

export type PhotoAsset = { src: StaticImageData; alt: string };

export const photos = {
  reportDoor: { src: reportDoor, alt: 'Site manager photographing a fire-door defect on a construction site.' },
  reportWall: { src: reportWall, alt: 'Building inspector photographing a crack beside a window.' },
  assignOffice: { src: assignOffice, alt: 'Project manager assigning a construction defect from a site-office laptop.' },
  resolveDoor: { src: resolveDoor, alt: 'Door technician adjusting a fire-door closer during corrective work.' },
  verifyDoor: { src: verifyDoor, alt: 'Quality inspector checking a repaired fire door before approval.' },
  facilitiesLeak: { src: facilitiesLeak, alt: 'Facilities manager inspecting a leaking pipe joint in a plant room.' },
  offlineUpdate: { src: offlineUpdate, alt: 'Site engineer saving a defect update on a wet outdoor construction site.' }
} satisfies Record<string, PhotoAsset>;
