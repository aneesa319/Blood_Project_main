import AnimatedSection from '../../../components/ui/AnimatedSection';
import DonorMap from '../../../components/Map/DonorMap';
import { MapPin, Droplets } from 'lucide-react';

export default function DonorMapSection({ donors = [] }) {
  const availableCount = donors.filter(d => d.available).length;
  const unavailableCount = donors.length - availableCount;

  // Blood group breakdown
  const bgCounts = {};
  donors.forEach(d => {
    bgCounts[d.bloodGroup] = (bgCounts[d.bloodGroup] || 0) + 1;
  });

  return (
    <AnimatedSection animation="slideUp">
      <div className="card mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div>
            <h3 className="text-lg font-bold font-heading text-gray-800 dark:text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary-600" />
              All Donor Locations
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {donors.length} donors across Pakistan
            </p>
          </div>

          {/* Quick stats */}
          <div className="flex gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              {availableCount} Available
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-semibold">
              <span className="w-2 h-2 bg-gray-400 rounded-full" />
              {unavailableCount} Unavailable
            </span>
          </div>
        </div>

        {/* Blood group pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(bgCounts).sort((a, b) => b[1] - a[1]).map(([bg, count]) => (
            <span
              key={bg}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-700 dark:text-gray-300"
            >
              <Droplets className="w-3 h-3 text-primary-500" />
              {bg}: {count}
            </span>
          ))}
        </div>

        <DonorMap donors={donors} />
      </div>
    </AnimatedSection>
  );
}
