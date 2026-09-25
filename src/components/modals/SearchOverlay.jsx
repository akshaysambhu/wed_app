import React, { useState, useEffect } from 'react';
import { usePlanning } from '../../context/PlanningContext.jsx';
import { INSPIRATIONS, REAL_WEDDINGS, VENDORS, VENUES } from '../../data/mockData.js';

export default function SearchOverlay() {
  const { searchQuery, setSearchQuery, closeModal, openModal, toggleSave, isSaved } = usePlanning();
  const [query, setQuery] = useState(searchQuery || '');

  useEffect(() => {
    setQuery(searchQuery || '');
  }, [searchQuery]);

  const cleanQuery = query.toLowerCase().trim();

  // Filter Inspirations
  const matchedInspirations = INSPIRATIONS.filter(
    (item) =>
      !cleanQuery ||
      item.title.toLowerCase().includes(cleanQuery) ||
      item.category.toLowerCase().includes(cleanQuery) ||
      item.location.toLowerCase().includes(cleanQuery) ||
      item.couple.toLowerCase().includes(cleanQuery)
  );

  // Filter Vendors
  const matchedVendors = VENDORS.filter(
    (v) =>
      !cleanQuery ||
      v.name.toLowerCase().includes(cleanQuery) ||
      v.category.toLowerCase().includes(cleanQuery) ||
      v.location.toLowerCase().includes(cleanQuery) ||
      v.style.toLowerCase().includes(cleanQuery)
  );

  // Filter Venues
  const matchedVenues = VENUES.filter(
    (v) =>
      !cleanQuery ||
      v.name.toLowerCase().includes(cleanQuery) ||
      v.location.toLowerCase().includes(cleanQuery) ||
      v.style.toLowerCase().includes(cleanQuery)
  );

  // Filter Real Weddings
  const matchedWeddings = REAL_WEDDINGS.filter(
    (w) =>
      !cleanQuery ||
      w.couple.toLowerCase().includes(cleanQuery) ||
      w.location.toLowerCase().includes(cleanQuery) ||
      w.story.toLowerCase().includes(cleanQuery)
  );

  const totalResults = matchedInspirations.length + matchedVendors.length + matchedVenues.length + matchedWeddings.length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm p-4 sm:p-6 lg:p-8 flex items-start justify-center pt-16 sm:pt-24 animate-fadeIn">
      <div className="bg-[#FAF8F5] border border-[#EAE3DA] rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Search Header Bar */}
        <div className="p-4 sm:p-6 border-b border-[#EAE3DA] bg-white flex items-center space-x-3 shrink-0">
          <svg className="w-5 h-5 text-[#8C7E72] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSearchQuery(e.target.value);
            }}
            placeholder="Search weddings, photographers, catering, venues, decoration..."
            className="flex-1 text-base sm:text-lg text-[#1C1917] placeholder-[#A8A29E] bg-transparent border-none focus:outline-none"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setSearchQuery('');
              }}
              className="text-xs text-[#8C7E72] hover:text-[#1C1917] px-2 py-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={closeModal}
            className="p-2 text-[#8C7E72] hover:text-[#1C1917] rounded-full hover:bg-[#F4EFEA] transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Search Results Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <div className="text-xs text-[#8C7E72] flex items-center justify-between pb-2 border-b border-[#EAE3DA]">
            <span>Showing {totalResults} curated results {query ? `for "${query}"` : ''}</span>
            <span>Tap to inspect or save</span>
          </div>

          {/* Vendors Matches */}
          {matchedVendors.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8E4A49] mb-3">
                Vendors ({matchedVendors.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {matchedVendors.map((vendor) => (
                  <div
                    key={vendor.id}
                    onClick={() => {
                      closeModal();
                      openModal('itemDetail', vendor);
                    }}
                    className="p-3.5 rounded-xl bg-white border border-[#EAE3DA] hover:border-[#D4C5B9] cursor-pointer flex items-center space-x-3 transition-all"
                  >
                    <img src={vendor.image} alt={vendor.name} className="w-14 h-14 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-[#8C7E72]">{vendor.category}</span>
                        <span className="text-xs text-[#8E4A49] font-medium">★ {vendor.rating}</span>
                      </div>
                      <h5 className="font-medium text-sm text-[#1C1917] truncate">{vendor.name}</h5>
                      <span className="text-xs text-[#57534E]">{vendor.priceFormatted}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Real Weddings Matches */}
          {matchedWeddings.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8E4A49] mb-3">
                Real Weddings ({matchedWeddings.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {matchedWeddings.map((w) => (
                  <div
                    key={w.id}
                    onClick={() => {
                      closeModal();
                      openModal('realWedding', w);
                    }}
                    className="p-3.5 rounded-xl bg-white border border-[#EAE3DA] hover:border-[#D4C5B9] cursor-pointer flex items-center space-x-3 transition-all"
                  >
                    <img src={w.heroImage} alt={w.couple} className="w-14 h-14 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-serif text-base font-semibold text-[#1C1917] truncate">{w.couple}</h5>
                      <p className="text-xs text-[#8C7E72]">{w.location} · {w.guests}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Inspiration Matches */}
          {matchedInspirations.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8E4A49] mb-3">
                Inspirations ({matchedInspirations.length})
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {matchedInspirations.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      closeModal();
                      openModal('itemDetail', item);
                    }}
                    className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#F4EFEA] group cursor-pointer"
                  >
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2 text-white">
                      <span className="text-[10px] uppercase font-medium">{item.category}</span>
                      <h6 className="font-serif text-xs font-medium truncate">{item.title}</h6>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
