'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { Icon } from '../ui';

type Toast = { title: string; body?: string };
const ToastContext = createContext<(toast: Toast) => void>(() => {});

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const show = useCallback((next: Toast) => {
    setToast(next);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 6000);
  }, []);
  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div role="status" aria-live="polite">
        {toast ? (
          <div className="fixed top-4 right-4 z-[100] flex min-h-13 w-[min(380px,calc(100%-32px))] animate-pop items-center gap-3 rounded-md border border-line bg-surface-100 py-2 pr-2 pl-4 shadow-overlay">
            <span className="size-2 shrink-0 rounded-full bg-ok" />
            <div className="min-w-0 flex-1">
              <p className="text-[0.9375rem] font-semibold">{toast.title}</p>
              {toast.body ? <p className="text-sm text-ink-2">{toast.body}</p> : null}
            </div>
            <button type="button" onClick={() => setToast(null)} aria-label="Dismiss message" className="inline-flex size-11 items-center justify-center rounded-md hover:bg-surface-200">
              <Icon name="close" />
            </button>
          </div>
        ) : null}
      </div>
    </ToastContext.Provider>
  );
}
