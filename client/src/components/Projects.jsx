import React from 'react';
import { motion } from 'framer-motion';
import { Folder, Github, ExternalLink } from 'lucide-react';

const Projects = ({ data }) => {
  if (!data) return null;

  return (
    <section id="work" className="py-20 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mb-10">
          <span className="font-mono text-primary text-xl mr-4">04.</span>
          <h2 className="text-3xl font-bold text-gray-100 flex-grow whitespace-nowrap">Things I've Built</h2>
          <div className="h-px bg-tertiary/30 w-full ml-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.projects.map((project, idx) => (
                <motion.div
                    key={idx}
                    whileHover={{ y: -8 }}
                    className="bg-surface rounded-xl shadow-lg flex flex-col h-full transition-all duration-300 group hover:shadow-2xl hover:shadow-primary/10 border border-transparent hover:border-primary/20 overflow-hidden relative"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    
                    <div className="p-8 flex flex-col h-full">
                        <div className="flex justify-between items-center mb-8 text-primary">
                            <Folder size={40} strokeWidth={1.5} />
                            <div className="flex space-x-4 text-tertiary">
                                 <a href="#" className="hover:text-primary transition-colors hover:scale-110 transform"><Github size={20} /></a>
                                 <a href="#" className="hover:text-primary transition-colors hover:scale-110 transform"><ExternalLink size={20} /></a>
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-100 mb-4 group-hover:text-primary transition-colors">
                            {project.title}
                        </h3>
                        <div className="text-tertiary mb-8 text-base leading-relaxed flex-grow">
                            {project.description}
                        </div>
                        <ul className="flex flex-wrap gap-3 mt-auto text-xs font-mono text-secondary/80">
                            {project.tech.map((t, i) => (
                                <li key={i} className="bg-primary/10 px-3 py-1 rounded-full text-primary">{t}</li>
                            ))}
                        </ul>
                    </div>
                </motion.div>
            ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
