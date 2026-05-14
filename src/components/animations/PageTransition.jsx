import { motion } from 'framer-motion';

/**
 * @typedef {Object} PageTransitionProps
 * @property {React.ReactNode} children
 * @property {string} [className]
 */

/** Wrap each page's root element to fade + slide in on mount. */
export function PageTransition({ children, className, ...rest }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
