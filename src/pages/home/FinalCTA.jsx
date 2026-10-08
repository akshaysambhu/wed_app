/**
 * FinalCTA.jsx
 * The final call to action banner on the homepage.
 */
import React from 'react';
import { Link } from 'react-router-dom';

export default function FinalCTA() {
  return (
    <section className="py-32 bg-[#1C1917] text-center px-4 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-10 leading-tight">
          Whatever you're celebrating,<br />
          <span className="italic font-light text-[#D4C5B9]">make it unforgettable.</span>
        </h2>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setTimeout(() => document.getElementById('start-program')?.scrollIntoView({ behavior: 'smooth' }), 500);
            }}
            className="w-full sm:w-auto px-8 py-4 bg-[#6B3037] text-white text-sm font-semibold rounded-full hover:bg-[#52242A] transition-colors shadow-lg"
          >
            Start Planning
          </button>
          <Link 
            to="/stories" 
            className="w-full sm:w-auto px-8 py-4 border border-[#44403C] text-white text-sm font-medium rounded-full hover:bg-white/5 transition-colors"
          >
            Explore Stories
          </Link>
        </div>
      </div>
    </section>
  );
}
