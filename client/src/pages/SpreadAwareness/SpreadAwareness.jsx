import AnimatedSection from '../../components/ui/AnimatedSection';
import { useNavigate } from 'react-router-dom';
import {
  Share2,
  Users,
  Building2,
  Droplets,
  Clock,
  Heart,
  AlertTriangle,
  Syringe,
  Globe,
  ArrowRight,
  MessageSquareQuote,
} from 'lucide-react';

const ways = [
  {
    icon: Share2,
    title: 'Social Media',
    desc: 'Share blood donation facts, stories, and events on your social media platforms. Tag friends and use hashtags to maximize reach.',
    tips: ['Use #DonateBlood and #SaveLives hashtags', 'Share your donation selfie', 'Post facts during awareness weeks'],
  },
  {
    icon: Users,
    title: 'Friends & Family',
    desc: 'Talk to your friends and family about the importance of blood donation. Personal conversations are the most powerful motivators.',
    tips: ['Share your own donation experience', 'Invite them to donate together', 'Address their fears and myths'],
  },
  {
    icon: Building2,
    title: 'Work & School',
    desc: 'Organize blood donation drives at your workplace or school. Partner with local blood banks to set up collection events.',
    tips: ['Coordinate with HR or administration', 'Set up information booths', 'Offer incentives for participation'],
  },
];

const facts = [
  { icon: Droplets, title: 'Every 2 Seconds', desc: 'Someone in the world needs blood. The demand never stops.' },
  { icon: Heart, title: '1 Pint = 3 Lives', desc: 'A single blood donation can save up to three lives.' },
  { icon: Clock, title: 'Only 10 Minutes', desc: 'The actual blood draw takes just 8-10 minutes of your time.' },
  { icon: AlertTriangle, title: 'Always in Need', desc: 'Less than 38% of the population is eligible, making every donor crucial.' },
  { icon: Syringe, title: '100% Safe', desc: 'All equipment is sterile and single-use. Zero risk of infection from donating.' },
  { icon: Globe, title: '118.5M Donations', desc: 'Approximately 118.5 million blood donations are collected globally each year.' },
];

const shareableMessages = [
  {
    text: 'Did you know your single blood donation can save up to 3 lives? It takes just 10 minutes. Be a hero today. #DonateBlood #SaveLives',
    label: 'General Awareness',
  },
  {
    text: 'Every 2 seconds, someone needs blood. Don\'t wait for an emergency to think about donation. Register as a donor today!',
    label: 'Urgency',
  },
  {
    text: 'I donated blood today and it feels amazing knowing I could save up to 3 lives. If you\'re healthy and eligible, consider joining me next time!',
    label: 'Personal Story',
  },
  {
    text: 'Blood can\'t be manufactured — it can only come from generous donors like you. Help us spread the word about the importance of blood donation.',
    label: 'Call to Action',
  },
];

function SpreadAwareness() {
  const navigate = useNavigate();

  return (
    <div className="bg-transparent">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 dark:from-gray-900 dark:to-gray-800 text-white py-20 px-4 sm:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto text-center">
          <AnimatedSection animation="fadeIn">
            <p className="uppercase text-sm tracking-wider mb-2 text-primary-200">Make a Difference</p>
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">Spread Awareness</h1>
            <p className="text-lg text-primary-100 max-w-2xl mx-auto">
              You don&apos;t need to donate blood to save lives. Help us spread the word and inspire others to become donors.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Ways to Spread Awareness */}
      <section className="py-16 px-4 sm:px-8 lg:px-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection animation="fadeIn">
            <h2 className="section-heading text-center mb-12">Ways to Spread Awareness</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ways.map((way, i) => (
              <AnimatedSection key={way.title} animation="slideUp" delay={i * 0.15}>
                <div className="card group h-full">
                  <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <way.icon className="w-7 h-7 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold font-heading dark:text-white mb-2">{way.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{way.desc}</p>
                  <ul className="space-y-1">
                    {way.tips.map((tip) => (
                      <li key={tip} className="text-sm text-gray-500 dark:text-gray-500 flex items-center gap-2">
                        <span className="text-primary-500">&#8226;</span> {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Key Facts to Share */}
      <section className="py-16 px-4 sm:px-8 lg:px-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection animation="fadeIn">
            <h2 className="section-heading text-center mb-12">Key Facts to Share</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facts.map((fact, i) => (
              <AnimatedSection key={fact.title} animation="scaleIn" delay={i * 0.1}>
                <div className="card group h-full text-center">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <fact.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold font-heading dark:text-white mb-1">{fact.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{fact.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Shareable Messages */}
      <section className="py-16 px-4 sm:px-8 lg:px-16 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection animation="fadeIn">
            <h2 className="section-heading text-center mb-4">Ready-to-Share Messages</h2>
            <p className="text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto mb-12">
              Copy and share these messages on your social media or send them to friends and family.
            </p>
          </AnimatedSection>

          <div className="space-y-6">
            {shareableMessages.map((msg, i) => (
              <AnimatedSection key={i} animation="slideUp" delay={i * 0.1}>
                <div className="card border-l-4 border-primary-500">
                  <div className="flex items-start gap-3">
                    <MessageSquareQuote className="w-6 h-6 text-primary-500 shrink-0 mt-1" />
                    <div>
                      <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wide">
                        {msg.label}
                      </span>
                      <p className="text-gray-700 dark:text-gray-300 mt-1 italic">&ldquo;{msg.text}&rdquo;</p>
                    </div>
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
            <h2 className="section-heading mb-4">Want to Do More?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Beyond spreading awareness, you can directly contribute by donating blood or joining our volunteer team.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button onClick={() => navigate('/registration')} className="btn-primary inline-flex items-center gap-2">
                Donate Blood <ArrowRight className="w-4 h-4" />
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

export default SpreadAwareness;
