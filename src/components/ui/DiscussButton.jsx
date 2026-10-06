/**
 * DiscussButton.jsx — Reusable discuss button
 * Opens the couple chat window and attaches the current item to the message input.
 * Works for: vendors, venues, stories, packages, inspiration photos.
 */
import React from 'react';
import { usePlanning } from '../../context/PlanningContext.jsx';

export default function DiscussButton({ item, type = 'vendor', className = '', iconOnly = false }) {
  const { openDiscussion } = usePlanning();

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openDiscussion({ item, type });
  };

  return (
    <button
      onClick={handleClick}
      title="Discuss with your partner"
      className={`flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium rounded-xl border border-[#EAE3DA] bg-white text-[#1C1917] hover:border-[#8C7E72] hover:text-[#44403C] transition-all duration-200 ${className}`}
    >
      <span className="text-sm">💬</span>
      {!iconOnly && <span>Discuss</span>}
    </button>
  );
}
