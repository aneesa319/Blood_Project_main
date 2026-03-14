import AnimatedSection from '../../components/ui/AnimatedSection';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const cards = [
  {
    title: 'Donate Blood',
    desc: 'The most direct way to make a difference is by donating blood. Every donation has the potential to save multiple lives.',
    img: '/images/home/thirdcomponet/donateblood.png',
    alt: 'Donate Blood',
  },
  {
    title: 'Volunteer Team',
    desc: 'Join our team of volunteers to assist with events, outreach efforts, and administrative tasks. Your time and skills can greatly impact our mission.',
    img: '/images/home/thirdcomponet/volunteer.jpeg',
    alt: 'Volunteer Team',
  },
  {
    title: 'Spread Awareness',
    desc: 'Share information about the importance of blood donation with friends and family. Use social media to raise awareness and encourage others to donate.',
    img: '/images/home/thirdcomponet/raiseawareness.jpg',
    alt: 'Spread Awareness',
  },
];

function ThirdComponent() {
  const navigate = useNavigate();

  return (
    <section className="bg-gray-100 dark:bg-gray-800 py-16 px-6">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <AnimatedSection animation="fadeIn">
          <p className="text-secondary-600 dark:text-secondary-400 uppercase text-sm font-semibold tracking-wide">
            Get Involved
          </p>
          <h2 className="section-heading mt-2">Your Support is Invaluable</h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            There are many ways you can contribute to our mission of saving lives through blood donation.
          </p>
        </AnimatedSection>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {cards.map((card, i) => (
          <AnimatedSection key={card.title} animation="slideUp" delay={i * 0.15}>
            <div className="card overflow-hidden p-0 group">
              <div className="overflow-hidden">
                <img
                  src={card.img}
                  alt={card.alt}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold font-heading mb-2 dark:text-white">{card.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{card.desc}</p>
                <button onClick={() => navigate(
                  card.title === 'Donate Blood' ? '/how-to-donate' :
                  card.title === 'Volunteer Team' ? '/volunteer' :
                  '/spread-awareness'
                )} className="btn-primary text-sm py-2 px-4 inline-flex items-center gap-1">
                  Read More <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}

export default ThirdComponent;
