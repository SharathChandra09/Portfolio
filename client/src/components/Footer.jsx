import React from 'react';

const Footer = () => {
  return (
    <footer className="text-center py-6 text-tertiary font-mono text-xs">
      <div className="mb-2">
         {/* Social Icons could go here */}
      </div>
      <a 
        href="https://github.com/SharathChandra01" 
        target="_blank" 
        rel="noreferrer" 
        className="hover:text-primary transition-colors block mb-1"
      >
        Designed & Built by Sharath Chandra
      </a>
    </footer>
  );
};

export default Footer;
