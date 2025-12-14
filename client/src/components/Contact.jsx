import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = ({ data }) => {
  if (!data) return null;
  
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      setStatus('sending');
      try {
          const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
          const res = await fetch(`${apiUrl}/api/contact`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(formData)
          });
          if (res.ok) {
              setStatus('success');
              setFormData({ name: '', email: '', message: '' });
          } else {
              const data = await res.json();
              setStatus('error: ' + data.message);
          }
      } catch (err) {
          setStatus('error: ' + err.message);
      }
  };

  return (
    <section id="contact" className="py-20 md:py-32 max-w-2xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
          <p className="text-primary font-mono mb-4">05. What's Next?</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6">Get In Touch</h2>
          <p className="text-tertiary text-lg mb-10 leading-relaxed">
              I am currently looking for new opportunities. Whether you have a question or just want to say hi, my inbox is always open!
          </p>

          <form onSubmit={handleSubmit} className="text-left space-y-4 max-w-md mx-auto mb-10">
              <div>
                  <label htmlFor="name" className="block text-sm font-mono text-primary mb-1">Name</label>
                  <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-surface border border-tertiary/30 rounded p-2 text-secondary focus:border-primary focus:outline-none transition-colors"
                  />
              </div>
              <div>
                  <label htmlFor="email" className="block text-sm font-mono text-primary mb-1">Email</label>
                  <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-surface border border-tertiary/30 rounded p-2 text-secondary focus:border-primary focus:outline-none transition-colors"
                  />
              </div>
              <div>
                  <label htmlFor="message" className="block text-sm font-mono text-primary mb-1">Message</label>
                  <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="4"
                      className="w-full bg-surface border border-tertiary/30 rounded p-2 text-secondary focus:border-primary focus:outline-none transition-colors"
                  ></textarea>
              </div>
              <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full border border-primary text-primary py-3 rounded hover:bg-primary/10 transition-colors font-mono disabled:opacity-50"
              >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
              {status === 'success' && <p className="text-green-400 font-mono text-center text-sm">Message sent successfully!</p>}
              {status.startsWith('error') && <p className="text-red-400 font-mono text-center text-sm max-w-md mx-auto">{status}</p>}
          </form>
          
          <a href={`mailto:${data.personalInfo.contact.email}`} className="text-tertiary hover:text-primary transition-colors font-mono text-sm">
            Or email me directly at {data.personalInfo.contact.email}
          </a>
      </motion.div>
    </section>
  );
};

export default Contact;
