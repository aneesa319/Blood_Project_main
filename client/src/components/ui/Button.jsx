import { Loader2 } from 'lucide-react';

const variantClasses = {
  primary: 'bg-primary-600 hover:bg-primary-700 text-white shadow-md',
  secondary: 'bg-white hover:bg-gray-50 text-primary-600 border border-primary-600 dark:bg-gray-800 dark:text-primary-400 dark:border-primary-400 dark:hover:bg-gray-700',
  outline: 'border-2 border-white text-white hover:bg-white hover:text-primary-700',
  danger: 'bg-red-600 hover:bg-red-700 text-white shadow-md',
  ghost: 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700',
};

export default function Button({
  children,
  variant = 'primary',
  loading = false,
  disabled = false,
  className = '',
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`font-semibold px-6 py-3 rounded-lg transition duration-300 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {loading && <Loader2 className="w-5 h-5 animate-spin" />}
      {children}
    </button>
  );
}
