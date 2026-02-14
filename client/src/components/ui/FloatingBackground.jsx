import { motion } from 'framer-motion';

const floatingElements = [
  { size: 'w-4 h-4', x: '10%', y: '20%', duration: 8, delay: 0 },
  { size: 'w-6 h-6', x: '80%', y: '15%', duration: 10, delay: 1 },
  { size: 'w-3 h-3', x: '25%', y: '70%', duration: 7, delay: 2 },
  { size: 'w-5 h-5', x: '70%', y: '60%', duration: 9, delay: 0.5 },
  { size: 'w-8 h-8', x: '50%', y: '40%', duration: 12, delay: 3 },
  { size: 'w-3 h-3', x: '90%', y: '80%', duration: 6, delay: 1.5 },
  { size: 'w-5 h-5', x: '15%', y: '50%', duration: 11, delay: 2.5 },
  { size: 'w-4 h-4', x: '60%', y: '85%', duration: 8, delay: 4 },
  { size: 'w-6 h-6', x: '35%', y: '30%', duration: 10, delay: 0.8 },
  { size: 'w-3 h-3', x: '45%', y: '90%', duration: 7, delay: 3.5 },
  { size: 'w-10 h-10', x: '5%', y: '85%', duration: 14, delay: 1.2 },
  { size: 'w-4 h-4', x: '75%', y: '35%', duration: 9, delay: 2.8 },
];

export default function FloatingBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {floatingElements.map((el, i) => (
        <motion.div
          key={i}
          className={`absolute ${el.size} rounded-full opacity-[0.08] dark:opacity-[0.06] bg-red-500`}
          style={{ left: el.x, top: el.y }}
          animate={{
            y: [0, -30, 0, 30, 0],
            x: [0, 15, 0, -15, 0],
            scale: [1, 1.2, 1, 0.9, 1],
          }}
          transition={{
            duration: el.duration,
            delay: el.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Large gradient blobs */}
      <motion.div
        className="absolute w-72 h-72 rounded-full bg-red-400/[0.04] dark:bg-red-500/[0.03] blur-3xl"
        style={{ left: '10%', top: '20%' }}
        animate={{ scale: [1, 1.3, 1], x: [0, 40, 0], y: [0, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-red-300/[0.04] dark:bg-red-400/[0.03] blur-3xl"
        style={{ right: '5%', bottom: '10%' }}
        animate={{ scale: [1, 1.2, 1], x: [0, -30, 0], y: [0, 30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-red-500/[0.03] dark:bg-red-600/[0.02] blur-3xl"
        style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
      />
    </div>
  );
}
