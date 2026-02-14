import AnimatedSection from '../../components/ui/AnimatedSection';
import { useNavigate } from 'react-router-dom';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { Heart, Users, Droplets, Clock } from 'lucide-react';

const stats = [
  { icon: Droplets, value: 5000, suffix: '+', label: 'Units Collected' },
  { icon: Users, value: 3200, suffix: '+', label: 'Active Donors' },
  { icon: Heart, value: 1500, suffix: '+', label: 'Lives Saved' },
  { icon: Clock, value: 24, suffix: '/7', label: 'Support Available' },
];

const cards = [
  { title: 'Inspiring people to give blood', desc: 'Our platform uses real-time data and smart alerts to encourage timely donations when they\'re needed most.' },
  { title: 'Producing a safe and ready blood supply', desc: 'LifeSaver ensures high-quality matches between donors and recipients, minimizing waste and boosting safety.' },
  { title: 'Increasing communication with our members', desc: 'We keep donors engaged with smart reminders, feedback, and transparent tracking of their impact.' },
  { title: 'Offering specialized patient services', desc: 'Our algorithm supports rare blood type requests, ensuring every patient receives compatible and timely support.' },
  { title: 'Specialist blood donors and clinical supervision', desc: 'The system identifies high-value donors for critical cases, all under expert medical oversight.' },
  { title: 'High quality assessment, diagnosis and treatment', desc: 'From eligibility checks to donation analytics, LifeSaver reinforces every step with technology and care.' },
];

function FifthComponent() {
  const navigate = useNavigate();
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section className="bg-gray-50 dark:bg-gray-800 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <AnimatedSection animation="fadeIn" className="text-center mb-12">
          <h2 className="section-heading">Ways to Help</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Join the LifeSaver System in transforming lives through smart, compassionate donation.
          </p>
        </AnimatedSection>

        {/* Stats Row */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <AnimatedSection key={stat.label} animation="bounceIn" delay={i * 0.1}>
              <div className="card text-center">
                <stat.icon className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                <div className="text-3xl font-bold font-heading text-gray-800 dark:text-white">
                  {statsInView ? (
                    <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} />
                  ) : (
                    `0${stat.suffix}`
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <AnimatedSection key={card.title} animation="slideUp" delay={i * 0.1}>
              <div className="card hover:border-primary-200 dark:hover:border-primary-700 border border-transparent">
                <h3 className="text-xl font-semibold font-heading text-gray-800 dark:text-white mb-4">
                  {card.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{card.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection animation="slideUp" className="text-center mt-12">
          <button onClick={() => navigate('/registration')} className="btn-primary">Become a Donor Today</button>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default FifthComponent;
