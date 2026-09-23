export const plans = [
  {
    num: '01', name: 'Starter', audience: 'For individual contractors and small teams managing a limited number of sites.',
    cta: { label: 'Join the waitlist', waitlist: true },
    features: ['Defect reporting', 'Photographs and attachments', 'Assignment and due dates', 'Issue status tracking', 'Resolution evidence', 'Verification workflow', 'Standard reports', 'Mobile-responsive access']
  },
  {
    num: '02', name: 'Operations', audience: 'For growing teams coordinating work across several projects, properties or facilities.',
    cta: { label: 'Discuss your requirements', waitlist: false },
    features: ['Everything in Starter', 'Multiple sites and projects', 'Internal and external assignees', 'Configurable issue fields', 'Role-based permissions', 'Cross-site dashboards', 'Scheduled reports', 'Expanded export options']
  },
  {
    num: '03', name: 'Enterprise', audience: 'For larger organisations requiring more control, reporting and system coordination.',
    cta: { label: 'Discuss enterprise access', waitlist: false },
    features: ['Everything in Operations', 'Advanced permissions', 'Organisation-level reporting', 'Custom workflow configuration', 'Integration support', 'Data-management controls', 'Implementation planning', 'Priority support options']
  }
] as const;
