import { ArrowRight } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * @typedef {Object} ButtonProps
 * @property {React.ReactNode} children
 * @property {'primary'|'outline'|'ghost'} [variant]   — visual style, default 'primary'
 * @property {'sm'|'md'|'lg'}              [size]      — padding/text scale, default 'md'
 * @property {boolean}                     [withArrow] — append a right-arrow icon
 * @property {'button'|'submit'|'reset'}   [type]      — html button type, default 'button'
 * @property {string}                      [className] — extra Tailwind classes
 * @property {() => void}                  [onClick]
 * @property {boolean}                     [disabled]
 * @property {string}                      [as]        — render as 'a' or 'button', default 'button'
 * @property {string}                      [href]      — used when as='a'
 */

const base =
  'group inline-flex items-center justify-center gap-2 font-display font-bold uppercase tracking-[0.18em] transition-all duration-200 ease-out hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50';

const variants = {
  primary:
    'bg-red text-white shadow-[0_2px_0_rgb(0_0_0/0.06)] hover:bg-red2 hover:shadow-[0_8px_20px_-6px_rgba(204,17,17,0.55)]',
  outline:
    'border border-red bg-transparent text-red hover:bg-red hover:text-white hover:shadow-[0_8px_20px_-6px_rgba(204,17,17,0.45)]',
  ghost:
    'bg-transparent text-ink hover:text-red hover:shadow-[0_6px_16px_-8px_rgba(9,9,15,0.45)]',
};

const sizes = {
  sm: 'h-9  px-4  text-[11px]',
  md: 'h-11 px-6  text-xs',
  lg: 'h-14 px-8  text-sm',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  withArrow = false,
  type = 'button',
  className,
  onClick,
  disabled,
  as = 'button',
  href,
  ...rest
}) {
  const classes = cn(base, variants[variant], sizes[size], 'rounded-none', className);

  const content = (
    <>
      <span>{children}</span>
      {withArrow && (
        <ArrowRight
          size={16}
          strokeWidth={2.5}
          className="transition-transform duration-200 ease-out group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </>
  );

  if (as === 'a') {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      {...rest}
    >
      {content}
    </button>
  );
}
