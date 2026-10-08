/**
 * VendorsPage.jsx — /vendors
 * Advanced vendor discovery platform.
 */
import React, { useState } from 'react';
import { VENDORS } from '../data/mockData.js';
import VendorCard from '../components/ui/VendorCard.jsx';

const FILTERS = ['Event', 'Service', 'Location', 'Budget', 'Rating', 'Availability', 'Style'];

export default function VendorsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVendors = VENDORS.filter(v => {
    return v.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
           v.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
           v.location.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Search */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl text-[#1C1917] mb-6">Find the people behind your moment.</h1>
          
          <div className="relative max-w-2xl mx-auto">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#A39081] text-lg">🔍</span>
            <input 
              type="text" 
              placeholder="Search vendors, services, locations…" 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#EAE3DA] rounded-full pl-14 pr-6 py-4 text-base focus:outline-none focus:border-[#6B3037] transition-colors shadow-sm"
            />
          </div>
        </div>

        {/* Toolbar: Filters & Sort */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
          <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar w-full md:w-auto">
            {FILTERS.map(filter => (
              <button key={filter} className="px-4 py-2 bg-white border border-[#EAE3DA] rounded-full text-xs font-semibold text-[#44403C] hover:bg-[#FDFBF7] flex items-center gap-1.5 flex-shrink-0">
                {filter} ▾
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
            <span className="text-xs font-medium text-[#78716C]">Sort by:</span>
            <select className="bg-transparent text-sm font-semibold text-[#1C1917] focus:outline-none border-b border-[#D4C5B9] pb-1 cursor-pointer">
              <option>Recommended</option>
              <option>Highest Rated</option>
              <option>Most Reviewed</option>
              <option>Price Low → High</option>
              <option>Price High → Low</option>
            </select>
          </div>
        </div>

        {/* Vendor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVendors.length > 0 ? (
            filteredVendors.map(vendor => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-lg text-[#78716C]">No vendors found matching your search.</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-4 px-6 py-2 bg-white border border-[#D4C5B9] rounded-full text-sm font-semibold hover:border-[#1C1917]"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
