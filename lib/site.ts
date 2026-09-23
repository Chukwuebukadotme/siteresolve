/** Site-wide settings. Values come from environment variables so each deployment can set its own. */
export const site = {
  name: 'SiteResolve',
  /** Absolute URL without a trailing slash, for example https://www.example.co.uk. Empty until the domain is confirmed. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? '').replace(/\/+$/, ''),
  /** Show draft notices and [CONFIRM ...] notes. Set NEXT_PUBLIC_SHOW_DRAFT_NOTICES=false once content is final. */
  showDraftNotices: process.env.NEXT_PUBLIC_SHOW_DRAFT_NOTICES !== 'false',
  contactEmail: '[GENERAL CONTACT EMAIL]',
  statement: 'SiteResolve helps construction and property teams manage defects from first report to verified resolution.'
};
