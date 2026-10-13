/**
 * AttachmentPicker.jsx
 * Popover drawer inside the couple discussion to pick an attachment:
 * - Vendor attachment
 * - Venue attachment
 * - Story attachment
 * - Package attachment
 * - Inspiration attachment
 * - Photo attachment
 */
import React, { useState } from 'react';
import { usePlanning } from '../../context/PlanningContext.jsx';
import { STORIES_BY_AMAL } from '../../data/vendorData.js';
import { VENDORS, VENUES, REAL_WEDDINGS, INSPIRATIONS } from '../../data/mockData.js';

export default function AttachmentPicker({ onSelect, onClose }) {
  const { shortlistItems } = usePlanning();
  const [activeTab, setActiveTab] = useState('vendor');
  const [search, setSearch] = useState('');

  // Curated list of vendors
  const allVendors = [
    {
      id: 'stories-by-amal',
      name: 'Stories by Amal',
      category: 'Photography',
      location: 'Kochi',
      rating: 4.9,
      startingPrice: 'From ₹45,000',
      image: STORIES_BY_AMAL.heroImage,
      slug: 'stories-by-amal',
    },
    ...VENDORS.map(v => ({
      id: v.id,
      name: v.name,
      category: v.category,
      location: v.location.split(',')[0].trim(),
      rating: v.rating,
      startingPrice: v.priceFormatted,
      image: v.image,
      slug: v.id,
    })),
  ];

  // Curated list of packages
  const packagesList = [
    {
      id: 'pkg-story',
      name: 'Story Package',
      emoji: '📖',
      vendorName: 'Stories by Amal',
      category: 'Photography',
      price: '₹45,000',
      duration: '6 hours',
      tagline: '300+ edited shots, online gallery, 48hr preview',
    },
    {
      id: 'pkg-chapter',
      name: 'Chapter Package',
      emoji: '📚',
      vendorName: 'Stories by Amal',
      category: 'Photography',
      price: '₹75,000',
      duration: 'Full day (10–12 hrs)',
      tagline: '2 photographers, 600+ edits, handcrafted linen album',
    },
    {
      id: 'pkg-legacy',
      name: 'Legacy Package',
      emoji: '👑',
      vendorName: 'Stories by Amal',
      category: 'Photography',
      price: '₹1,20,000',
      duration: '3-Day Multi-Event',
      tagline: '3 photographers + 4K drone, 2 luxury albums, pre-wedding shoot',
    },
    {
      id: 'pkg-cater-classic',
      name: 'Heritage Classic Sadhya',
      emoji: '🍛',
      vendorName: 'Gather & Graze',
      category: 'Catering',
      price: '₹650 / guest',
      duration: 'Full Service',
      tagline: '12 courses, brass dinnerware, spiced filter coffee counter',
    },
  ];

  // Curated photos
  const curatedPhotos = [
    {
      id: 'photo-1',
      url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80',
      caption: 'Backwaters mandap ceremony setup',
    },
    {
      id: 'photo-2',
      url: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=600&q=80',
      caption: 'Golden hour sunset couple portrait',
    },
    {
      id: 'photo-3',
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
      caption: 'Waterfront banquet table with warm candlelight',
    },
    {
      id: 'photo-4',
      url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
      caption: 'Handcrafted raw silk heirloom bridal attire',
    },
  ];

  const handleCustomUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const fakeUrl = URL.createObjectURL(file);
      onSelect({
        type: 'photo',
        item: {
          id: `upload-${Date.now()}`,
          url: fakeUrl,
          caption: file.name.replace(/\.[^/.]+$/, ''),
        },
      });
    }
  };

  return (
    <div className="bg-white border-t border-[#EAE3DA] rounded-t-2xl shadow-xl flex flex-col max-h-72 overflow-hidden animate-slideUp">
      {/* Header */}
      <div className="px-3.5 py-2.5 bg-[#FAF8F5] border-b border-[#EAE3DA] flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="text-sm">📎</span>
          <span className="text-xs font-bold text-[#1C1917]">Attach to Discussion</span>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-[#78716C] hover:text-[#1C1917] rounded-lg transition-colors"
          title="Close Picker"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto px-2 py-1.5 bg-white border-b border-[#EAE3DA] gap-1 no-scrollbar flex-shrink-0">
        {[
          { id: 'vendor', label: 'Vendors', icon: '📸' },
          { id: 'venue', label: 'Venues', icon: '🏛️' },
          { id: 'story', label: 'Stories', icon: '💍' },
          { id: 'package', label: 'Packages', icon: '📦' },
          { id: 'inspiration', label: 'Inspirations', icon: '✨' },
          { id: 'photo', label: 'Photos', icon: '🖼️' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg whitespace-nowrap transition-colors flex items-center gap-1 ${
              activeTab === tab.id
                ? 'bg-[#6B3037] text-white shadow-xs'
                : 'text-[#78716C] hover:bg-[#F4EFEA] hover:text-[#1C1917]'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="px-3 py-1.5 border-b border-[#F4EFEA] flex-shrink-0">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={`Search ${activeTab}s...`}
          className="w-full text-xs px-2.5 py-1.5 bg-[#FAF8F5] border border-[#EAE3DA] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6B3037]"
        />
      </div>

      {/* Tab Content List */}
      <div className="flex-1 overflow-y-auto p-2.5 space-y-2 bg-[#FAF8F5]">
        {/* VENDORS */}
        {activeTab === 'vendor' && (
          <div className="space-y-1.5">
            {allVendors
              .filter(v => v.name.toLowerCase().includes(search.toLowerCase()) || v.category.toLowerCase().includes(search.toLowerCase()))
              .map(v => (
                <div
                  key={v.id}
                  onClick={() => onSelect({ type: 'vendor', item: v })}
                  className="flex items-center gap-2.5 p-2 bg-white hover:bg-[#FAF4F2] border border-[#EAE3DA] hover:border-[#6B3037]/40 rounded-xl cursor-pointer transition-all group"
                >
                  <img src={v.image} alt={v.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#1C1917] truncate group-hover:text-[#6B3037]">{v.name}</p>
                    <p className="text-[10px] text-[#78716C] truncate">{v.category} · {v.location} · ★ {v.rating}</p>
                  </div>
                  <span className="text-[11px] font-bold text-[#6B3037] group-hover:translate-x-0.5 transition-transform">+ Attach</span>
                </div>
              ))}
          </div>
        )}

        {/* VENUES */}
        {activeTab === 'venue' && (
          <div className="space-y-1.5">
            {VENUES
              .filter(v => v.name.toLowerCase().includes(search.toLowerCase()) || v.location.toLowerCase().includes(search.toLowerCase()))
              .map(v => (
                <div
                  key={v.id}
                  onClick={() => onSelect({ type: 'venue', item: v })}
                  className="flex items-center gap-2.5 p-2 bg-white hover:bg-[#FAF4F2] border border-[#EAE3DA] hover:border-[#6B3037]/40 rounded-xl cursor-pointer transition-all group"
                >
                  <img src={v.image} alt={v.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#1C1917] truncate group-hover:text-[#6B3037]">{v.name}</p>
                    <p className="text-[10px] text-[#78716C] truncate">{v.location} · {v.priceFormatted}</p>
                  </div>
                  <span className="text-[11px] font-bold text-[#6B3037] group-hover:translate-x-0.5 transition-transform">+ Attach</span>
                </div>
              ))}
          </div>
        )}

        {/* STORIES */}
        {activeTab === 'story' && (
          <div className="space-y-1.5">
            {REAL_WEDDINGS
              .filter(s => s.couple.toLowerCase().includes(search.toLowerCase()) || s.location.toLowerCase().includes(search.toLowerCase()))
              .map(s => (
                <div
                  key={s.id}
                  onClick={() => onSelect({ type: 'story', item: s })}
                  className="flex items-center gap-2.5 p-2 bg-white hover:bg-[#FAF4F2] border border-[#EAE3DA] hover:border-[#6B3037]/40 rounded-xl cursor-pointer transition-all group"
                >
                  <img src={s.heroImage} alt={s.couple} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#1C1917] truncate group-hover:text-[#6B3037]">{s.couple}</p>
                    <p className="text-[10px] text-[#78716C] truncate">{s.location} · {s.season}</p>
                  </div>
                  <span className="text-[11px] font-bold text-[#6B3037] group-hover:translate-x-0.5 transition-transform">+ Attach</span>
                </div>
              ))}
          </div>
        )}

        {/* PACKAGES */}
        {activeTab === 'package' && (
          <div className="space-y-1.5">
            {packagesList
              .filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.vendorName.toLowerCase().includes(search.toLowerCase()))
              .map(p => (
                <div
                  key={p.id}
                  onClick={() => onSelect({ type: 'package', item: p })}
                  className="p-2 bg-white hover:bg-[#FAF4F2] border border-[#EAE3DA] hover:border-[#6B3037]/40 rounded-xl cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-[#1C1917] group-hover:text-[#6B3037]">
                      {p.emoji} {p.name}
                    </p>
                    <span className="text-xs font-extrabold text-[#6B3037]">{p.price}</span>
                  </div>
                  <p className="text-[10px] text-[#78716C] mt-0.5">{p.vendorName} · {p.tagline}</p>
                </div>
              ))}
          </div>
        )}

        {/* INSPIRATIONS */}
        {activeTab === 'inspiration' && (
          <div className="space-y-1.5">
            {INSPIRATIONS
              .filter(i => i.title.toLowerCase().includes(search.toLowerCase()) || i.category.toLowerCase().includes(search.toLowerCase()))
              .map(i => (
                <div
                  key={i.id}
                  onClick={() => onSelect({ type: 'inspiration', item: i })}
                  className="flex items-center gap-2.5 p-2 bg-white hover:bg-[#FAF4F2] border border-[#EAE3DA] hover:border-[#6B3037]/40 rounded-xl cursor-pointer transition-all group"
                >
                  <img src={i.image} alt={i.title} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#1C1917] truncate group-hover:text-[#6B3037]">{i.title}</p>
                    <p className="text-[10px] text-[#78716C] truncate">{i.category} · {i.location}</p>
                  </div>
                  <span className="text-[11px] font-bold text-[#6B3037] group-hover:translate-x-0.5 transition-transform">+ Attach</span>
                </div>
              ))}
          </div>
        )}

        {/* PHOTOS */}
        {activeTab === 'photo' && (
          <div className="space-y-2">
            <label className="block p-2 bg-white border border-dashed border-[#8E4A49] rounded-xl text-center cursor-pointer hover:bg-[#FAF6F0] transition-colors">
              <span className="text-xs font-bold text-[#6B3037]">📷 Upload Photo from Device</span>
              <input type="file" accept="image/*" onChange={handleCustomUpload} className="hidden" />
            </label>

            <div className="grid grid-cols-2 gap-1.5">
              {curatedPhotos.map(p => (
                <div
                  key={p.id}
                  onClick={() => onSelect({ type: 'photo', item: p })}
                  className="h-20 rounded-lg overflow-hidden relative cursor-pointer group border border-[#EAE3DA]"
                >
                  <img src={p.url} alt={p.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-1.5">
                    <p className="text-[10px] text-white font-medium truncate">{p.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
