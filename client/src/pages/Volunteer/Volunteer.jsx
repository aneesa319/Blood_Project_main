import { useState } from 'react';
import AnimatedSection from '../../components/ui/AnimatedSection';
import FormInput from '../../components/ui/FormInput';
import Button from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { toast } from 'react-toastify';
import {
  Megaphone,
  HeartHandshake,
  BarChart3,
  Sparkles,
  Users,
  Award,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';

const roles = [
  {
    icon: Megaphone,
    title: 'Community Outreach',
    desc: 'Spread the word about blood donation in your community. Organize local events, distribute flyers, and connect with schools and businesses.',
    tasks: ['Organize local drives', 'Visit schools & colleges', 'Social media campaigns'],
  },
  {
    icon: HeartHandshake,
    title: 'Donor Support',
    desc: 'Help donors feel comfortable at donation centers. Greet them, assist with paperwork, and provide refreshments during recovery.',
    tasks: ['Welcome & guide donors', 'Assist with check-in', 'Provide post-donation care'],
  },
  {
    icon: BarChart3,
    title: 'Data & Operations',
    desc: 'Support behind-the-scenes operations. Help manage donor databases, schedule appointments, and track inventory levels.',
    tasks: ['Data entry & management', 'Appointment scheduling', 'Inventory coordination'],
  },
];

const benefits = [
  { icon: Sparkles, title: 'Make Impact', desc: 'Every hour you volunteer helps save multiple lives. Your contribution directly supports life-saving operations.' },
  { icon: Users, title: 'Join Community', desc: 'Connect with like-minded individuals passionate about making a difference. Build lasting friendships and networks.' },
  { icon: TrendingUp, title: 'Gain Experience', desc: 'Develop valuable skills in healthcare, event management, communication, and leadership.' },
  { icon: Award, title: 'Get Recognized', desc: 'Receive certificates, recommendations, and recognition for your volunteer hours and achievements.' },
];

const volunteerStats = [
  { value: 500, suffix: '+', label: 'Active Volunteers' },
  { value: 10000, suffix: '+', label: 'Hours Contributed' },
  { value: 50, suffix: '+', label: 'Events Organized' },
  { value: 25, suffix: '+', label: 'Cities Covered' },
];

function Volunteer() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    message: '',
  });
  const { ref: statsRef, inView: statsInView } = useInView({ triggerOnce: true, threshold: 0.3 });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.city) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      toast.success('Thank you for your interest! We\'ll be in touch soon.');
      setFormData({ name: '', email: '', phone: '', city: '', message: '' });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-transparent">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 dark:from-gray-900 dark:to-gray-800 text-white py-20 px-4 sm:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto text-center">
          <AnimatedSection animation="fadeIn">
            <p className="uppercase text-sm tracking-wider mb-2 text-primary-200">Join Our Team</p>
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">Volunteer Program</h1>
            <p className="text-lg text-primary-100 max-w-2xl mx-auto">
              You don&apos;t need to donate blood to save lives. Volunteer your time and skills to make a difference.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Volunteer Roles */}
      <section className="py-16 px-4 sm:px-8 lg:px-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection animation="fadeIn">
            <h2 className="section-heading text-center mb-12">Volunteer Roles</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {roles.map((role, i) => (
              <AnimatedSection key={role.title} animation="slideUp" delay={i * 0.15}>
                <div className="card group h-full">
                  <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <role.icon className="w-7 h-7 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold font-heading dark:text-white mb-2">{role.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{role.desc}</p>
                  <ul className="space-y-1">
                    {role.tasks.map((task) => (
                      <li key={task} className="text-sm text-gray-500 dark:text-gray-500 flex items-center gap-2">
                        <span className="text-primary-500">&#8226;</span> {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Volunteer */}
      <section className="py-16 px-4 sm:px-8 lg:px-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection animation="fadeIn">
            <h2 className="section-heading text-center mb-12">Why Volunteer With Us?</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((item, i) => (
              <AnimatedSection key={item.title} animation="scaleIn" delay={i * 0.1}>
                <div className="card group h-full text-center">
                  <div className="w-14 h-14 bg-secondary-100 dark:bg-secondary-900/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-7 h-7 text-secondary-600 dark:text-secondary-400" />
                  </div>
                  <h3 className="text-lg font-semibold font-heading dark:text-white mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 px-4 sm:px-8 lg:px-16 bg-gradient-to-r from-secondary-600 to-secondary-800 dark:from-gray-900 dark:to-gray-800 text-white" ref={statsRef}>
        <div className="max-w-7xl mx-auto">
          <AnimatedSection animation="fadeIn">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-12">Our Volunteer Impact</h2>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {volunteerStats.map((stat, i) => (
              <AnimatedSection key={stat.label} animation="scaleIn" delay={i * 0.1}>
                <div>
                  <p className="text-3xl md:text-4xl font-bold font-heading">
                    {statsInView ? (
                      <><CountUp end={stat.value} duration={2.5} separator="," />{stat.suffix}</>
                    ) : (
                      '0'
                    )}
                  </p>
                  <p className="text-secondary-200 dark:text-gray-400 text-sm mt-2">{stat.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Form */}
      <section className="py-16 px-4 sm:px-8 lg:px-16 bg-white dark:bg-gray-900">
        <div className="max-w-2xl mx-auto">
          <AnimatedSection animation="fadeIn">
            <h2 className="section-heading text-center mb-4">Express Your Interest</h2>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
              Fill out the form below and our team will reach out to you with the next steps.
            </p>
          </AnimatedSection>

          <AnimatedSection animation="slideUp" delay={0.2}>
            <div className="card">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormInput
                    label="Full Name *"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                  />
                  <FormInput
                    label="Email *"
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormInput
                    label="Phone"
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your phone number"
                  />
                  <FormInput
                    label="City *"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Your city"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us why you want to volunteer..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition"
                  />
                </div>
                <Button type="submit" loading={loading} className="w-full">
                  Submit Interest
                </Button>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-8 lg:px-16 bg-gray-50 dark:bg-gray-800">
        <AnimatedSection animation="slideUp">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="section-heading mb-4">Other Ways to Help</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Can&apos;t volunteer? You can still make a difference by donating blood or spreading awareness.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button onClick={() => navigate('/registration')} className="btn-primary inline-flex items-center gap-2">
                Donate Blood <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => navigate('/spread-awareness')} className="btn-secondary">
                Spread Awareness
              </button>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}

export default Volunteer;
