import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { sendUserDataThroughRedux } from '../../features/register/registerSlice';
import FormInput from '../../components/ui/FormInput';
import PasswordStrength from '../../components/ui/PasswordStrength';
import Button from '../../components/ui/Button';
import AnimatedSection from '../../components/ui/AnimatedSection';
import { UserPlus } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email, isLoading } = useSelector((state) => state.registerSlice);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [role, setRole] = useState("");
  const [lastDonationDate, setLastDonationDate] = useState();
  const [userObj, setUserObj] = useState({
    name: "", bloodGroup: "", gender: "", age: "", phone: "", password: "", confirmPassword: ""
  });

  const changeUserObj = (e) => {
    const { name, value } = e.target;
    setUserObj((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    fetch('/cities.csv')
      .then(response => response.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: function (results) {
            const cleaned = results.data
              .filter(row => row.Area_Name && row.Postal_code)
              .map(row => ({
                value: row.Area_Name.trim(),
                label: `${row.Area_Name.trim()} (${row.Postal_code.trim()})`,
                postalCode: row.Postal_code.trim()
              }));
            const unique = Array.from(new Map(cleaned.map(item => [item.value, item])).values());
            setCities(unique);
          }
        });
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCity) { toast.error("Please select a city."); return; }
    if (!role) { toast.error("Please select a role (Donor or Patient)."); return; }

    const { name, bloodGroup, gender, age, phone, password, confirmPassword } = userObj;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (!email) {
      toast.error("Email not found. Please go back and enter your email.");
      return;
    }

    const formData = {
      name, bloodGroup, gender, age, phone, password,
      city: selectedCity.value, zipcode: selectedCity.postalCode,
      role, lastDonationDate: lastDonationDate || "", email
    };

    try {
      const res = await dispatch(sendUserDataThroughRedux(formData));
      const { msg, status, message } = res.payload || {};
      if (status === 201) { toast.success(msg); navigate("/login"); return; }
      if (status === 200) { toast.error(message); navigate("/"); return; }
      toast.error(msg || message || "Registration failed. Please try again.");
    } catch (err) {
      console.error("Registration error:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const selectStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: 'transparent',
      borderColor: '#d1d5db',
      '&:hover': { borderColor: '#dc2626' },
    }),
    singleValue: (base) => ({ ...base, color: 'inherit' }),
    input: (base) => ({ ...base, color: 'inherit' }),
    menu: (base) => ({ ...base, backgroundColor: '#fff', zIndex: 50 }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? '#fee2e2' : '#fff',
      color: '#1f2937',
      '&:active': { backgroundColor: '#fca5a5' },
    }),
    placeholder: (base) => ({ ...base, color: '#9ca3af' }),
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4 py-8">
      <AnimatedSection animation="slideUp">
        <div className="w-full max-w-4xl">
          <h2 className="text-3xl font-bold font-heading text-primary-600 mb-4 text-center">Get Started Now</h2>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            {/* Role Selection */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-sm mb-1 dark:text-gray-300">Select Role</label>
              <div className="flex space-x-6">
                <label className="flex items-center space-x-2 dark:text-gray-300">
                  <input type="radio" name="role" value="donor" required className="accent-red-500" onChange={() => setRole("donor")} />
                  <span>Donor</span>
                </label>
                <label className="flex items-center space-x-2 dark:text-gray-300">
                  <input type="radio" name="role" value="patient" required className="accent-red-500" onChange={() => setRole("patient")} />
                  <span>Patient</span>
                </label>
              </div>
            </div>

            <FormInput label="Name" id="name" placeholder="Enter your name" required value={userObj.name} onChange={changeUserObj} name="name" />

            <div className="flex flex-col">
              <label htmlFor="bloodGroup" className="text-sm mb-1 dark:text-gray-300">Blood Group</label>
              <select id="bloodGroup" name="bloodGroup" required
                className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary-500"
                value={userObj.bloodGroup} onChange={changeUserObj}>
                <option value="" disabled>Select your blood group</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="gender" className="text-sm mb-1 dark:text-gray-300">Gender</label>
              <select id="gender" name="gender" required
                className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary-500"
                value={userObj.gender} onChange={changeUserObj}>
                <option value="" disabled>Choose your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <FormInput label="Age" id="age" placeholder="Enter your age" required value={userObj.age} onChange={changeUserObj} name="age" />

            <div className="flex flex-col">
              <label htmlFor="city" className="text-sm mb-1 dark:text-gray-300">City</label>
              <Select options={cities} value={selectedCity} onChange={setSelectedCity} placeholder="Search city..." isSearchable styles={selectStyles} />
            </div>

            <FormInput label="Phone Number" id="phone" type="text" placeholder="+92 333 4444555" required
              pattern="^\+?[0-9\s]{7,20}$" title="Enter a valid phone number like +92 318 9118745"
              name="phone" value={userObj.phone} onChange={changeUserObj} />

            {role === "donor" && (
              <div className="flex flex-col">
                <label htmlFor="lastDonation" className="text-sm mb-1 dark:text-gray-300">Last Donation Date</label>
                <input type="date" id="lastDonation" name="lastDonation"
                  className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg outline-none dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
                  value={lastDonationDate || ''} onChange={(e) => setLastDonationDate(e.target.value)} />
              </div>
            )}

            <div className="flex flex-col">
              <FormInput label="Password" id="password" type="password" placeholder="Enter your password"
                required name="password" value={userObj.password} onChange={changeUserObj} />
              <PasswordStrength password={userObj.password} />
            </div>

            <FormInput label="Confirm Password" id="confirm-password" type="password" placeholder="Confirm your password"
              required name="confirmPassword" value={userObj.confirmPassword} onChange={changeUserObj}
              error={userObj.confirmPassword && userObj.password !== userObj.confirmPassword ? "Passwords do not match" : ""} />

            <div className="md:col-span-2">
              <Button type="submit" loading={isLoading} className="w-40">
                <UserPlus className="w-5 h-5" /> Register
              </Button>
            </div>
          </form>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Register;
