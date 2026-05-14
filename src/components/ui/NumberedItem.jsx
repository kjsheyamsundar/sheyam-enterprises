import { cn } from '../../utils/cn';

/**
 * @typedef {Object} NumberedItemProps
 * @property {string}            number       — e.g. "01"
 * @property {string}            label        — e.g. "SERVICE"
 * @property {string}            title
 * @property {string}            [description]
 * @property {React.ReactNode}   [icon]       — optional icon slot to the right of title
 * @property {boolean}           [alt]        — true → alternating-row background tint
 * @property {'light'|'dark'}    [tone]       — palette, default 'light'
 * @property {string}            [className]
 * @property {() => void}        [onClick]
 */

const TONE_CLASSES = {
  light: {
    bg:        'bg-white',
    bgAlt:     'bg-off',
    borderY:   'border-y-off',
    title:     'text-navy',
    desc:      'text-slate',
    label:     'text-muted',
    numSlash:  'text-muted',
    iconIdle:  'text-navy',
  },
  dark: {
    bg:        'bg-[#0F0F1A]',
    bgAlt:     'bg-[#15152A]',
    borderY:   'border-y-white/10',
    title:     'text-white',
    desc:      'text-white/65',
    label:     'text-white/45',
    numSlash:  'text-white/35',
    iconIdle:  'text-white/85',
  },
};

/**
 * Aerocoat-style "01 / SERVICE" row.
 * Left red bar accent, big red number + small label, right column with title + description.
 * Pass tone="dark" to render on a dark section.
 */
export function NumberedItem({
  number,
  label,
  title,
  description,
  icon,
  alt = false,
  tone = 'light',
  className,
  onClick,
}) {
  const t = TONE_CLASSES[tone] ?? TONE_CLASSES.light;

  return (
    <div
      onClick={onClick}
      className={cn(
        'group relative flex items-stretch gap-6 border-l-[6px] border-l-transparent border-y',
        t.borderY,
        'px-6 py-7 md:gap-10 md:px-8',
        'transition-all duration-300 ease-out',
        'hover:border-l-red hover:translate-x-1',
        alt ? t.bgAlt : t.bg,
        onClick && 'cursor-pointer',
        'rounded-none',
        className
      )}
    >
      {/* Left number block */}
      <div className="flex w-24 shrink-0 flex-col justify-center md:w-32">
        <span className="font-display text-4xl font-black leading-none text-red md:text-5xl">
          {number}
          <span className={cn(t.numSlash)}> /</span>
        </span>
        <span className={cn('mt-2 font-display text-[11px] font-bold uppercase tracking-[0.25em]', t.label)}>
          {label}
        </span>
      </div>

      {/* Right content */}
      <div className="flex flex-1 flex-col justify-center">
        <div className="flex items-center justify-between gap-4">
          <h3 className={cn('font-display text-2xl font-black uppercase tracking-tight md:text-3xl', t.title)}>
            {title}
          </h3>
          {icon && (
            <span
              className={cn('transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:text-red', t.iconIdle)}
              aria-hidden="true"
            >
              {icon}
            </span>
          )}
        </div>
        {description && (
          <p className={cn('mt-2 max-w-2xl font-body text-sm leading-relaxed md:text-base', t.desc)}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
