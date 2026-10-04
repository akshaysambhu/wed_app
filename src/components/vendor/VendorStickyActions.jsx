import React from 'react';

export default function VendorStickyActions({ vendor, savedStatus, compareStatus, onSave, onCompare, onEnquire }) {
  return (
    <>
      {/* Desktop Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#EAE3DA] shadow-2xl animate-bounceIn">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Vendor info */}
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={vendor.heroImage}
                alt={vendor.name}
                className="w-10 h-10 rounded-full object-cover border border-[#EAE3DA] flex-shrink-0"
              />
              <div className="min-w-0">
                <p className="font-semibold text-sm text-[#1C1917] truncate">{vendor.name}</p>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#6B3037] text-xs">★</span>
                  <span className="text-xs text-[#44403C]">{vendor.rating}</span>
                  <span className="text-[#D4C5B9] text-xs">·</span>
                  <span className="text-xs text-[#78716C]">{vendor.startingPrice}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={onSave}
                className={`hidden sm:flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 ${
                  savedStatus
                    ? 'bg-[#F5ECE8] border-[#8E4A49] text-[#6B3037]'
                    : 'bg-white border-[#D4C5B9] text-[#44403C] hover:border-[#8E4A49]'
                }`}
              >
                <span>{savedStatus ? '♥' : '♡'}</span>
                {savedStatus ? 'Saved' : 'Save'}
              </button>
              <button
                onClick={onCompare}
                className={`hidden sm:flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 ${
                  compareStatus
                    ? 'bg-[#1C1917] border-[#1C1917] text-white'
                    : 'bg-white border-[#D4C5B9] text-[#44403C] hover:border-[#1C1917]'
                }`}
              >
                <span>⊕</span>
                {compareStatus ? 'In Tray' : 'Compare'}
              </button>
              <button
                onClick={onEnquire}
                className="bg-[#6B3037] hover:bg-[#52242A] text-white font-medium py-2.5 px-5 rounded-xl transition-colors text-sm shadow-md"
              >
                Send Enquiry →
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Spacer for sticky bar */}
      <div className="h-20" />
    </>
  );
}
