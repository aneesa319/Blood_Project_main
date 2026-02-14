import AnimatedSection from '../../components/ui/AnimatedSection';
import { useNavigate } from 'react-router-dom';
import { MapPin, ClipboardList, CheckCircle } from 'lucide-react';

function SixthComponent() {
  const navigate = useNavigate();
  return (
    <section id="donation-info" className="py-16 px-6 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection animation="fadeIn">
          <h2 className="section-heading text-center mb-12">Donation Information</h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Donation Locations */}
          <AnimatedSection animation="slideUp" delay={0}>
            <div className="card group h-full">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <MapPin className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold font-heading text-gray-800 dark:text-white mb-2">
                  Donation Locations
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                LifeSaver recommends the nearest donation centers based on your current location and real-time demand.
              </p>
              <div className="mt-4 bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
                <h4 className="font-medium text-primary-700 dark:text-primary-400 mb-2">LOCATIONS</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Use our smart search to find compatible donors near you instantly.</p>
              </div>
            </div>
          </AnimatedSection>

          {/* Donation Process */}
          <AnimatedSection animation="slideUp" delay={0.15}>
            <div className="card group h-full">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <ClipboardList className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold font-heading text-gray-800 dark:text-white mb-2">
                  The Donation Process
                </h3>
              </div>
              <ul className="text-gray-600 dark:text-gray-400 space-y-2">
                {[
                  'Register quickly through the LifeSaver platform',
                  'Streamlined health screening & eligibility checks',
                  'Smart queueing and appointment scheduling',
                  'Recovery and feedback via donor dashboard',
                ].map((item) => (
                  <li key={item} className="flex items-start">
                    <span className="text-primary-500 mr-2 mt-1">&#8226;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          {/* Eligibility */}
          <AnimatedSection animation="slideUp" delay={0.3}>
            <div className="card group h-full">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <CheckCircle className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold font-heading text-gray-800 dark:text-white mb-2">
                  Eligibility Requirements
                </h3>
              </div>
              <ul className="text-gray-600 dark:text-gray-400 space-y-2">
                {[
                  'Minimum age 17 (or 16 with consent)',
                  'Weigh 110 lbs or more',
                  'General good health',
                  'No recent tattoos/piercings (may vary)',
                  'Photo ID required',
                ].map((item) => (
                  <li key={item} className="flex items-start">
                    <span className="text-primary-500 mr-2 mt-1">&#8226;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>

        {/* CTA Buttons */}
        <AnimatedSection animation="slideUp" className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
          <button onClick={() => navigate('/compatible-search')} className="btn-primary">Find a Location</button>
          <button onClick={() => navigate('/eligibility')} className="btn-secondary">Check Eligibility</button>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default SixthComponent;
