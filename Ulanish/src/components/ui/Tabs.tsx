import { useId, useState, type ReactNode } from 'react';
export function Tabs({
  items,
  label,
}: {
  items: { title: string; content: ReactNode }[];
  label: string;
}) {
  const [selected, set] = useState(0);
  const id = useId();
  return (
    <div>
      <div className="tabs" role="tablist" aria-label={label}>
        {items.map((item, i) => (
          <button
            id={`${id}-tab-${i}`}
            key={item.title}
            className="px-4 py-3"
            role="tab"
            aria-selected={selected === i}
            aria-controls={`${id}-panel-${i}`}
            tabIndex={selected === i ? 0 : -1}
            onClick={() => set(i)}
            onKeyDown={(e) => {
              if (['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) {
                e.preventDefault();
                const next =
                  e.key === 'Home'
                    ? 0
                    : e.key === 'End'
                      ? items.length - 1
                      : (i + (e.key === 'ArrowRight' ? 1 : -1) + items.length) % items.length;
                set(next);
                document.getElementById(`${id}-tab-${next}`)?.focus();
              }
            }}
          >
            {item.title}
          </button>
        ))}
      </div>
      <div
        className="py-6"
        id={`${id}-panel-${selected}`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${selected}`}
        tabIndex={0}
      >
        {items[selected]?.content}
      </div>
    </div>
  );
}
