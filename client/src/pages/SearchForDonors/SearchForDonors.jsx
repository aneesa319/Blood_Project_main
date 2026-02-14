import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axiosInstance";
import AnimatedSection from "../../components/ui/AnimatedSection";
import { Search, Droplets, Heart, Shield } from "lucide-react";

function SearchForDonor() {
  const [totalDonors, setTotalDonors] = useState(0);
  const [availableCount, setAvailableCount] = useState(0);
  const [notAvailableCount, setNotAvailableCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get(`/donors/all?page=1`);
        const { totalDonors, availability, nonAvailability } = res.data;
        setTotalDonors(totalDonors);
        setAvailableCount(availability);
        setNotAvailableCount(nonAvailability);
      } catch (err) {
        console.error("Failed to fetch donor stats:", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-br from-secondary-700 to-secondary-900 dark:from-gray-900 dark:to-gray-800 text-white">
      <div className="max-w-7xl mx-auto p-8">
        {/* Stats */}
        <AnimatedSection animation="slideUp">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="card text-gray-800 dark:text-white px-6 py-3 text-center">
              <Droplets className="w-5 h-5 text-primary-600 mx-auto mb-1" />
              <span className="font-semibold">Total Donors: {totalDonors}</span>
            </div>
            <div className="card text-gray-800 dark:text-white px-6 py-3 text-center">
              <div className="w-3 h-3 bg-green-400 rounded-full mx-auto mb-1" />
              <span className="font-semibold">Available: {availableCount}</span>
            </div>
            <div className="card text-gray-800 dark:text-white px-6 py-3 text-center">
              <div className="w-3 h-3 bg-red-400 rounded-full mx-auto mb-1" />
              <span className="font-semibold">Not Available: {notAvailableCount}</span>
            </div>
          </div>
        </AnimatedSection>

        {/* Compatibility Search CTA */}
        <AnimatedSection animation="fadeIn">
          <div className="text-center mb-10">
            <p className="text-lg font-medium mb-4">
              Want to search by <span className="font-bold">Blood Compatibility</span> and <span className="font-bold">Proximity</span>?
            </p>
            <button onClick={() => navigate("/compatible-search")} className="btn-primary inline-flex items-center gap-2">
              <Search className="w-5 h-5" /> Go to Compatibility Search
            </button>
          </div>
        </AnimatedSection>

        {/* Info Cards */}
        <AnimatedSection animation="slideUp">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
            <div className="bg-gray-900/60 dark:bg-gray-800/60 rounded-xl p-8 text-center">
              <Heart className="w-12 h-12 text-primary-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Save Lives</h3>
              <p className="text-gray-300 text-sm">Every donation can save up to 3 lives. Find compatible donors near you.</p>
            </div>
            <div className="bg-gray-900/60 dark:bg-gray-800/60 rounded-xl p-8 text-center">
              <Search className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Smart Search</h3>
              <p className="text-gray-300 text-sm">Search donors by blood compatibility and proximity to find the best match.</p>
            </div>
            <div className="bg-gray-900/60 dark:bg-gray-800/60 rounded-xl p-8 text-center">
              <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Privacy Protected</h3>
              <p className="text-gray-300 text-sm">Donor details are only visible to registered and verified patients.</p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default SearchForDonor;
