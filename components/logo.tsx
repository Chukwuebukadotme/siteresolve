/**
 * The SiteResolve symbol: camera viewfinder corners around a verification tick, for the photograph
 * taken on site and the proof that the defect was put right. The corners take the current text colour
 * and the tick takes --color-logo-tick, which is lighter on dark surfaces.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path stroke="currentColor" strokeWidth={3} d="M5 11V7.5A2.5 2.5 0 0 1 7.5 5H11M21 5h3.5A2.5 2.5 0 0 1 27 7.5V11M27 21v3.5a2.5 2.5 0 0 1-2.5 2.5H21M11 27H7.5A2.5 2.5 0 0 1 5 24.5V21" />
      <path className="stroke-logo-tick" strokeWidth={3.2} d="M10.75 16.25 14.5 20l7-7.5" />
    </svg>
  );
}
