import type { Metadata } from 'next';
import { site } from './site';

/** Page metadata with matching Open Graph fields. Canonical URLs are added once NEXT_PUBLIC_SITE_URL is set. */
export function pageMetadata({ title, description, path, noindex }: { title: string; description?: string; path: string; noindex?: boolean }): Metadata {
  return {
    title,
    description,
    alternates: site.url ? { canonical: path } : undefined,
    openGraph: { title, description, url: site.url ? path : undefined, type: 'website', siteName: 'SiteResolve', locale: 'en_GB' },
    robots: noindex ? { index: false, follow: true } : undefined
  };
}
