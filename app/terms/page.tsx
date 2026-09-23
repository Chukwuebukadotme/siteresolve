import Link from 'next/link';
import { LegalDocument, List, P, Table } from '@/components/legal';
import { DraftOnly } from '@/components/ui';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Terms of Use | SiteResolve',
  description: 'Read the terms that apply when using the SiteResolve website.',
  path: '/terms'
});

export default function TermsPage() {
  return (
    <LegalDocument
      title="Terms of Use"
      draftNote="These terms cover the public marketing website only. They are not subscription terms or product-service terms. Keep every bracketed placeholder until it has been completed and reviewed."
      sections={[
        { title: 'About these terms', body: <>
          <P>These terms apply when you use the SiteResolve website at [FINAL DOMAIN].</P>
          <P>By using the website, you agree to these terms. If you do not agree, do not use the website.</P>
        </> },
        { title: 'Who we are', body: <>
          <P>The website is operated by [LEGAL ENTITY NAME], trading as SiteResolve.</P>
          <Table rows={[['Registered address', '[REGISTERED ADDRESS]'], ['Contact', '[GENERAL CONTACT EMAIL]']]} />
        </> },
        { title: 'Website purpose', body: <>
          <P>The website provides information about SiteResolve and allows visitors to join a waitlist, submit enquiries and register interest in future opportunities.</P>
          <P>These terms do not govern access to any future SiteResolve software service. Separate terms will apply before product access is provided.</P>
        </> },
        { title: 'Using the website', body: <>
          <P>You may use the website for lawful personal or business purposes.</P>
          <P>You must not:</P>
          <List items={['attempt to gain unauthorised access to the website or related systems;', 'interfere with the website’s operation or security;', 'introduce malicious software;', 'misuse forms or submit unlawful content;', 'use automated methods in a way that places an unreasonable load on the website; or', 'use website content in a way that infringes intellectual-property rights.']} />
        </> },
        { title: 'Website content', body: <>
          <P>We aim to keep website information clear and accurate. Product descriptions may change as SiteResolve develops.</P>
          <P>Do not treat website content as construction, engineering, safety, legal or compliance advice.</P>
          <P>Professional decisions should be based on the relevant contract, specification, regulation and qualified advice.</P>
        </> },
        { title: 'Availability', body: <P>We may change, suspend or withdraw parts of the website. We do not guarantee that the website will always be available or free from errors.</P> },
        { title: 'Intellectual property', body: <>
          <P>Unless stated otherwise, SiteResolve or its licensors own the intellectual-property rights in the website and its original content.</P>
          <P>You may view and use the website for its intended purpose. You may not reproduce, distribute or commercially exploit substantial parts of the website without permission.</P>
        </> },
        { title: 'Third-party links', body: <>
          <P>The website may link to third-party websites. We do not control their content, availability or privacy practices.</P>
          <P>A link does not imply endorsement unless this is stated explicitly.</P>
        </> },
        { title: 'Liability', body: <>
          <P>Nothing in these terms excludes liability that cannot lawfully be excluded.</P>
          <P>Subject to that restriction, [LEGAL ENTITY NAME] is not responsible for loss caused by relying on general website information instead of obtaining appropriate professional advice.</P>
          <DraftOnly><P>[FINAL LIABILITY WORDING TO BE REVIEWED FOR THE ORGANISATION’S CIRCUMSTANCES BEFORE PUBLICATION]</P></DraftOnly>
        </> },
        { title: 'Personal information', body: <p>We use personal information as described in our <Link href="/privacy">Privacy Policy</Link> and <Link href="/cookies">Cookie Policy</Link>.</p> },
        { title: 'Changes to these terms', body: <P>We may update these terms when the website, business or applicable requirements change. The effective date shows when the current version took effect.</P> },
        { title: 'Governing law', body: <>
          <P>These terms are governed by the laws of England and Wales.</P>
          <P>The courts with jurisdiction will be determined by applicable law and the circumstances of the user.</P>
        </> },
        { title: 'Contact', body: <P>Questions about these terms should be sent to [GENERAL CONTACT EMAIL].</P> }
      ]}
    />
  );
}
