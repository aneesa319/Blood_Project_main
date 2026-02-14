import AnimatedSection from '../../components/ui/AnimatedSection';
import { MapPin, Calendar, Clock, LogIn, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function SevenComponent() {
  const navigate = useNavigate();

  return (
    <section className="py-16 px-6 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left - Image */}
          <AnimatedSection animation="slideInLeft">
            <div className="h-80 md:h-full">
              <img
                src="/images/home/sevencomponent/donor-day.png"
                alt="Blood Donation in Pakistan"
                className="w-full h-full object-cover"
              />
            </div>
          </AnimatedSection>

          {/* Right - Text */}
          <AnimatedSection animation="slideInRight" delay={0.2}>
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <h1 className="text-3xl md:text-4xl font-bold font-heading text-primary-600 mb-4">
                WORLD BLOOD DONOR DAY
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                World Blood Donor Day celebrates the lifesaving contributions of blood donors and raises awareness of the ongoing need for safe blood donations worldwide.
              </p>

              <h2 className="text-2xl font-bold font-heading text-gray-800 dark:text-white mb-4">
                Get Started Today!
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Mardan, Peshawar, Lahore, Karachi, Islamabad - Active across Pakistan
                  </span>
                </div>
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">14 June</span>
                </div>
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Open 24/7 for all cities</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <button
                  onClick={() => navigate('/login')}
                  className="btn-primary inline-flex items-center justify-center gap-2"
                >
                  <LogIn className="w-5 h-5" /> Login
                </button>
                <button
                  onClick={() => navigate('/registration')}
                  className="btn-secondary inline-flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-5 h-5" /> Register
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4 text-center border-t dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Join LifeSaver in celebrating this important day and help save lives across Pakistan!
          </p>
        </div>
      </div>
    </section>
  );
}

export default SevenComponent;
