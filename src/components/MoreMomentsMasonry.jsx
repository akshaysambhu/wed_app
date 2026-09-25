import React, { useState } from 'react';
import { INSPIRATIONS } from '../data/mockData.js';
import { usePlanning } from '../context/PlanningContext.jsx';

export default function MoreMomentsMasonry() {
  const { isSaved, toggleSave, openModal } = usePlanning();
  const [activeFilter, setActiveFilter] = useState('All');

  // Multi-moment gallery showcasing multiple moments from the same couples
  const moments = [
    {
      id: 'mm-1',
      title: 'Backwater Mandap Golden Hour',
      couple: 'Anjali & Rohan',
      category: 'Ceremony',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=85',
      height: 'h-80',
      vendor: 'Petal & Stem'
    },
    {
      id: 'mm-2',
      title: 'Bridal Portrait in Raw Silk',
      couple: 'Anjali & Rohan',
      category: 'Bridal',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85',
      height: 'h-96',
      vendor: 'Northlight Studios'
    },
    {
      id: 'mm-3',
      title: 'Clifftop Vows at Dusk',
      couple: 'Maya & Alex',
      category: 'Ceremony',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=85',
      height: 'h-72',
      vendor: 'Cinematic Frames'
    },
    {
      id: 'mm-4',
      title: 'Botanical Dinner Tablescape',
      couple: 'Maya & Alex',
      category: 'Reception',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=85',
      height: 'h-88',
      vendor: 'Wildflower Tales'
    },
    {
      id: 'mm-5',
      title: 'Heirloom Brass Oil Lamps',
      couple: 'Asha & Arun',
      category: 'Details',
      image: 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=800&q=85',
      height: 'h-72',
      vendor: 'Willow House'
    },
    {
      id: 'mm-6',
      title: 'Interactive Chef Plating & Grills',
      couple: 'Anjali & Rohan',
      category: 'Food',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=85',
      height: 'h-96',
      vendor: 'Gather & Graze'
    },
    {
      id: 'mm-7',
      title: 'Handmade Cotton Rag Suite',
      couple: 'Asha & Arun',
      category: 'Details',
      image: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=85',
      height: 'h-80',
      vendor: 'The Paper Foundry'
    },
    {
      id: 'mm-8',
      title: 'Tender Coconut Panna Cotta',
      couple: 'Maya & Alex',
      category: 'Food',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=85',
      height: 'h-88',
      vendor: 'Gather & Graze'
    }
  ];

  const filtered = activeFilter === 'All'
    ? moments
    : moments.filter(m => m.category === activeFilter);

  return (
    <section id="more-moments" className="py-20 md:py-28 bg-[#FDFBF7] border-t border-[#EAE3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-[#8C7E72] font-semibold mb-2 block">
              12 · Continuous Inspiration
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1C1917] tracking-tight">
              More moments to inspire you.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#57534E] leading-relaxed">
              Real celebrations contain dozens of subtle, unforgettable moments. Explore multiple facets from the same weddings across photographers, styles, and settings.
            </p>
          </div>

          {/* Quick Filter Buttons */}
          <div className="mt-6 md:mt-0 flex items-center space-x-2 overflow-x-auto pb-2">
            {['All', 'Ceremony', 'Bridal', 'Reception', 'Food', 'Details'].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  activeFilter === f
                    ? 'bg-[#1C1917] text-white'
                    : 'bg-[#FAF8F5] text-[#57534E] hover:bg-[#EAE3DA] border border-[#EAE3DA]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Pinterest-Style Masonry Columns Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-4 gap-6 space-y-6">
          {filtered.map((item) => {
            const saved = isSaved(item.id);

            return (
              <div
                key={item.id}
                className="break-inside-avoid bg-white rounded-2xl border border-[#EAE3DA] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative overflow-hidden bg-[#F4EFEA]">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Quick Save Pill */}
                  <div className="absolute top-3 right-3 z-10">
                    <button
                      onClick={() => toggleSave(item)}
                      className={`p-2 rounded-full backdrop-blur-md transition-all active:scale-90 ${
                        saved ? 'bg-[#8E4A49] text-white' : 'bg-white/85 text-[#1C1917] hover:bg-white'
                      }`}
                    >
                      <svg className="w-4 h-4" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>

                  {/* Bottom Hover Actions */}
                  <div className="absolute bottom-3 inset-x-3 z-10 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => openModal('notes', { targetItem: item })}
                      className="px-2.5 py-1 rounded bg-white/90 backdrop-blur-sm text-[11px] font-medium text-[#1C1917] hover:bg-white"
                    >
                      ＋ Note
                    </button>
                    <span className="text-[10px] text-white/90 truncate max-w-[120px]">
                      By {item.vendor}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between text-[11px] text-[#8C7E72] mb-1">
                    <span>{item.couple}</span>
                    <span className="uppercase tracking-wider">{item.category}</span>
                  </div>
                  <h4 className="font-serif text-sm font-medium text-[#1C1917] leading-snug">
                    {item.title}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Footer CTA */}
        <div className="mt-14 text-center">
          <button
            onClick={() => openModal('search', { category: 'Stories' })}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-[#FAF8F5] hover:bg-[#F4EFEA] border border-[#EAE3DA] rounded-full text-xs font-semibold text-[#1C1917] transition-all"
          >
            <span>Explore more inspiration</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
