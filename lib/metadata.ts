import type { Metadata } from 'next';
import { site } from './site';

/** Social sharing image (1200 by 630) shown when any page is linked on LinkedIn, Slack, email and similar. */
export const shareImage = { url: '/og-image.jpg', width: 1200, height: 630, alt: 'SiteResolve: from defect report to verified resolution. A site manager photographs a fire-door defect.' };

/** Page metadata with matching Open Graph fields. Canonical URLs are added once NEXT_PUBLIC_SITE_URL is set. */
export function pageMetadata({ title, description, path, noindex }: { title: string; description?: string; path: string; noindex?: boolean }): Metadata {
  return {
    title,
    description,
    alternates: site.url ? { canonical: path } : undefined,
    openGraph: { title, description, url: site.url ? path : undefined, type: 'website', siteName: 'SiteResolve', locale: 'en_GB', images: [shareImage] },
    twitter: { card: 'summary_large_image', title, description, images: [shareImage] },
    robots: noindex ? { index: false, follow: true } : undefined
  };
}
