import React, { useState } from 'react';
import { usePlanning } from '../../context/PlanningContext.jsx';

const TABS = ['All', 'Ceremony', 'Portraits', 'Reception', 'Candid', 'Bridal', 'Detail Shots'];

export default function VendorGallery({ gallery, vendorName }) {
  const [activeTab, setActiveTab] = useState('All');
  const [showAll, setShowAll] = useState(false);
  const { openDiscussion } = usePlanning();

  const filtered = activeTab === 'All' ? gallery : gallery.filter(g => g.category === activeTab);
  const visible = showAll ? filtered : filtered.slice(0, 9);

  const handleDiscussPhoto = (e, img) => {
    e.stopPropagation();
    openDiscussion({
      type: 'photo',
      item: {
        url: img.url,
        caption: `${vendorName} - ${img.couple || img.category}`
      }
    });
  };

  const handleSavePhoto = (e) => {
    e.stopPropagation();
    // In real app, add to saved photos collection
    alert('Photo saved to inspiration board!');
  };

  return (
    <div>
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8E4A49] mb-2">Portfolio</p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#1C1917]">Gallery</h2>
          <p className="text-[#78716C] mt-2 text-sm">{gallery.length} curated photographs from real weddings</p>
        </div>
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
            className="break-inside-avoid relative group rounded-xl overflow-hidden bg-[#EAE3DA]"
          >
            <img
              src={img.url}
              alt={img.alt}
              className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              style={{ aspectRatio: img.aspect === 'portrait' ? '3/4' : img.aspect === 'landscape' ? '4/3' : '1/1' }}
              loading="lazy"
            />
            {/* Hover Overlay with deep-level actions */}
            <div className="absolute inset-0 bg-black/40 transition-all duration-300 flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100">
              <div className="flex justify-end gap-2">
                <button 
                  onClick={handleSavePhoto}
                  className="px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white text-xs font-semibold rounded-lg transition-colors border border-white/30"
                >
                  Save
                </button>
                <button 
                  onClick={(e) => handleDiscussPhoto(e, img)}
                  className="px-4 py-2 bg-[#6B3037] text-white text-xs font-semibold rounded-lg hover:bg-[#52242A] transition-colors shadow-lg"
                >
                  Discuss
                </button>
              </div>
              <div className="text-left">
                <p className="text-white text-sm font-medium">{img.couple}</p>
                <p className="text-white/70 text-xs">{img.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!showAll && filtered.length > 9 && (
        <div className="mt-12 text-center">
          <button
            onClick={() => setShowAll(true)}
            className="px-8 py-3.5 border-2 border-[#1C1917] text-[#1C1917] text-sm font-semibold rounded-full hover:bg-[#1C1917] hover:text-white transition-colors"
          >
            View All Photos
          </button>
        </div>
      )}
    </div>
  );
}
