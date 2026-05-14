import { cn } from '../../utils/cn';

/**
 * @typedef {Object} MarqueeProps
 * @property {Array<any>}            items                — list to render (component duplicates internally for seamless loop)
 * @property {(item:any, i:number) => React.ReactNode} renderItem  — render function for each item
 * @property {number}                [speed]              — total seconds per loop (default 30)
 * @property {'left'|'right'}        [direction]          — scroll direction (default 'left')
 * @property {number}                [gap]                — pixel gap between items (default 48)
 * @property {boolean}               [pauseOnHover]       — default true
 * @property {boolean}               [fadeEdges]          — left/right gradient masks (default true)
 * @property {'light'|'dark'}        [tone]               — fade-mask tone, default 'light'
 * @property {string}                [className]
 */

/**
 * CSS-driven infinite marquee. The items array is rendered twice so that
 * translating the track by -50% lands exactly on the start of the duplicated
 * half, producing a seamless loop. We use a CSS keyframe animation instead
 * of framer-motion because the latter's `animate={{ x: [...] }}` keyframes
 * combined with `whileHover` were intermittently failing to apply the
 * transform across HMR / route remounts.
 *
 * The keyframes (`marquee-left` / `marquee-right`) live in src/index.css.
 */
export function Marquee({
  items,
  renderItem,
  speed = 30,
  direction = 'left',
  gap = 48,
  pauseOnHover = true,
  fadeEdges = true,
  tone = 'light',
  className,
}) {
  const doubled = [...items, ...items];

  const animationName = direction === 'left' ? 'marquee-left' : 'marquee-right';
  const fadeColor     = tone === 'dark' ? '#09090F' : '#F5F7FB';

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <div
        className={cn(
          'flex w-max',
          // hover:[animation-play-state:paused] uses Tailwind v4's arbitrary
          // property syntax to pause the CSS animation when hovered.
          pauseOnHover && 'hover:[animation-play-state:paused]'
        )}
        style={{
          gap: `${gap}px`,
          animation: `${animationName} ${speed}s linear infinite`,
          willChange: 'transform',
        }}
      >
        {doubled.map((item, i) => (
          <div key={i} className="shrink-0">
            {renderItem(item, i)}
          </div>
        ))}
      </div>

      {fadeEdges && (
        <>
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-24"
            style={{
              background: `linear-gradient(to right, ${fadeColor}, transparent)`,
            }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-24"
            style={{
              background: `linear-gradient(to left, ${fadeColor}, transparent)`,
            }}
            aria-hidden="true"
          />
        </>
      )}
    </div>
  );
}
