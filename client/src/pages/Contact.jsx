import { useState } from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import Button from '../components/ui/Button';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy submit
    alert('Message sent successfully!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-surface min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title="Contact Us" 
          subtitle="Have a question? We're here to help. Reach out to the appropriate department below."
          centered={true}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16">
          <div>
            <h3 className="text-2xl font-bold text-primary mb-6">Get in Touch</h3>
            <div className="space-y-8">
              <div>
                <h4 className="text-lg font-bold text-primary mb-2">General Enquiries</h4>
                <p className="text-on-surface-variant">Phone: +44 (0) 1234 567890</p>
                <p className="text-on-surface-variant">Email: info@lumina.ac.uk</p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-primary mb-2">Admissions</h4>
                <p className="text-on-surface-variant">Phone: +44 (0) 1234 567891</p>
                <p className="text-on-surface-variant">Email: admissions@lumina.ac.uk</p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-primary mb-2">Main Campus</h4>
                <p className="text-on-surface-variant leading-relaxed">
                  Lumina University<br />
                  University Road<br />
                  Cityville, CV1 2AB<br />
                  United Kingdom
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-card">
            <h3 className="text-2xl font-bold text-primary mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-primary mb-1">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-shadow"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-primary mb-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-shadow"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-primary mb-1">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-shadow bg-white"
                >
                  <option value="">Select a subject...</option>
                  <option value="admissions">Admissions</option>
                  <option value="courses">Course Information</option>
                  <option value="accommodation">Accommodation</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-primary mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-shadow resize-none"
                ></textarea>
              </div>
              <Button type="submit" variant="primary" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
