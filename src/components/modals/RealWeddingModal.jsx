import React from 'react';
import { usePlanning } from '../../context/PlanningContext.jsx';

export default function RealWeddingModal() {
  const { activeModal, closeModal, openModal, toggleSave, isSaved } = usePlanning();
  const wedding = activeModal?.data;

  if (!wedding) return null;
  const saved = isSaved(wedding.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm p-4 sm:p-6 lg:p-8 flex items-center justify-center animate-fadeIn">
      <div className="bg-[#FAF8F5] border border-[#EAE3DA] rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="p-5 border-b border-[#EAE3DA] bg-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#F5ECE8] text-[#8E4A49] uppercase tracking-wider">
              Real Wedding Feature
            </span>
            <span className="text-xs text-[#8C7E72]">{wedding.location}</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => toggleSave(wedding)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center space-x-1.5 transition-colors ${
                saved ? 'bg-[#8E4A49] text-white' : 'bg-[#FAF8F5] text-[#1C1917] hover:bg-[#EAE3DA] border border-[#EAE3DA]'
              }`}
            >
              <span>{saved ? '✓ Saved' : '♡ Save Wedding'}</span>
            </button>
            <button
              onClick={closeModal}
              className="p-1.5 text-[#8C7E72] hover:text-[#1C1917] rounded-full hover:bg-[#F4EFEA] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Main Hero Shot & Headline */}
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-[#F4EFEA]">
            <img
              src={wedding.heroImage}
              alt={wedding.couple}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-xs uppercase tracking-widest text-[#FAF8F5]/80 font-medium">
                {wedding.season} · {wedding.guests}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal mt-1">
                {wedding.couple}
              </h2>
            </div>
          </div>

          {/* Wedding Story Narrative */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EAE3DA]">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#8E4A49] block mb-2">
              The Celebration Narrative
            </span>
            <p className="text-base text-[#44403C] leading-relaxed mb-6 font-normal">
              {wedding.story}
            </p>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-[#F4EFEA]">
              {wedding.highlights.map((h, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-md text-xs bg-[#FAF8F5] border border-[#EAE3DA] text-[#57534E]"
                >
                  ✦ {h}
                </span>
              ))}
            </div>
          </div>

          {/* Connected Professionals Ecosystem */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-serif text-xl font-medium text-[#1C1917]">
                  The People Behind This Celebration
                </h3>
                <p className="text-xs text-[#8C7E72]">
                  Every professional was verified and booked through Plan My Moments
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.entries(wedding.vendors).map(([role, vendor]) => (
                <div
                  key={role}
                  className="p-4 rounded-xl bg-white border border-[#EAE3DA] hover:border-[#D4C5B9] transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8E4A49]">
                      {role}
                    </span>
                    <h4 className="font-serif text-base font-semibold text-[#1C1917] mt-0.5">
                      {vendor.name}
                    </h4>
                    <span className="text-xs text-[#8C7E72] block">
                      {vendor.category} · {vendor.rating ? `★ ${vendor.rating}` : vendor.location}
                    </span>
                  </div>

                  <div className="mt-4 pt-2 border-t border-[#F4EFEA] flex items-center justify-between text-xs">
                    <button
                      onClick={() => {
                        closeModal();
                        openModal('search', { query: vendor.name });
                      }}
                      className="text-[#6B3037] hover:text-[#1C1917] font-medium"
                    >
                      View Profile →
                    </button>
                    <button
                      onClick={() => {
                        closeModal();
                        openModal('notes', { targetItem: { title: `${vendor.name} (${role})` } });
                      }}
                      className="text-[#8C7E72] hover:text-[#1C1917]"
                    >
                      ＋ Note
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Photo Gallery Grid */}
          <div>
            <h3 className="font-serif text-xl font-medium text-[#1C1917] mb-4">
              Moments from the Celebration Gallery
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {wedding.gallery.map((img, i) => (
                <div key={i} className="aspect-[4/5] rounded-xl overflow-hidden bg-[#F4EFEA]">
                  <img
                    src={img}
                    alt={`${wedding.couple} moment ${i + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
