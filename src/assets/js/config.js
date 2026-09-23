/* SiteResolve website configuration. Edit these values before launch.
 *
 * endpoints: URLs that accept a JSON POST for each form. Leave a value empty to run that form in
 *   preview mode, which simulates a successful submission in the browser and sends nothing.
 *   Expected responses: 2xx on success, 409 when a waitlist email is already registered.
 * contactEmail: shown in the contact form error message. Replace the placeholder.
 * loadAnalytics: optional function that loads your analytics script. It is called only after the
 *   visitor has accepted analytics cookies, and never before.
 */
window.SR_CONFIG = {
  endpoints: {
    waitlist: '',
    contact: '',
    careers: ''
  },
  contactEmail: '[GENERAL CONTACT EMAIL]',
  loadAnalytics: null
};
