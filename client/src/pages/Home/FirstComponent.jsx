import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Heart, ClipboardList } from "lucide-react";

// Blood drop component with smooth falling animation
const BloodDrop = ({ delay, left, duration, size }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: `${left}%`, top: "-60px" }}
    initial={{ y: -60, opacity: 0, scale: 0.8 }}
    animate={{
      y: ["0vh", "110vh"],
      opacity: [0, 1, 1, 0],
      scale: [0.8, 1, 1, 0.9],
    }}
    transition={{
      duration: duration,
      delay: delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <svg
      width={size}
      height={size * 1.4}
      viewBox="0 0 30 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id={`bloodGradient-${left}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#dc2626" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#b91c1c" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0.7" />
        </linearGradient>
        <filter
          id={`glow-${left}`}
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="M15 3C15 3 3 17 3 26C3 33.732 8.26801 40 15 40C21.732 40 27 33.732 27 26C27 17 15 3 15 3Z"
        fill={`url(#bloodGradient-${left})`}
        filter={`url(#glow-${left})`}
      />
      <ellipse cx="10" cy="22" rx="3" ry="4" fill="rgba(255,255,255,0.3)" />
    </svg>
  </motion.div>
);

function FirstComponent() {
  const navigate = useNavigate();
  const fullText = "Your Blood Donation Matters. Give Today!";
  const [displayText, setDisplayText] = useState("");

  // Generate random blood drops
  const bloodDrops = [
    { delay: 0, left: 10, duration: 8, size: 25 },
    { delay: 1.5, left: 25, duration: 10, size: 20 },
    { delay: 0.8, left: 40, duration: 9, size: 30 },
    { delay: 2.2, left: 55, duration: 11, size: 22 },
    { delay: 0.5, left: 70, duration: 8.5, size: 28 },
    { delay: 1.8, left: 85, duration: 9.5, size: 24 },
    { delay: 3, left: 15, duration: 10.5, size: 18 },
    { delay: 2.5, left: 60, duration: 7.5, size: 26 },
    { delay: 1, left: 90, duration: 12, size: 20 },
    { delay: 3.5, left: 5, duration: 9, size: 22 },
    { delay: 4, left: 75, duration: 8, size: 24 },
    { delay: 2, left: 35, duration: 11, size: 19 },
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-gradient-to-br from-secondary-700 via-secondary-800 to-secondary-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Transparent red gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-600/10 via-transparent to-red-900/15 pointer-events-none" />

      {/* Animated blood drops */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {bloodDrops.map((drop, index) => (
          <BloodDrop
            key={index}
            delay={drop.delay}
            left={drop.left}
            duration={drop.duration}
            size={drop.size}
          />
        ))}
      </div>

      {/* Subtle pulsing red glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-red-600/10 pointer-events-none"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="text-center max-w-6xl relative z-10">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="uppercase text-sm tracking-wider mb-2 text-primary-200"
        >
          Let's Donate
        </motion.p>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading mb-6 text-white min-h-[3.5rem] md:min-h-[4rem]">
          {displayText}
          <span className="animate-pulse">|</span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="text-xl mb-10 text-gray-200"
        >
          All types of blood are needed to help patients.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.6 }}
          className="flex flex-col md:flex-row justify-center gap-4"
        >
          <button onClick={() => navigate('/donation-process')} className="btn-primary flex items-center justify-center gap-2">
            <Heart className="w-5 h-5" />
            Donation Process
          </button>
          <button onClick={() => navigate('/eligibility')} className="btn-secondary border-2 border-white text-white hover:bg-white hover:text-secondary-700 dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-secondary-700">
            <ClipboardList className="w-5 h-5 mr-2" />
            Eligibility Criteria
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default FirstComponent;
