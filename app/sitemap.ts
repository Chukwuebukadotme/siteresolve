import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

const paths = ['/', '/product', '/solutions', '/pricing', '/about', '/contact', '/careers', '/privacy', '/cookies', '/terms'];

export default function sitemap(): MetadataRoute.Sitemap {
  // Needs absolute URLs, so it stays empty until NEXT_PUBLIC_SITE_URL is set.
  if (!site.url) return [];
  return paths.map((path) => ({ url: `${site.url}${path === '/' ? '' : path}` }));
}
