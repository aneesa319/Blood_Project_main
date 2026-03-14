import { useState } from 'react';
import AnimatedSection from '../../components/ui/AnimatedSection';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import {
  UserPlus,
  MapPin,
  Heart,
  Droplets,
  Layers,
  FlaskConical,
  Syringe,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

const simpleSteps = [
  {
    icon: UserPlus,
    title: 'Sign Up',
    desc: 'Create your free account on LifeSaver in under 2 minutes. Fill in basic details and complete your health questionnaire.',
    color: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    icon: MapPin,
    title: 'Find a Center',
    desc: 'Use our smart search to find the nearest donation center or upcoming blood drive event in your area.',
    color: 'bg-green-100 dark:bg-green-900/30',
    iconColor: 'text-green-600 dark:text-green-400',
  },
  {
    icon: Heart,
    title: 'Donate & Save',
    desc: 'Visit the center, complete a quick screening, and donate. The entire process takes about 45-60 minutes.',
    color: 'bg-primary-100 dark:bg-primary-900/30',
    iconColor: 'text-primary-600',
  },
];

const donationTypes = [
  {
    icon: Droplets,
    title: 'Whole Blood',
    desc: 'The most common type of donation. About 1 pint is collected and can be separated into red cells, platelets, and plasma.',
    time: '~10 minutes',
    frequency: 'Every 56 days',
  },
  {
    icon: Layers,
    title: 'Platelets',
    desc: 'Platelets are tiny cells that help form clots and stop bleeding. Essential for cancer patients and surgical procedures.',
    time: '~2-3 hours',
    frequency: 'Every 7 days',
  },
  {
    icon: FlaskConical,
    title: 'Plasma',
    desc: 'Plasma carries water, salts, and enzymes. Used for patients with burns, shock, trauma, and liver conditions.',
    time: '~1-2 hours',
    frequency: 'Every 28 days',
  },
  {
    icon: Syringe,
    title: 'Double Red Cells',
    desc: 'Two units of red cells are collected while returning platelets and plasma. Ideal for O-negative and O-positive donors.',
    time: '~30 minutes',
    frequency: 'Every 112 days',
  },
];

const stats = [
  { value: 4700000, suffix: '+', label: 'Lives Saved Annually' },
  { value: 1, suffix: '', label: 'Donation Saves Up to 3 Lives', displayValue: '1 Donation = 3 Lives' },
  { value: 43000, suffix: '+', label: 'Pints Needed Daily' },
  { value: 38, suffix: '%', label: 'Of Population Is Eligible' },
];

const faqs = [
  {
    q: 'How long does a blood donation take?',
    a: 'The actual blood draw takes about 8-10 minutes. Including registration, screening, and refreshments, plan for about 45-60 minutes total.',
  },
  {
    q: 'Does donating blood hurt?',
    a: 'You may feel a brief pinch when the needle is inserted, but the donation itself is painless. Most donors describe the experience as comfortable.',
  },
  {
    q: 'How often can I donate blood?',
    a: 'For whole blood, you can donate every 56 days (about 8 weeks). Platelet donors can give every 7 days, up to 24 times per year.',
  },
  {
    q: 'Can I donate if I have a tattoo?',
    a: 'In most cases, yes! If your tattoo was done at a licensed facility, you may be eligible after 3 months. Policies vary by location.',
  },
  {
    q: 'What should I do after donating?',
    a: 'Drink extra fluids, avoid heavy lifting for 24 hours, and keep your bandage on for at least 4 hours. Most people feel fine immediately after.',
  },
];

function HowToDonate() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  const { ref: statsRef, inView: statsInView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <div className="bg-transparent">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 dark:from-gray-900 dark:to-gray-800 text-white py-20 px-4 sm:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto text-center">
          <AnimatedSection animation="fadeIn">
            <p className="uppercase text-sm tracking-wider mb-2 text-primary-200">Get Started</p>
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">How to Donate Blood</h1>
            <p className="text-lg text-primary-100 max-w-2xl mx-auto">
              Giving blood is one of the simplest ways to make a life-saving impact. Here&apos;s how you can get started today.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* 3 Simple Steps */}
      <section className="py-16 px-4 sm:px-8 lg:px-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection animation="fadeIn">
            <h2 className="section-heading text-center mb-12">3 Simple Steps</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {simpleSteps.map((step, i) => (
              <AnimatedSection key={step.title} animation="slideUp" delay={i * 0.15}>
                <div className="card group h-full text-center">
                  <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className={`w-8 h-8 ${step.iconColor}`} />
                  </div>
                  <div className="inline-block bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-bold px-3 py-1 rounded-full mb-3">
                    Step {i + 1}
                  </div>
                  <h3 className="text-xl font-semibold font-heading dark:text-white mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Types of Donation */}
      <section className="py-16 px-4 sm:px-8 lg:px-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection animation="fadeIn">
            <h2 className="section-heading text-center mb-4">Types of Blood Donation</h2>
            <p className="text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto mb-12">
              There are several ways to donate, each helping patients with different medical needs.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {donationTypes.map((type, i) => (
              <AnimatedSection key={type.title} animation="slideUp" delay={i * 0.1}>
                <div className="card h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center shrink-0">
                      <type.icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold font-heading dark:text-white mb-2">{type.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">{type.desc}</p>
                      <div className="flex flex-wrap gap-3">
                        <span className="text-xs bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 px-3 py-1 rounded-full font-medium">
                          {type.time}
                        </span>
                        <span className="text-xs bg-secondary-50 dark:bg-secondary-900/20 text-secondary-700 dark:text-secondary-400 px-3 py-1 rounded-full font-medium">
                          {type.frequency}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 px-4 sm:px-8 lg:px-16 bg-gradient-to-r from-primary-600 to-primary-800 dark:from-gray-900 dark:to-gray-800 text-white" ref={statsRef}>
        <div className="max-w-7xl mx-auto">
          <AnimatedSection animation="fadeIn">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-12">The Impact of Donation</h2>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <AnimatedSection key={stat.label} animation="scaleIn" delay={i * 0.1}>
                <div>
                  <p className="text-3xl md:text-4xl font-bold font-heading">
                    {stat.displayValue ? (
                      stat.displayValue
                    ) : statsInView ? (
                      <><CountUp end={stat.value} duration={2.5} separator="," />{stat.suffix}</>
                    ) : (
                      '0'
                    )}
                  </p>
                  <p className="text-primary-200 dark:text-gray-400 text-sm mt-2">{stat.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-8 lg:px-16 bg-white dark:bg-gray-900">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection animation="fadeIn">
            <h2 className="section-heading text-center mb-12">Frequently Asked Questions</h2>
          </AnimatedSection>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <AnimatedSection key={i} animation="slideUp" delay={i * 0.08}>
                <div className="card cursor-pointer" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold dark:text-white pr-4">{faq.q}</h3>
                    {openFaq === i ? (
                      <ChevronUp className="w-5 h-5 text-primary-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                    )}
                  </div>
                  {openFaq === i && (
                    <p className="text-gray-600 dark:text-gray-400 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                      {faq.a}
                    </p>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-8 lg:px-16 bg-gray-50 dark:bg-gray-800">
        <AnimatedSection animation="slideUp">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="section-heading mb-4">Start Your Journey Today</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Every donation counts. Register now and become a life-saving hero.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button onClick={() => navigate('/login')} className="btn-primary inline-flex items-center gap-2">
                Register to Donate <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => navigate('/eligibility')} className="btn-secondary">
                Check Eligibility
              </button>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}

export default HowToDonate;
