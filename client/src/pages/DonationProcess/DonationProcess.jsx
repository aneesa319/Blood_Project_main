import AnimatedSection from '../../components/ui/AnimatedSection';
import { useNavigate } from 'react-router-dom';
import {
  ClipboardList,
  HeartPulse,
  Droplets,
  Coffee,
  Activity,
  PhoneCall,
  CreditCard,
  IdCard,
  UtensilsCrossed,
  ArrowRight,
  CheckCircle,
  XCircle,
} from 'lucide-react';

const steps = [
  {
    icon: ClipboardList,
    title: 'Registration',
    desc: 'Sign up online or at the donation center. Fill out a health questionnaire to get started.',
  },
  {
    icon: HeartPulse,
    title: 'Health Screening',
    desc: 'A quick check of your blood pressure, pulse, temperature, and hemoglobin levels.',
  },
  {
    icon: Droplets,
    title: 'Donation',
    desc: 'The actual blood draw takes only 8-10 minutes. A trained phlebotomist handles everything.',
  },
  {
    icon: Coffee,
    title: 'Refreshments',
    desc: 'Enjoy complimentary snacks and drinks while you rest for 10-15 minutes.',
  },
  {
    icon: Activity,
    title: 'Recovery',
    desc: 'Your body begins replacing the donated blood immediately. Full recovery within 24-48 hours.',
  },
  {
    icon: PhoneCall,
    title: 'Follow-Up',
    desc: 'We notify you when your blood is used and send reminders for your next eligible donation.',
  },
];

const bringItems = [
  { icon: IdCard, title: 'Photo ID', desc: 'A valid government-issued photo identification.' },
  { icon: CreditCard, title: 'Donor Card', desc: 'If you have one from a previous donation (optional).' },
  { icon: UtensilsCrossed, title: 'Full Stomach', desc: 'Eat a healthy meal and drink plenty of water before donating.' },
];

const beforeTips = [
  'Drink at least 16 oz of water before your appointment',
  'Eat a healthy meal rich in iron (spinach, red meat, beans)',
  'Get a good night\'s sleep (7-8 hours)',
  'Avoid fatty foods and alcohol for 24 hours',
  'Wear a shirt with sleeves that roll up easily',
];

const afterTips = [
  'Keep the bandage on for at least 4 hours',
  'Drink extra fluids for the next 24-48 hours',
  'Avoid heavy lifting or strenuous exercise for 24 hours',
  'If you feel dizzy, lie down with feet elevated',
  'Enjoy a healthy snack to replenish energy',
];

function DonationProcess() {
  const navigate = useNavigate();

  return (
    <div className="bg-transparent">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 dark:from-gray-900 dark:to-gray-800 text-white py-20 px-4 sm:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto text-center">
          <AnimatedSection animation="fadeIn">
            <p className="uppercase text-sm tracking-wider mb-2 text-primary-200">Step by Step</p>
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">The Donation Process</h1>
            <p className="text-lg text-primary-100 max-w-2xl mx-auto">
              Donating blood is safe, simple, and takes less than an hour. Here&apos;s everything you need to know from start to finish.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* 6-Step Timeline */}
      <section className="py-16 px-4 sm:px-8 lg:px-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection animation="fadeIn">
            <h2 className="section-heading text-center mb-12">6 Simple Steps</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <AnimatedSection key={step.title} animation="slideUp" delay={i * 0.1}>
                <div className="card group h-full text-center">
                  <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <div className="inline-block bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
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

      {/* What to Bring */}
      <section className="py-16 px-4 sm:px-8 lg:px-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection animation="fadeIn">
            <h2 className="section-heading text-center mb-12">What to Bring</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {bringItems.map((item, i) => (
              <AnimatedSection key={item.title} animation="scaleIn" delay={i * 0.15}>
                <div className="card group h-full text-center">
                  <div className="w-14 h-14 bg-secondary-100 dark:bg-secondary-900/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-7 h-7 text-secondary-600 dark:text-secondary-400" />
                  </div>
                  <h3 className="text-lg font-semibold font-heading dark:text-white mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Before & After Tips */}
      <section className="py-16 px-4 sm:px-8 lg:px-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection animation="fadeIn">
            <h2 className="section-heading text-center mb-12">Before & After Donation</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection animation="slideInLeft">
              <div className="card h-full">
                <h3 className="text-xl font-semibold font-heading dark:text-white mb-4 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-green-500" /> Before Donation
                </h3>
                <ul className="space-y-3">
                  {beforeTips.map((tip) => (
                    <li key={tip} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                      <span className="text-green-500 mt-1">&#10003;</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slideInRight">
              <div className="card h-full">
                <h3 className="text-xl font-semibold font-heading dark:text-white mb-4 flex items-center gap-2">
                  <XCircle className="w-6 h-6 text-primary-500" /> After Donation
                </h3>
                <ul className="space-y-3">
                  {afterTips.map((tip) => (
                    <li key={tip} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                      <span className="text-primary-500 mt-1">&#10003;</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-8 lg:px-16 bg-gray-50 dark:bg-gray-800">
        <AnimatedSection animation="slideUp">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="section-heading mb-4">Ready to Save Lives?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              The process is quick, safe, and incredibly rewarding. Start your journey today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button onClick={() => navigate('/registration')} className="btn-primary inline-flex items-center gap-2">
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

export default DonationProcess;
