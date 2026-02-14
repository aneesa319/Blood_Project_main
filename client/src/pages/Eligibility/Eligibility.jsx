import AnimatedSection from '../../components/ui/AnimatedSection';
import { useNavigate } from 'react-router-dom';
import {
  UserCheck,
  Scale,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
  Cigarette,
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight,
} from 'lucide-react';

const quickChecks = [
  { icon: UserCheck, title: 'Age 17+', desc: 'You must be at least 17 years old (16 with parental consent in some areas).' },
  { icon: Scale, title: 'Weight 110+ lbs', desc: 'You must weigh at least 110 pounds (50 kg) to donate safely.' },
  { icon: HeartPulse, title: 'Good Health', desc: 'You should be feeling well and in general good health on the day of donation.' },
];

const categories = [
  {
    icon: ShieldCheck,
    title: 'General Requirements',
    items: [
      'Valid photo identification required',
      'No cold, flu, or fever on donation day',
      'Normal blood pressure and pulse',
      'Hemoglobin level meets minimum threshold',
      'No recent dental surgery (72 hours)',
    ],
  },
  {
    icon: Stethoscope,
    title: 'Medical Conditions',
    items: [
      'No history of hepatitis B or C',
      'Not currently on antibiotics',
      'No blood clotting disorders',
      'Diabetes managed with medication is OK',
      'Heart conditions may require doctor clearance',
    ],
  },
  {
    icon: Cigarette,
    title: 'Lifestyle Factors',
    items: [
      'No new tattoos or piercings in last 3 months',
      'No recent travel to malaria-endemic areas',
      'Must not be under the influence of alcohol',
      'Pregnancy: wait 6 weeks after delivery',
      'Breastfeeding mothers may be eligible',
    ],
  },
  {
    icon: Clock,
    title: 'Donation Intervals',
    items: [
      'Whole blood: every 56 days (8 weeks)',
      'Platelets: every 7 days (up to 24x/year)',
      'Plasma: every 28 days',
      'Double red cells: every 112 days',
      'Power red: every 112 days',
    ],
  },
];

const myths = [
  { myth: 'Donating blood is painful.', fact: 'You may feel a brief pinch. The actual donation is painless and takes 8-10 minutes.' },
  { myth: 'I can get diseases from donating.', fact: 'All equipment is sterile and single-use. There is zero risk of infection from donating.' },
  { myth: 'I don\'t have enough blood to spare.', fact: 'Your body has about 10 pints of blood and only 1 pint is taken. It regenerates quickly.' },
  { myth: 'Donating makes you weak for weeks.', fact: 'Most people feel fine immediately. Full fluid replacement happens within 24-48 hours.' },
];

function Eligibility() {
  const navigate = useNavigate();

  return (
    <div className="bg-transparent">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 dark:from-gray-900 dark:to-gray-800 text-white py-20 px-4 sm:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto text-center">
          <AnimatedSection animation="fadeIn">
            <p className="uppercase text-sm tracking-wider mb-2 text-primary-200">Am I Eligible?</p>
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">Eligibility Requirements</h1>
            <p className="text-lg text-primary-100 max-w-2xl mx-auto">
              Find out if you can donate blood. Most healthy adults are eligible — check the requirements below.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Quick Check */}
      <section className="py-16 px-4 sm:px-8 lg:px-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection animation="fadeIn">
            <h2 className="section-heading text-center mb-12">Quick Eligibility Check</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quickChecks.map((item, i) => (
              <AnimatedSection key={item.title} animation="scaleIn" delay={i * 0.15}>
                <div className="card group h-full text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold font-heading dark:text-white mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Requirements */}
      <section className="py-16 px-4 sm:px-8 lg:px-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection animation="fadeIn">
            <h2 className="section-heading text-center mb-12">Detailed Requirements</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((cat, i) => (
              <AnimatedSection key={cat.title} animation="slideUp" delay={i * 0.1}>
                <div className="card h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                      <cat.icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-semibold font-heading dark:text-white">{cat.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                        <CheckCircle className="w-4 h-4 text-primary-500 mt-1 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Myths vs Facts */}
      <section className="py-16 px-4 sm:px-8 lg:px-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection animation="fadeIn">
            <h2 className="section-heading text-center mb-12">Myths vs Facts</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {myths.map((item, i) => (
              <AnimatedSection key={i} animation="slideUp" delay={i * 0.1}>
                <div className="card h-full">
                  <div className="flex items-start gap-3 mb-3">
                    <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-gray-800 dark:text-gray-200 font-medium">{item.myth}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                    <p className="text-gray-600 dark:text-gray-400">{item.fact}</p>
                  </div>
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
            <h2 className="section-heading mb-4">Meet the Requirements?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              If you meet the basic criteria above, you&apos;re likely eligible to donate. Register now and save lives!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button onClick={() => navigate('/registration')} className="btn-primary inline-flex items-center gap-2">
                Register Now <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => navigate('/donation-process')} className="btn-secondary">
                Learn the Process
              </button>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}

export default Eligibility;
