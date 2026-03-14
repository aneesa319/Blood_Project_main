import AnimatedSection from '../../components/ui/AnimatedSection';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

function FourthComponent() {
  const navigate = useNavigate();
  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-white dark:bg-gray-900 px-6 py-12 md:py-24 max-w-7xl mx-auto">
      {/* Left - Text Content */}
      <AnimatedSection animation="slideInLeft" className="w-full md:w-1/2 text-center md:text-left px-4 md:px-8">
        <h1 className="text-4xl md:text-5xl font-bold font-heading text-gray-800 dark:text-white mb-6">
          Our Commitment to Saving Lives
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          LifeSaver System is committed to revolutionizing blood donation with smart technology and a compassionate approach.
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          We believe that every drop counts. Our intelligent donor recommendation system matches recipients with the most suitable donors based on real-time availability, blood type compatibility, and location.
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Through innovation, community engagement, and transparency, we aim to eliminate delays in critical situations and ensure a seamless donation experience for both donors and recipients across the country.
        </p>
        <button onClick={() => navigate('/about')} className="btn-primary inline-flex items-center gap-2">
          Read More <ArrowRight className="w-5 h-5" />
        </button>
      </AnimatedSection>

      {/* Right - Image with parallax effect */}
      <AnimatedSection animation="slideInRight" delay={0.2} className="w-full md:w-1/2 mt-12 md:mt-0 px-4">
        <div className="relative group">
          <img
            src="/images/home/fourthcomponent/1.png"
            alt="LifeSaver System Commitment"
            className="rounded-lg shadow-lg w-full h-96 md:h-[500px] object-cover group-hover:shadow-2xl transition-shadow duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 italic">
          Empowering communities through intelligent blood donation technology.
        </p>
      </AnimatedSection>
    </section>
  );
}

export default FourthComponent;
