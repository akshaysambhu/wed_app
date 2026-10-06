import React, { useState } from 'react';
import { usePlanning } from '../../context/PlanningContext.jsx';

export default function Hero() {
  const { openModal, setSearchQuery } = usePlanning();
  const [localQuery, setLocalQuery] = useState('');

  const suggestedSearches = [
    'Kerala weddings',
    'Candid photography',
    'Wedding catering',
    'Beach weddings',
    'Minimal decoration'
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (localQuery.trim()) {
      setSearchQuery(localQuery.trim());
      openModal('search', { query: localQuery.trim() });
    }
  };

  const handleSuggestedClick = (term) => {
    setLocalQuery(term);
    setSearchQuery(term);
    openModal('search', { query: term });
  };

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-[#FAF8F5]">
      {/* Editorial Background Image with Soft Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85"
          alt="Editorial Wedding Celebration"
          className="w-full h-full object-cover object-center opacity-25 filter saturate-[0.85] contrast-[0.95]"
        />
        {/* Soft layered gradients to maintain extreme text legibility & calm luxury */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/90 via-[#FAF8F5]/70 to-[#FAF8F5]" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#FAF8F5]/50 to-[#FAF8F5]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtle Concept Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#F4EFEA] border border-[#EAE3DA] mb-6 animate-fadeIn">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8E4A49]"></span>
          <span className="text-xs uppercase tracking-widest text-[#78716C] font-medium">
            The Complete Wedding & Event Planning Ecosystem
          </span>
        </div>

        {/* Main Editorial Headline */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-[#1C1917] leading-[1.12] mb-6">
          Plan the celebration <br className="hidden sm:inline" />
          <span className="italic font-light text-[#6B3037]">you’re dreaming of.</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-[#57534E] font-normal leading-relaxed mb-8">
          Discover real weddings, save the moments you love, find the people behind them, and turn your ideas into a plan.
        </p>

        {/* Prominent Visual Search Bar */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-[#EAE3DA] p-2.5 sm:p-3 transition-all duration-300 hover:border-[#D4C5B9]">
            <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="flex-1 flex items-center pl-3.5 pr-2">
                <svg className="w-5 h-5 text-[#8C7E72] mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <div className="w-full text-left">
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#A39081]">
                    What are you looking for?
                  </span>
                  <input
                    type="text"
                    value={localQuery}
                    onChange={(e) => setLocalQuery(e.target.value)}
                    placeholder="Search weddings, photographers, catering, venues, decoration..."
                    className="w-full text-sm sm:text-base text-[#1C1917] placeholder-[#A8A29E] bg-transparent border-none focus:outline-none py-1"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-[#1C1917] hover:bg-[#34302C] text-white text-sm font-medium tracking-wide rounded-xl active:scale-95 transition-all shadow-sm shrink-0 flex items-center justify-center space-x-2"
              >
                <span>Search</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </div>

          {/* Suggested Searches */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
            <span className="text-[#8C7E72] font-medium mr-1">Suggested:</span>
            {suggestedSearches.map((term) => (
              <button
                key={term}
                onClick={() => handleSuggestedClick(term)}
                className="px-3 py-1 rounded-full bg-[#F4EFEA] hover:bg-[#EAE3DA] text-[#57534E] hover:text-[#1C1917] transition-all border border-[#EAE3DA]/60"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12">
          <button
            onClick={() => openModal('dashboard')}
            className="w-full sm:w-auto px-7 py-3.5 bg-[#1C1917] hover:bg-[#34302C] text-white text-sm font-medium tracking-wide rounded-full shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            Start Planning
          </button>
          <a
            href="#inspiration"
            className="w-full sm:w-auto px-7 py-3.5 bg-[#F4EFEA] hover:bg-[#EAE3DA] text-[#1C1917] text-sm font-medium tracking-wide rounded-full border border-[#EAE3DA] transition-all"
          >
            Explore Inspiration
          </a>
        </div>

        {/* Visual Workflow Flow Indicator: Inspiration → Planning */}
        <div className="inline-flex items-center justify-center space-x-3 px-5 py-2.5 rounded-full bg-white/70 backdrop-blur-sm border border-[#EAE3DA] text-xs text-[#78716C]">
          <span className="font-medium text-[#1C1917]">Visual Inspiration</span>
          <svg className="w-3.5 h-3.5 text-[#A39081]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
          <span>Save Moments</span>
          <svg className="w-3.5 h-3.5 text-[#A39081]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
          <span>Discuss & Compare</span>
          <svg className="w-3.5 h-3.5 text-[#A39081]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
          <span className="font-semibold text-[#8E4A49]">Planning Ecosystem</span>
        </div>
      </div>
    </section>
  );
}
