import Link from 'next/link';
import { Address, LegalDocument, List, ManageCookies, P, Purposes, Sub, Table } from '@/components/legal';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Privacy Policy | SiteResolve',
  description: 'Read how SiteResolve collects, uses, stores and protects personal information.',
  path: '/privacy'
});

export default function PrivacyPage() {
  return (
    <LegalDocument
      title="Privacy Policy"
      draftNote="This is a structured draft. Keep every bracketed placeholder until the organisation, processors, lawful bases, retention periods and contact details have been confirmed and legally reviewed."
      sections={[
        { title: 'Who we are', body: <>
          <P>SiteResolve is the trading name used by [LEGAL ENTITY NAME].</P>
          <P>Our registered address is [REGISTERED ADDRESS].</P>
          <P>For questions about this Privacy Policy or your personal information, contact:</P>
          <P>[PRIVACY CONTACT EMAIL]</P>
        </> },
        { title: 'What this policy covers', body: <>
          <P>This policy explains how we collect and use personal information when you:</P>
          <List items={['visit the SiteResolve website;', 'join the SiteResolve waitlist;', 'submit a contact form;', 'register your interest in careers;', 'respond to a survey or product-research request; or', 'communicate with us.']} />
        </> },
        { title: 'Information we collect', body: <>
          <P>Depending on how you interact with SiteResolve, we may collect:</P>
          <List items={['your name;', 'work email address;', 'company;', 'role;', 'industry;', 'organisation size;', 'information about your current defect-management process;', 'the content of enquiries or messages;', 'career-interest information;', 'communication preferences;', 'basic technical information about your browser and device;', 'website-usage information where you have consented to analytics; and', 'records of consent and unsubscribe requests.']} />
        </> },
        { title: 'How we collect information', body: <>
          <P>We collect information:</P>
          <List items={['directly from you when you complete a form or contact us;', 'automatically through strictly necessary website technologies; and', 'through optional analytics technologies where you have provided consent.']} />
        </> },
        { title: 'Why we use your information', body: (
          <Purposes rows={[
            ['Waitlist registration and product updates', 'To record your interest, send requested product updates and provide information about access.', 'Consent.'],
            ['Contact enquiries', 'To respond to your enquiry and keep an appropriate record of the communication.', '[CONFIRM LAWFUL BASIS BEFORE PUBLICATION]'],
            ['Careers interest', 'To review information submitted for possible future opportunities.', 'Consent.'],
            ['Website operation and security', 'To operate the website, prevent misuse, diagnose technical problems and maintain security.', '[CONFIRM LAWFUL BASIS BEFORE PUBLICATION]'],
            ['Analytics', 'To understand how visitors use the website and improve its content and structure.', 'Consent where non-essential cookies or similar technologies are used.']
          ]} />
        ) },
        { title: 'Who we share information with', body: <>
          <P>We may use service providers to support website hosting, form processing, waitlist storage, email delivery and analytics.</P>
          <Sub>Confirmed providers</Sub>
          <Table rows={[['Hosting', '[HOSTING PROVIDER]'], ['Waitlist storage', '[WAITLIST STORAGE PROVIDER]'], ['Email delivery', '[EMAIL DELIVERY PROVIDER]'], ['Analytics', '[ANALYTICS PROVIDER]'], ['Other processors', '[OTHER CONFIRMED PROCESSORS]']]} />
          <P>These providers may process information only for the services they supply to us and subject to appropriate contractual requirements.</P>
        </> },
        { title: 'International transfers', body: <P>[INSERT CONFIRMED INFORMATION ABOUT INTERNATIONAL DATA TRANSFERS, DESTINATIONS AND SAFEGUARDS.]</P> },
        { title: 'How long we keep information', body: <>
          <Table rows={[['Waitlist information', '[WAITLIST RETENTION PERIOD]'], ['Contact enquiries', '[CONTACT RETENTION PERIOD]'], ['Careers interest', '[CAREERS RETENTION PERIOD]'], ['Consent records', '[CONSENT RECORD RETENTION PERIOD]'], ['Analytics information', '[ANALYTICS RETENTION PERIOD]']]} />
          <P>We delete or anonymise information when it is no longer required for the stated purpose, subject to any legal or operational requirement to retain it.</P>
        </> },
        { title: 'Your rights', body: <>
          <P>Depending on the circumstances, you may have rights concerning your personal information, including the right to:</P>
          <List items={['request access;', 'request correction;', 'request deletion;', 'request restriction;', 'object to certain processing;', 'request transfer of information; and', 'withdraw consent where processing is based on consent.']} />
          <P>These rights can depend on the applicable lawful basis and may not apply in every situation.</P>
          <P>To make a request, contact [PRIVACY CONTACT EMAIL].</P>
        </> },
        { title: 'Withdrawing consent', body: <>
          <P>You can unsubscribe from product emails using the link in each message.</P>
          <P>You can also withdraw consent by contacting [PRIVACY CONTACT EMAIL].</P>
          <P>Withdrawing consent does not affect processing that took place before consent was withdrawn.</P>
        </> },
        { title: 'Cookies', body: <>
          <p>We use strictly necessary technologies to operate the website. We use optional analytics or preference technologies only as described in our <Link href="/cookies">Cookie Policy</Link> and, where required, after you have provided consent.</p>
          <P>You can review or change your choices through Cookie settings.</P>
          <ManageCookies />
        </> },
        { title: 'Security', body: <P>We use organisational and technical measures appropriate to the information we process.</P> },
        { title: 'Children', body: <P>The SiteResolve website and waitlist are intended for people acting in a professional or business capacity. They are not directed at children.</P> },
        { title: 'Complaints', body: <>
          <P>Please contact us first if you have concerns about how we use your information.</P>
          <p>You may also have the right to complain to the Information Commissioner’s Office. Information is available at <a href="https://ico.org.uk" rel="noopener">ico.org.uk</a>.</p>
        </> },
        { title: 'Changes to this policy', body: <P>We may update this policy when our services, providers or legal obligations change. The effective date at the top of the page shows when the current version took effect.</P> },
        { title: 'Contact', body: <>
          <P>Privacy questions and requests should be sent to:</P>
          <Address lines={['[LEGAL ENTITY NAME]', '[REGISTERED ADDRESS]', '[PRIVACY CONTACT EMAIL]']} />
        </> }
      ]}
    />
  );
}
