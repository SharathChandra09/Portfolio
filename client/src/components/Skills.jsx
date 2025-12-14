import React from 'react';
import { motion } from 'framer-motion';

const Skills = ({ data }) => {
  if (!data) return null;

  const skillCategories = [
    { name: "Languages", list: data.skills.languages },
    { name: "Frameworks", list: data.skills.frameworks },
    { name: "Databases", list: data.skills.database },
    { name: "Tools", list: data.skills.tools },
  ];

  return (
    <section id="skills" className="py-20 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mb-10">
          <span className="font-mono text-primary text-xl mr-4">02.</span>
          <h2 className="text-3xl font-bold text-gray-100 flex-grow whitespace-nowrap">Skills</h2>
          <div className="h-px bg-tertiary/30 w-full ml-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillCategories.map((cat, idx) => (
                <div key={idx} className="bg-surface p-6 rounded-lg hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group border border-transparent hover:border-primary/20">
                    <h3 className="text-xl font-bold text-gray-100 mb-6 flex items-center">
                        <span className="text-primary mr-2 text-sm font-mono">0{idx + 1}.</span> {cat.name}
                    </h3>
                    <ul className="grid grid-cols-2 gap-3">
                        {cat.list.map((skill, i) => (
                            <li key={i} className="flex items-center text-tertiary text-sm font-mono group-hover:text-secondary transition-colors">
                                <span className="text-primary mr-2 text-xs">▹</span>
                                {skill}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
