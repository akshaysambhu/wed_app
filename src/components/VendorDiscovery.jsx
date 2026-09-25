import React, { useState } from 'react';
import { VENDORS, VENDOR_CATEGORIES } from '../data/mockData.js';
import { usePlanning } from '../context/PlanningContext.jsx';

export default function VendorDiscovery() {
  const { isSaved, toggleSave, isInCompare, toggleCompare, openModal } = usePlanning();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredVendors = selectedCategory === 'All'
    ? VENDORS
    : VENDORS.filter((v) => v.category === selectedCategory);

  return (
    <section id="vendors" className="py-20 md:py-28 bg-[#FDFBF7] border-t border-[#EAE3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-[#8C7E72] font-semibold mb-2 block">
              04 · Trusted Directory
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1C1917] tracking-tight">
              Find the people who can bring your ideas to life.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#57534E] leading-relaxed">
              Explore trusted wedding professionals by category, style, location and budget.
            </p>
          </div>

          <div className="mt-6 md:mt-0">
            <button
              onClick={() => openModal('search', { category: 'Vendors' })}
              className="group inline-flex items-center space-x-2 text-sm font-medium text-[#1C1917] hover:text-[#8E4A49] transition-colors"
            >
              <span>Explore all vendors</span>
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>

        {/* Visual Category Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 mb-14">
          {VENDOR_CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(selectedCategory === cat.name ? 'All' : cat.name)}
              className={`group relative rounded-xl overflow-hidden aspect-[4/5] border text-left p-2.5 flex flex-col justify-end transition-all ${
                selectedCategory === cat.name
                  ? 'ring-2 ring-[#6B3037] border-transparent'
                  : 'border-[#EAE3DA] hover:border-[#D4C5B9]'
              }`}
            >
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="relative z-10 text-white">
                <span className="font-medium text-xs sm:text-sm block">{cat.name}</span>
                <span className="text-[10px] text-[#FAF8F5]/80 block">{cat.count}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Featured Vendors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVendors.map((vendor) => {
            const saved = isSaved(vendor.id);
            const inCompare = isInCompare(vendor.id);

            return (
              <div
                key={vendor.id}
                className="bg-white rounded-2xl border border-[#EAE3DA] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Vendor Image Banner */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#F4EFEA]">
                    <img
                      src={vendor.image}
                      alt={vendor.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Top Category Badge */}
                    <div className="absolute top-3.5 left-3.5">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#FAF8F5]/90 backdrop-blur-sm text-[#1C1917] border border-white/40">
                        {vendor.category}
                      </span>
                    </div>

                    {/* Quick Action Overlay Icons */}
                    <div className="absolute top-3.5 right-3.5 flex items-center space-x-1.5">
                      {/* Heart Button */}
                      <button
                        onClick={() => toggleSave(vendor)}
                        className={`p-2 rounded-full backdrop-blur-md transition-all active:scale-90 ${
                          saved
                            ? 'bg-[#8E4A49] text-white'
                            : 'bg-white/85 text-[#1C1917] hover:bg-white hover:text-[#8E4A49]'
                        }`}
                        title="Save to Favourites"
                      >
                        <svg className="w-4 h-4" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>

                    <div className="absolute bottom-3 left-3 text-white text-xs bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-md">
                      <span>{vendor.subCategory}</span>
                    </div>
                  </div>

                  {/* Vendor Details */}
                  <div className="p-5">
                    <div className="flex items-center justify-between text-xs text-[#8C7E72] mb-1.5">
                      <span>{vendor.location}</span>
                      <div className="flex items-center text-[#8E4A49] font-medium">
                        <span className="mr-1">★</span>
                        <span>{vendor.rating}</span>
                        <span className="text-[#8C7E72] ml-1">({vendor.reviewsCount})</span>
                      </div>
                    </div>

                    <h3 className="font-serif text-xl font-medium text-[#1C1917] mb-2">
                      {vendor.name}
                    </h3>

                    <p className="text-xs text-[#57534E] leading-relaxed line-clamp-2 mb-4">
                      {vendor.description}
                    </p>

                    <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#EAE3DA] mb-4">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#8C7E72]">Pricing Guide</span>
                        <span className="font-semibold text-[#1C1917]">{vendor.priceFormatted}</span>
                      </div>
                      <div className="text-[11px] text-[#A39081] mt-1">
                        Style: {vendor.style}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="px-5 pb-5 pt-0 flex items-center gap-2">
                  <button
                    onClick={() => toggleCompare(vendor)}
                    className={`flex-1 py-2 px-3 text-xs font-medium rounded-xl border transition-all flex items-center justify-center space-x-1 ${
                      inCompare
                        ? 'bg-[#6B3037] text-white border-[#6B3037]'
                        : 'bg-white text-[#1C1917] border-[#EAE3DA] hover:bg-[#F4EFEA]'
                    }`}
                  >
                    <span>{inCompare ? '✓ In Compare' : '＋ Compare'}</span>
                  </button>

                  <button
                    onClick={() => openModal('itemDetail', vendor)}
                    className="flex-1 py-2 px-3 text-xs font-medium rounded-xl bg-[#1C1917] hover:bg-[#34302C] text-white transition-colors text-center"
                  >
                    View Profile
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
