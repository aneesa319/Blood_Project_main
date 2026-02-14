import { useState } from "react";
import MyIcon from "./MyIcon";
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch, useSelector} from "react-redux";
import { setEmailDirectly } from "../../features/register/registerSlice";

function Registration_Email() {
  const [email,setEmail] = useState('');
  const navigate = useNavigate();
  const {isLoading,status} = useSelector((state) => state.registerSlice);
  console.log("status in reg",status)
  const dispatch = useDispatch();

  const handleSendEmail = () => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
      toast.error("Incomplete email: missing @ or .com")
      return;
    }

    // Store email in Redux and skip email verification
    dispatch(setEmailDirectly(email));
    toast.success("Proceeding to registration form");
    navigate('/registration/user-data');
    setEmail("");
  }
  return (
    <div className="flex-grow flex items-center justify-center bg-transparent px-4 sm:px-8 lg:px-16 py-12">
      <div className="max-w-7xl w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left - Icon */}
        <div className="text-red-600 flex justify-center w-full md:w-1/2">
          <MyIcon />
        </div>

        {/* Right - Form */}
        <div className="w-full md:w-1/2 text-center space-y-6 px-4">
          <h2 className="text-red-600 text-3xl font-bold">Create an Account</h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            Enter your email address to begin the registration process.
          </p>

          {/* Input */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-[350px] px-6 py-3 border border-red-300 dark:border-red-600 rounded-full outline-none text-gray-800 dark:text-white dark:bg-gray-700 text-center"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            <button
              className="w-full sm:w-auto bg-gradient-to-r from-red-500 to-red-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-transform transform hover:scale-105"
              onClick={handleSendEmail}
              disabled={isLoading}
            >
              REGISTER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration_Email;
