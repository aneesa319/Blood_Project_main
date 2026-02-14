import API from '../axiosInstance';

export const fetchDashboardStats = () => API.get('/admin/stats');
export const fetchAllUsers = (page = 1) => API.get(`/admin/users?page=${page}`);
export const fetchRecentRegistrations = () => API.get('/admin/recent');
export const fetchBloodGroupDistribution = () => API.get('/admin/blood-groups');
export const deleteUser = (id) => API.delete(`/admin/users/${id}`);
export const searchUsers = (query, role = 'all', page = 1) =>
  API.get(`/admin/users/search?q=${encodeURIComponent(query)}&role=${role}&page=${page}`);
export const fetchDonorsForMap = () => API.get('/admin/donors/map');
export const updateUser = (id, data) => API.put(`/admin/users/${id}`, data);
export const toggleDonorAvailability = (id) => API.patch(`/admin/donors/${id}/toggle-availability`);
export const getUserDetails = (id) => API.get(`/admin/users/${id}`);
export const exportAllUsers = (role = 'all') => API.get(`/admin/users/export?role=${role}`);
