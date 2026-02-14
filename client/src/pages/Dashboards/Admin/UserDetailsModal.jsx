import { useState, useEffect } from 'react';
import { getUserDetails, toggleDonorAvailability as toggleApi } from '../../../api/admin/admin.api';
import { X, Phone, Mail, MapPin, Droplets, Calendar, User, Shield, Clock, ToggleLeft, ToggleRight } from 'lucide-react';
import { toast } from 'react-toastify';

export default function UserDetailsModal({ userId, onClose, onEdit }) {
  const [user, setUser] = useState(null);
  const [donorInfo, setDonorInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(false);

  useEffect(() => {
    if (userId) loadUser();
  }, [userId]);

  const loadUser = async () => {
    try {
      setLoading(true);
      const res = await getUserDetails(userId);
      setUser(res.data.user);
      setDonorInfo(res.data.donorInfo);
    } catch (err) {
      console.error('Error loading user:', err);
      toast.error('Failed to load user details');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAvailability = async () => {
    try {
      setToggling(true);
      const res = await toggleApi(userId);
      setDonorInfo(prev => ({ ...prev, available: res.data.available }));
      toast.success(res.data.msg);
    } catch (err) {
      console.error('Toggle error:', err);
      toast.error('Failed to toggle availability');
    } finally {
      setToggling(false);
    }
  };

  if (!userId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {loading ? (
          <div className="p-8 text-center">
            <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-gray-500">Loading user details...</p>
          </div>
        ) : user ? (
          <>
            {/* Header */}
            <div className="relative bg-gradient-to-r from-primary-600 to-primary-700 p-6 rounded-t-2xl">
              <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white transition">
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-4">
                <img
                  src={`https://api.dicebear.com/8.x/thumbs/svg?seed=${user.name}`}
                  alt={user.name}
                  className="w-16 h-16 rounded-full border-3 border-white shadow-lg"
                />
                <div>
                  <h2 className="text-xl font-bold text-white">{user.name}</h2>
                  <span className={`inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-semibold ${
                    user.role === 'donor' ? 'bg-green-500/20 text-green-100' :
                    user.role === 'patient' ? 'bg-blue-500/20 text-blue-100' :
                    'bg-purple-500/20 text-purple-100'
                  }`}>
                    {user.role.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4">
              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <InfoItem icon={Mail} label="Email" value={user.email} />
                <InfoItem icon={Phone} label="Phone" value={user.phone} />
                <InfoItem icon={Droplets} label="Blood Group" value={user.bloodGroup} highlight />
                <InfoItem icon={MapPin} label="City" value={user.city} />
                <InfoItem icon={User} label="Gender" value={user.gender} />
                <InfoItem icon={Calendar} label="Age" value={`${user.age} years`} />
                <InfoItem icon={Shield} label="Zipcode" value={user.zipcode} />
                <InfoItem icon={Clock} label="Joined" value={new Date(user.createdAt).toLocaleDateString()} />
              </div>

              {/* Donor-specific info */}
              {user.role === 'donor' && donorInfo && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Donor Information</h3>

                  {/* Availability Toggle */}
                  <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 mb-3">
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white text-sm">Availability Status</p>
                      <p className={`text-xs font-semibold ${donorInfo.available ? 'text-green-600' : 'text-red-500'}`}>
                        {donorInfo.available ? 'Available for donation' : 'Not available'}
                      </p>
                    </div>
                    <button
                      onClick={handleToggleAvailability}
                      disabled={toggling}
                      className="transition hover:scale-105 disabled:opacity-50"
                      title="Toggle availability"
                    >
                      {donorInfo.available ? (
                        <ToggleRight className="w-10 h-10 text-green-500" />
                      ) : (
                        <ToggleLeft className="w-10 h-10 text-gray-400" />
                      )}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Total Donations</p>
                      <p className="text-lg font-bold text-gray-800 dark:text-white">
                        {donorInfo.donationCount?.length || 0}
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Last Donation</p>
                      <p className="text-sm font-semibold text-gray-800 dark:text-white">
                        {donorInfo.lastDonationDate
                          ? new Date(donorInfo.lastDonationDate).toLocaleDateString()
                          : 'No record'}
                      </p>
                    </div>
                  </div>

                  {/* Donation History */}
                  {donorInfo.donationCount?.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Donation History</p>
                      <div className="space-y-1 max-h-32 overflow-y-auto">
                        {donorInfo.donationCount.map((d, i) => (
                          <div key={i} className="flex items-center justify-between text-xs bg-gray-50 dark:bg-gray-700/30 rounded px-3 py-1.5">
                            <span className="text-gray-600 dark:text-gray-400">
                              {new Date(d.date).toLocaleDateString()}
                            </span>
                            <span className="text-gray-800 dark:text-gray-300 font-medium">
                              {d.location || 'Unknown'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => onEdit(user)}
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2.5 rounded-lg transition text-sm"
                >
                  Edit User
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium py-2.5 rounded-lg transition text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="p-8 text-center text-gray-400">User not found</div>
        )}
      </div>
    </div>
  );
}

function InfoItem({ icon: Icon, label, value, highlight }) {
  return (
    <div className="flex items-start gap-2">
      <Icon className={`w-4 h-4 mt-0.5 ${highlight ? 'text-primary-600' : 'text-gray-400'}`} />
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
        <p className={`text-sm font-medium ${highlight ? 'text-primary-600 font-bold' : 'text-gray-800 dark:text-gray-200'}`}>
          {value}
        </p>
      </div>
    </div>
  );
}
