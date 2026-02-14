import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import API from "../../../api/axiosInstance";
import DonorCardSkeleton from "../../../components/ui/DonorCardSkeleton";
import AnimatedSection from "../../../components/ui/AnimatedSection";
import TiltCard from "../../../components/ui/TiltCard";
import DonorMap from "../../../components/Map/DonorMap";
import { Droplets, Users, UserCheck, FileText, Phone, Calendar, ChevronLeft, ChevronRight, MapPin } from "lucide-react";

function PatientDashboard() {
  const navigate = useNavigate();
  const donors = useSelector((state) => state.loginLogoutSlice.patientData.donorsForPatient);
  const patientName = useSelector((state) => state.loginLogoutSlice.name) || "Patient";
  const { totalPages, totalDonors, totalCompatibleDonors, totalEligibleDonors } = useSelector((state) => state.loginLogoutSlice.patientData);
  const { bloodGroup, city } = useSelector((state) => state.loginLogoutSlice);

  const [pageNumber, setPageNum] = useState(1);
  const [flaq, setFlaq] = useState(false);
  const [donorsFromApi, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(true);
  const cardRefs = useRef({});

  const fetchSpecificDonors = async (obj, page) => {
    try {
      setLoading(true);
      const res = await API.post(`/donors/nearest/byzipcode?page=${page}`, obj);
      setDonors(res.data.donors);
    } catch (error) {
      console.error("Failed to fetch compatible donors:", error);
      navigate('compatible-search');
    } finally {
      setLoading(false);
      setFlaq(true);
    }
  };

  const handlePrevBtn = () => {
    if (pageNumber > 1) {
      fetchSpecificDonors({ bloodGroup, city }, pageNumber - 1);
      setPageNum((prev) => prev - 1);
    }
  };

  const handleNextBtn = () => {
    if (pageNumber < totalPages) {
      fetchSpecificDonors({ bloodGroup, city }, pageNumber + 1);
      setPageNum((prev) => prev + 1);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-secondary-700 to-secondary-900 dark:from-gray-900 dark:to-gray-800 text-white">
      <div className="max-w-7xl mx-auto p-8">
        <AnimatedSection animation="fadeIn">
          <h1 className="text-2xl font-bold font-heading mb-2 bg-primary-600 mt-4 px-4 py-2 rounded-lg inline-block">
            Welcome, {patientName}
          </h1>
          <p className="text-gray-200 mb-2">This is your personal patient dashboard.</p>
          <p className="text-lg mb-6 text-gray-200">
            View nearby compatible blood donors based on your blood group and location.
          </p>
        </AnimatedSection>

        {/* Patient Info */}
        <AnimatedSection animation="slideUp">
          <div className="mb-4 text-lg font-semibold">
            Blood Group: <span className="text-yellow-300">{bloodGroup}</span> | City: <span className="text-yellow-300">{city}</span>
          </div>
        </AnimatedSection>

        {/* Stats */}
        <AnimatedSection animation="slideUp">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="card text-gray-800 dark:text-white px-6 py-3 text-center">
              <Droplets className="w-5 h-5 text-primary-600 mx-auto mb-1" />
              <span className="font-semibold">Total Donors: {totalDonors || donors.length}</span>
            </div>
            <div className="card text-gray-800 dark:text-white px-6 py-3 text-center">
              <Users className="w-5 h-5 text-secondary-600 mx-auto mb-1" />
              <span className="font-semibold">Compatible: {totalCompatibleDonors || donors.length}</span>
            </div>
            <div className="card text-gray-800 dark:text-white px-6 py-3 text-center">
              <UserCheck className="w-5 h-5 text-green-600 mx-auto mb-1" />
              <span className="font-semibold">Available: {totalEligibleDonors || donors.length}</span>
            </div>
            <button className="btn-primary inline-flex items-center gap-2">
              <FileText className="w-5 h-5" /> Post Blood Requirement
            </button>
          </div>
        </AnimatedSection>

        {/* Donor Map */}
        {(flaq ? donorsFromApi : donors).length > 0 && (
          <AnimatedSection animation="slideUp">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary-400" /> Donor Locations
              </h2>
              <button
                className="btn-secondary text-sm py-2 px-4 inline-flex items-center gap-2"
                onClick={() => setShowMap((prev) => !prev)}
              >
                <MapPin className="w-4 h-4" />
                {showMap ? "Hide Map" : "Show Map"}
              </button>
            </div>
            {showMap && (
              <DonorMap
                donors={flaq ? donorsFromApi : donors}
                onMarkerClick={(donor, index) => {
                  const el = cardRefs.current[donor._id || index];
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "center" });
                    el.classList.add("ring-2", "ring-primary-400");
                    setTimeout(() => el.classList.remove("ring-2", "ring-primary-400"), 2000);
                  }
                }}
              />
            )}
          </AnimatedSection>
        )}

        {/* Donor Cards */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            {[...Array(6)].map((_, i) => <DonorCardSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            {(flaq ? donorsFromApi : donors).map((donor, index) => (
              <AnimatedSection key={index} animation="slideUp" delay={index * 0.05}>
                <TiltCard>
                  <div
                    ref={(el) => (cardRefs.current[donor._id || index] = el)}
                    className="bg-gray-900 dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center text-white transition-all duration-300"
                  >
                    <img
                      src={`https://api.dicebear.com/8.x/thumbs/svg?seed=${donor.name.split(" ")[0]}`}
                      alt="Donor"
                      className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-secondary-500"
                    />
                    <div className="flex items-center justify-center space-x-2 mb-1">
                      <span className="text-xl font-semibold">{donor.name}</span>
                      <span className="w-3 h-3 rounded-full bg-green-400" title="Available" />
                    </div>
                    <p className="text-gray-400">{donor.bloodGroup} &bull; {donor.city}</p>
                    <p className="text-sm mt-1 flex items-center justify-center gap-1">
                      <Phone className="w-3 h-3" /> {donor.phone}
                    </p>
                    <p className="text-sm mt-1 flex items-center justify-center gap-1">
                      <Droplets className="w-3 h-3" /> Donations: {Array.isArray(donor.donationCount) ? donor.donationCount.length : donor.donationCount}
                    </p>
                    <p className="text-sm flex items-center justify-center gap-1">
                      <Calendar className="w-3 h-3" /> Last: {new Date(donor.lastDonationDate).toLocaleDateString()}
                    </p>
                    <div className="mt-4 flex justify-center space-x-4">
                      <button className="btn-primary text-sm py-2 px-4">Request</button>
                      <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition">Message</button>
                    </div>
                  </div>
                </TiltCard>
              </AnimatedSection>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4">
          <button className="btn-secondary text-sm py-2 px-4 inline-flex items-center gap-1" disabled={pageNumber === 1} onClick={handlePrevBtn}>
            <ChevronLeft className="w-4 h-4" /> Prev
          </button>
          <span className="font-semibold">Page {pageNumber} of {totalPages}</span>
          <button className="btn-secondary text-sm py-2 px-4 inline-flex items-center gap-1" disabled={pageNumber === totalPages} onClick={handleNextBtn}>
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default PatientDashboard;
