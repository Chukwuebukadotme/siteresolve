import { LegalDocument, List, ManageCookies, P, Sub, Table } from '@/components/legal';
import { Ph } from '@/components/ui';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Cookie Policy | SiteResolve',
  description: 'Read how SiteResolve uses cookies and similar technologies and how you can manage your choices.',
  path: '/cookies'
});

const columns = ['Cookie or technology', 'Provider', 'Purpose', 'Category', 'Duration', 'First party or third party'];

export default function CookiesPage() {
  return (
    <LegalDocument
      title="Cookie Policy"
      draftNote="Complete the cookie table from an actual scan of the final website. Keep every bracketed placeholder until each item has been confirmed and reviewed."
      sections={[
        { title: 'What cookies are', body: <P>Cookies are small files or pieces of information stored on a device when a person visits a website. Similar technologies may use local storage, pixels or other browser features.</P> },
        { title: 'How SiteResolve uses cookies', body: <>
          <P>SiteResolve may use cookies and similar technologies to:</P>
          <List items={['provide essential website functions;', 'remember privacy choices;', 'protect forms and website security; and', 'understand website use where analytics consent has been provided.']} />
        </> },
        { title: 'Cookie categories', body: <>
          <Sub>Strictly necessary</Sub>
          <P>These technologies are required for website functions such as security, form handling and remembering cookie choices. They cannot be disabled through the SiteResolve cookie controls.</P>
          <Sub>Preferences</Sub>
          <P>These technologies remember optional choices such as display or interface preferences.</P>
          <Table rows={[['Status', '[CONFIRM WHETHER PREFERENCE COOKIES ARE USED]']]} />
          <Sub>Analytics</Sub>
          <P>These technologies help us understand which pages are visited and how the website is used.</P>
          <Table rows={[['Status', '[CONFIRM ANALYTICS PROVIDER AND CONFIGURATION]']]} />
          <P>Analytics technologies are not activated before the required consent has been provided.</P>
          <Sub>Advertising</Sub>
          <P>SiteResolve does not use advertising cookies unless this policy and the consent controls are updated before those technologies are introduced.</P>
        </> },
        { title: 'Cookies used', body: (
          <div className="overflow-x-auto rounded-lg border border-line">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <caption className="sr-only">Cookies used</caption>
              <thead>
                <tr>{columns.map((c) => <th key={c} scope="col" className="border-b border-line bg-surface-200 px-3.5 py-2.5 text-left font-semibold text-ink-2">{c}</th>)}</tr>
              </thead>
              <tbody>
                <tr><td colSpan={6} className="px-3.5 py-5 text-center"><Ph>[INSERT COOKIE TABLE FROM A SCAN OF THE FINAL WEBSITE]</Ph></td></tr>
              </tbody>
            </table>
          </div>
        ) },
        { title: 'Managing your choices', body: <>
          <P>When you first visit the website, you can:</P>
          <List items={['accept optional cookies;', 'reject optional cookies; or', 'manage individual categories.']} />
          <P>You can change your selection at any time through Cookie settings in the website footer.</P>
          <P>Rejecting optional cookies does not prevent access to the main website content.</P>
          <ManageCookies />
        </> },
        { title: 'Browser controls', body: <P>Most browsers also allow you to remove or block stored cookies. Browser settings may affect essential website functions if all storage is disabled.</P> },
        { title: 'Changes to this policy', body: <P>We may update this policy when the website’s technologies or service providers change. The effective date shows when the current version took effect.</P> },
        { title: 'Contact', body: <P>For questions about cookies or privacy, contact [PRIVACY CONTACT EMAIL].</P> }
      ]}
    />
  );
}
