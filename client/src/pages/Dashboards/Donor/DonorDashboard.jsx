import { Droplets, Calendar, Upload, ToggleLeft, ToggleRight, User, Mail, Phone, MapPin, Heart, AlertCircle, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllBloodRequirements } from "../../../api/bloodRequest/bloodRequest.api";
import { toast } from "react-toastify";
import API from "../../../api/axiosInstance";
import AnimatedSection from "../../../components/ui/AnimatedSection";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const currentDonorName = "Muhammad Ashiq";

const mockDonorInfo = {
  lastDonationDate: "2025-01-30",
  available: false,
  donationCount: [
    { date: "2024-05-10", location: "Lahore" },
    { date: "2024-09-15", location: "Multan" },
    { date: "2025-01-30", location: "Peshawar" },
  ],
  userProfile: {
    name: "Muhammad Ashiq",
    email: "muhammadashiq431@example.com",
    bloodGroup: "AB+",
    gender: "male",
    age: 24,
    city: "Peshawar",
    phone: "03219876543",
    zipcode: "25000",
  },
};

function DonorDashboard() {
  const { name: currentDonorName, userId, city, bloodGroup } = useSelector((state) => state.loginLogoutSlice);
  const [available, setAvailable] = useState(mockDonorInfo.available);
  const [certificate, setCertificate] = useState(null);
  const [nearbyRequests, setNearbyRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.3 });

  // Use effect to fetch nearby blood requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoadingRequests(true);
        const response = await getAllBloodRequirements(city);
        setNearbyRequests(response.data || []);
      } catch (error) {
        console.error("Failed to fetch nearby requests:", error);
      } finally {
        setLoadingRequests(false);
      }
    };
    if (city) fetchRequests();
  }, [city]);

  const handleAvailabilityToggle = async () => {
    try {
      // In a real app, you'd send this to the server
      setAvailable((prev) => !prev);
      toast.info(`Status updated to ${!available ? 'Available' : 'Unavailable'}`);
    } catch (err) {
      toast.error("Failed to update status");
    }
  };
  const handleCertificateUpload = (e) => setCertificate(e.target.files[0]);

  const profile = mockDonorInfo.userProfile;
  const profileFields = [
    { icon: User, label: "Name", value: profile.name },
    { icon: Mail, label: "Email", value: profile.email },
    { icon: Phone, label: "Phone", value: profile.phone },
    { icon: Heart, label: "Blood Group", value: profile.bloodGroup },
    { icon: User, label: "Gender", value: profile.gender },
    { icon: Calendar, label: "Age", value: profile.age },
    { icon: MapPin, label: "City", value: profile.city },
    { icon: MapPin, label: "Zip Code", value: profile.zipcode },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-secondary-700 to-secondary-900 dark:from-gray-900 dark:to-gray-800 text-white py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection animation="fadeIn">
          <h1 className="text-2xl font-bold font-heading mb-2 bg-primary-600 px-4 py-2 rounded-lg inline-block">
            Welcome, {currentDonorName}
          </h1>
          <p className="mb-6 text-gray-200">This is your personal donor dashboard.</p>
        </AnimatedSection>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <AnimatedSection animation="bounceIn" delay={0}>
            <div className="card text-center text-gray-800 dark:text-white">
              <Droplets className="w-6 h-6 text-primary-600 mx-auto mb-1" />
              <div className="text-2xl font-bold font-heading">
                {statsInView ? <CountUp end={mockDonorInfo.donationCount.length} duration={2} /> : '0'}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Donations</p>
            </div>
          </AnimatedSection>
          <AnimatedSection animation="bounceIn" delay={0.1}>
            <div className="card text-center text-gray-800 dark:text-white">
              <Calendar className="w-6 h-6 text-secondary-600 mx-auto mb-1" />
              <div className="text-lg font-bold">{mockDonorInfo.lastDonationDate}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Last Donated</p>
            </div>
          </AnimatedSection>
          <AnimatedSection animation="bounceIn" delay={0.2}>
            <div className="card text-center text-gray-800 dark:text-white">
              <div className={`w-4 h-4 rounded-full mx-auto mb-1 ${available ? 'bg-green-400' : 'bg-red-400'}`} />
              <div className="text-lg font-bold">{available ? "Available" : "Not Available"}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Donation Status</p>
            </div>
          </AnimatedSection>
        </div>

        {/* Donation History Timeline */}
        <AnimatedSection animation="slideUp">
          <div className="card text-gray-800 dark:text-white mb-6">
            <h3 className="text-lg font-bold font-heading mb-4">Donation History</h3>
            <div className="space-y-4">
              {mockDonorInfo.donationCount.map((d, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-primary-600 rounded-full flex-shrink-0" />
                  <div className="flex-1 border-b border-gray-100 dark:border-gray-700 pb-2">
                    <p className="font-medium">{d.location}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(d.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Nearby Blood Requirements */}
        <AnimatedSection animation="slideUp">
          <div className="mb-8">
            <h3 className="text-xl font-bold font-heading mb-4 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-primary-400" /> Nearby Blood Requirements ({city})
            </h3>
            
            {loadingRequests ? (
              <div className="flex justify-center py-8">
                <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : nearbyRequests.length > 0 ? (
              <div className="grid gap-4">
                {nearbyRequests.map((req) => (
                  <div key={req._id} className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-all">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-primary-600 rounded-lg flex items-center justify-center text-2xl font-bold shrink-0">
                          {req.bloodGroup}
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">{req.hospitalName}</h4>
                          <p className="text-gray-300 text-sm flex items-center gap-1">
                            {req.patientName} &bull; {req.units} units required
                          </p>
                          <div className={`mt-2 inline-block px-2 py-0.5 rounded text-xs font-bold uppercase ${
                            req.urgency === 'Critical' ? 'bg-red-600' : req.urgency === 'Urgent' ? 'bg-orange-600' : 'bg-blue-600'
                          }`}>
                            {req.urgency}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="text-sm font-semibold flex items-center justify-end gap-1">
                          <Calendar className="w-4 h-4" /> By: {new Date(req.requiredDate).toLocaleDateString()}
                        </p>
                        <a 
                          href={`tel:${req.contactPhone}`}
                          className="btn-primary py-2 px-4 shadow-lg shadow-primary-500/20 flex items-center gap-2 text-sm justify-center"
                        >
                          <Phone className="w-4 h-4" /> Call Patient
                        </a>
                      </div>
                    </div>
                    {req.description && (
                      <p className="mt-4 text-sm text-gray-400 bg-black/20 p-3 rounded-lg border border-white/5 italic">
                        "{req.description}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-white/5 rounded-2xl border border-dashed border-white/10">
                <Droplets className="w-12 h-12 text-white/20 mx-auto mb-2" />
                <p className="text-gray-400">No active blood requirements in your city.</p>
              </div>
            )}
          </div>
        </AnimatedSection>

        {/* Upload Certificate */}
        <AnimatedSection animation="slideUp">
          <div className="card text-gray-800 dark:text-white mb-6">
            <h3 className="text-lg font-bold font-heading mb-3 flex items-center gap-2">
              <Upload className="w-5 h-5" /> Upload Donation Certificate
            </h3>
            <input type="file" onChange={handleCertificateUpload} className="block w-full text-sm dark:text-gray-300" />
            {certificate && <p className="text-green-600 mt-2 text-sm">Uploaded: {certificate.name}</p>}
          </div>
        </AnimatedSection>

        {/* Toggle Availability */}
        <AnimatedSection animation="slideUp">
          <div className="mb-8">
            <button
              onClick={handleAvailabilityToggle}
              className={`inline-flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition ${
                available ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {available ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
              {available ? "Set as Unavailable" : "Set as Available"}
            </button>
          </div>
        </AnimatedSection>

        {/* Profile Details */}
        <AnimatedSection animation="slideUp">
          <div className="card text-gray-800 dark:text-white">
            <h3 className="text-xl font-bold font-heading mb-4">Your Profile</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {profileFields.map((f) => (
                <div key={f.label}>
                  <label className="font-semibold text-sm flex items-center gap-1 mb-1 text-gray-600 dark:text-gray-400">
                    <f.icon className="w-4 h-4" /> {f.label}
                  </label>
                  <input className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white w-full p-2 rounded-lg" value={f.value} readOnly />
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default DonorDashboard;
