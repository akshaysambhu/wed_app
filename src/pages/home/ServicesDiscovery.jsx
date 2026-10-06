import React, { useState } from 'react';
import { SERVICE_DETAILS } from '../../data/mockData.js';
import { usePlanning } from '../../context/PlanningContext.jsx';

export default function ServicesDiscovery() {
  const { openModal } = usePlanning();
  const [activeTab, setActiveTab] = useState('catering');

  const services = [
    { id: 'catering', name: 'Wedding Catering', icon: '🍽️', desc: 'Curated menus, culinary styles & live stations' },
    { id: 'photography', name: 'Visual Storytelling', icon: '📷', desc: 'Editorial candid, film & cinema packages' },
    { id: 'decor', name: 'Spatial & Floral Design', icon: '🌿', desc: 'Atmospheric decor, lighting & sustainable mandaps' },
    { id: 'makeup', name: 'Bridal Beauty & Hair', icon: '✨', desc: 'Skin-first dewy makeup & traditional styling' },
    { id: 'entertainment', name: 'Live Music & Arts', icon: '🎻', desc: 'Acoustic sets, classical fusion & DJs' },
    { id: 'invitations', name: 'Stationery & Calligraphy', icon: '✉️', desc: 'Handmade deckle paper & wax seals' },
    { id: 'outfits', name: 'Bridal & Groom Couture', icon: '👘', desc: 'Raw silks, heritage weaves & bespoke tailoring' },
    { id: 'transportation', name: 'Guest Logistics & Boats', icon: '⛵', desc: 'Backwater houseboats & vintage cars' },
    { id: 'accommodation', name: 'Heritage Stays & Villas', icon: '🏡', desc: 'Boutique estates for family celebrations' }
  ];

  const cateringData = SERVICE_DETAILS.catering;

  return (
    <section id="services" className="py-20 md:py-28 bg-[#FDFBF7] border-t border-[#EAE3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase tracking-widest text-[#8C7E72] font-semibold mb-2 block">
            06 · Service-First Discovery
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1C1917] tracking-tight">
            Plan every part of the celebration.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#57534E] leading-relaxed">
            Start with the experience you want to design, not just a list of vendor names. Explore cuisines, menus, package structures, and real celebrations before hiring.
          </p>
        </div>

        {/* Horizontal Service Pills / Tabs */}
        <div className="flex items-center space-x-2.5 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {services.map((srv) => (
            <button
              key={srv.id}
              onClick={() => setActiveTab(srv.id)}
              className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex items-center space-x-2 ${
                activeTab === srv.id
                  ? 'bg-[#1C1917] text-white shadow-sm'
                  : 'bg-[#FAF8F5] text-[#57534E] hover:bg-[#EAE3DA] hover:text-[#1C1917] border border-[#EAE3DA]'
              }`}
            >
              <span>{srv.icon}</span>
              <span>{srv.name}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Service Breakdown Content Panel */}
        <div className="bg-white rounded-3xl border border-[#EAE3DA] p-6 sm:p-8 lg:p-10 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-8 border-b border-[#F4EFEA] mb-8 gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8E4A49]">
                Service Blueprint
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1917] mt-1">
                {activeTab === 'catering' ? cateringData.title : `${services.find(s => s.id === activeTab)?.name} Planning Guide`}
              </h3>
              <p className="text-sm text-[#57534E] mt-1">
                {activeTab === 'catering' ? cateringData.description : 'Explore aesthetic styles, budget packages, and vetted professionals.'}
              </p>
            </div>

            <button
              onClick={() => openModal('search', { query: activeTab })}
              className="px-5 py-2.5 text-xs font-medium text-white bg-[#1C1917] hover:bg-[#34302C] rounded-xl self-start lg:self-auto transition-colors"
            >
              Explore {services.find(s => s.id === activeTab)?.name} →
            </button>
          </div>

          {/* 4 Architectural Columns of Service Discovery */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Column 1: Cuisine & Styles */}
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EAE3DA]">
              <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#1C1917] mb-3">
                <span className="w-2 h-2 rounded-full bg-[#8E4A49]"></span>
                <span>1. Cuisines & Themes</span>
              </div>
              <ul className="space-y-2 text-xs text-[#57534E]">
                {cateringData.cuisines.map((c, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-[#8C7E72]">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Sample Menus */}
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EAE3DA]">
              <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#1C1917] mb-3">
                <span className="w-2 h-2 rounded-full bg-[#8E4A49]"></span>
                <span>2. Curated Menus</span>
              </div>
              <ul className="space-y-2 text-xs text-[#57534E]">
                {cateringData.menus.map((m, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-[#8C7E72]">•</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Package Tiers */}
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EAE3DA]">
              <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#1C1917] mb-3">
                <span className="w-2 h-2 rounded-full bg-[#8E4A49]"></span>
                <span>3. Budget Packages</span>
              </div>
              <div className="space-y-3">
                {cateringData.packages.map((pkg, i) => (
                  <div key={i} className="text-xs">
                    <div className="flex justify-between font-medium text-[#1C1917]">
                      <span>{pkg.name}</span>
                      <span className="text-[#8E4A49]">{pkg.price}</span>
                    </div>
                    <p className="text-[11px] text-[#8C7E72] mt-0.5">{pkg.items}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 4: Real Weddings & Top Caterers */}
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EAE3DA]">
              <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#1C1917] mb-3">
                <span className="w-2 h-2 rounded-full bg-[#8E4A49]"></span>
                <span>4. Connected Caterers</span>
              </div>
              <div className="space-y-2 mb-4">
                {cateringData.featuredCaterers.map((cat, i) => (
                  <button
                    key={i}
                    onClick={() => openModal('search', { query: cat })}
                    className="w-full text-left p-2 rounded-lg bg-white hover:bg-[#F4EFEA] border border-[#EAE3DA] text-xs font-medium text-[#1C1917] flex justify-between items-center transition-colors"
                  >
                    <span>{cat}</span>
                    <span className="text-[#8C7E72]">→</span>
                  </button>
                ))}
              </div>
              <div className="pt-2 border-t border-[#EAE3DA] text-[11px] text-[#8C7E72]">
                Seen in: <span className="text-[#1C1917] font-medium">Anjali & Rohan, Maya & Alex</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
