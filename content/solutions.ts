import type { IconName } from '@/lib/icons';

export const solutions: ReadonlyArray<{
  id: string; name: string; icon: IconName; preview: string; linkLabel: string;
  heading: string; copy: string; useCases: readonly string[]; outcome: string; productLink?: boolean;
}> = [
  {
    id: 'construction', name: 'Construction', icon: 'hat',
    preview: 'Manage defects, snagging, quality inspections, subcontractor actions and handover records.',
    linkLabel: 'SiteResolve for construction',
    heading: 'Close out snags before handover.',
    copy: 'SiteResolve helps project and quality teams record defects where they are found, assign the relevant trade and confirm that corrective work meets the required standard.',
    useCases: ['Defect and snagging lists', 'Quality inspections', 'Subcontractor actions', 'Pre-handover inspections', 'Client handover issues', 'Warranty defects', 'Evidence and sign-off records'],
    outcome: 'See which items remain open, who owns them and which completed repairs still require verification.',
    productLink: true
  },
  {
    id: 'property-management', name: 'Property management', icon: 'home',
    preview: 'Record repairs, assign contractors and retain a clear history for each property or shared area.',
    linkLabel: 'SiteResolve for property management',
    heading: 'Manage repairs with a clear history for every property.',
    copy: 'Record issues reported by residents, staff or inspections. Assign internal teams or contractors and keep updates, evidence and decisions attached to the same repair record.',
    useCases: ['Reactive repairs', 'Shared-area defects', 'Contractor instructions', 'Property inspections', 'Owner and manager updates', 'Repair evidence', 'Completion review'],
    outcome: 'See the full story of each repair without searching through emails, calls and spreadsheets.'
  },
  {
    id: 'facilities-management', name: 'Facilities management', icon: 'building',
    preview: 'Track operational issues across buildings, teams and service providers.',
    linkLabel: 'SiteResolve for facilities',
    heading: 'Track operational issues across buildings and service providers.',
    copy: 'Log faults across several buildings, give each one to an in-house team or a service provider, and keep a dated record of every action.',
    useCases: ['Building defects', 'Workplace issues', 'Multi-site reporting', 'Service-provider actions', 'Safety-related repairs', 'Planned inspections', 'Operational reporting'],
    outcome: 'Review current issues by site, priority, provider and status.'
  },
  {
    id: 'maintenance', name: 'Maintenance', icon: 'wrench',
    preview: 'Move reported faults into assigned work, evidence and verified closure.',
    linkLabel: 'SiteResolve for maintenance',
    heading: 'Follow each fault until the repair is checked.',
    copy: 'Turn a reported fault into assigned work with evidence and an approval step. Consistent categories make repeat faults easy to spot.',
    useCases: ['Reactive maintenance', 'Equipment and asset faults', 'Corrective work', 'Internal maintenance teams', 'External contractor work', 'Completion evidence', 'Recurring-issue review'],
    outcome: 'Keep the fault, repair and final review in one record.'
  },
  {
    id: 'inspections', name: 'Inspections', icon: 'clip',
    preview: 'Turn findings into owned actions and confirm that corrective work has been completed.',
    linkLabel: 'SiteResolve for inspections',
    heading: 'Turn findings into actions that can be followed through.',
    copy: 'Each finding gets an owner, a due date, a corrective action and a verification decision, so the work continues after the inspection report is filed.',
    useCases: ['Quality inspections', 'Condition surveys', 'Safety findings', 'Compliance checks', 'Corrective actions', 'Evidence collection', 'Closure reports'],
    outcome: 'See which findings have been addressed and which still require action.'
  }
];
