import React, { useState } from 'react';
import { INSPIRATIONS } from '../../data/mockData.js';
import { usePlanning } from '../../context/PlanningContext.jsx';

export default function InspirationSection() {
  const { isSaved, toggleSave, openModal } = usePlanning();
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Couples', 'Bridal', 'Ceremony', 'Reception', 'Food', 'Decoration', 'Venues', 'Details'];

  const filteredInspirations = activeCategory === 'All'
    ? INSPIRATIONS
    : INSPIRATIONS.filter((item) => item.category === activeCategory);

  return (
    <section id="inspiration" className="py-20 md:py-28 bg-[#FAF8F5] border-t border-[#EAE3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-[#8C7E72] font-semibold mb-2 block">
              01 · Visual Discovery
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1C1917] tracking-tight">
              Start with inspiration.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#57534E] font-normal leading-relaxed">
              You don’t have to know exactly what you want yet. Explore real moments, save what speaks to you, and build your vision as you go.
            </p>
          </div>

          <div className="mt-6 md:mt-0">
            <button
              onClick={() => openModal('search', { category: 'Inspiration' })}
              className="group inline-flex items-center space-x-2 text-sm font-medium text-[#1C1917] hover:text-[#8E4A49] transition-colors"
            >
              <span>Explore all inspiration</span>
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-[#1C1917] text-white shadow-sm'
                  : 'bg-[#F4EFEA] text-[#57534E] hover:bg-[#EAE3DA] hover:text-[#1C1917]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Dynamic Editorial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredInspirations.map((item) => {
            const saved = isSaved(item.id);
            return (
              <div
                key={item.id}
                className="group relative bg-white rounded-2xl overflow-hidden border border-[#EAE3DA] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden bg-[#F4EFEA]">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Gradient Overlay for Actions & Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Top Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full text-[11px] font-medium tracking-wide uppercase bg-[#FAF8F5]/90 backdrop-blur-sm text-[#1C1917] border border-white/40">
                      {item.category}
                    </span>
                  </div>

                  {/* Top Right Quick Save Heart */}
                  <div className="absolute top-4 right-4 z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSave(item);
                      }}
                      className={`p-2.5 rounded-full backdrop-blur-md transition-all duration-200 active:scale-90 ${
                        saved
                          ? 'bg-[#8E4A49] text-white shadow-md'
                          : 'bg-white/85 text-[#1C1917] hover:bg-white hover:text-[#8E4A49]'
                      }`}
                      title={saved ? 'Remove from Saved' : 'Save to Favourites'}
                      aria-label="Save Moment"
                    >
                      <svg className="w-4 h-4" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>

                  {/* Hover Action Bar at Bottom of Image */}
                  <div className="absolute bottom-4 inset-x-4 z-10 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => openModal('itemDetail', item)}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-white/90 backdrop-blur-sm text-[#1C1917] hover:bg-white shadow-sm transition-colors flex items-center space-x-1.5"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>View Story</span>
                    </button>

                    <button
                      onClick={() => openModal('notes', { targetItem: item })}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#1C1917]/90 backdrop-blur-sm text-white hover:bg-[#1C1917] shadow-sm transition-colors flex items-center space-x-1"
                    >
                      <span>＋ Note</span>
                    </button>
                  </div>
                </div>

                {/* Card Content & Details */}
                <div className="p-5">
                  <div className="flex items-center justify-between text-xs text-[#8C7E72] mb-1">
                    <span>{item.couple}</span>
                    <span>{item.location}</span>
                  </div>
                  <h3
                    onClick={() => openModal('itemDetail', item)}
                    className="font-serif text-lg font-medium text-[#1C1917] hover:text-[#6B3037] transition-colors cursor-pointer"
                  >
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#57534E] line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Connected Vendors Tagline */}
                  {item.vendorTags && item.vendorTags.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-[#F4EFEA] flex flex-wrap items-center gap-1.5 text-[11px]">
                      <span className="text-[#8C7E72]">Behind this:</span>
                      {item.vendorTags.map((v) => (
                        <button
                          key={v.name}
                          onClick={() => openModal('search', { query: v.name })}
                          className="px-2 py-0.5 rounded bg-[#FAF8F5] hover:bg-[#EAE3DA] text-[#44403C] transition-colors"
                        >
                          {v.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
