import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useMotionValue, useTransform } from 'framer-motion';

/**
 * @typedef {Object} CounterProps
 * @property {number} value                 — target number to count to
 * @property {string} [suffix]              — appended after the number, e.g. "+"
 * @property {string} [prefix]              — prepended before the number
 * @property {number} [duration]            — seconds for the count animation (default 2)
 * @property {number} [decimals]            — fraction digits in the display (default 0)
 * @property {string} [className]
 * @property {string} [as]                  — html tag, default 'span'
 */

export function Counter({
  value,
  suffix = '',
  prefix = '',
  duration = 2,
  decimals = 0,
  className,
  as: Tag = 'span',
}) {
  const ref       = useRef(null);
  const isInView  = useInView(ref, { once: true, amount: 0.4 });
  const motionValue = useMotionValue(0);
  const rounded     = useTransform(motionValue, (n) => Number(n).toFixed(decimals));
  const [display, setDisplay] = useState((0).toFixed(decimals));

  useEffect(() => {
    const unsub = rounded.on('change', (v) => setDisplay(v));
    return unsub;
  }, [rounded]);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(motionValue, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [isInView, value, duration, motionValue]);

  return (
    <Tag ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </Tag>
  );
}
