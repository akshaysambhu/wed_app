/**
 * VendorsPage.jsx — /vendors
 * Full directory page with filters to discover vendors.
 */
import React, { useState } from 'react';
import { VENDORS, VENDOR_CATEGORIES } from '../data/mockData.js';
import VendorCard from '../components/ui/VendorCard.jsx';

export default function VendorsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVendors = VENDORS.filter(v => {
    const matchesCat = activeCategory === 'All' || v.category === activeCategory;
    const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          v.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl text-[#1C1917] mb-3">Discover Vendors</h1>
            <p className="text-[#78716C]">Browse top-rated professionals for your event.</p>
          </div>
          
          <div className="w-full md:w-72">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A39081]">🔍</span>
              <input 
                type="text" 
                placeholder="Search name or location..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#EAE3DA] rounded-full pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-[#6B3037] transition-colors shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Categories (Horizontal Scroll on Mobile) */}
        <div className="flex overflow-x-auto pb-4 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0 gap-2 hide-scrollbar">
          <button
            onClick={() => setActiveCategory('All')}
            className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-200 ${
              activeCategory === 'All'
                ? 'bg-[#1C1917] text-white border-[#1C1917]'
                : 'bg-white text-[#78716C] border-[#EAE3DA] hover:border-[#D4C5B9]'
            }`}
          >
            All Vendors
          </button>
          {VENDOR_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                activeCategory === cat.name
                  ? 'bg-[#1C1917] text-white border-[#1C1917]'
                  : 'bg-white text-[#78716C] border-[#EAE3DA] hover:border-[#D4C5B9]'
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* Results */}
        {filteredVendors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredVendors.map(vendor => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-[#EAE3DA] rounded-3xl">
            <span className="text-4xl mb-4 block">🔍</span>
            <h3 className="font-serif text-2xl text-[#1C1917] mb-2">No vendors found</h3>
            <p className="text-[#78716C]">Try adjusting your search or category filter.</p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="mt-6 px-6 py-2.5 border border-[#EAE3DA] rounded-full text-sm font-medium text-[#1C1917] hover:bg-[#F4EFEA] transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
