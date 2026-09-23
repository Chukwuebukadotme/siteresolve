'use client';

import { useEffect, useState } from 'react';

/** In-page index for the Solutions page. Marks the section currently in view. */
export function SolutionsIndex({ items }: { items: ReadonlyArray<{ id: string; name: string }> }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: '-30% 0px -60% 0px' }
    );
    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="Solutions on this page" className="lg:sticky lg:top-26">
      <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-0 lg:border-l lg:border-line">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? 'true' : undefined}
              className="flex min-h-10 items-center rounded-full border border-line-strong px-3.5 text-sm font-semibold text-ink no-underline hover:bg-surface-200 lg:-ml-px lg:min-h-11 lg:rounded-none lg:border-0 lg:border-l-2 lg:border-transparent lg:px-4 lg:text-[0.9375rem] lg:text-ink-2 lg:hover:border-brand lg:hover:bg-transparent lg:hover:text-link aria-[current=true]:lg:border-brand aria-[current=true]:lg:text-link"
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
