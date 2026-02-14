import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import AnimatedSection from '../../../components/ui/AnimatedSection';

export default function StatCard({ icon: Icon, label, value, color = 'text-primary-600', delay = 0 }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <AnimatedSection animation="bounceIn" delay={delay}>
      <div ref={ref} className="card text-center">
        <Icon className={`w-8 h-8 ${color} mx-auto mb-2`} />
        <div className="text-3xl font-bold font-heading text-gray-800 dark:text-white">
          {inView ? <CountUp end={value} duration={2} /> : '0'}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{label}</p>
      </div>
    </AnimatedSection>
  );
}
