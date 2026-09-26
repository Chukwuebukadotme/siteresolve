/*
 * SiteResolve is sold as one annual subscription per organisation. To publish a figure or range for a
 * plan, set its `price` (for example 'From £X a year'); plans without one say how the price is quoted.
 */
export const plans: ReadonlyArray<{
  name: string; audience: string; price?: string;
  cta: { label: string; waitlist: boolean }; features: readonly string[];
}> = [
  {
    name: 'Starter', audience: 'For individual contractors and small teams managing a limited number of sites.',
    cta: { label: 'Join the waitlist', waitlist: true },
    features: ['Defect reporting', 'Photographs and attachments', 'Assignment and due dates', 'Issue status tracking', 'Resolution evidence', 'Verification workflow', 'Standard reports', 'Mobile-responsive access']
  },
  {
    name: 'Operations', audience: 'For growing teams coordinating work across several projects, properties or facilities.',
    cta: { label: 'Discuss your requirements', waitlist: false },
    features: ['Everything in Starter', 'Multiple sites and projects', 'Internal and external assignees', 'Configurable issue fields', 'Role-based permissions', 'Cross-site dashboards', 'Scheduled reports', 'Expanded export options']
  },
  {
    name: 'Enterprise', audience: 'For larger organisations requiring more control, reporting and system coordination.',
    cta: { label: 'Discuss enterprise access', waitlist: false },
    features: ['Everything in Operations', 'Advanced permissions', 'Organisation-level reporting', 'Custom workflow configuration', 'Integration support', 'Data-management controls', 'Implementation planning', 'Priority support options']
  }
];
