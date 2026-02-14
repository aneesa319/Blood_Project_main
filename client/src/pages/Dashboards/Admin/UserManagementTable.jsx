import AnimatedSection from '../../../components/ui/AnimatedSection';
import { ChevronLeft, ChevronRight, Search, X, Trash2, Filter, Eye, Pencil, Download } from 'lucide-react';

export default function UserManagementTable({
  users = [],
  currentPage,
  totalPages,
  totalUsers,
  onPageChange,
  onDelete,
  onView,
  onEdit,
  onExport,
  searchQuery,
  setSearchQuery,
  roleFilter,
  setRoleFilter,
  onSearch,
  onClearSearch,
  isSearching,
}) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') onSearch();
  };

  return (
    <AnimatedSection animation="slideUp">
      <div className="card overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div>
            <h3 className="text-lg font-bold font-heading text-gray-800 dark:text-white">
              User Management
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {totalUsers} total users
            </p>
          </div>
          <button
            onClick={onExport}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, city, blood group, phone..."
              className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm focus:ring-2 focus:ring-primary-500 outline-none transition"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {searchQuery && (
              <button
                onClick={onClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex gap-2">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="pl-9 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm focus:ring-2 focus:ring-primary-500 outline-none appearance-none"
              >
                <option value="all">All Roles</option>
                <option value="donor">Donors</option>
                <option value="patient">Patients</option>
                <option value="admin">Admins</option>
              </select>
            </div>

            <button
              onClick={onSearch}
              disabled={isSearching}
              className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition disabled:opacity-50 inline-flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto -mx-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/50">
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-semibold">Name</th>
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-semibold">Email</th>
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-semibold">Role</th>
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-semibold">Blood</th>
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-semibold">City</th>
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-semibold">Phone</th>
                <th className="text-center py-3 px-4 text-gray-600 dark:text-gray-400 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-400">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <img
                          src={`https://api.dicebear.com/8.x/thumbs/svg?seed=${user.name}`}
                          alt=""
                          className="w-8 h-8 rounded-full bg-gray-200"
                        />
                        <span className="font-medium text-gray-800 dark:text-gray-200">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400 text-xs">{user.email}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        user.role === 'donor' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        user.role === 'patient' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                        'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-primary-600">{user.bloodGroup}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{user.city}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{user.phone}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-1">
                        {/* View */}
                        <button
                          onClick={() => onView(user._id)}
                          className="p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition"
                          title="View details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {/* Edit */}
                        <button
                          onClick={() => onEdit(user)}
                          className="p-1.5 text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition"
                          title="Edit user"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        {/* Delete */}
                        {user.role !== 'admin' && (
                          <button
                            onClick={() => onDelete(user._id, user.name)}
                            className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                            title="Delete user"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Showing page {currentPage} of {totalPages} ({totalUsers} users)
          </span>
          <div className="flex items-center gap-2">
            <button
              className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 transition"
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>
            <button
              className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 transition"
              disabled={currentPage === totalPages}
              onClick={() => onPageChange(currentPage + 1)}
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
