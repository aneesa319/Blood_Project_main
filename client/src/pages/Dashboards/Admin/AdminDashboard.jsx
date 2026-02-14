import { useState, useEffect } from 'react';
import {
  fetchDashboardStats,
  fetchAllUsers,
  fetchRecentRegistrations,
  fetchBloodGroupDistribution,
  deleteUser as deleteUserApi,
  searchUsers,
  fetchDonorsForMap,
  exportAllUsers,
} from '../../../api/admin/admin.api';
import StatCard from './StatCard';
import BloodGroupChart from './BloodGroupChart';
import RecentRegistrationsTable from './RecentRegistrationsTable';
import UserManagementTable from './UserManagementTable';
import DonorMapSection from './DonorMapSection';
import UserDetailsModal from './UserDetailsModal';
import EditUserModal from './EditUserModal';
import SkeletonCard from '../../../components/ui/SkeletonCard';
import AnimatedSection from '../../../components/ui/AnimatedSection';
import { Users, Heart, UserCheck, Droplets, ShieldCheck, LayoutDashboard, Map, UserCog } from 'lucide-react';
import { toast } from 'react-toastify';

const TABS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'users', label: 'User Management', icon: UserCog },
  { id: 'map', label: 'Donor Map', icon: Map },
];

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [distribution, setDistribution] = useState([]);
  const [mapDonors, setMapDonors] = useState([]);
  const [userPage, setUserPage] = useState(1);
  const [totalUserPages, setTotalUserPages] = useState(1);
  const [totalUserCount, setTotalUserCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [isSearching, setIsSearching] = useState(false);

  // Modal states
  const [viewUserId, setViewUserId] = useState(null);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const [statsRes, recentRes, distRes, usersRes] = await Promise.all([
        fetchDashboardStats(),
        fetchRecentRegistrations(),
        fetchBloodGroupDistribution(),
        fetchAllUsers(1),
      ]);
      setStats(statsRes.data);
      setRecentUsers(recentRes.data.users);
      setDistribution(distRes.data.distribution);
      setUsers(usersRes.data.users);
      setTotalUserPages(usersRes.data.totalPages);
      setTotalUserCount(usersRes.data.totalUsers);
    } catch (err) {
      console.error("Admin dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadMapDonors = async () => {
    try {
      const res = await fetchDonorsForMap();
      setMapDonors(res.data.donors);
    } catch (err) {
      console.error("Map donors error:", err);
    }
  };

  useEffect(() => {
    if (activeTab === 'map' && mapDonors.length === 0) {
      loadMapDonors();
    }
  }, [activeTab]);

  const refreshCurrentPage = async () => {
    if (searchQuery || roleFilter !== 'all') {
      const res = await searchUsers(searchQuery, roleFilter, userPage);
      setUsers(res.data.users);
      setTotalUserPages(res.data.totalPages);
      setTotalUserCount(res.data.totalUsers);
    } else {
      const res = await fetchAllUsers(userPage);
      setUsers(res.data.users);
      setTotalUserPages(res.data.totalPages);
      setTotalUserCount(res.data.totalUsers);
    }
  };

  const handleUserPageChange = async (page) => {
    try {
      if (searchQuery || roleFilter !== 'all') {
        const res = await searchUsers(searchQuery, roleFilter, page);
        setUsers(res.data.users);
        setUserPage(page);
        setTotalUserPages(res.data.totalPages);
        setTotalUserCount(res.data.totalUsers);
      } else {
        const res = await fetchAllUsers(page);
        setUsers(res.data.users);
        setUserPage(page);
        setTotalUserPages(res.data.totalPages);
        setTotalUserCount(res.data.totalUsers);
      }
    } catch (err) {
      console.error("Pagination error:", err);
    }
  };

  const handleSearch = async () => {
    try {
      setIsSearching(true);
      const res = await searchUsers(searchQuery, roleFilter, 1);
      setUsers(res.data.users);
      setUserPage(1);
      setTotalUserPages(res.data.totalPages);
      setTotalUserCount(res.data.totalUsers);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleClearSearch = async () => {
    setSearchQuery('');
    setRoleFilter('all');
    try {
      const res = await fetchAllUsers(1);
      setUsers(res.data.users);
      setUserPage(1);
      setTotalUserPages(res.data.totalPages);
      setTotalUserCount(res.data.totalUsers);
    } catch (err) {
      console.error("Reset error:", err);
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (!window.confirm(`Are you sure you want to delete "${userName}"? This action cannot be undone.`)) return;
    try {
      await deleteUserApi(userId);
      toast.success(`User "${userName}" deleted successfully`);
      await refreshCurrentPage();
      const statsRes = await fetchDashboardStats();
      setStats(statsRes.data);
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete user");
    }
  };

  const handleViewUser = (userId) => {
    setViewUserId(userId);
  };

  const handleEditUser = (user) => {
    setViewUserId(null); // close details modal
    setEditUser(user);
  };

  const handleEditSaved = async (updatedUser) => {
    setEditUser(null);
    await refreshCurrentPage();
    const statsRes = await fetchDashboardStats();
    setStats(statsRes.data);
  };

  const handleExportCSV = async () => {
    try {
      const res = await exportAllUsers(roleFilter);
      const usersData = res.data.users;

      if (!usersData.length) {
        toast.info("No users to export");
        return;
      }

      // Build CSV
      const headers = ['Name', 'Email', 'Role', 'Blood Group', 'City', 'Phone', 'Age', 'Gender', 'Zipcode', 'Joined'];
      const rows = usersData.map(u => [
        u.name,
        u.email,
        u.role,
        u.bloodGroup,
        u.city,
        u.phone,
        u.age,
        u.gender,
        u.zipcode,
        new Date(u.createdAt).toLocaleDateString(),
      ]);

      const csvContent = [
        headers.join(','),
        ...rows.map(r => r.map(val => `"${val}"`).join(','))
      ].join('\n');

      // Download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `lifesaver-users-${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
      URL.revokeObjectURL(url);

      toast.success(`Exported ${usersData.length} users to CSV`);
    } catch (err) {
      console.error("Export error:", err);
      toast.error("Failed to export users");
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <AnimatedSection animation="fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-600 rounded-lg">
                <ShieldCheck className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold font-heading text-gray-800 dark:text-white">Admin Dashboard</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Manage your LifeSaver system</p>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm border border-gray-200 dark:border-gray-700">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary-600 text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Stats Row */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <StatCard icon={Users} label="Total Users" value={stats.totalUsers} delay={0} />
            <StatCard icon={Heart} label="Total Donors" value={stats.totalDonors} color="text-green-600" delay={0.1} />
            <StatCard icon={UserCheck} label="Total Patients" value={stats.totalPatients} color="text-blue-600" delay={0.2} />
            <StatCard icon={Droplets} label="Available Donors" value={stats.availableDonors} color="text-purple-600" delay={0.3} />
          </div>
        )}

        {/* TAB: Overview */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {loading ? (
              <>
                <SkeletonCard className="h-64" />
                <SkeletonCard className="h-64" />
              </>
            ) : (
              <>
                <BloodGroupChart distribution={distribution} />
                <RecentRegistrationsTable users={recentUsers} />
              </>
            )}
          </div>
        )}

        {/* TAB: User Management */}
        {activeTab === 'users' && !loading && (
          <UserManagementTable
            users={users}
            currentPage={userPage}
            totalPages={totalUserPages}
            totalUsers={totalUserCount}
            onPageChange={handleUserPageChange}
            onDelete={handleDeleteUser}
            onView={handleViewUser}
            onEdit={handleEditUser}
            onExport={handleExportCSV}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            roleFilter={roleFilter}
            setRoleFilter={setRoleFilter}
            onSearch={handleSearch}
            onClearSearch={handleClearSearch}
            isSearching={isSearching}
          />
        )}

        {/* TAB: Donor Map */}
        {activeTab === 'map' && (
          <DonorMapSection donors={mapDonors} />
        )}
      </div>

      {/* Modals */}
      {viewUserId && (
        <UserDetailsModal
          userId={viewUserId}
          onClose={() => setViewUserId(null)}
          onEdit={handleEditUser}
        />
      )}
      {editUser && (
        <EditUserModal
          user={editUser}
          onClose={() => setEditUser(null)}
          onSaved={handleEditSaved}
        />
      )}
    </section>
  );
}

export default AdminDashboard;
