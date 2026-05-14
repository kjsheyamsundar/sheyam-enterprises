import { cn } from '../../utils/cn';

/**
 * @typedef {Object} SectionLabelProps
 * @property {string} text         — label text (will be uppercased)
 * @property {string} [className]  — additional Tailwind classes for the wrapper
 * @property {'red'|'white'} [tone] — line + text colour, default 'red'
 */

/** Aerocoat-style "— LABEL" row: short red bar + uppercase tracked text. */
export function SectionLabel({ text, className, tone = 'red' }) {
  const lineColor = tone === 'white' ? 'bg-off' : 'bg-red';
  const textColor = tone === 'white' ? 'text-off' : 'text-red';

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <span className={cn('block h-0.5 w-5', lineColor)} aria-hidden="true" />
      <span
        className={cn(
          'font-display text-xs font-bold uppercase tracking-[0.25em]',
          textColor
        )}
      >
        {text}
      </span>
    </div>
  );
}
