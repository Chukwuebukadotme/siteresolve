'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

/** Native modal dialog: traps focus, closes on Escape and on a backdrop click, restores focus on close. */
export function Dialog({ open, onClose, labelledBy, className, children }: { open: boolean; onClose: () => void; labelledBy: string; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      // showModal focuses the first button; move focus to the field marked data-autofocus instead.
      dialog.querySelector<HTMLElement>('[data-autofocus]')?.focus();
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      onClose={onClose}
      onClick={(e) => {
        const dialog = ref.current;
        if (!dialog || e.target !== dialog) return;
        const r = dialog.getBoundingClientRect();
        const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
        if (!inside) dialog.close();
      }}
      className={cn('border-0 bg-surface-100 p-0 text-ink backdrop:animate-fade', className)}
    >
      {open ? children : null}
    </dialog>
  );
}
