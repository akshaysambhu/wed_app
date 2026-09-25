import React, { useState } from 'react';
import { usePlanning } from '../context/PlanningContext.jsx';
import { VENDORS, VENUES } from '../data/mockData.js';

export default function PeopleBehindMoments() {
  const { openModal, toggleSave, isSaved } = usePlanning();
  const [activePin, setActivePin] = useState('pin-1');

  const pins = [
    {
      id: 'pin-1',
      title: 'Mandap Floral Architecture',
      vendor: VENDORS[2], // Petal & Stem
      role: 'Floral & Spatial Design',
      cost: 'From ₹65,000',
      coords: { top: '32%', left: '46%' },
      tag: 'Sculptural Florals'
    },
    {
      id: 'pin-2',
      title: 'Waterfront Sunset Framing',
      vendor: VENDORS[0], // Northlight Studios
      role: 'Candid Photography',
      cost: 'From ₹85,000',
      coords: { top: '64%', left: '28%' },
      tag: 'Candid Golden Hour'
    },
    {
      id: 'pin-3',
      title: 'Lakeside Lawn & Heritage Pier',
      vendor: VENUES[0], // Cedar Hall
      role: 'Wedding Venue',
      cost: 'From ₹2,20,000',
      coords: { top: '48%', left: '72%' },
      tag: 'Backwater Venue'
    }
  ];

  const currentPin = pins.find((p) => p.id === activePin) || pins[0];

  return (
    <section className="py-20 md:py-28 bg-[#FAF8F5] border-t border-[#EAE3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest text-[#8C7E72] font-semibold mb-2 block">
            03 · The Plan My Moments Differentiator
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1C1917] tracking-tight">
            Love a moment? Find the people behind it.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#57534E] leading-relaxed">
            See a wedding photograph you love? Discover the photographer, caterer, decorator, makeup artist, venue and other professionals connected to that celebration.
          </p>
        </div>

        {/* Interactive Editorial Visual Experience */}
        <div className="bg-white rounded-3xl border border-[#EAE3DA] overflow-hidden shadow-xl p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Interactive Photo Canvas with Hotspots */}
            <div className="lg:col-span-8 relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-[#F4EFEA]">
              <img
                src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=85"
                alt="Kerala Backwater Ceremony"
                className="w-full h-full object-cover object-center"
              />

              {/* Gentle darken overlay */}
              <div className="absolute inset-0 bg-black/20" />

              {/* Top Left Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-black/60 backdrop-blur-md text-white border border-white/20">
                  Tap hotspots to reveal professionals
                </span>
              </div>

              {/* Interactive Hotspot Pins */}
              {pins.map((pin) => (
                <div
                  key={pin.id}
                  style={{ top: pin.coords.top, left: pin.coords.left }}
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                >
                  <button
                    onClick={() => setActivePin(pin.id)}
                    className={`relative flex items-center justify-center transition-transform ${
                      activePin === pin.id ? 'scale-125' : 'hover:scale-110'
                    }`}
                    aria-label={pin.title}
                  >
                    <span className="relative flex h-8 w-8">
                      <span
                        className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                          activePin === pin.id ? 'bg-[#8E4A49]' : 'bg-white'
                        }`}
                      />
                      <span
                        className={`relative inline-flex rounded-full h-8 w-8 border-2 border-white items-center justify-center text-xs font-bold shadow-lg ${
                          activePin === pin.id ? 'bg-[#8E4A49] text-white' : 'bg-white text-[#1C1917]'
                        }`}
                      >
                        ＋
                      </span>
                    </span>
                  </button>
                </div>
              ))}

              {/* Bottom Subtle Overlay */}
              <div className="absolute bottom-4 inset-x-4 z-10 flex items-center justify-between text-white text-xs bg-black/40 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/20">
                <span>Real Ceremony: Anjali & Rohan · Kumarakom</span>
                <span className="text-[#FAF8F5]/80 font-medium">Inspiration → Verified Professionals</span>
              </div>
            </div>

            {/* Side Detail Card for the Active Hotspot */}
            <div className="lg:col-span-4 flex flex-col justify-between h-full bg-[#FAF8F5] p-6 rounded-2xl border border-[#EAE3DA]">
              <div>
                <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#8E4A49] uppercase tracking-wider mb-2">
                  <span>✦ Want to recreate this?</span>
                </div>
                <h3 className="font-serif text-2xl text-[#1C1917] mb-1">
                  {currentPin.title}
                </h3>
                <span className="text-xs text-[#8C7E72] block mb-4">
                  Category: {currentPin.role}
                </span>

                {/* Vendor Preview Box */}
                <div className="bg-white p-4 rounded-xl border border-[#EAE3DA] mb-6 shadow-sm">
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={currentPin.vendor.image}
                      alt={currentPin.vendor.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="font-medium text-sm text-[#1C1917]">{currentPin.vendor.name}</h4>
                      <p className="text-xs text-[#8C7E72]">{currentPin.vendor.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-[#F4EFEA]">
                    <span className="font-medium text-[#1C1917]">{currentPin.cost}</span>
                    <span className="text-[#8E4A49] font-medium">★ {currentPin.vendor.rating || 4.9}</span>
                  </div>
                </div>

                <p className="text-xs text-[#57534E] leading-relaxed mb-6">
                  {currentPin.vendor.description || 'Verified wedding professional registered on Plan My Moments ecosystem.'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-4 border-t border-[#EAE3DA]">
                <button
                  onClick={() => openModal('search', { query: currentPin.vendor.name })}
                  className="w-full py-2.5 px-4 bg-[#1C1917] hover:bg-[#34302C] text-white text-xs font-medium rounded-xl transition-all flex items-center justify-center space-x-1.5 shadow-sm"
                >
                  <span>See the people behind this moment</span>
                  <span>→</span>
                </button>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleSave(currentPin.vendor)}
                    className="flex-1 py-2 px-3 bg-white hover:bg-[#F4EFEA] text-[#1C1917] text-xs font-medium rounded-xl border border-[#EAE3DA] transition-colors"
                  >
                    {isSaved(currentPin.vendor.id) ? '✓ Saved' : '♡ Save Vendor'}
                  </button>
                  <button
                    onClick={() => openModal('notes', { targetItem: currentPin.vendor })}
                    className="flex-1 py-2 px-3 bg-white hover:bg-[#F4EFEA] text-[#1C1917] text-xs font-medium rounded-xl border border-[#EAE3DA] transition-colors"
                  >
                    ＋ Add Note
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
