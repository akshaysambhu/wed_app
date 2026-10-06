import React from 'react';
import { VENUES } from '../../data/mockData.js';
import { usePlanning } from '../../context/PlanningContext.jsx';

export default function VenueDiscovery() {
  const { isSaved, toggleSave, isInCompare, toggleCompare, openModal } = usePlanning();

  return (
    <section id="venues" className="py-20 md:py-28 bg-[#FAF8F5] border-t border-[#EAE3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-[#8C7E72] font-semibold mb-2 block">
              05 · Spaces & Settings
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1C1917] tracking-tight">
              Find a place that feels like you.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#57534E] leading-relaxed">
              Explore wedding venues by location, style, capacity and budget. From quiet lakeside lawns to colonial heritage courtyards.
            </p>
          </div>

          <div className="mt-6 md:mt-0">
            <button
              onClick={() => openModal('search', { category: 'Venues' })}
              className="group inline-flex items-center space-x-2 text-sm font-medium text-[#1C1917] hover:text-[#8E4A49] transition-colors"
            >
              <span>Explore all venues</span>
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>

        {/* Venue Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {VENUES.map((venue) => {
            const saved = isSaved(venue.id);
            const inCompare = isInCompare(venue.id);

            return (
              <div
                key={venue.id}
                className="bg-white rounded-3xl border border-[#EAE3DA] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Venue Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#F4EFEA]">
                    <img
                      src={venue.image}
                      alt={venue.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                    {/* Top Bar on Image */}
                    <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#FAF8F5]/90 backdrop-blur-md text-[#1C1917]">
                        {venue.style}
                      </span>
                      <button
                        onClick={() => toggleSave(venue)}
                        className={`p-2.5 rounded-full backdrop-blur-md transition-all active:scale-90 ${
                          saved ? 'bg-[#8E4A49] text-white' : 'bg-white/85 text-[#1C1917] hover:bg-white'
                        }`}
                        title="Save Venue"
                      >
                        <svg className="w-4 h-4" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>

                    {/* Bottom Info on Image */}
                    <div className="absolute bottom-4 left-4 right-4 text-white z-10 flex items-end justify-between">
                      <div>
                        <span className="text-xs uppercase tracking-wider text-[#FAF8F5]/90 font-medium block">
                          {venue.location}
                        </span>
                        <h3 className="font-serif text-2xl sm:text-3xl font-medium">{venue.name}</h3>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] text-[#FAF8F5]/80 block">Starting from</span>
                        <span className="font-semibold text-base sm:text-lg">{venue.priceFormatted}</span>
                      </div>
                    </div>
                  </div>

                  {/* Venue Specs & Features */}
                  <div className="p-6 sm:p-7">
                    <p className="text-sm text-[#57534E] leading-relaxed mb-6">
                      {venue.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#F4EFEA] mb-6">
                      <div>
                        <span className="block text-xs text-[#8C7E72] uppercase tracking-wider">Guest Capacity</span>
                        <span className="font-medium text-sm text-[#1C1917]">{venue.capacity}</span>
                      </div>
                      <div>
                        <span className="block text-xs text-[#8C7E72] uppercase tracking-wider">Rating & Reviews</span>
                        <span className="font-medium text-sm text-[#8E4A49]">★ {venue.rating} ({venue.reviewsCount} reviews)</span>
                      </div>
                    </div>

                    {/* Venue Highlights Pills */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {venue.features.map((feat, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2.5 py-1 rounded-full bg-[#FAF8F5] text-[#44403C] border border-[#EAE3DA]"
                        >
                          ✦ {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="px-6 pb-6 pt-0 flex items-center gap-3">
                  <button
                    onClick={() => toggleCompare(venue)}
                    className={`flex-1 py-2.5 px-4 text-xs font-medium rounded-xl border transition-all flex items-center justify-center space-x-1.5 ${
                      inCompare
                        ? 'bg-[#6B3037] text-white border-[#6B3037]'
                        : 'bg-white text-[#1C1917] border-[#EAE3DA] hover:bg-[#F4EFEA]'
                    }`}
                  >
                    <span>{inCompare ? '✓ In Compare' : '＋ Compare'}</span>
                  </button>

                  <button
                    onClick={() => openModal('itemDetail', venue)}
                    className="flex-1 py-2.5 px-4 text-xs font-medium rounded-xl bg-[#1C1917] hover:bg-[#34302C] text-white transition-colors text-center"
                  >
                    View Venue Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
