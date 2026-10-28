import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
export function Accordion({ items }: { items: { title: string; content: string }[] }) {
  const [open, set] = useState<number | null>(null);
  const id = useId();
  return (
    <div>
      {items.map((item, i) => (
        <div key={item.title} className="accordion-item">
          <h3>
            <button
              aria-expanded={open === i}
              aria-controls={`${id}-${i}`}
              onClick={() => set(open === i ? null : i)}
            >
              {item.title}
              <ChevronDown size={18} aria-hidden="true" />
            </button>
          </h3>
          <div id={`${id}-${i}`} hidden={open !== i} className="pb-6 text-muted">
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
}
