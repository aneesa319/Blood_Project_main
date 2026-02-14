export default function DonorCardSkeleton() {
  return (
    <div className="animate-pulse bg-gray-900 dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
      <div className="w-24 h-24 bg-gray-700 rounded-full mx-auto mb-4"></div>
      <div className="h-5 bg-gray-700 rounded w-2/3 mx-auto mb-2"></div>
      <div className="h-3 bg-gray-700 rounded w-1/2 mx-auto mb-2"></div>
      <div className="h-3 bg-gray-700 rounded w-1/3 mx-auto mb-2"></div>
      <div className="h-3 bg-gray-700 rounded w-2/5 mx-auto mb-2"></div>
      <div className="h-3 bg-gray-700 rounded w-1/3 mx-auto mb-4"></div>
      <div className="flex justify-center space-x-4">
        <div className="h-10 bg-gray-700 rounded w-24"></div>
        <div className="h-10 bg-gray-700 rounded w-24"></div>
      </div>
    </div>
  );
}
