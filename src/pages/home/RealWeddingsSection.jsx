import React from 'react';
import { REAL_WEDDINGS } from '../../data/mockData.js';
import { usePlanning } from '../../context/PlanningContext.jsx';

export default function RealWeddingsSection() {
  const { openModal } = usePlanning();

  return (
    <section id="real-weddings" className="py-20 md:py-28 bg-[#FDFBF7] border-t border-[#EAE3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-[#8C7E72] font-semibold mb-2 block">
              02 · Editorial Stories
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1C1917] tracking-tight">
              See how real celebrations came together.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#57534E] font-normal leading-relaxed">
              Explore real weddings and discover the places, photographers, caterers, decorators and other professionals behind them.
            </p>
          </div>

          <div className="mt-6 md:mt-0">
            <button
              onClick={() => openModal('search', { category: 'Real Weddings' })}
              className="group inline-flex items-center space-x-2 text-sm font-medium text-[#1C1917] hover:text-[#8E4A49] transition-colors"
            >
              <span>Explore all Real Weddings</span>
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>

        {/* Real Wedding Cards - Multi-Photo Editorial Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {REAL_WEDDINGS.map((wedding) => (
            <div
              key={wedding.id}
              className="bg-white rounded-3xl border border-[#EAE3DA] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image Collage / Mosaic - Shows 1 Primary + 3 Sub-photos */}
              <div
                onClick={() => openModal('realWedding', wedding)}
                className="cursor-pointer grid grid-cols-3 gap-1.5 p-2 bg-[#FAF8F5]"
              >
                {/* Main Hero Shot */}
                <div className="col-span-2 relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <img
                    src={wedding.heroImage}
                    alt={wedding.couple}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-3.5 left-4 text-white">
                    <span className="text-xs uppercase tracking-wider font-medium text-[#FAF8F5]/90">
                      {wedding.season}
                    </span>
                    <h3 className="font-serif text-2xl font-medium">{wedding.couple}</h3>
                  </div>
                </div>

                {/* Vertical Stack of Gallery Shots */}
                <div className="col-span-1 grid grid-rows-2 gap-1.5">
                  <div className="relative rounded-xl overflow-hidden bg-[#F4EFEA]">
                    <img
                      src={wedding.gallery[0]}
                      alt={`${wedding.couple} gallery 1`}
                      loading="lazy"
                      className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="relative rounded-xl overflow-hidden bg-[#F4EFEA]">
                    <img
                      src={wedding.gallery[1]}
                      alt={`${wedding.couple} gallery 2`}
                      loading="lazy"
                      className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white text-xs font-medium">
                      <span>+ {wedding.gallery.length} more</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Story Information & Tagged Professionals */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between text-xs text-[#8C7E72] font-medium mb-3">
                    <span className="flex items-center space-x-1">
                      <svg className="w-3.5 h-3.5 text-[#A39081]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{wedding.location}</span>
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FAF8F5] border border-[#EAE3DA]">
                      {wedding.guests}
                    </span>
                  </div>

                  <p className="text-sm text-[#44403C] leading-relaxed mb-6 font-normal">
                    {wedding.story}
                  </p>

                  {/* Curated Highlights */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {wedding.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2.5 py-1 rounded-md bg-[#FAF8F5] text-[#57534E] border border-[#EAE3DA]"
                      >
                        ✦ {h}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Connected Professionals Ecosystem */}
                <div className="pt-5 border-t border-[#F4EFEA]">
                  <div className="text-xs uppercase tracking-wider text-[#8C7E72] font-semibold mb-3 flex items-center justify-between">
                    <span>Professionals behind this wedding</span>
                    <span className="text-[11px] font-normal text-[#A39081]">Click to view details</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                    <div className="p-2 rounded-lg bg-[#FAF8F5] hover:bg-[#F4EFEA] transition-colors">
                      <span className="block text-[10px] text-[#8C7E72]">Venue</span>
                      <span className="font-medium text-[#1C1917] truncate block">{wedding.vendors.venue.name}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-[#FAF8F5] hover:bg-[#F4EFEA] transition-colors">
                      <span className="block text-[10px] text-[#8C7E72]">Photography</span>
                      <span className="font-medium text-[#1C1917] truncate block">{wedding.vendors.photographer.name}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-[#FAF8F5] hover:bg-[#F4EFEA] transition-colors">
                      <span className="block text-[10px] text-[#8C7E72]">Decoration</span>
                      <span className="font-medium text-[#1C1917] truncate block">{wedding.vendors.decoration.name}</span>
                    </div>
                  </div>

                  {/* Action Link to Full Real Wedding Modal */}
                  <div className="mt-5 flex items-center justify-between">
                    <button
                      onClick={() => openModal('realWedding', wedding)}
                      className="text-xs font-semibold tracking-wide text-[#6B3037] hover:text-[#1C1917] flex items-center space-x-1 transition-colors"
                    >
                      <span>Explore full wedding story & vendors</span>
                      <span>→</span>
                    </button>

                    <span className="text-[11px] text-[#8C7E72] italic">
                      Photos → Vendors → Inspiration
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
