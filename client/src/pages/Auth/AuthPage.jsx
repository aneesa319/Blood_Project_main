import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sendLoginDataUsingRedux } from '../../features/login/loginSlice';
import { sendVerificationCodeForRegistration, setEmailDirectly } from '../../features/register/registerSlice';
import FormInput from '../../components/ui/FormInput';
import Button from '../../components/ui/Button';
import AnimatedSection from '../../components/ui/AnimatedSection';
import { LogIn, UserPlus, User, Mail, RotateCw } from 'lucide-react';

function AuthPage() {
  const [activeTab, setActiveTab] = useState('login');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Login state
  const [userLoginData, setUserLoginData] = useState({ email: '', password: '' });
  const [loginLoading, setLoginLoading] = useState(false);

  // Register state
  const [regEmail, setRegEmail] = useState('');
  const [regStep, setRegStep] = useState('email'); // 'email' | 'verify'
  const [codeSent, setCodeSent] = useState(false);
  const { isLoading: regLoading, verificationCode, status: regStatus } = useSelector((state) => state.registerSlice);

  // OTP state
  const [otp, setOtp] = useState(['', '', '', '']);
  const [attempts, setAttempts] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // Countdown timer for resend
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  // Focus first OTP input when entering verify step
  useEffect(() => {
    if (regStep === 'verify' && inputRefs[0].current) {
      inputRefs[0].current.focus();
    }
  }, [regStep]);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setUserLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      const res = await dispatch(sendLoginDataUsingRedux(userLoginData));
      setUserLoginData({ email: '', password: '' });
      const { msg, status } = res.payload;
      if (status === 400) { toast.error(msg); return; }
      if (status === 200) {
        toast.success(msg);
        const role = localStorage.getItem('userRole');
        const id = localStorage.getItem('userId');
        if (role === 'admin') navigate(`/admin/${id}/dashboard/`);
        else if (role === 'patient') navigate(`/patient/${id}/dashboard/`);
        else if (role === 'donor') navigate(`/donor/${id}/dashboard/`);
        else navigate('/');
      }
    } catch (err) {
      toast.error('Something went wrong!');
      console.error('Login error:', err);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleSendCode = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(regEmail)) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Show OTP UI immediately
    setCodeSent(true);
    setOtp(['', '', '', '']);
    setAttempts(0);
    setCountdown(60);
    setTimeout(() => inputRefs[0].current?.focus(), 100);

    try {
      const res = await dispatch(sendVerificationCodeForRegistration({ email: regEmail }));
      const { status, message } = res.payload || {};

      if (status === 400) {
        toast.error(message || 'User already exists');
        setCodeSent(false);
        return;
      }

      if (status === 200) {
        toast.success('Verification code sent to your email!');
      }
    } catch (err) {
      toast.error('Failed to send verification code. Please try again.');
      setCodeSent(false);
      console.error(err);
    }
  };

  const handleResendCode = async () => {
    if (countdown > 0) return;
    setOtp(['', '', '', '']);
    setAttempts(0);
    setCountdown(60);
    setTimeout(() => inputRefs[0].current?.focus(), 100);

    try {
      const res = await dispatch(sendVerificationCodeForRegistration({ email: regEmail }));
      const { status } = res.payload || {};
      if (status === 200) {
        toast.success('New verification code sent!');
      }
    } catch (err) {
      toast.error('Failed to resend code');
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // only digits
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // only last digit
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    if (pasted.length === 4) {
      const newOtp = pasted.split('');
      setOtp(newOtp);
      inputRefs[3].current?.focus();
    }
  };

  const handleVerifyCode = () => {
    const enteredCode = otp.join('');

    if (enteredCode.length < 4) {
      toast.error('Please enter the complete 4-digit code');
      return;
    }

    if (attempts >= 4) {
      toast.error('Too many failed attempts. Please request a new code.');
      setOtp(['', '', '', '']);
      return;
    }

    if (String(verificationCode) === enteredCode) {
      toast.success('Code verified! Proceeding to registration...');
      dispatch(setEmailDirectly(regEmail));
      navigate('/registration/user-data');
    } else {
      setAttempts((prev) => prev + 1);
      toast.error(`Incorrect code. ${4 - attempts - 1} attempts remaining.`);
      setOtp(['', '', '', '']);
      inputRefs[0].current?.focus();
    }
  };

  const renderRegisterContent = () => {
    // Email step (with inline OTP after code sent)
    return (
      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left - Icon */}
        <div className="text-red-600 flex justify-center w-full md:w-1/2">
          <Mail className="w-40 h-40 sm:w-52 sm:h-52" strokeWidth={1} />
        </div>
        {/* Right - Form */}
        <div className="w-full md:w-1/2 text-center space-y-6">
          <h2 className="text-2xl font-bold font-heading text-primary-600">Create an Account</h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            Enter your email address to receive a verification code.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-[300px] px-6 py-3 border border-red-300 dark:border-red-600 rounded-full outline-none text-gray-800 dark:text-white dark:bg-gray-700 text-center"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendCode()}
              disabled={codeSent}
            />
            {!codeSent && (
              <button
                className="w-full sm:w-auto bg-gradient-to-r from-red-500 to-red-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-transform transform hover:scale-105 disabled:opacity-50"
                onClick={handleSendCode}
                disabled={regLoading}
              >
                {regLoading ? 'SENDING...' : 'SEND CODE'}
              </button>
            )}
          </div>

          {/* After code sent: show timer, resend, and OTP inputs */}
          {codeSent && (
            <div className="space-y-5">
              {/* Timer & Resend */}
              <div className="flex items-center justify-center gap-2 text-sm">
                {countdown > 0 ? (
                  <span className="text-gray-500 dark:text-gray-400">Resend code in <span className="font-bold text-primary-600">{countdown}s</span></span>
                ) : (
                  <button
                    onClick={handleResendCode}
                    disabled={regLoading}
                    className="text-primary-600 font-semibold hover:underline flex items-center gap-1"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    Resend Code
                  </button>
                )}
              </div>

              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Enter the 4-digit code sent to your email
              </p>

              {/* OTP Inputs */}
              <div className="flex justify-center gap-3" onPaste={handleOtpPaste}>
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={inputRefs[i]}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className="w-14 h-16 text-center text-2xl font-bold border-2 border-gray-300 dark:border-gray-600 rounded-xl outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                  />
                ))}
              </div>

              {/* Verify Button */}
              <button
                onClick={handleVerifyCode}
                disabled={otp.join('').length < 4}
                className="w-full max-w-xs mx-auto bg-gradient-to-r from-red-500 to-red-700 text-white py-3 rounded-xl text-lg font-semibold transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed block"
              >
                Verify & Continue
              </button>

              {/* Change email */}
              <button
                onClick={() => { setCodeSent(false); setRegStep('email'); setOtp(['', '', '', '']); setAttempts(0); setCountdown(0); }}
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                Change email address
              </button>
            </div>
          )}

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{' '}
            <button onClick={() => setActiveTab('login')} className="text-primary-600 font-semibold hover:underline">Login</button>
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-grow flex items-center justify-center bg-transparent px-4 sm:px-8 lg:px-16 py-12">
      <AnimatedSection animation="slideUp" className="w-full max-w-5xl">
        <div className="w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => { setActiveTab('login'); setRegStep('email'); setCodeSent(false); }}
              className={`flex-1 py-4 text-center font-bold text-lg transition-all ${
                activeTab === 'login'
                  ? 'text-primary-600 border-b-3 border-primary-600 bg-primary-50/50 dark:bg-primary-900/20'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <LogIn className="w-5 h-5 inline-block mr-2 -mt-0.5" />
              Login
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-4 text-center font-bold text-lg transition-all ${
                activeTab === 'register'
                  ? 'text-primary-600 border-b-3 border-primary-600 bg-primary-50/50 dark:bg-primary-900/20'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <UserPlus className="w-5 h-5 inline-block mr-2 -mt-0.5" />
              Register
            </button>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            {activeTab === 'login' ? (
              <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                {/* Left - Icon */}
                <div className="w-full md:w-1/2 flex justify-center">
                  <div className="w-40 h-40 bg-primary-50 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                    <User className="w-20 h-20 text-primary-600" strokeWidth={1} />
                  </div>
                </div>
                {/* Right - Form */}
                <div className="w-full md:w-1/2">
                  <h2 className="text-2xl font-bold font-heading text-center text-primary-600 mb-6">
                    Login to Your Account
                  </h2>
                  <form className="space-y-5" onSubmit={handleLoginSubmit}>
                    <FormInput label="Email" id="login-email" type="email" placeholder="Enter your email" name="email" value={userLoginData.email} onChange={handleLoginChange} />
                    <FormInput label="Password" id="login-password" type="password" placeholder="Enter your password" name="password" value={userLoginData.password} onChange={handleLoginChange} />
                    <div className="text-right">
                      <a href="/forgot-password" className="text-sm text-secondary-600 dark:text-secondary-400 hover:underline">Forgot password?</a>
                    </div>
                    <Button type="submit" loading={loginLoading} className="w-full">
                      <LogIn className="w-5 h-5" /> Login
                    </Button>
                  </form>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                    Don&apos;t have an account?{' '}
                    <button onClick={() => setActiveTab('register')} className="text-primary-600 font-semibold hover:underline">Register</button>
                  </p>
                </div>
              </div>
            ) : (
              renderRegisterContent()
            )}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}

export default AuthPage;
