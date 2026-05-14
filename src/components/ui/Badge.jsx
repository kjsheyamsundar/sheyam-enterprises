import { cn } from '../../utils/cn';

/**
 * @typedef {'compressor'|'generator'|'amc'|'parts'|'hiring'|'neutral'} BadgeVariant
 */

/**
 * @typedef {Object} BadgeProps
 * @property {string}        text
 * @property {BadgeVariant}  [variant]   — default 'neutral'
 * @property {string}        [className]
 */

const variants = {
  compressor: { wrap: 'bg-navy/10 text-navy',         dot: 'bg-navy'  },
  generator:  { wrap: 'bg-red/10  text-red',          dot: 'bg-red'   },
  amc:        { wrap: 'bg-purple-100 text-purple-700',dot: 'bg-purple-600' },
  parts:      { wrap: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-600' },
  hiring:     { wrap: 'bg-amber-100 text-amber-700', dot: 'bg-amber-600' },
  neutral:    { wrap: 'bg-off text-ink', dot: 'bg-ink' },
};

export function Badge({ text, variant = 'neutral', className }) {
  const v = variants[variant] ?? variants.neutral;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1',
        'font-display text-[10px] font-bold uppercase tracking-[0.2em]',
        'rounded-none',
        v.wrap,
        className
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', v.dot)} aria-hidden="true" />
      {text}
    </span>
  );
}
