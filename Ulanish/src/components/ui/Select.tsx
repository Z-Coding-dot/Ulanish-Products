import { useState, useRef, useId, useEffect, type ReactNode } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';
export interface Option {
  value: string;
  label: string;
  code?: string;
}
export function Listbox({
  label,
  value,
  options,
  onChange,
  compact = false,
  mobileSheet = false,
  icon,
}: {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  compact?: boolean;
  mobileSheet?: boolean;
  icon?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const items = useRef<(HTMLLIElement | null)[]>([]);
  const id = useId();
  const selected = options.find((o) => o.value === value) ?? options[0];
  const close = () => {
    setOpen(false);
    trigger.current?.focus();
  };
  useEffect(() => {
    if (open) items.current[active]?.focus();
  }, [open, active]);
  useEffect(() => {
    if (!open) return;
    const outside = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, [open]);
  return (
    <div
      ref={root}
      className="listbox"
      onKeyDown={(e) => {
        if (!open) return;
        if (e.key === 'Escape') {
          e.preventDefault();
          e.stopPropagation();
          close();
        }
        if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) {
          e.preventDefault();
          setActive((a) =>
            e.key === 'Home'
              ? 0
              : e.key === 'End'
                ? options.length - 1
                : (a + (e.key === 'ArrowDown' ? 1 : -1) + options.length) % options.length,
          );
        }
        if (e.key === 'Tab') setOpen(false);
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onChange(options[active].value);
          close();
        }
      }}
    >
      {!compact && (
        <label id={`${id}-label`} className="field-label">
          {label}
        </label>
      )}
      <button
        ref={trigger}
        type="button"
        className={cn(
          'listbox-trigger',
          compact ? 'min-h-11 gap-2 rounded-lg px-2 py-2 text-sm' : 'field text-sm',
        )}
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-options`}
        onClick={() => {
          setActive(
            Math.max(
              0,
              options.findIndex((o) => o.value === value),
            ),
          );
          setOpen((v) => !v);
        }}
        onKeyDown={(e) => {
          if (!open && ['ArrowDown', 'ArrowUp'].includes(e.key)) {
            e.preventDefault();
            setActive(
              Math.max(
                0,
                options.findIndex((o) => o.value === value),
              ),
            );
            setOpen(true);
            e.stopPropagation();
          }
        }}
      >
        {icon}
        <span className="listbox-value">{selected?.label}</span>
        <ChevronDown size={16} aria-hidden="true" />
      </button>
      {open && (
        <ul
          id={`${id}-options`}
          role="listbox"
          aria-label={label}
          className={cn('listbox-panel', mobileSheet && 'mobile-sheet')}
        >
          {options.map((option, i) => (
            <li
              key={option.value}
              ref={(el) => {
                items.current[i] = el;
              }}
              role="option"
              aria-selected={value === option.value}
              tabIndex={active === i ? 0 : -1}
              data-active={active === i}
              className="listbox-option"
              onMouseMove={() => setActive(i)}
              onClick={() => {
                onChange(option.value);
                close();
              }}
            >
              <span>{option.label}</span>
              {option.code && <small dir="ltr">{option.code}</small>}
              {option.value === value && <Check size={16} aria-hidden="true" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export const Select = Listbox;
