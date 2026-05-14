import { cn } from '../../utils/cn';

/**
 * @typedef {Object} CardProps
 * @property {React.ReactNode} children
 * @property {'red'|'navy'|'white'} [hoverBorder]   — hover border tint, default 'red'
 * @property {'red'|'navy'|'white'|null} [topAccent] — coloured top border, default null
 * @property {'dark'|'light'}            [tone]      — base palette, default 'dark'
 * @property {string}                    [className]
 * @property {() => void}                [onClick]
 */

const tones = {
  dark:  'bg-[#111122] border-[#1E1E38] text-off',
  light: 'bg-white   border-off       text-ink',
};

const hoverBorders = {
  red:   'hover:border-red',
  navy:  'hover:border-navy',
  white: 'hover:border-off',
};

const topAccents = {
  red:   'before:bg-red',
  navy:  'before:bg-navy',
  white: 'before:bg-off',
};

export function Card({
  children,
  hoverBorder = 'red',
  topAccent = null,
  tone = 'dark',
  className,
  onClick,
  ...rest
}) {
  const accentClass = topAccent
    ? cn(
        'relative before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:content-[""]',
        topAccents[topAccent]
      )
    : '';

  return (
    <div
      onClick={onClick}
      className={cn(
        'group relative border transition-all duration-300 ease-out',
        'rounded-none',
        tones[tone],
        hoverBorders[hoverBorder],
        'hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-22px_rgba(9,9,15,0.55)]',
        accentClass,
        onClick && 'cursor-pointer',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
