import AnimatedSection from '../../components/ui/AnimatedSection';
import { useNavigate } from 'react-router-dom';
import { Heart, BookOpen } from 'lucide-react';

function NineComponent() {
  const navigate = useNavigate();
  return (
    <section className="bg-secondary-600 dark:bg-secondary-900 text-white py-24 px-6 text-center">
      <AnimatedSection animation="slideUp">
        <h2 className="text-5xl font-bold font-heading mb-6">Become a Blood Donor</h2>
        <p className="text-xl mb-10 text-gray-100 max-w-3xl mx-auto">
          Help save lives by joining our blood donation mission today.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button onClick={() => navigate('/login')} className="animate-pulse_glow btn-primary inline-flex items-center justify-center gap-2">
            <Heart className="w-5 h-5" /> Donate Now
          </button>
          <button onClick={() => navigate('/about')} style={{ backgroundColor: 'white', color: '#1e40af', border: '2px solid white', padding: '12px 24px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <BookOpen className="w-5 h-5" /> Read More
          </button>
        </div>
      </AnimatedSection>
    </section>
  );
}

export default NineComponent;
