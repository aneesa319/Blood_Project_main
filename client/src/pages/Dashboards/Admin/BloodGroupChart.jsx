import AnimatedSection from '../../../components/ui/AnimatedSection';

const bgColors = {
  'A+': 'bg-red-500', 'A-': 'bg-red-400',
  'B+': 'bg-blue-500', 'B-': 'bg-blue-400',
  'AB+': 'bg-purple-500', 'AB-': 'bg-purple-400',
  'O+': 'bg-green-500', 'O-': 'bg-green-400',
};

export default function BloodGroupChart({ distribution = [] }) {
  const max = Math.max(...distribution.map(d => d.count), 1);

  return (
    <AnimatedSection animation="slideUp">
      <div className="card">
        <h3 className="text-lg font-bold font-heading text-gray-800 dark:text-white mb-6">
          Blood Group Distribution
        </h3>
        <div className="space-y-3">
          {distribution.map((item) => (
            <div key={item._id} className="flex items-center gap-3">
              <span className="w-10 text-sm font-semibold text-gray-700 dark:text-gray-300">{item._id}</span>
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-6 overflow-hidden">
                <div
                  className={`h-full rounded-full ${bgColors[item._id] || 'bg-gray-500'} transition-all duration-1000 ease-out flex items-center justify-end pr-2`}
                  style={{ width: `${(item.count / max) * 100}%` }}
                >
                  <span className="text-white text-xs font-bold">{item.count}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
