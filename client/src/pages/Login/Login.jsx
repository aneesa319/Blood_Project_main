import { useState } from 'react';
import { useDispatch } from "react-redux";
import { sendLoginDataUsingRedux } from '../../features/login/loginSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import FormInput from '../../components/ui/FormInput';
import Button from '../../components/ui/Button';
import AnimatedSection from '../../components/ui/AnimatedSection';
import { LogIn, User } from 'lucide-react';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userLoginData, setUserLoginData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setUserLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await dispatch(sendLoginDataUsingRedux(userLoginData));
      setUserLoginData({ email: "", password: "" });

      const { msg, status } = res.payload;

      if (status === 400) {
        toast.error(msg);
        return;
      }

      if (status === 200) {
        toast.success(msg);
        const role = localStorage.getItem("userRole");
        const id = localStorage.getItem("userId");

        if (role === "admin") navigate(`/admin/${id}/dashboard/`);
        else if (role === "patient") navigate(`/patient/${id}/dashboard/`);
        else if (role === "donor") navigate(`/donor/${id}/dashboard/`);
        else navigate("/");
      }
    } catch (err) {
      toast.error("Something went wrong!");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center bg-transparent px-4 sm:px-8 lg:px-16 py-12">
      <AnimatedSection animation="slideUp" className="w-full max-w-7xl">
        <div className="w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Left - Icon */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="w-52 h-52 bg-primary-50 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
              <User className="w-28 h-28 text-primary-600" strokeWidth={1} />
            </div>
          </div>

          {/* Right - Form */}
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold font-heading text-center text-primary-600 mb-8">
              Login to Your Account
            </h2>
            <form className="space-y-5" onSubmit={handleLoginFormSubmit}>
              <FormInput
                label="Email"
                id="email"
                type="email"
                placeholder="Enter your email"
                name="email"
                value={userLoginData.email}
                onChange={handleDataChange}
              />

              <FormInput
                label="Password"
                id="password"
                type="password"
                placeholder="Enter your password"
                name="password"
                value={userLoginData.password}
                onChange={handleDataChange}
              />

              <div className="text-right">
                <a href="/forgot-password" className="text-sm text-secondary-600 dark:text-secondary-400 hover:underline">
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                loading={loading}
                className="w-full"
              >
                <LogIn className="w-5 h-5" />
                Login
              </Button>
            </form>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}

export default Login;
