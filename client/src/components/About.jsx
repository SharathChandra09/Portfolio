import React from 'react';
import { motion } from 'framer-motion';

const About = ({ data }) => {
  if (!data) return null;

  return (
    <section id="about" className="py-20 md:py-32 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mb-10">
          <span className="font-mono text-primary text-xl mr-4">01.</span>
          <h2 className="text-3xl font-bold text-gray-100 flex-grow whitespace-nowrap">About Me</h2>
          <div className="h-px bg-tertiary/30 w-full ml-6"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
            <div className="text-tertiary text-lg leading-relaxed space-y-6 font-light">
                {Array.isArray(data.personalInfo.bio) ? (
                    data.personalInfo.bio.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))
                ) : (
                    <p>{data.personalInfo.bio}</p>
                )}
            </div>
            <div className="relative group mx-auto md:mx-0 max-w-xs">
                <div className="relative z-10 w-full rounded bg-primary/20 hover:bg-transparent transition-colors duration-300 rounded overflow-hidden shadow-xl">
                     <img 
                        src="/avatar.png" 
                        alt="Profile Avatar" 
                        className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300 grayscale group-hover:grayscale-0"
                     />
                     <div className="absolute inset-0 bg-primary/20 mix-blend-multiply group-hover:bg-transparent transition-all duration-300"></div>
                </div>
                <div className="absolute top-5 left-5 w-full h-full border-2 border-primary rounded -z-10 group-hover:top-3 group-hover:left-3 transition-all duration-300 group-hover:border-accent"></div>
            </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
