import { useState } from "react";
import AnimatedSection from "../../../components/ui/AnimatedSection";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Droplets, Calendar, Upload, ToggleLeft, ToggleRight, User, Mail, Phone, MapPin, Heart } from "lucide-react";

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
  const [available, setAvailable] = useState(mockDonorInfo.available);
  const [certificate, setCertificate] = useState(null);
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.3 });

  const handleAvailabilityToggle = () => setAvailable((prev) => !prev);
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
