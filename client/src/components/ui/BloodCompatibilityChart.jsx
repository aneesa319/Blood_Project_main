import { Check, X } from 'lucide-react';

const bloodTypes = ['O-', 'O+', 'B-', 'B+', 'A-', 'A+', 'AB-', 'AB+'];

const compatibility = {
  'O-':  ['O-', 'O+', 'B-', 'B+', 'A-', 'A+', 'AB-', 'AB+'],
  'O+':  ['O+', 'B+', 'A+', 'AB+'],
  'B-':  ['B-', 'B+', 'AB-', 'AB+'],
  'B+':  ['B+', 'AB+'],
  'A-':  ['A-', 'A+', 'AB-', 'AB+'],
  'A+':  ['A+', 'AB+'],
  'AB-': ['AB-', 'AB+'],
  'AB+': ['AB+'],
};

export default function BloodCompatibilityChart() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className="p-2 border border-gray-300 dark:border-gray-600 bg-primary-600 text-white font-heading text-xs">
              Donor \ Recipient
            </th>
            {bloodTypes.map((bt) => (
              <th
                key={bt}
                className="p-2 border border-gray-300 dark:border-gray-600 bg-primary-600 text-white font-heading text-xs"
              >
                {bt}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bloodTypes.map((donor) => (
            <tr key={donor}>
              <td className="p-2 border border-gray-300 dark:border-gray-600 font-bold bg-primary-50 dark:bg-gray-700 text-center text-xs">
                {donor}
              </td>
              {bloodTypes.map((recipient) => {
                const canDonate = compatibility[donor]?.includes(recipient);
                return (
                  <td
                    key={recipient}
                    className={`p-2 border border-gray-300 dark:border-gray-600 text-center ${
                      canDonate
                        ? 'bg-green-50 dark:bg-green-900/30'
                        : 'bg-red-50 dark:bg-red-900/20'
                    }`}
                  >
                    {canDonate ? (
                      <Check className="w-4 h-4 text-green-600 mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-red-400 mx-auto" />
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
