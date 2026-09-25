import React from 'react';
import { usePlanning } from '../../context/PlanningContext.jsx';

export default function SavedDrawer() {
  const { savedItems, toggleSave, openModal, closeModal } = usePlanning();

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#EAE3DA] shadow-2xl flex flex-col justify-between animate-slideLeft">
          {/* Header */}
          <div className="p-6 border-b border-[#EAE3DA] flex items-center justify-between bg-white">
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-full bg-[#F5ECE8] text-[#8E4A49]">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </span>
              <div>
                <h3 className="font-serif text-lg font-semibold text-[#1C1917]">
                  Saved Favourites
                </h3>
                <span className="text-xs text-[#8C7E72]">
                  {savedItems.length} moments and professionals saved
                </span>
              </div>
            </div>

            <button
              onClick={closeModal}
              className="p-2 text-[#8C7E72] hover:text-[#1C1917] rounded-full hover:bg-[#F4EFEA] transition-colors"
              aria-label="Close Saved Drawer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* List of Saved Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {savedItems.length === 0 ? (
              <div className="text-center py-16">
                <span className="text-4xl block mb-3">♡</span>
                <h4 className="font-serif text-base text-[#1C1917] mb-1">Your collection is empty</h4>
                <p className="text-xs text-[#8C7E72] max-w-xs mx-auto mb-6">
                  Browse wedding photos, venues, or vendors and click the heart icon to save ideas for later.
                </p>
                <button
                  onClick={closeModal}
                  className="px-5 py-2 rounded-full bg-[#1C1917] text-white text-xs font-medium"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              savedItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-[#EAE3DA] p-3.5 flex space-x-3.5 shadow-sm group hover:border-[#D4C5B9] transition-all"
                >
                  <img
                    src={item.image}
                    alt={item.title || item.name}
                    className="w-20 h-20 rounded-xl object-cover shrink-0 bg-[#F4EFEA]"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8E4A49]">
                          {item.category || 'Inspiration'}
                        </span>
                        <button
                          onClick={() => toggleSave(item)}
                          className="text-[#8C7E72] hover:text-[#8E4A49] transition-colors text-xs"
                          title="Remove from saved"
                        >
                          ✕
                        </button>
                      </div>
                      <h4 className="font-serif text-sm font-medium text-[#1C1917] line-clamp-1">
                        {item.title || item.name}
                      </h4>
                      <p className="text-[11px] text-[#8C7E72]">
                        {item.location || item.couple || 'Kerala celebration'}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                      <button
                        onClick={() => openModal('notes', { targetItem: item })}
                        className="text-[11px] font-medium text-[#1C1917] hover:text-[#8E4A49] transition-colors"
                      >
                        ＋ Add Note
                      </button>
                      <span className="text-[#EAE3DA]">•</span>
                      <button
                        onClick={() => openModal('itemDetail', item)}
                        className="text-[11px] font-medium text-[#8C7E72] hover:text-[#1C1917] transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-[#EAE3DA] bg-white space-y-3">
            <button
              onClick={() => openModal('dashboard')}
              className="w-full py-3 bg-[#1C1917] hover:bg-[#34302C] text-white text-xs font-medium rounded-xl transition-colors text-center"
            >
              Organize into Wedding Plan →
            </button>
            <p className="text-[11px] text-[#8C7E72] text-center">
              Shared automatically with your partner’s account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
