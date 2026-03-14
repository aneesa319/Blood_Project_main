import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const variants = {
  fadeIn: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  slideUp: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
  slideInLeft: { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } },
  slideInRight: { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } },
  bounceIn: { hidden: { opacity: 0, scale: 0.3 }, visible: { opacity: 1, scale: 1 } },
  scaleIn: { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } },
  zoomIn: { hidden: { opacity: 0, scale: 0.5 }, visible: { opacity: 1, scale: 1 } },
  fadeUp: { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } },
};

export default function AnimatedSection({
  children,
  animation = 'slideUp',
  delay = 0,
  duration = 0.6,
  className = '',
  once = true,
  triggerInView = true,
}) {
  const [ref, inView] = useInView({ triggerOnce: once, threshold: 0.1 });
  const shouldAnimate = triggerInView ? inView : true;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={shouldAnimate ? 'visible' : 'hidden'}
      variants={variants[animation] || variants.slideUp}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
