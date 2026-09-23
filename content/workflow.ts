import type { MockRow } from '@/components/mockups';

type Step = { title: string; rows: MockRow[]; actions: Array<{ label: string; variant?: 'primary' | 'secondary' | 'danger' }>; decision?: boolean };

const photos = (label: string, add = true): MockRow => ({ label, kind: 'photos', value: '2 photographs', add });
const assignee: MockRow = { label: 'Assign to', kind: 'person', value: 'Northline Doors', initials: 'ND' };

/** Home page: the four workflow steps. */
export const homeSteps: Array<Step & { name: string; heading: string; copy: string }> = [
  {
    name: 'Report', heading: 'Record the defect where it is found.',
    copy: 'Add a description, photographs, location, category and priority from a phone, tablet or desktop. The report creates one reference for the issue.',
    title: 'Report a defect',
    rows: [photos('Add photographs'), { label: 'Select location', kind: 'text', value: 'Riverside Quarter, Block C, Level 04' }, { label: 'Set priority', kind: 'priority', value: 'High' }],
    actions: [{ label: 'Save report' }]
  },
  {
    name: 'Assign', heading: 'Give the next action a clear owner.',
    copy: 'Assign the issue to an employee, contractor or subcontractor. Add a due date and keep instructions, files and comments with the record.',
    title: 'Assign issue',
    rows: [assignee, { label: 'Responsible company', kind: 'text', value: 'Northline Doors, door subcontractor' }, { label: 'Due date', kind: 'text', value: '21 September' }, { label: 'Add instruction', kind: 'text', value: 'Adjust the closer so the door closes fully into the frame.' }],
    actions: [{ label: 'Notify assignee' }]
  },
  {
    name: 'Resolve', heading: 'Record the work and supporting evidence.',
    copy: 'The assignee updates the issue, adds completion notes and submits photographs or documents showing what was done.',
    title: 'Resolution',
    rows: [{ label: 'Start work', kind: 'done', value: 'Work started' }, { label: 'Add update', kind: 'text', value: 'Closer adjusted and hinges checked. The door now closes fully.' }, photos('Upload evidence')],
    actions: [{ label: 'Submit resolution' }]
  },
  {
    name: 'Verify', heading: 'Check the work before closing the issue.',
    copy: 'An authorised reviewer accepts the resolution, rejects it or returns it for further work. The final decision is added to the issue history.',
    title: 'Review evidence',
    rows: [{ ...assignee, label: 'Submitted by' }, photos('Repair evidence', false)],
    actions: [{ label: 'Close issue' }],
    decision: true
  }
];

/** Product page: one capability section per workflow stage. */
export const productCapabilities: Array<Step & { id: string; eyebrow: string; heading: string; copy: string; features: string[] }> = [
  {
    id: 'report', eyebrow: 'Report', heading: 'Capture a useful report at the point of discovery.',
    copy: 'Record the information another person needs to understand and act on the defect. Add visual evidence, a precise location and the correct level of urgency.',
    features: ['Photographs and attachments', 'Site, building, floor and room', 'Plan or drawing reference', 'Defect category', 'Priority and severity', 'Description and instructions', 'Reporter and timestamp', 'Draft and submitted states'],
    title: 'Report a defect',
    rows: [{ label: 'Location', kind: 'text', value: 'Riverside Quarter, Block C, Level 04, Room C4.12' }, { label: 'Drawing reference', kind: 'text', value: 'Level 04 general arrangement' }, { label: 'Category', kind: 'text', value: 'Doors and ironmongery' }, { label: 'Priority', kind: 'priority', value: 'High' }, photos('Photographs')],
    actions: [{ label: 'Save draft', variant: 'secondary' }, { label: 'Report defect' }]
  },
  {
    id: 'assign', eyebrow: 'Assign', heading: 'Make responsibility visible.',
    copy: 'Assign each issue to the person or company responsible for the next action. Deadlines, instructions and notifications remain connected to the issue.',
    features: ['Internal and external assignees', 'Responsible company', 'Due dates', 'Priority', 'Assignment history', 'Comments and instructions', 'Notifications', 'Reassignment controls'],
    title: 'Assign issue',
    rows: [{ ...assignee, label: 'Assignee' }, { label: 'Responsible company', kind: 'text', value: 'Northline Doors, door subcontractor' }, { label: 'Due date', kind: 'text', value: '21 September' }, { label: 'Instruction', kind: 'text', value: 'Adjust the closer so the door closes fully into the frame.' }],
    actions: [{ label: 'Cancel', variant: 'secondary' }, { label: 'Assign issue' }]
  },
  {
    id: 'resolve', eyebrow: 'Resolve', heading: 'Keep the repair and its evidence together.',
    copy: 'Assignees can record progress, add notes and submit evidence showing the completed work. The original defect remains visible throughout the process.',
    features: ['Work status', 'Completion notes', 'Before and after photographs', 'Supporting documents', 'Completion date', 'Submitted-by record', 'Return for correction', 'Resolution history'],
    title: 'Resolution',
    rows: [{ label: 'Work status', kind: 'status', value: 'In progress' }, { label: 'Completion notes', kind: 'text', value: 'Closer adjusted and hinges checked. The door now closes fully.' }, photos('Before and after'), { label: 'Completion date', kind: 'text', value: '19 September' }],
    actions: [{ label: 'Add evidence', variant: 'secondary' }, { label: 'Submit resolution' }]
  },
  {
    id: 'verify', eyebrow: 'Verify', heading: 'Close issues only after review.',
    copy: 'Completion does not automatically mean approval. An authorised reviewer checks the evidence, records a decision and either closes the issue or sends it back for more work.',
    features: ['Reviewer permissions', 'Accept or reject decision', 'Verification notes', 'Additional evidence requests', 'Recorded decision date', 'Reopened issues', 'Closure history', 'Final report'],
    title: 'Review evidence',
    rows: [{ ...assignee, label: 'Submitted by' }, photos('Repair evidence', false), { label: 'Verification notes', kind: 'text', value: 'Door checked on site. It closes and latches fully.' }],
    actions: [{ label: 'Return for correction', variant: 'danger' }, { label: 'Verify resolution' }]
  }
];
