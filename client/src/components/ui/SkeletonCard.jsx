export default function SkeletonCard({ className = '' }) {
  return (
    <div className={`animate-pulse bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 ${className}`}>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-2"></div>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
    </div>
  );
}
