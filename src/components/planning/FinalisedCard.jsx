/**
 * FinalisedCard.jsx — Card for a finalised vendor with status management.
 * Actions: Discuss · View · Change Decision · Move Back to Shortlist
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from '../ui/StatusBadge.jsx';
import { usePlanning } from '../../context/PlanningContext.jsx';

export default function FinalisedCard({ vendor }) {
  const { updateFinalisedStatus, removeFromFinalised, toggleShortlist, openDiscussion } = usePlanning();
  const [showDecision, setShowDecision] = useState(false);

  const profileLink = vendor.slug
    ? `/vendor/${vendor.slug}`
    : vendor.id === 'vendor-1'
    ? '/vendor/stories-by-amal'
    : `/vendor/${vendor.id}`;

  const statusOptions = [
    { value: 'waiting', label: 'Waiting for Approval' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
  ];

  const handleDiscuss = () => {
    openDiscussion({
      type: 'vendor',
      item: {
        id: vendor.id,
        name: vendor.name,
        category: vendor.category,
        location: vendor.location,
        image: vendor.image,
        rating: vendor.rating,
        slug: vendor.slug,
      },
    });
  };

  const handleMoveBackToShortlist = () => {
    // Re-add to shortlist then remove from finalised
    toggleShortlist(vendor); // adds if not present
    removeFromFinalised(vendor.id);
  };

  return (
    <div className="bg-white border border-[#EAE3DA] rounded-2xl overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start gap-5 p-5">
        {/* Thumbnail */}
        <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#F4EFEA] flex-shrink-0">
          <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div>
              <p className="text-xs text-[#8E4A49] font-semibold uppercase tracking-wider mb-0.5">
                {vendor.category}
              </p>
              <h3 className="font-serif text-lg text-[#1C1917] leading-tight">{vendor.name}</h3>
              <p className="text-xs text-[#78716C] mt-0.5">📍 {vendor.location}</p>
            </div>
            <StatusBadge status={vendor.status || 'waiting'} />
          </div>

          <div className="flex items-center gap-3 mt-2 text-xs text-[#78716C]">
            <span className="flex items-center gap-1">
              <span className="text-[#6B3037]">★</span>
              <span className="font-medium text-[#1C1917]">{vendor.rating}</span>
            </span>
            <span className="text-[#D4C5B9]">·</span>
            <span className="font-medium text-[#1C1917]">{vendor.priceFormatted}</span>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="border-t border-[#F4EFEA] px-5 py-3 flex items-center gap-2 flex-wrap">
        {/* Discuss */}
        <button
          onClick={handleDiscuss}
          className="flex items-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-xl bg-[#1C1917] text-white hover:bg-[#34302C] transition-colors"
        >
          💬 Discuss
        </button>

        {/* View */}
        <Link
          to={profileLink}
          className="flex items-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-xl border border-[#EAE3DA] text-[#44403C] hover:border-[#1C1917] transition-colors"
        >
          👁 View
        </Link>

        {/* Change Decision */}
        <div className="relative">
          <button
            onClick={() => setShowDecision(!showDecision)}
            className="flex items-center gap-1 py-2 px-3 text-xs font-medium rounded-xl border border-[#EAE3DA] text-[#44403C] hover:border-[#D4C5B9] transition-colors"
          >
            Change Decision
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {showDecision && (
            <div className="absolute bottom-full left-0 mb-1 w-48 bg-white border border-[#EAE3DA] rounded-xl shadow-xl py-1 z-20">
              {statusOptions.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => { updateFinalisedStatus(vendor.id, opt.value); setShowDecision(false); }}
                  className={`w-full text-left px-4 py-2 text-xs hover:bg-[#F4EFEA] transition-colors flex items-center gap-2 ${
                    vendor.status === opt.value ? 'font-semibold text-[#6B3037]' : 'text-[#44403C]'
                  }`}
                >
                  {opt.value === 'approved' && <span className="text-emerald-600">✓</span>}
                  {opt.value === 'waiting' && <span className="text-amber-500">⏳</span>}
                  {opt.value === 'rejected' && <span className="text-red-500">✕</span>}
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Move Back to Shortlist */}
        <button
          onClick={handleMoveBackToShortlist}
          className="flex items-center gap-1.5 py-2 px-3 text-xs font-medium rounded-xl border border-[#EAE3DA] text-[#78716C] hover:border-amber-300 hover:text-amber-700 hover:bg-amber-50 transition-colors ml-auto"
        >
          ← Move to Shortlist
        </button>
      </div>
    </div>
  );
}
