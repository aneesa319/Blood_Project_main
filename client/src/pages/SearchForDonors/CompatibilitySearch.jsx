import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axiosInstance";
import DonorCardSkeleton from "../../components/ui/DonorCardSkeleton";
import AnimatedSection from "../../components/ui/AnimatedSection";
import DonorMap from "../../components/Map/DonorMap";
import { Search, Phone, Droplets, Calendar, ChevronLeft, ChevronRight, MapPin } from "lucide-react";

function CompatibilitySearch() {
  const [bloodGroup, setBloodGroup] = useState('');
  const [city, setCity] = useState('');
  const [donors, setDonors] = useState([]);
  const [totalDonors, setTotalDonors] = useState(0);
  const [availableCount, setAvailableCount] = useState(0);
  const [allDonors, setAllDonors] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showMap, setShowMap] = useState(true);
  const navigate = useNavigate();
  const cardRefs = useRef({});

  const fetchSpecificDonors = async (obj, page = 1) => {
    try {
      setLoading(true);
      const res = await API.post(`/donors/nearest/byzipcode?page=${page}`, obj);
      const { donors, totalCompatibleDonors, totalEligibleDonors, totalPages, totalDonors } = res.data;
      setDonors(donors);
      setTotalDonors(totalCompatibleDonors);
      setAvailableCount(totalEligibleDonors);
      setTotalPages(totalPages);
      setAllDonors(totalDonors);
    } catch (err) {
      console.error("Failed to fetch compatible donors:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchBtn = () => {
    if (!bloodGroup || !city) { alert("Please select a blood group and enter a city."); return; }
    fetchSpecificDonors({ bloodGroup, city }, 1);
    setPageNum(1);
  };

  return (
    <section className="min-h-screen text-white bg-gradient-to-br from-secondary-800 to-secondary-900 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto p-8 md:p-12">
        <AnimatedSection animation="fadeIn">
          <h2 className="text-2xl font-bold font-heading mb-6 text-center">
            Compatibility & Proximity-Based Donor Search
          </h2>
        </AnimatedSection>

        {/* Filters */}
        <AnimatedSection animation="slideUp">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
            <select
              className="text-gray-800 dark:text-white dark:bg-gray-700 p-2 rounded-lg w-full md:w-1/3 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 outline-none"
              value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)}
            >
              <option value="">Select Blood Group</option>
              {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(bg => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
            <select
              className="text-gray-800 dark:text-white dark:bg-gray-700 p-2 rounded-lg w-full md:w-1/3 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 outline-none"
              value={city} onChange={(e) => setCity(e.target.value)}
            >
              <option value="">-- Select City --</option>
              <optgroup label="Punjab">
                <option value="Lahore">Lahore</option>
                <option value="Faisalabad">Faisalabad</option>
                <option value="Rawalpindi">Rawalpindi</option>
                <option value="Multan">Multan</option>
                <option value="Gujranwala">Gujranwala</option>
                <option value="Sialkot">Sialkot</option>
                <option value="Bahawalpur">Bahawalpur</option>
                <option value="Sargodha">Sargodha</option>
                <option value="Jhang">Jhang</option>
                <option value="Sahiwal">Sahiwal</option>
                <option value="Dera Ghazi Khan">Dera Ghazi Khan</option>
                <option value="Gujrat">Gujrat</option>
                <option value="Jhelum">Jhelum</option>
                <option value="Sheikhupura">Sheikhupura</option>
                <option value="Kasur">Kasur</option>
                <option value="Okara">Okara</option>
                <option value="Chiniot">Chiniot</option>
                <option value="Rahim Yar Khan">Rahim Yar Khan</option>
                <option value="Mianwali">Mianwali</option>
                <option value="Khanewal">Khanewal</option>
                <option value="Hafizabad">Hafizabad</option>
                <option value="Muzaffargarh">Muzaffargarh</option>
                <option value="Attock">Attock</option>
                <option value="Vehari">Vehari</option>
                <option value="Layyah">Layyah</option>
                <option value="Pakpattan">Pakpattan</option>
                <option value="Narowal">Narowal</option>
                <option value="Chakwal">Chakwal</option>
                <option value="Bhakkar">Bhakkar</option>
                <option value="Toba Tek Singh">Toba Tek Singh</option>
                <option value="Rajanpur">Rajanpur</option>
                <option value="Lodhran">Lodhran</option>
                <option value="Khushab">Khushab</option>
                <option value="Mandi Bahauddin">Mandi Bahauddin</option>
                <option value="Nankana Sahib">Nankana Sahib</option>
                <option value="Bahawalnagar">Bahawalnagar</option>
              </optgroup>
              <optgroup label="Sindh">
                <option value="Karachi">Karachi</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Sukkur">Sukkur</option>
                <option value="Larkana">Larkana</option>
                <option value="Nawabshah">Nawabshah</option>
                <option value="Mirpur Khas">Mirpur Khas</option>
                <option value="Jacobabad">Jacobabad</option>
                <option value="Shikarpur">Shikarpur</option>
                <option value="Khairpur">Khairpur</option>
                <option value="Dadu">Dadu</option>
                <option value="Thatta">Thatta</option>
                <option value="Badin">Badin</option>
                <option value="Tando Allahyar">Tando Allahyar</option>
                <option value="Tando Adam">Tando Adam</option>
                <option value="Umerkot">Umerkot</option>
                <option value="Sanghar">Sanghar</option>
                <option value="Ghotki">Ghotki</option>
                <option value="Matiari">Matiari</option>
                <option value="Kashmore">Kashmore</option>
              </optgroup>
              <optgroup label="Khyber Pakhtunkhwa (KPK)">
                <option value="Peshawar">Peshawar</option>
                <option value="Mardan">Mardan</option>
                <option value="Abbottabad">Abbottabad</option>
                <option value="Swat">Swat</option>
                <option value="Mansehra">Mansehra</option>
                <option value="Kohat">Kohat</option>
                <option value="Bannu">Bannu</option>
                <option value="Dera Ismail Khan">Dera Ismail Khan</option>
                <option value="Charsadda">Charsadda</option>
                <option value="Nowshera">Nowshera</option>
                <option value="Swabi">Swabi</option>
                <option value="Haripur">Haripur</option>
                <option value="Dir Lower">Dir Lower</option>
                <option value="Dir Upper">Dir Upper</option>
                <option value="Chitral">Chitral</option>
                <option value="Buner">Buner</option>
                <option value="Shangla">Shangla</option>
                <option value="Battagram">Battagram</option>
                <option value="Hangu">Hangu</option>
                <option value="Karak">Karak</option>
                <option value="Lakki Marwat">Lakki Marwat</option>
                <option value="Tank">Tank</option>
                <option value="Malakand">Malakand</option>
              </optgroup>
              <optgroup label="Balochistan">
                <option value="Quetta">Quetta</option>
                <option value="Turbat">Turbat</option>
                <option value="Khuzdar">Khuzdar</option>
                <option value="Hub">Hub</option>
                <option value="Chaman">Chaman</option>
                <option value="Gwadar">Gwadar</option>
                <option value="Zhob">Zhob</option>
                <option value="Sibi">Sibi</option>
                <option value="Loralai">Loralai</option>
                <option value="Pishin">Pishin</option>
                <option value="Kalat">Kalat</option>
                <option value="Mastung">Mastung</option>
                <option value="Nushki">Nushki</option>
                <option value="Dera Murad Jamali">Dera Murad Jamali</option>
                <option value="Jaffarabad">Jaffarabad</option>
                <option value="Ziarat">Ziarat</option>
                <option value="Panjgur">Panjgur</option>
                <option value="Awaran">Awaran</option>
                <option value="Washuk">Washuk</option>
                <option value="Lasbela">Lasbela</option>
              </optgroup>
              <optgroup label="Islamabad Capital Territory">
                <option value="Islamabad">Islamabad</option>
              </optgroup>
              <optgroup label="Azad Jammu & Kashmir (AJK)">
                <option value="Muzaffarabad">Muzaffarabad</option>
                <option value="Mirpur">Mirpur</option>
                <option value="Rawalakot">Rawalakot</option>
                <option value="Kotli">Kotli</option>
                <option value="Bagh">Bagh</option>
                <option value="Bhimber">Bhimber</option>
                <option value="Pallandri">Pallandri</option>
                <option value="Hattian Bala">Hattian Bala</option>
                <option value="Haveli">Haveli</option>
                <option value="Neelum">Neelum</option>
              </optgroup>
              <optgroup label="Gilgit-Baltistan">
                <option value="Gilgit">Gilgit</option>
                <option value="Skardu">Skardu</option>
                <option value="Hunza">Hunza</option>
                <option value="Ghizer">Ghizer</option>
                <option value="Diamer">Diamer</option>
                <option value="Astore">Astore</option>
                <option value="Ghanche">Ghanche</option>
                <option value="Shigar">Shigar</option>
                <option value="Kharmang">Kharmang</option>
                <option value="Nagar">Nagar</option>
              </optgroup>
            </select>
            <button className="btn-primary inline-flex items-center gap-2" onClick={handleSearchBtn}>
              <Search className="w-5 h-5" /> Search
            </button>
          </div>
        </AnimatedSection>

        {/* Stats */}
        {donors.length > 0 && (
          <AnimatedSection animation="slideUp">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="card text-gray-800 dark:text-white px-6 py-3 text-center">
                <Droplets className="w-5 h-5 text-primary-600 mx-auto mb-1" />
                <span className="font-semibold">Total: {allDonors}</span>
              </div>
              <div className="card text-gray-800 dark:text-white px-6 py-3 text-center">
                <Droplets className="w-5 h-5 text-secondary-600 mx-auto mb-1" />
                <span className="font-semibold">Compatible: {totalDonors}</span>
              </div>
              <div className="card text-gray-800 dark:text-white px-6 py-3 text-center">
                <div className="w-3 h-3 bg-green-400 rounded-full mx-auto mb-1" />
                <span className="font-semibold">Available: {availableCount}</span>
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* Map Toggle & Donor Map */}
        {donors.length > 0 && (
          <AnimatedSection animation="slideUp">
            <div className="flex justify-end mb-3">
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
                donors={donors}
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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => <DonorCardSkeleton key={i} />)}
          </div>
        ) : donors.length === 0 ? (
          <p className="text-center text-gray-300">No donors found. Try different filters.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {donors.map((donor, i) => (
              <AnimatedSection key={i} animation="slideUp" delay={i * 0.05}>
                <div
                  ref={(el) => (cardRefs.current[donor._id || i] = el)}
                  className="bg-gray-900 dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center text-white hover:-translate-y-1 transition-all duration-300"
                >
                  <img
                    src={`https://api.dicebear.com/8.x/thumbs/svg?seed=${donor.name}`}
                    alt={donor.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-secondary-500"
                  />
                  <div className="flex items-center justify-center space-x-2 mb-1">
                    <span className="text-xl font-semibold">{donor.name}</span>
                    <span className="w-3 h-3 rounded-full bg-green-400" title="Available" />
                  </div>
                  <p className="text-gray-400">{donor.bloodGroup} &bull; {donor.city}</p>
                  <p className="text-sm mt-1 flex items-center justify-center gap-1"><Phone className="w-3 h-3" /> {donor.phone}</p>
                  <p className="text-sm mt-1 flex items-center justify-center gap-1"><Droplets className="w-3 h-3" /> Donations: {Array.isArray(donor.donationCount) ? donor.donationCount.length : donor.donationCount}</p>
                  <p className="text-sm flex items-center justify-center gap-1"><Calendar className="w-3 h-3" /> Last: {donor.lastDonationDate ? new Date(donor.lastDonationDate).toLocaleDateString() : "Not Yet"}</p>
                  <div className="mt-4 flex justify-center space-x-4">
                    <button className="btn-primary text-sm py-2 px-4">Request</button>
                    <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition">Message</button>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        )}

        {/* Pagination */}
        {donors.length > 0 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button className="btn-secondary text-sm py-2 px-4 inline-flex items-center gap-1" disabled={pageNum === 1} onClick={() => { fetchSpecificDonors({ bloodGroup, city }, pageNum - 1); setPageNum(p => p - 1); }}>
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>
            <span className="font-semibold">Page {pageNum} of {totalPages}</span>
            <button className="btn-secondary text-sm py-2 px-4 inline-flex items-center gap-1" disabled={pageNum === totalPages} onClick={() => { fetchSpecificDonors({ bloodGroup, city }, pageNum + 1); setPageNum(p => p + 1); }}>
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default CompatibilitySearch;
