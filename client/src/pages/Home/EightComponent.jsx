import AnimatedSection from '../../components/ui/AnimatedSection';
import { useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

const testimonials = [
  { quote: 'A great initiative in Mardan. The staff made me feel at ease.', name: 'Ahmed Khan', location: 'Mardan', initial: 'A' },
  { quote: 'I donated in UET Mardan. Everything was smooth and well managed.', name: 'Sana Fatima', location: 'UET Mardan', initial: 'S' },
  { quote: 'The process was quick and painless. Proud to help from Peshawar.', name: 'Muhammad Ali', location: 'Peshawar', initial: 'M' },
  { quote: 'Donated in Nowshera. Thank you for the care and professionalism!', name: 'Rida Zafar', location: 'Nowshera', initial: 'R' },
];

function EightComponent() {
  const navigate = useNavigate();

  return (
    <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection animation="fadeIn">
          <h2 className="section-heading text-center mb-12">What Our Donors Say</h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

        <AnimatedSection animation="slideUp" className="text-center mt-12">
          <button onClick={() => navigate('/share-experience')} className="btn-primary inline-flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Share Your Experience
          </button>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default EightComponent;
