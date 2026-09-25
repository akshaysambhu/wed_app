import React from 'react';
import { usePlanning } from '../../context/PlanningContext.jsx';

export default function CompareModal() {
  const { compareItems, removeFromCompare, closeModal, openModal } = usePlanning();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm p-4 sm:p-6 lg:p-8 flex items-center justify-center animate-fadeIn">
      <div className="bg-[#FAF8F5] border border-[#EAE3DA] rounded-3xl w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-6 border-b border-[#EAE3DA] bg-white flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-full bg-[#F5ECE8] text-[#6B3037]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </span>
              <div>
                <h3 className="font-serif text-xl font-semibold text-[#1C1917]">
                  Side-by-Side Comparison
                </h3>
                <span className="text-xs text-[#8C7E72]">
                  {compareItems.length} shortlisted options
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={closeModal}
            className="p-2 text-[#8C7E72] hover:text-[#1C1917] rounded-full hover:bg-[#F4EFEA] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-auto p-6">
          {compareItems.length === 0 ? (
            <div className="text-center py-16">
              <span className="text-4xl block mb-3">⚖️</span>
              <h4 className="font-serif text-lg text-[#1C1917] mb-1">No items selected to compare</h4>
              <p className="text-xs text-[#8C7E72] max-w-sm mx-auto mb-6">
                Click <strong>＋ Compare</strong> on any vendor or venue card on the homepage to view them side-by-side.
              </p>
              <button
                onClick={closeModal}
                className="px-6 py-2.5 rounded-full bg-[#1C1917] text-white text-xs font-medium"
              >
                Browse Directory
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse bg-white rounded-2xl border border-[#EAE3DA]">
                <thead>
                  <tr className="border-b border-[#EAE3DA] bg-[#FAF8F5]">
                    <th className="p-4 font-semibold text-[#8C7E72] uppercase tracking-wider w-36">
                      Overview
                    </th>
                    {compareItems.map((item) => (
                      <th key={item.id} className="p-4 min-w-[220px]">
                        <div className="relative">
                          <button
                            onClick={() => removeFromCompare(item.id)}
                            className="absolute -top-1 -right-1 text-[#8C7E72] hover:text-[#8E4A49] text-xs p-1"
                            title="Remove"
                          >
                            ✕
                          </button>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-28 rounded-xl object-cover mb-2"
                          />
                          <span className="font-serif text-base font-semibold text-[#1C1917] block">
                            {item.name}
                          </span>
                          <span className="text-[11px] text-[#8C7E72] block">
                            {item.category || item.style} · {item.location}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F4EFEA] text-[#44403C]">
                  {/* Price */}
                  <tr>
                    <td className="p-4 font-semibold text-[#1C1917]">Starting Price</td>
                    {compareItems.map((item) => (
                      <td key={item.id} className="p-4 font-semibold text-[#8E4A49] text-sm">
                        {item.priceFormatted || 'Custom Quote'}
                      </td>
                    ))}
                  </tr>

                  {/* Rating */}
                  <tr>
                    <td className="p-4 font-semibold text-[#1C1917]">Rating</td>
                    {compareItems.map((item) => (
                      <td key={item.id} className="p-4">
                        ★ {item.rating} ({item.reviewsCount} reviews)
                      </td>
                    ))}
                  </tr>

                  {/* Style / Features */}
                  <tr>
                    <td className="p-4 font-semibold text-[#1C1917]">Style / Focus</td>
                    {compareItems.map((item) => (
                      <td key={item.id} className="p-4">
                        {item.style || item.subCategory || 'Bespoke'}
                      </td>
                    ))}
                  </tr>

                  {/* Experience / Capacity */}
                  <tr>
                    <td className="p-4 font-semibold text-[#1C1917]">Experience / Scope</td>
                    {compareItems.map((item) => (
                      <td key={item.id} className="p-4">
                        {item.experience || item.capacity || 'Verified Pro'}
                      </td>
                    ))}
                  </tr>

                  {/* Deliverables */}
                  <tr>
                    <td className="p-4 font-semibold text-[#1C1917]">Deliverables / Features</td>
                    {compareItems.map((item) => (
                      <td key={item.id} className="p-4 text-[11px] leading-relaxed">
                        {item.deliverables || (item.features ? item.features.join(', ') : 'Inquire for package')}
                      </td>
                    ))}
                  </tr>

                  {/* Actions */}
                  <tr>
                    <td className="p-4 font-semibold text-[#1C1917]">Next Steps</td>
                    {compareItems.map((item) => (
                      <td key={item.id} className="p-4">
                        <button
                          onClick={() => {
                            closeModal();
                            openModal('notes', { targetItem: item });
                          }}
                          className="w-full py-2 px-3 rounded-lg bg-[#FAF8F5] hover:bg-[#F4EFEA] border border-[#EAE3DA] text-xs font-medium text-[#1C1917] mb-1.5 transition-colors"
                        >
                          ＋ Add Partner Note
                        </button>
                        <button
                          onClick={() => {
                            alert(`Quote request initiated for ${item.name}. Our concierge will connect you.`);
                          }}
                          className="w-full py-2 px-3 rounded-lg bg-[#1C1917] hover:bg-[#34302C] text-white text-xs font-medium transition-colors"
                        >
                          Request Availability
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
