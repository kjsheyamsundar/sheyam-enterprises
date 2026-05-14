import { useEffect, useRef } from 'react';
import { useAnimation, useInView } from 'framer-motion';

/**
 * Scroll-triggered animation hook.
 *
 * @param {Object}  [options]
 * @param {number}  [options.amount]   — viewport visibility threshold (0–1), default 0.2
 * @param {boolean} [options.once]     — only trigger once, default true
 * @param {string}  [options.margin]   — root-margin string, e.g. "-80px 0px"
 *
 * @returns {{
 *   ref: React.RefObject<HTMLElement>,
 *   isVisible: boolean,
 *   controls: import('framer-motion').AnimationControls
 * }}
 */
export function useScrollAnimation({
  amount = 0.2,
  once = true,
  margin,
} = {}) {
  const ref = useRef(null);
  const isVisible = useInView(ref, { amount, once, margin });
  const controls = useAnimation();

  useEffect(() => {
    if (isVisible) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [isVisible, once, controls]);

  return { ref, isVisible, controls };
}
