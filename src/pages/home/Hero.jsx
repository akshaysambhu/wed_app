/**
 * Hero.jsx
 * Premium editorial hero section.
 */
import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center pt-20 overflow-hidden bg-[#1C1917]">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=2000&q=80" 
          alt="Beautiful Indian celebration" 
          className="w-full h-full object-cover opacity-70"
        />
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-12">
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white tracking-tight mb-6 drop-shadow-lg leading-tight animate-fadeIn">
          Plan the moments<br />
          <span className="italic font-light">that matter.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-[#FDFBF7] mb-10 max-w-2xl mx-auto font-light leading-relaxed animate-slideUp drop-shadow-md">
          Discover the people, places and ideas behind your celebration — then build the perfect team to bring it to life.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slideUp" style={{ animationDelay: '200ms' }}>
          <button 
            onClick={() => document.getElementById('start-program').scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto px-8 py-4 bg-white text-[#1C1917] text-sm font-semibold rounded-full hover:bg-[#F4EFEA] transition-colors shadow-xl"
          >
            Start Planning
          </button>
          <Link 
            to="/stories" 
            className="w-full sm:w-auto px-8 py-4 bg-[#1C1917]/50 backdrop-blur-md text-white border border-white/30 text-sm font-medium rounded-full hover:bg-[#1C1917]/80 transition-colors"
          >
            Explore Stories
          </Link>
        </div>
      </div>
    </section>
  );
}
