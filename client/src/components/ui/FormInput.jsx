import { useState } from 'react';
import { motion } from 'framer-motion';

export default function FormInput({
  label,
  id,
  type = 'text',
  error,
  className = '',
  ...props
}) {
  const [focused, setFocused] = useState(false);

  return (
    <motion.div
      className={className}
      animate={error ? { x: [0, -10, 10, -10, 10, 0] } : {}}
      transition={{ duration: 0.4 }}
    >
      {label && (
        <label
          htmlFor={id}
          className={`block text-sm font-medium mb-1 transition-colors ${
            focused
              ? 'text-primary-600 dark:text-primary-400'
              : 'text-gray-700 dark:text-gray-300'
          }`}
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 transition-all duration-200 dark:bg-gray-700 dark:text-white ${
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500'
        }`}
        {...props}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </motion.div>
  );
}
