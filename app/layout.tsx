import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { ConsentProvider } from '@/components/client/consent';
import { Header } from '@/components/client/header';
import { WaitlistProvider } from '@/components/client/waitlist';
import { Footer } from '@/components/footer';
import { site } from '@/lib/site';
import { shareImage } from '@/lib/metadata';
import './globals.css';

// Self-hosted Inter (SIL Open Font License), so no visitor data is sent to a font service.
const inter = localFont({
  src: './fonts/inter-latin-wght-normal.woff2',
  weight: '100 900',
  variable: '--font-inter',
  display: 'swap'
});

export const metadata: Metadata = {
  metadataBase: site.url ? new URL(site.url) : undefined,
  title: 'SiteResolve | Defect management from report to verification',
  description: 'Report construction and property defects on site, assign them, collect repair evidence and sign them off with SiteResolve.',
  openGraph: { type: 'website', siteName: 'SiteResolve', locale: 'en_GB', images: [shareImage] },
  twitter: { card: 'summary_large_image', images: [shareImage] }
};

export const viewport: Viewport = { themeColor: '#ffffff' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={inter.variable}>
      <body>
        <a href="#main" className="absolute -top-20 left-4 z-[120] rounded-md bg-brand px-4 py-3 font-semibold text-white no-underline focus:top-3">Skip to content</a>
        <ConsentProvider>
          <WaitlistProvider>
            <Header />
            <main id="main">{children}</main>
            <Footer />
          </WaitlistProvider>
        </ConsentProvider>
      </body>
    </html>
  );
}
