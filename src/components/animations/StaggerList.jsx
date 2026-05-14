import { Children } from 'react';
import { motion } from 'framer-motion';

/**
 * @typedef {Object} StaggerListProps
 * @property {React.ReactNode} children
 * @property {number} [staggerDelay] — seconds between child animations (default 0.08)
 * @property {number} [duration]     — per-child duration (default 0.5)
 * @property {number} [distance]     — pixels of upward slide per child (default 20)
 * @property {string} [as]           — container tag, default 'div'
 * @property {string} [itemAs]       — child wrapper tag, default 'div'
 * @property {string} [className]
 * @property {string} [itemClassName]
 * @property {number} [amount]       — viewport visibility threshold (0–1), default 0.15
 */

export function StaggerList({
  children,
  staggerDelay = 0.08,
  duration = 0.5,
  distance = 20,
  as = 'div',
  itemAs = 'div',
  className,
  itemClassName,
  amount = 0.15,
  ...rest
}) {
  const Container = motion[as] ?? motion.div;
  const Item      = motion[itemAs] ?? motion.div;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: staggerDelay, delayChildren: 0 },
    },
  };

  const itemVariants = {
    hidden:  { opacity: 0, y: distance },
    visible: { opacity: 1, y: 0, transition: { duration, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <Container
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      {...rest}
    >
      {Children.map(children, (child, i) => (
        <Item key={i} variants={itemVariants} className={itemClassName}>
          {child}
        </Item>
      ))}
    </Container>
  );
}
