import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ data }) => {
  if (!data) return null;

  return (
    <section className="min-h-screen flex items-center justify-center pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start justify-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-primary font-mono text-lg mb-6 ml-1">Hi, my name is</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold text-gray-100 mb-4 tracking-tighter">
            {data.name}.
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-4xl md:text-7xl font-bold text-tertiary mb-8 tracking-tighter">
            I build things for the web.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-2xl"
        >
          <p className="text-tertiary text-xl mb-12 leading-relaxed">
            {data.tagline}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a href="#work" className="group relative px-8 py-4 font-mono text-primary border border-primary rounded hover:bg-primary/10 transition-all duration-300">
             Check out my work
             <span className="absolute -bottom-2 -right-2 w-full h-full border border-primary rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
