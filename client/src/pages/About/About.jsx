import AnimatedSection from "../../components/ui/AnimatedSection";
import BloodCompatibilityChart from "../../components/ui/BloodCompatibilityChart";
import { Droplets, Users, HeadphonesIcon } from "lucide-react";

function About() {
  return (
    <div className="bg-transparent px-4 sm:px-8 lg:px-16 py-12">
      <div className="max-w-7xl mx-auto text-center">
        <AnimatedSection animation="fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-primary-600 mb-6">
            About LifeSaver System
          </h1>
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-12 text-lg">
            LifeSaver System is committed to saving lives through intelligent donor-recipient matching. We believe in the power of technology to connect those in need with those who are ready to help.
          </p>
        </AnimatedSection>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* Mission */}
        <AnimatedSection animation="slideUp" delay={0}>
          <div className="card text-center h-full">
            <div className="flex items-center justify-center mb-4">
              <Droplets className="w-16 h-16 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold font-heading text-primary-600 mb-2">Our Mission</h3>
            <p className="text-gray-600 dark:text-gray-400">
              To build a reliable, fast, and transparent system for matching donors with recipients to save as many lives as possible.
            </p>
          </div>
        </AnimatedSection>

        {/* Team */}
        <AnimatedSection animation="slideUp" delay={0.15}>
          <div className="card text-center h-full">
            <div className="flex items-center justify-center mb-4">
              <Users className="w-16 h-16 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold font-heading text-primary-600 mb-2">Our Team</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Founded by Muhammad Ashiq, and Aneesa Inayat our passionate team is driven by a mission to help humanity.
            </p>
          </div>
        </AnimatedSection>

        {/* Support */}
        <AnimatedSection animation="slideUp" delay={0.3}>
          <div className="card text-center h-full">
            <div className="flex items-center justify-center mb-4">
              <HeadphonesIcon className="w-16 h-16 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold font-heading text-primary-600 mb-2">24/7 Support</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Whether you are a donor or recipient, we're here to support you anytime. Reach us at{' '}
              <a href="mailto:support@lifesaver.com" className="text-primary-500 hover:underline">
                support@lifesaver.com
              </a>.
            </p>
          </div>
        </AnimatedSection>
      </div>

      {/* Blood Compatibility Chart */}
      <div className="max-w-5xl mx-auto">
        <AnimatedSection animation="slideUp">
          <h2 className="section-heading text-center mb-6">Blood Type Compatibility Chart</h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
            Understanding which blood types are compatible is critical for safe transfusions.
          </p>
          <BloodCompatibilityChart />
        </AnimatedSection>
      </div>
    </div>
  );
}

export default About;
