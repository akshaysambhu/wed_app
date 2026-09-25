import React from 'react';
import { usePlanning } from '../../context/PlanningContext.jsx';

export default function ItemDetailModal() {
  const { activeModal, closeModal, openModal, toggleSave, isSaved, toggleCompare, isInCompare } = usePlanning();
  const item = activeModal?.data;

  if (!item) return null;
  const saved = isSaved(item.id);
  const inCompare = isInCompare(item.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm p-4 sm:p-6 lg:p-8 flex items-center justify-center animate-fadeIn">
      <div className="bg-[#FAF8F5] border border-[#EAE3DA] rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#EAE3DA] bg-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8E4A49] bg-[#F5ECE8] px-2.5 py-1 rounded-full">
              {item.category || item.style || 'Detail'}
            </span>
            <span className="text-xs text-[#8C7E72]">{item.location || item.couple}</span>
          </div>

          <button
            onClick={closeModal}
            className="p-1.5 text-[#8C7E72] hover:text-[#1C1917] rounded-full hover:bg-[#F4EFEA] transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#F4EFEA]">
            <img
              src={item.image}
              alt={item.title || item.name}
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1C1917]">
                {item.title || item.name}
              </h3>
              {item.rating && (
                <span className="text-sm font-semibold text-[#8E4A49]">
                  ★ {item.rating} {item.reviewsCount && `(${item.reviewsCount} reviews)`}
                </span>
              )}
            </div>

            <p className="text-sm text-[#44403C] leading-relaxed mb-6 font-normal">
              {item.description || 'Curated detail verified on Plan My Moments platform.'}
            </p>

            {item.priceFormatted && (
              <div className="p-4 rounded-xl bg-white border border-[#EAE3DA] mb-6 flex items-center justify-between text-xs">
                <span className="text-[#8C7E72]">Estimated Investment</span>
                <span className="font-semibold text-sm text-[#1C1917]">{item.priceFormatted}</span>
              </div>
            )}

            {/* Tagged Vendors if any */}
            {item.vendorTags && item.vendorTags.length > 0 && (
              <div className="mb-6">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#8C7E72] block mb-2">
                  Connected Professionals
                </span>
                <div className="flex flex-wrap gap-2">
                  {item.vendorTags.map((v) => (
                    <button
                      key={v.name}
                      onClick={() => {
                        closeModal();
                        openModal('search', { query: v.name });
                      }}
                      className="px-3 py-1.5 rounded-lg bg-white border border-[#EAE3DA] hover:border-[#D4C5B9] text-xs font-medium text-[#1C1917] flex items-center space-x-1"
                    >
                      <span>{v.role}: {v.name}</span>
                      <span className="text-[#8E4A49]">→</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-[#EAE3DA] flex flex-wrap items-center gap-3">
            <button
              onClick={() => toggleSave(item)}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-medium transition-colors ${
                saved ? 'bg-[#8E4A49] text-white' : 'bg-white border border-[#EAE3DA] text-[#1C1917] hover:bg-[#F4EFEA]'
              }`}
            >
              {saved ? '✓ Saved to Favourites' : '♡ Save to Favourites'}
            </button>

            {(item.category || item.capacity) && (
              <button
                onClick={() => toggleCompare(item)}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-medium border transition-colors ${
                  inCompare ? 'bg-[#6B3037] text-white border-[#6B3037]' : 'bg-white border-[#EAE3DA] text-[#1C1917] hover:bg-[#F4EFEA]'
                }`}
              >
                {inCompare ? '✓ In Compare Tray' : '＋ Add to Compare'}
              </button>
            )}

            <button
              onClick={() => {
                closeModal();
                openModal('notes', { targetItem: item });
              }}
              className="flex-1 py-2.5 px-4 rounded-xl text-xs font-medium bg-[#1C1917] hover:bg-[#34302C] text-white transition-colors"
            >
              ＋ Add Couple Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
