import React from 'react';
import { usePlanning } from '../../context/PlanningContext.jsx';
import { VENDORS } from '../../data/mockData.js';

export default function CompareSection() {
  const { openModal } = usePlanning();

  const comparisonVendors = [VENDORS[0], VENDORS[3], VENDORS[4]]; // Northlight, Cinematic Frames, Lumen & Lace

  return (
    <section id="comparison" className="py-20 md:py-28 bg-[#FDFBF7] border-t border-[#EAE3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-[#8C7E72] font-semibold mb-2 block">
              10 · Decision Clarity
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1C1917] tracking-tight">
              Compare what matters.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#57534E] leading-relaxed">
              Shortlist your favourites and compare them side by side before making a decision. No clutter, no hidden fees, just calm clarity.
            </p>
          </div>

          <div className="mt-6 md:mt-0">
            <button
              onClick={() => openModal('compare')}
              className="group inline-flex items-center space-x-2 text-sm font-medium text-[#1C1917] hover:text-[#8E4A49] transition-colors"
            >
              <span>Open live comparison tray</span>
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>

        {/* Comparison Table / Grid Preview */}
        <div className="bg-white rounded-3xl border border-[#EAE3DA] overflow-hidden shadow-xl">
          {/* Category Banner */}
          <div className="p-4 sm:p-5 bg-[#FAF8F5] border-b border-[#EAE3DA] flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#6B3037]">
              Active Shortlist · Photography & Cinematography
            </span>
            <span className="text-xs text-[#8C7E72]">
              3 vendors selected for side-by-side evaluation
            </span>
          </div>

          {/* Table Layout */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#EAE3DA] bg-[#FDFBF7]">
                  <th className="p-4 sm:p-5 font-medium text-[#8C7E72] uppercase tracking-wider w-40">
                    Attributes
                  </th>
                  {comparisonVendors.map((vendor) => (
                    <th key={vendor.id} className="p-4 sm:p-5 min-w-[220px]">
                      <div className="flex items-center space-x-3">
                        <img
                          src={vendor.image}
                          alt={vendor.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <span className="font-serif text-base font-semibold text-[#1C1917] block">
                            {vendor.name}
                          </span>
                          <span className="text-[11px] text-[#8C7E72] block">{vendor.location}</span>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F4EFEA] text-[#44403C]">
                {/* Row: Starting Price */}
                <tr className="hover:bg-[#FAF8F5]/60 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-[#1C1917]">Starting Price</td>
                  {comparisonVendors.map((v) => (
                    <td key={v.id} className="p-4 sm:p-5 font-semibold text-[#8E4A49] text-sm">
                      {v.priceFormatted}
                    </td>
                  ))}
                </tr>

                {/* Row: Rating */}
                <tr className="hover:bg-[#FAF8F5]/60 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-[#1C1917]">Rating</td>
                  {comparisonVendors.map((v) => (
                    <td key={v.id} className="p-4 sm:p-5">
                      <span className="font-medium text-[#1C1917]">★ {v.rating}</span>
                      <span className="text-[#8C7E72] ml-1">({v.reviewsCount} reviews)</span>
                    </td>
                  ))}
                </tr>

                {/* Row: Experience */}
                <tr className="hover:bg-[#FAF8F5]/60 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-[#1C1917]">Experience</td>
                  {comparisonVendors.map((v) => (
                    <td key={v.id} className="p-4 sm:p-5">
                      {v.experience}
                    </td>
                  ))}
                </tr>

                {/* Row: Aesthetic Style */}
                <tr className="hover:bg-[#FAF8F5]/60 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-[#1C1917]">Aesthetic Style</td>
                  {comparisonVendors.map((v) => (
                    <td key={v.id} className="p-4 sm:p-5">
                      {v.style}
                    </td>
                  ))}
                </tr>

                {/* Row: Deliverables */}
                <tr className="hover:bg-[#FAF8F5]/60 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-[#1C1917]">Deliverables</td>
                  {comparisonVendors.map((v) => (
                    <td key={v.id} className="p-4 sm:p-5 text-[11px] leading-relaxed">
                      {v.deliverables}
                    </td>
                  ))}
                </tr>

                {/* Row: Availability */}
                <tr className="hover:bg-[#FAF8F5]/60 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-[#1C1917]">Availability</td>
                  {comparisonVendors.map((v) => (
                    <td key={v.id} className="p-4 sm:p-5 text-[#8E4A49]">
                      {v.availability}
                    </td>
                  ))}
                </tr>

                {/* Row: Real Weddings on PMM */}
                <tr className="hover:bg-[#FAF8F5]/60 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-[#1C1917]">Real Weddings</td>
                  {comparisonVendors.map((v) => (
                    <td key={v.id} className="p-4 sm:p-5">
                      <span className="inline-block px-2 py-0.5 rounded bg-[#F4EFEA] text-[#1C1917] font-medium">
                        {v.realWeddingsCount} full galleries
                      </span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Table Bottom Action */}
          <div className="p-4 sm:p-6 bg-[#FAF8F5] border-t border-[#EAE3DA] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#8C7E72]">
              Add any vendor or venue from the directory by clicking <strong>＋ Compare</strong>
            </span>
            <button
              onClick={() => openModal('compare')}
              className="px-6 py-2.5 bg-[#1C1917] hover:bg-[#34302C] text-white text-xs font-medium rounded-full transition-colors"
            >
              Compare your options →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
