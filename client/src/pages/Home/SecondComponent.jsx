import AnimatedSection from '../../components/ui/AnimatedSection';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';

function SecondComponent() {
  const navigate = useNavigate();
  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-white dark:bg-gray-900 px-6 lg:px-16 py-12 max-w-7xl mx-auto">
      {/* Left - Image */}
      <AnimatedSection animation="slideInLeft" className="w-full md:w-1/2 mb-8 md:mb-0">
        <img
          src="/images/home/secondcomponent.png"
          alt="Doctor holding baby"
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </AnimatedSection>

      {/* Right - Text */}
      <AnimatedSection animation="slideInRight" delay={0.2} className="w-full md:w-1/2 text-center md:text-left px-4">
        <p className="text-sm uppercase text-secondary-600 dark:text-secondary-400 font-semibold tracking-wide">
          Make an impact
        </p>
        <h2 className="section-heading mt-2">Who We Are</h2>
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
          We are a dedicated nonprofit blood donation center committed to saving lives and strengthening communities
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          We believe in the power of community and the life-saving impact of blood donation. Our mission is to ensure a steady supply of safe and accessible blood for patients in need. We are dedicated to raising awareness about the importance of blood donation and providing support to donors throughout their journey.
        </p>
        <button onClick={() => navigate('/login')} className="btn-primary inline-flex items-center gap-2">
          <Heart className="w-5 h-5" />
          Donate Now
        </button>
      </AnimatedSection>
    </section>
  );
}

export default SecondComponent;
