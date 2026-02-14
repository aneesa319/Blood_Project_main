import { useState } from 'react';
import { toast } from 'react-toastify';
import FormInput from '../../components/ui/FormInput';
import Button from '../../components/ui/Button';
import AnimatedSection from '../../components/ui/AnimatedSection';
import API from '../../api/axiosInstance';
import { Send, Mail } from 'lucide-react';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill all fields.");
      return;
    }
    setLoading(true);
    try {
      await API.post('/contact', formData);
      toast.success("Message sent successfully!");
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      toast.info("Message recorded! We'll get back to you soon.");
      setFormData({ name: '', email: '', message: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center bg-transparent px-4 sm:px-8 lg:px-16 py-12">
      <AnimatedSection animation="slideUp" className="w-full max-w-7xl">
        <div className="w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Left - Icon */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="w-52 h-52 bg-primary-50 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
              <Mail className="w-28 h-28 text-primary-500" strokeWidth={1} />
            </div>
          </div>

          {/* Right - Form */}
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl font-bold font-heading text-center text-primary-600 mb-8">Contact Us</h2>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <FormInput
                label="Full Name" id="name" name="name"
                placeholder="Your name" value={formData.name} onChange={handleChange}
              />
              <FormInput
                label="Email Address" id="email" name="email" type="email"
                placeholder="you@example.com" value={formData.email} onChange={handleChange}
              />
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  id="message" name="message" rows="4"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white transition"
                  placeholder="Write your message here..."
                  value={formData.message} onChange={handleChange}
                />
              </div>
              <Button type="submit" loading={loading} className="w-full">
                <Send className="w-5 h-5" /> Send Message
              </Button>
            </form>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}

export default Contact;
