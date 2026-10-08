import React, { useState } from 'react';
import { usePlanning } from '../../context/PlanningContext.jsx';

export default function VendorPackages({ packages, onEnquire }) {
  const [expanded, setExpanded] = useState(null);
  const { openDiscussion } = usePlanning();

  const handleDiscussPackage = (pkg) => {
    openDiscussion({
      type: 'package',
      item: {
        id: pkg.id,
        name: pkg.name,
        emoji: pkg.emoji,
        tagline: pkg.tagline,
        price: pkg.price,
        duration: pkg.duration
      }
    });
  };

  const handleSavePackage = (pkg) => {
    // Save functionality mock
    alert(`Saved ${pkg.name} to shortlist`);
  };

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-[#8E4A49] mb-2">Pricing</p>
      <h2 className="font-serif text-3xl md:text-4xl text-[#1C1917] mb-3">Packages & Pricing</h2>
      <p className="text-[#78716C] text-sm mb-10 max-w-xl">
        All packages include fully edited high-resolution photographs. Final pricing depends on travel, add-ons, and season.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`relative rounded-2xl border-2 overflow-hidden transition-all duration-300 flex flex-col ${
              pkg.popular
                ? 'border-[#6B3037] shadow-xl shadow-[#6B3037]/10 bg-white'
                : 'border-[#EAE3DA] bg-[#FDFBF7] hover:border-[#D4C5B9] hover:shadow-md'
            }`}
          >
            {pkg.popular && (
              <div className="bg-[#6B3037] text-white text-[10px] font-semibold uppercase tracking-widest text-center py-1.5">
                Most Popular
              </div>
            )}

            <div className="p-7 flex flex-col flex-1">
              <div className="mb-6">
                <div className="text-3xl mb-2">{pkg.emoji}</div>
                <h3 className="font-serif text-2xl text-[#1C1917] mb-1">{pkg.name}</h3>
                <p className="text-sm text-[#78716C] italic">{pkg.tagline}</p>
              </div>

              <div className="mb-6 pb-6 border-b border-[#EAE3DA]">
                <p className="text-[10px] text-[#A39081] uppercase tracking-widest mb-1">{pkg.priceNote}</p>
                <p className="font-serif text-3xl font-semibold text-[#1C1917]">{pkg.price}</p>
                <div className="flex gap-3 mt-3 text-xs text-[#78716C]">
                  <span className="flex items-center gap-1">🕐 {pkg.duration}</span>
                  <span className="flex items-center gap-1">📸 {pkg.photographers} {pkg.photographers > 1 ? 'photographers' : 'photographer'}</span>
                </div>
              </div>

              <div className="flex-1 mb-6">
                <button
                  className="flex items-center justify-between w-full text-left mb-3"
                  onClick={() => setExpanded(expanded === pkg.id ? null : pkg.id)}
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#8C7E72]">What's included</p>
                  <span className="text-[#A39081] text-sm">{expanded === pkg.id ? '▲' : '▼'}</span>
                </button>
                <ul className={`space-y-2.5 overflow-hidden transition-all duration-300 ${expanded === pkg.id || pkg.popular ? 'max-h-96' : 'max-h-28'}`}>
                  {pkg.inclusions.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-[#44403C]">
                      <span className="text-[#6B3037] mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Package Actions */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                <button
                  onClick={() => handleSavePackage(pkg)}
                  className={`w-full py-2.5 rounded-lg text-xs font-semibold border transition-colors ${
                    pkg.popular
                      ? 'border-[#D4C5B9] text-[#44403C] hover:border-[#6B3037]'
                      : 'bg-white border-[#D4C5B9] text-[#44403C] hover:border-[#1C1917]'
                  }`}
                >
                  Save
                </button>
                <button
                  onClick={() => handleDiscussPackage(pkg)}
                  className="w-full py-2.5 rounded-lg text-xs font-semibold bg-[#1C1917] text-white hover:bg-[#34302C] transition-colors"
                >
                  Discuss
                </button>
              </div>

              <button
                onClick={onEnquire}
                className={`w-full py-3.5 rounded-xl text-sm font-medium transition-colors ${
                  pkg.popular
                    ? 'bg-[#6B3037] text-white hover:bg-[#52242A]'
                    : 'bg-white text-[#1C1917] border border-[#1C1917] hover:bg-[#F4EFEA]'
                }`}
              >
                Request Quote
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
