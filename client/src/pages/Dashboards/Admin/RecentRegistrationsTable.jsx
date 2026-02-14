import AnimatedSection from '../../../components/ui/AnimatedSection';

export default function RecentRegistrationsTable({ users = [] }) {
  return (
    <AnimatedSection animation="slideUp">
      <div className="card overflow-x-auto">
        <h3 className="text-lg font-bold font-heading text-gray-800 dark:text-white mb-4">
          Recent Registrations
        </h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-2 px-3 text-gray-600 dark:text-gray-400">Name</th>
              <th className="text-left py-2 px-3 text-gray-600 dark:text-gray-400">Email</th>
              <th className="text-left py-2 px-3 text-gray-600 dark:text-gray-400">Role</th>
              <th className="text-left py-2 px-3 text-gray-600 dark:text-gray-400">Blood</th>
              <th className="text-left py-2 px-3 text-gray-600 dark:text-gray-400">City</th>
              <th className="text-left py-2 px-3 text-gray-600 dark:text-gray-400">Date</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user._id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                <td className="py-2 px-3 text-gray-800 dark:text-gray-200">{user.name}</td>
                <td className="py-2 px-3 text-gray-600 dark:text-gray-400 text-xs">{user.email}</td>
                <td className="py-2 px-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    user.role === 'donor' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                    user.role === 'patient' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                    'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="py-2 px-3 font-semibold text-primary-600">{user.bloodGroup}</td>
                <td className="py-2 px-3 text-gray-600 dark:text-gray-400">{user.city}</td>
                <td className="py-2 px-3 text-gray-500 dark:text-gray-400 text-xs">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AnimatedSection>
  );
}
