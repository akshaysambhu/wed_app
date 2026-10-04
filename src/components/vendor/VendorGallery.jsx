import React, { useState } from 'react';

const TABS = ['All', 'Ceremony', 'Portraits', 'Reception', 'Candid', 'Bridal', 'Detail Shots'];

export default function VendorGallery({ gallery, vendorName }) {
  const [activeTab, setActiveTab] = useState('All');
  const [lightbox, setLightbox] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const filtered = activeTab === 'All' ? gallery : gallery.filter(g => g.category === activeTab);
  const visible = showAll ? filtered : filtered.slice(0, 9);

  return (
    <div>
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8E4A49] mb-2">Portfolio</p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#1C1917]">Gallery</h2>
          <p className="text-[#78716C] mt-2 text-sm">{gallery.length} curated photographs from real weddings</p>
        </div>
        <div className="text-sm text-[#A39081]">All photos by {vendorName}</div>
      </div>

      {/* Tab Filter */}
      <div className="flex gap-2 flex-wrap mb-8">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setShowAll(false); }}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
              activeTab === tab
                ? 'bg-[#1C1917] text-white border-[#1C1917]'
                : 'bg-white text-[#78716C] border-[#D4C5B9] hover:border-[#1C1917] hover:text-[#1C1917]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <div className="columns-2 md:columns-3 gap-3 space-y-3">
        {visible.map((img, i) => (
          <div
            key={img.id}
            className="break-inside-avoid relative group cursor-pointer rounded-xl overflow-hidden bg-[#EAE3DA]"
            onClick={() => setLightbox(img)}
          >
            <img
              src={img.url}
              alt={img.alt}
              className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              style={{ aspectRatio: img.aspect === 'portrait' ? '3/4' : img.aspect === 'landscape' ? '4/3' : '1/1' }}
              loading="lazy"
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-[#1C1917]/0 group-hover:bg-[#1C1917]/50 transition-all duration-300 flex flex-col items-center justify-end p-4 opacity-0 group-hover:opacity-100">
              <div className="text-center">
                <p className="text-white text-xs font-medium mb-1">{img.couple}</p>
                <p className="text-[#E8D4CF] text-[10px]">{img.category}</p>
              </div>
            </div>
            {/* Category pill */}
            <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span className="bg-black/60 text-white text-[10px] px-2 py-1 rounded-lg backdrop-blur-sm">
                {img.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {filtered.length > visible.length && (
        <div className="mt-10 text-center">
          <button
            onClick={() => setShowAll(true)}
            className="px-8 py-3 border-2 border-[#D4C5B9] text-[#44403C] rounded-xl font-medium text-sm hover:border-[#1C1917] hover:text-[#1C1917] transition-all duration-200"
          >
            View all {filtered.length} photographs
          </button>
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full" onClick={e => e.stopPropagation()}>
            <img
              src={lightbox.url}
              alt={lightbox.alt}
              className="w-full h-full object-contain rounded-2xl"
              style={{ maxHeight: '85vh' }}
            />
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div>
                <p className="text-white font-medium text-sm">{lightbox.couple}</p>
                <p className="text-white/60 text-xs">{lightbox.category}</p>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl text-sm backdrop-blur-sm transition-colors"
              >
                Close ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
