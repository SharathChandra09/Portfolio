import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Experience = ({ data }) => {
  if (!data) return null;

  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="experience" className="py-20 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mb-10">
          <span className="font-mono text-primary text-xl mr-4">03.</span>
          <h2 className="text-3xl font-bold text-gray-100 flex-grow whitespace-nowrap">Where I've Worked</h2>
          <div className="h-px bg-tertiary/30 w-full ml-6"></div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
            {/* Tabs */}
            <div className="flex md:flex-col overflow-x-auto md:w-52 border-b md:border-b-0 md:border-l-2 border-tertiary/20">
                {data.experience.map((exp, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveTab(idx)}
                        className={`text-left px-5 py-4 font-mono text-sm whitespace-nowrap transition-all duration-300
                            ${activeTab === idx 
                                ? 'text-primary bg-primary/5 border-b-2 md:border-b-0 md:border-l-2 border-primary -mb-[2px] md:-mb-0 md:-ml-[2px]' 
                                : 'text-tertiary hover:bg-surface hover:text-primary'}`}
                    >
                        {exp.company}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="flex-1 py-2 md:pl-4">
                <h3 className="text-2xl font-bold text-gray-100 mb-1">
                    {data.experience[activeTab].role} <span className="text-primary">@ {data.experience[activeTab].company}</span>
                </h3>
                <p className="font-mono text-sm text-tertiary mb-6">
                    {data.experience[activeTab].duration} | {data.experience[activeTab].location}
                </p>
                <ul className="space-y-4">
                    {data.experience[activeTab].description.map((point, i) => (
                        <li key={i} className="flex text-tertiary items-start group">
                            <span className="text-primary mr-3 mt-1 transform group-hover:translate-x-1 transition-transform">▹</span>
                            <span className="leading-relaxed text-lg">{point}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

      </motion.div>
    </section>
  );
};

export default Experience;
