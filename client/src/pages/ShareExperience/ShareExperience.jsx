import { useState } from 'react';
import AnimatedSection from '../../components/ui/AnimatedSection';
import FormInput from '../../components/ui/FormInput';
import Button from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Lightbulb,
  Users,
  TrendingUp,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';

const testimonials = [
  { quote: 'A great initiative in Mardan. The staff made me feel at ease.', name: 'Ahmed Khan', location: 'Mardan', initial: 'A' },
  { quote: 'I donated in UET Mardan. Everything was smooth and well managed.', name: 'Sana Fatima', location: 'UET Mardan', initial: 'S' },
  { quote: 'The process was quick and painless. Proud to help from Peshawar.', name: 'Muhammad Ali', location: 'Peshawar', initial: 'M' },
  { quote: 'Donated in Nowshera. Thank you for the care and professionalism!', name: 'Rida Zafar', location: 'Nowshera', initial: 'R' },
  { quote: 'My first time donating and the LifeSaver team made it stress-free. Will definitely do it again!', name: 'Usman Shah', location: 'Charsadda', initial: 'U' },
  { quote: 'Being a regular donor gives me a sense of purpose. Every pint matters.', name: 'Ayesha Bibi', location: 'Swabi', initial: 'A' },
];

const whyShare = [
  { icon: Lightbulb, title: 'Inspire Others', desc: 'Your story can motivate someone who has never donated to take the first step and become a life-saver.' },
  { icon: Users, title: 'Build Community', desc: 'Sharing experiences creates a supportive community of donors who encourage and uplift each other.' },
  { icon: TrendingUp, title: 'Drive Change', desc: 'Real stories help break myths and misconceptions about blood donation, leading to more registrations.' },
];

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

function ShareExperience() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    bloodType: '',
    timesDonated: '',
    experience: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.experience) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      toast.success('Thank you for sharing your experience! Your story inspires others.');
      setFormData({ name: '', email: '', city: '', bloodType: '', timesDonated: '', experience: '' });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-transparent">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 dark:from-gray-900 dark:to-gray-800 text-white py-20 px-4 sm:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto text-center">
          <AnimatedSection animation="fadeIn">
            <p className="uppercase text-sm tracking-wider mb-2 text-primary-200">Your Voice Matters</p>
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">Share Your Experience</h1>
            <p className="text-lg text-primary-100 max-w-2xl mx-auto">
              Every donor has a unique story. Share yours to inspire others and help build a community of life-savers.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Featured Testimonials */}
      <section className="py-16 px-4 sm:px-8 lg:px-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection animation="fadeIn">
            <h2 className="section-heading text-center mb-12">What Our Donors Say</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <AnimatedSection key={t.name} animation="scaleIn" delay={i * 0.1}>
                <div className="card hover:-translate-y-2 transition-all duration-300 h-full">
                  <div className="text-primary-500 text-4xl font-serif mb-2">&ldquo;</div>
                  <p className="text-gray-600 dark:text-gray-400 italic mb-4">{t.quote}</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600 font-bold mr-3">
                      {t.initial}
                    </div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {t.name} - {t.location}
                    </span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Story Submission Form */}
      <section className="py-16 px-4 sm:px-8 lg:px-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-2xl mx-auto">
          <AnimatedSection animation="fadeIn">
            <h2 className="section-heading text-center mb-4">
              <MessageCircle className="w-8 h-8 text-primary-600 inline-block mr-2 -mt-1" />
              Tell Us Your Story
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
              Your experience could be the reason someone decides to donate for the first time.
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <FormInput
                    label="City"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Your city"
                  />
                  <div>
                    <label htmlFor="bloodType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Blood Type
                    </label>
                    <select
                      id="bloodType"
                      name="bloodType"
                      value={formData.bloodType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition"
                    >
                      <option value="">Select</option>
                      {bloodTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <FormInput
                    label="Times Donated"
                    id="timesDonated"
                    name="timesDonated"
                    type="number"
                    value={formData.timesDonated}
                    onChange={handleChange}
                    placeholder="e.g. 5"
                  />
                </div>
                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Experience *
                  </label>
                  <textarea
                    id="experience"
                    name="experience"
                    rows={5}
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="Tell us about your blood donation experience..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition"
                  />
                </div>
                <Button type="submit" loading={loading} className="w-full">
                  Share My Story
                </Button>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Share */}
      <section className="py-16 px-4 sm:px-8 lg:px-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection animation="fadeIn">
            <h2 className="section-heading text-center mb-12">Why Share Your Story?</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyShare.map((item, i) => (
              <AnimatedSection key={item.title} animation="slideUp" delay={i * 0.15}>
                <div className="card group h-full text-center">
                  <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-7 h-7 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold font-heading dark:text-white mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{item.desc}</p>
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
            <h2 className="section-heading mb-4">Ready to Make a Difference?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Your story inspires, but your blood saves. Take the next step today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button onClick={() => navigate('/registration')} className="btn-primary inline-flex items-center gap-2">
                Donate Now <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => navigate('/volunteer')} className="btn-secondary">
                Volunteer
              </button>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}

export default ShareExperience;
