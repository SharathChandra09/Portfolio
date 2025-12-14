import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Use environment variable for API URL in production, or localhost in development
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    fetch(`${apiUrl}/api/portfolio`)
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error("Failed to fetch data", err));
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-primary font-mono text-xl animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen text-secondary selection:bg-primary/30">
      <Navbar />
      <main className="px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto">
        <Hero data={data.personalInfo} />
        <About data={data} />
        <Skills data={data} />
        <Experience data={data} />
        <Projects data={data} />
        <Contact data={data} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
