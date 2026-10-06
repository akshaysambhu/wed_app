/**
 * ShortlistButton.jsx — Reusable shortlist toggle button
 * Manages shortlist state via PlanningContext.
 * Distinct from "Save" (favourites). Shortlist = "considering this for my event."
 */
import React from 'react';
import { usePlanning } from '../../context/PlanningContext.jsx';

export default function ShortlistButton({ vendor, className = '', iconOnly = false }) {
  const { isShortlisted, toggleShortlist } = usePlanning();
  const shortlisted = isShortlisted(vendor.id);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleShortlist(vendor);
      }}
      title={shortlisted ? 'Remove from Shortlist' : 'Add to Shortlist'}
      className={`flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium rounded-xl border transition-all duration-200 ${
        shortlisted
          ? 'bg-[#6B3037] text-white border-[#6B3037]'
          : 'bg-white text-[#1C1917] border-[#EAE3DA] hover:border-[#6B3037] hover:text-[#6B3037]'
      } ${className}`}
    >
      <span className="text-sm">{shortlisted ? '✓' : '+'}</span>
      {!iconOnly && <span>{shortlisted ? 'Shortlisted' : 'Shortlist'}</span>}
    </button>
  );
}
