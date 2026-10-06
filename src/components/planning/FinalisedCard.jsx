/**
 * FinalisedCard.jsx — Card for a finalised vendor with status management
 * Shows vendor info + approval status + actions (unfinalise, message, view profile)
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from '../ui/StatusBadge.jsx';
import DiscussButton from '../ui/DiscussButton.jsx';
import { usePlanning } from '../../context/PlanningContext.jsx';

export default function FinalisedCard({ vendor }) {
  const { updateFinalisedStatus, removeFromFinalised } = usePlanning();
  const [showActions, setShowActions] = useState(false);

  const profileLink = vendor.id === 'vendor-1' ? '/vendor/stories-by-amal' : `/vendor/${vendor.id}`;

  const statusOptions = [
    { value: 'waiting', label: 'Awaiting Approval' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Not Available' },
  ];

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

          {/* Price & Rating */}
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
        {/* Status change */}
        <div className="relative">
          <button
            onClick={() => setShowActions(!showActions)}
            className="text-xs font-medium text-[#44403C] border border-[#EAE3DA] rounded-lg px-3 py-1.5 hover:border-[#D4C5B9] transition-colors flex items-center gap-1"
          >
            Change Status
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {showActions && (
            <div className="absolute bottom-full left-0 mb-1 w-44 bg-white border border-[#EAE3DA] rounded-xl shadow-xl py-1 z-10">
              {statusOptions.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => { updateFinalisedStatus(vendor.id, opt.value); setShowActions(false); }}
                  className={`w-full text-left px-4 py-2 text-xs hover:bg-[#F4EFEA] transition-colors ${
                    vendor.status === opt.value ? 'font-semibold text-[#6B3037]' : 'text-[#44403C]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
              <div className="border-t border-[#F4EFEA] mt-1 pt-1">
                <button
                  onClick={() => { removeFromFinalised(vendor.id); setShowActions(false); }}
                  className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors"
                >
                  Remove from Crew
                </button>
              </div>
            </div>
          )}
        </div>

        <DiscussButton item={vendor} type="vendor" />

        <Link to={profileLink}
          className="text-xs font-medium text-[#6B3037] hover:underline ml-auto">
          View Profile →
        </Link>
      </div>
    </div>
  );
}
