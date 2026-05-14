import { motion } from 'framer-motion';

/**
 * @typedef {Object} FadeUpProps
 * @property {React.ReactNode} children
 * @property {number} [delay]      — seconds before animation starts (default 0)
 * @property {number} [duration]   — seconds the animation runs (default 0.6)
 * @property {number} [distance]   — pixels of upward slide (default 28)
 * @property {string} [as]         — html tag, default 'div'
 * @property {string} [className]
 * @property {number} [amount]     — viewport visibility threshold (0–1), default 0.2
 */

export function FadeUp({
  children,
  delay = 0,
  duration = 0.6,
  distance = 28,
  as = 'div',
  className,
  amount = 0.2,
  ...rest
}) {
  const MotionTag = motion[as] ?? motion.div;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
