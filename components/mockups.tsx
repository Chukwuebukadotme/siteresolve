/* Representative product views. All data shown here is demonstration data and is labelled as such. */
import Image from 'next/image';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import type { IconName } from '@/lib/icons';
import { Assignee, DemoTag, Icon, MockButton, Priority, StatusLabel, type Tone } from './ui';

/** Dark window frame around a product view. */
export function ProductFrame({ label, name, className, children }: { label: string; name?: ReactNode; className?: string; children: ReactNode }) {
  return (
    <figure aria-label={label} className={cn('dk @container m-0 overflow-hidden text-left rounded-2xl border border-line shadow-raised', className)}>
      <div className="flex min-h-11 items-center justify-between gap-3 border-b border-line bg-surface-200 py-2 pr-3 pl-4">
        <span className="inline-flex items-center gap-2 text-[0.8125rem] font-semibold">
          {name ?? (
            <>
              <Image src="/logo-white.png" alt="" width={20} height={12} className="h-3 w-auto" />
              SiteResolve
            </>
          )}
        </span>
        <DemoTag />
      </div>
      {children}
    </figure>
  );
}

export function AppShell({ nav, title, tools, children }: { nav: Array<{ icon: IconName; label: string; active?: boolean }>; title: string; tools: ReactNode; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[168px_minmax(0,1fr)] text-[0.8125rem] leading-snug @max-[760px]:grid-cols-1">
      <div className="flex flex-col gap-0.5 border-r border-line px-2 py-3 @max-[760px]:hidden">
        {nav.map((item) => (
          <span key={item.label} className={cn('flex h-8 items-center gap-2 rounded-[6px] px-2.5 whitespace-nowrap', item.active ? 'bg-brand-subtle font-semibold text-ink' : 'font-medium text-ink-2')}>
            <Icon name={item.icon} className="size-4" />
            {item.label}
          </span>
        ))}
      </div>
      <div className="flex min-w-0 flex-col gap-3.5 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-base font-semibold tracking-[-0.01em]">{title}</p>
          <div className="flex flex-wrap gap-1.5">{tools}</div>
        </div>
        {children}
      </div>
    </div>
  );
}

export function Tool({ icon, children, primary, trailing }: { icon: IconName; children: ReactNode; primary?: boolean; trailing?: IconName }) {
  return (
    <span className={cn('inline-flex h-7.5 items-center gap-1.5 rounded-[6px] border px-2.5 text-xs font-semibold whitespace-nowrap', primary ? 'border-brand bg-brand text-white' : 'border-line-strong bg-surface-100 text-ink @max-[420px]:hidden')}>
      <Icon name={icon} className="size-3.5" />
      {children}
      {trailing ? <Icon name={trailing} className="size-3.5" /> : null}
    </span>
  );
}

export function Kpis({ items, columns = 4 }: { items: Array<{ label: string; value: string; overdue?: boolean }>; columns?: 4 | 5 }) {
  return (
    <div className={cn('grid gap-2 @max-[620px]:grid-cols-2', columns === 5 ? 'grid-cols-5' : 'grid-cols-4')}>
      {items.map((k) => (
        <div key={k.label} className={cn('flex flex-col gap-1 rounded-md border border-line px-3 py-2.5', k.overdue && 'text-bad')}>
          <span className={cn('truncate text-[0.6875rem] font-semibold', !k.overdue && 'text-ink-2')}>{k.label}</span>
          <span className="text-[1.375rem] leading-[1.1] font-semibold tracking-[-0.02em] tabular-nums">{k.value}</span>
        </div>
      ))}
    </div>
  );
}

const issues: Array<{ ref: string; title: string; location: string; priority: string; status: string; tone: Tone; assignee: string; initials: string; due: string; selected?: boolean; unassigned?: boolean }> = [
  { ref: 'SR-1842', title: 'Fire door does not close fully', location: 'Block C, Level 04', priority: 'High', status: 'Awaiting verification', tone: 'info', assignee: 'Northline Doors', initials: 'ND', due: '21 Sep', selected: true },
  { ref: 'SR-1840', title: 'Extract fan not running', location: 'Block C, Level 02', priority: 'Medium', status: 'Overdue', tone: 'bad', assignee: 'Site team', initials: 'ST', due: '18 Sep' },
  { ref: 'SR-1839', title: 'Cracked floor tile at stair landing', location: 'Block A, Level 01', priority: 'Medium', status: 'In progress', tone: 'info', assignee: 'Site team', initials: 'ST', due: '26 Sep' },
  { ref: 'SR-1836', title: 'Sealant gap at window frame', location: 'Block B, Level 03', priority: 'Low', status: 'Open', tone: 'warn', assignee: 'Unassigned', initials: '?', due: '30 Sep', unassigned: true },
  { ref: 'SR-1831', title: 'Loose handrail bracket', location: 'Block A, Level 02', priority: 'Low', status: 'Verified', tone: 'ok', assignee: 'Site team', initials: 'ST', due: '12 Sep' }
];

/* Columns drop out as the frame narrows: location, then priority, assignee and due date. */
const cols =
  '[--cols:76px_minmax(0,1.6fr)_minmax(0,1.1fr)_68px_156px_minmax(0,1.3fr)_64px] @max-[1120px]:[--cols:76px_minmax(0,1.6fr)_68px_156px_minmax(0,1.3fr)_64px] @max-[620px]:[--cols:76px_minmax(0,1.6fr)_156px_minmax(0,1.3fr)_64px] @max-[540px]:[--cols:76px_minmax(0,1fr)_156px_64px] @max-[420px]:[--cols:72px_minmax(0,1fr)_150px]';
const cell = 'min-w-0 truncate px-2.5 py-2';
const hideLocation = '@max-[1120px]:hidden';
const hidePriority = '@max-[620px]:hidden';
const hideAssignee = '@max-[540px]:hidden';
const hideDue = '@max-[420px]:hidden';

export function IssuesTable() {
  const row = 'grid grid-cols-(--cols) items-center border-b border-line last:border-b-0';
  return (
    <div role="table" aria-label="Issues" className={cn('min-w-0 overflow-hidden rounded-md border border-line text-xs', cols)}>
      <div role="row" className={cn(row, 'bg-surface-200 font-semibold text-ink-2')}>
        <span role="columnheader" className={cell}>Ref</span>
        <span role="columnheader" className={cell}>Issue</span>
        <span role="columnheader" className={cn(cell, hideLocation)}>Location</span>
        <span role="columnheader" className={cn(cell, hidePriority)}>Priority</span>
        <span role="columnheader" className={cell}>Status</span>
        <span role="columnheader" className={cn(cell, hideAssignee)}>Assignee</span>
        <span role="columnheader" className={cn(cell, hideDue)}>Due</span>
      </div>
      {issues.map((i) => (
        <div role="row" key={i.ref} className={cn(row, i.selected && 'bg-brand-subtle')}>
          <span role="cell" className={cn(cell, 'font-mono')}>{i.ref}</span>
          <span role="cell" className={cn(cell, 'leading-snug font-semibold whitespace-normal')}>{i.title}</span>
          <span role="cell" className={cn(cell, hideLocation)}>{i.location}</span>
          <span role="cell" className={cn(cell, hidePriority)}><Priority>{i.priority}</Priority></span>
          <span role="cell" className={cell}><StatusLabel tone={i.tone}>{i.status}</StatusLabel></span>
          <span role="cell" className={cn(cell, hideAssignee)}><Assignee compact initials={i.initials} name={i.assignee} unassigned={i.unassigned} /></span>
          <span role="cell" className={cn(cell, hideDue)}>{i.due}</span>
        </div>
      ))}
    </div>
  );
}

function Fields({ items, className }: { items: Array<{ label: string; value: ReactNode; wide?: boolean }>; className?: string }) {
  return (
    <dl className={cn('grid grid-cols-2 gap-x-3 gap-y-2.5', className)}>
      {items.map((f) => (
        <div key={f.label} className={cn(f.wide && 'col-span-2')}>
          <dt className="text-[0.6875rem] font-medium text-ink-2">{f.label}</dt>
          <dd className="mt-0.5 text-[0.8125rem]">{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function DefectSummary() {
  return (
    <div className="flex flex-col gap-2.5 rounded-lg border border-line p-3.5">
      <p className="font-mono text-xs text-ink-2">SR-1842</p>
      <p className="text-[0.9375rem] leading-tight font-semibold">Fire door does not close fully</p>
      <StatusLabel className="self-start">Awaiting verification</StatusLabel>
      <Fields
        className="@max-[1060px]:@min-[761px]:grid-cols-4"
        items={[
          { label: 'Site', value: 'Riverside Quarter' },
          { label: 'Location', value: 'Block C, Level 04' },
          { label: 'Priority', value: 'High' },
          { label: 'Due date', value: '21 September' },
          { label: 'Assignee', value: <Assignee initials="ND" name="Northline Doors" />, wide: true },
          { label: 'Last update', value: 'Repair evidence submitted', wide: true }
        ]}
      />
    </div>
  );
}

/** `compact` drops the defect summary panel, for use beside a photograph. */
export function PortfolioOverview({ compact }: { compact?: boolean }) {
  return (
    <ProductFrame label="Representative SiteResolve portfolio overview shown with demonstration data" className="rounded-2xl border-night-line shadow-hero max-md:rounded-xl">
      <AppShell
        title="Portfolio overview"
        nav={[{ icon: 'grid', label: 'Portfolio overview', active: true }, { icon: 'user', label: 'Assigned to me' }]}
        tools={<><Tool icon="building" trailing="chev">All sites</Tool><Tool icon="filter">Filter</Tool><Tool icon="export" primary>Export report</Tool></>}
      >
        <Kpis items={[{ label: 'Open defects', value: '18' }, { label: 'Awaiting verification', value: '6' }, { label: 'Overdue', value: '3', overdue: true }, { label: 'Recently resolved', value: '11' }]} />
        {compact ? <IssuesTable /> : (
          <div className="grid grid-cols-[minmax(0,1fr)_224px] items-start gap-3 @max-[1060px]:grid-cols-1">
            <IssuesTable />
            <DefectSummary />
          </div>
        )}
      </AppShell>
    </ProductFrame>
  );
}

export function IssuesView() {
  return (
    <ProductFrame label="Representative SiteResolve issues view shown with demonstration data">
      <AppShell
        title="Issues"
        nav={[
          { icon: 'grid', label: 'Overview' }, { icon: 'list', label: 'Issues', active: true }, { icon: 'building', label: 'Sites' },
          { icon: 'chart', label: 'Reports' }, { icon: 'users', label: 'People' }, { icon: 'sliders', label: 'Settings' }
        ]}
        tools={<><Tool icon="building" trailing="chev">All sites</Tool><Tool icon="filter">Filter</Tool><Tool icon="plus" primary>Report defect</Tool></>}
      >
        <IssuesTable />
      </AppShell>
    </ProductFrame>
  );
}

export type MockRow = {
  label: string;
  kind: 'text' | 'priority' | 'status' | 'person' | 'done' | 'photos';
  value: string;
  initials?: string;
  add?: boolean;
};

function Thumb({ icon = 'image', add }: { icon?: IconName; add?: boolean }) {
  return (
    <span className={cn('inline-flex size-11 items-center justify-center rounded-sm', add ? 'border border-dashed border-line-strong text-ink-2' : 'bg-surface-300 text-ink-3')}>
      <Icon name={icon} className="size-[18px]" />
    </span>
  );
}

function MockValue({ row }: { row: MockRow }) {
  switch (row.kind) {
    case 'priority': return <span><Priority>{row.value}</Priority></span>;
    case 'status': return <span><StatusLabel>{row.value}</StatusLabel></span>;
    case 'person': return <span><Assignee initials={row.initials ?? ''} name={row.value} /></span>;
    case 'done': return <span className="inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-ok"><Icon name="check" className="size-4" />{row.value}</span>;
    case 'photos':
      return (
        <span className="flex flex-wrap items-center gap-1.5">
          <Thumb /><Thumb />{row.add ? <Thumb icon="plus" add /> : null}
          <span className="ml-1 text-xs text-ink-2">{row.value}</span>
        </span>
      );
    default: return <span className="block min-h-9 rounded-md border border-line-strong bg-surface-300 px-2.5 py-2 text-[0.8125rem] leading-snug">{row.value}</span>;
  }
}

/** A single-task product screen, used for the workflow steps and capability sections. */
export function TaskMock({ title, rows, actions, decision }: { title: string; rows: MockRow[]; actions: Array<{ label: string; variant?: 'primary' | 'secondary' | 'danger' }>; decision?: boolean }) {
  return (
    <figure className="@container m-0 max-w-[760px] overflow-hidden rounded-xl border border-line bg-surface-100 text-left text-sm shadow-raised">
      <figcaption className="sr-only">{title} interface shown with demonstration data</figcaption>
      <div className="flex min-h-12 items-center justify-between gap-3 border-b border-line bg-surface-200 py-2 pr-3 pl-4">
        <span className="font-semibold">{title}</span>
        <DemoTag />
      </div>
      <div className="flex flex-col gap-3 p-4">
        <p className="flex flex-wrap items-baseline gap-2.5 border-b border-line pb-3 font-semibold">
          <span className="font-mono text-xs font-medium text-ink-2">SR-1842</span>
          <span>Fire door does not close fully</span>
        </p>
        {rows.map((row) => (
          <div key={row.label} className="grid grid-cols-[148px_minmax(0,1fr)] items-center gap-3 @max-[380px]:grid-cols-1 @max-[380px]:gap-1.5">
            <span className="text-xs font-semibold text-ink-2">{row.label}</span>
            <MockValue row={row} />
          </div>
        ))}
        {decision ? (
          <div className="grid grid-cols-2 gap-2">
            <span className="flex min-h-11 items-center justify-center gap-2 rounded-md border border-line-strong px-2.5 py-2 text-center text-[0.8125rem] font-semibold text-ok"><Icon name="check" className="size-4" />Verify resolution</span>
            <span className="flex min-h-11 items-center justify-center gap-2 rounded-md border border-line-strong px-2.5 py-2 text-center text-[0.8125rem] font-semibold text-bad"><Icon name="undo" className="size-4" />Return for correction</span>
          </div>
        ) : null}
      </div>
      <div className="flex flex-wrap justify-end gap-2 border-t border-line px-4 py-3">
        {actions.map((a) => <MockButton key={a.label} variant={a.variant}>{a.label}</MockButton>)}
      </div>
    </figure>
  );
}

const history: Array<{ event: string; who: string; when: string; dot: string }> = [
  { event: 'Defect reported', who: 'Site manager', when: '14 Sep, 09:12', dot: 'bg-brand' },
  { event: 'Assigned to Northline Doors', who: 'Site manager', when: '14 Sep, 09:20', dot: 'bg-link' },
  { event: 'Work started', who: 'Northline Doors', when: '17 Sep, 08:05', dot: 'bg-brand' },
  { event: 'Repair evidence added', who: 'Northline Doors', when: '19 Sep, 15:40', dot: 'bg-brand' },
  { event: 'Submitted for verification', who: 'Northline Doors', when: '19 Sep, 15:42', dot: 'bg-brand' },
  { event: 'Resolution verified', who: 'Site manager', when: '20 Sep, 10:18', dot: 'bg-ok' },
  { event: 'Issue closed', who: 'Site manager', when: '20 Sep, 10:19', dot: 'border-2 border-ink-2 bg-surface-100' }
];

export function IssueRecord() {
  return (
    <ProductFrame label="Representative issue record shown with demonstration data" name={<span className="font-mono">SR-1842</span>}>
      <div className="grid grid-cols-[minmax(0,5fr)_minmax(0,6fr)] @max-[640px]:grid-cols-1">
        <div className="flex flex-col gap-4 border-r border-line p-5 @max-[640px]:border-r-0 @max-[640px]:border-b">
          <p className="text-[1.0625rem] leading-tight font-semibold">Fire door does not close fully</p>
          <div className="flex items-center gap-3 rounded-lg bg-surface-200 p-3">
            <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-surface-300 text-ink-2"><Icon name="check" className="size-[18px]" /></span>
            <span>
              <span className="block text-sm font-semibold">Closed</span>
              <span className="block text-xs text-ink-2">Resolution verified by the site manager</span>
            </span>
          </div>
          <Fields items={[{ label: 'Site', value: 'Riverside Quarter' }, { label: 'Location', value: 'Block C, Level 04' }, { label: 'Priority', value: 'High' }, { label: 'Assignee', value: 'Northline Doors' }]} />
          <div className="flex flex-col gap-2">
            {[['fire-door-c04-reported.jpg', 'Added by the site manager'], ['fire-door-c04-repaired.jpg', 'Added by Northline Doors']].map(([file, by]) => (
              <div key={file} className="flex min-w-0 items-center gap-2.5 rounded-md border border-line p-2">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-sm bg-surface-300 text-ink-3"><Icon name="image" className="size-[18px]" /></span>
                <span className="flex min-w-0 flex-col">
                  <span className="truncate text-[0.8125rem]">{file}</span>
                  <span className="text-xs text-ink-2">{by}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
        <ol aria-label="Issue history" className="flex flex-col p-5">
          {history.map((h) => (
            <li key={h.event} className="relative grid grid-cols-[20px_minmax(0,1fr)] gap-x-2.5 pb-4 last:pb-0 before:absolute before:top-3.5 before:-bottom-0.5 before:left-1 before:w-px before:bg-line last:before:hidden">
              <span className={cn('row-span-2 mt-1.5 size-[9px] rounded-full', h.dot)} />
              <span className="text-sm leading-normal font-semibold">{h.event}</span>
              <span className="text-xs text-ink-2">{h.who}, {h.when}</span>
            </li>
          ))}
        </ol>
      </div>
    </ProductFrame>
  );
}

export function PhoneMock({ className = 'mx-auto w-[300px]' }: { className?: string }) {
  const field = 'flex min-h-9 items-center rounded-md border border-line-strong bg-surface-300 px-2.5 py-2';
  return (
    <figure className={cn('m-0 max-w-full rounded-[36px] border border-line-strong bg-surface-200 p-2.5 shadow-overlay', className)}>
      <figcaption className="sr-only">Reporting a defect on a phone, shown with demonstration data</figcaption>
      <div className="overflow-hidden rounded-[28px] border border-line bg-surface-100 text-[0.8125rem]">
        <p className="flex items-center gap-2 bg-warn-subtle px-4 py-3 text-xs font-semibold text-warn"><Icon name="offline" className="size-4" />You are offline.</p>
        <div className="flex flex-col gap-3 p-4">
          <p className="text-[1.0625rem] font-semibold">Report a defect</p>
          <div className="flex flex-col gap-1.5"><span className="text-[0.6875rem] font-semibold text-ink-2">Add photographs</span><span className="flex gap-1.5"><Thumb /><Thumb icon="camera" add /></span></div>
          <div className="flex flex-col gap-1.5"><span className="text-[0.6875rem] font-semibold text-ink-2">Select location</span><span className={field}>Riverside Quarter, Block C, Level 04</span></div>
          <div className="flex flex-col gap-1.5"><span className="text-[0.6875rem] font-semibold text-ink-2">Set priority</span><span className={field}><Priority>High</Priority></span></div>
          <span className="pointer-events-none inline-flex min-h-11 w-full items-center justify-center rounded-md bg-brand text-[0.9375rem] font-semibold text-white">Save report</span>
          <StatusLabel tone="closed" className="self-center">Saved on this device</StatusLabel>
        </div>
      </div>
    </figure>
  );
}

function Bars({ title, rows }: { title: string; rows: Array<[string, string]> }) {
  return (
    <div className="flex flex-col gap-2.5 rounded-md border border-line p-3">
      <p className="text-xs font-semibold text-ink-2">{title}</p>
      <ul className="flex flex-col gap-2">
        {rows.map(([label, width]) => (
          <li key={label} className="grid grid-cols-[128px_minmax(0,1fr)] items-center gap-2.5 text-xs">
            <span className="truncate">{label}</span>
            <span className="h-2 overflow-hidden rounded-full bg-surface-300"><span className="block h-full rounded-full bg-line-strong" style={{ width }} /></span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function OversightDashboard() {
  return (
    <ProductFrame label="Representative oversight dashboard shown with demonstration data" name="Portfolio overview">
      <div className="flex flex-col gap-3 p-4">
        <Kpis columns={5} items={[{ label: 'Open', value: '18' }, { label: 'Overdue', value: '3', overdue: true }, { label: 'Due this week', value: '5' }, { label: 'Awaiting verification', value: '6' }, { label: 'Closed this month', value: '14' }]} />
        <div className="grid grid-cols-2 gap-2 @max-[640px]:grid-cols-1">
          <Bars title="By site" rows={[['Riverside Quarter', '90%'], ['Canal Street Offices', '55%'], ['Northgate Retail Park', '30%']]} />
          <Bars title="By contractor" rows={[['Northline Doors', '70%'], ['Site team', '55%'], ['Unassigned', '20%']]} />
          <Bars title="By category" rows={[['Doors and ironmongery', '70%'], ['Finishes', '55%'], ['Mechanical', '40%']]} />
          <div className="flex flex-col gap-2.5 rounded-md border border-line p-3">
            <p className="text-xs font-semibold text-ink-2">Average resolution time</p>
            <span className="block h-7 w-3/5 rounded-[6px] bg-[repeating-linear-gradient(-45deg,var(--color-surface-300)_0_6px,var(--color-surface-200)_6px_12px)]" />
            <p className="text-xs font-medium text-ink-2">Calculated from verified issues</p>
          </div>
        </div>
      </div>
    </ProductFrame>
  );
}
