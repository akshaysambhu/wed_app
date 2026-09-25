import React from 'react';
import { usePlanning } from '../context/PlanningContext.jsx';

export default function FinalCTA() {
  const { openModal } = usePlanning();

  return (
    <section className="py-24 md:py-36 bg-[#FAF8F5] border-t border-[#EAE3DA] relative overflow-hidden text-center">
      {/* Subtle Warm Background Glow */}
      <div className="absolute inset-0 bg-radial-gradient from-[#F4EFEA] via-[#FAF8F5] to-[#FAF8F5] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="text-xs uppercase tracking-widest text-[#8C7E72] font-semibold mb-3 block">
          Begin Today
        </span>

        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1C1917] tracking-tight leading-tight mb-6">
          Your moments are <br />
          <span className="italic font-light text-[#6B3037]">worth planning.</span>
        </h2>

        <p className="max-w-xl mx-auto text-base sm:text-lg text-[#57534E] leading-relaxed mb-10">
          Start with one idea. Save one moment. Build from there. Experience a calmer, more thoughtful approach to your wedding celebration.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => openModal('dashboard')}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#1C1917] hover:bg-[#34302C] text-white text-xs sm:text-sm font-medium tracking-wide rounded-full shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            Start Planning
          </button>
          <a
            href="#inspiration"
            className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-[#F4EFEA] text-[#1C1917] text-xs sm:text-sm font-medium tracking-wide rounded-full border border-[#EAE3DA] shadow-sm transition-all"
          >
            Explore Inspiration
          </a>
        </div>

        <div className="mt-12 flex items-center justify-center space-x-6 text-xs text-[#8C7E72]">
          <span>✦ No pushy sales calls</span>
          <span>✦ Private partner sharing</span>
          <span>✦ Verified professionals only</span>
        </div>
      </div>
    </section>
  );
}
