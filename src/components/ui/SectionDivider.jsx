import { cn } from '../../utils/cn';

/**
 * @typedef {Object} SectionDividerProps
 * @property {string}            [text]      — optional centred label, e.g. "BRANDS"
 * @property {'light'|'dark'}    [tone]      — line/text tone, default 'light'
 * @property {string}            [className]
 */

/**
 * Thin horizontal rule with optional centred uppercase label flanked by dashes.
 * Renders e.g.  ─────────  — BRANDS —  ─────────
 */
export function SectionDivider({ text, tone = 'light', className }) {
  const lineColor   = tone === 'dark' ? 'bg-[#1E1E38]' : 'bg-off';
  const textColor   = tone === 'dark' ? 'text-off'     : 'text-ink';
  const dashColor   = tone === 'dark' ? 'text-muted'   : 'text-muted';

  if (!text) {
    return (
      <hr
        className={cn(
          'h-px w-full border-0',
          lineColor,
          'rounded-none',
          className
        )}
      />
    );
  }

  return (
    <div
      className={cn('flex w-full items-center gap-4', className)}
      role="separator"
      aria-label={text}
    >
      <span className={cn('h-px flex-1', lineColor)} aria-hidden="true" />
      <span className="flex items-center gap-2">
        <span className={cn('font-display font-bold', dashColor)} aria-hidden="true">—</span>
        <span
          className={cn(
            'font-display text-xs font-bold uppercase tracking-[0.3em]',
            textColor
          )}
        >
          {text}
        </span>
        <span className={cn('font-display font-bold', dashColor)} aria-hidden="true">—</span>
      </span>
      <span className={cn('h-px flex-1', lineColor)} aria-hidden="true" />
    </div>
  );
}
