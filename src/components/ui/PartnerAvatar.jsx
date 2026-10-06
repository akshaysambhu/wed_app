/**
 * PartnerAvatar.jsx — Shows partner avatar with online indicator
 * Used in Navbar, DiscussionWindow, message bubbles
 */
import React from 'react';

export default function PartnerAvatar({ name = 'Partner', size = 'md', online = false, className = '' }) {
  const initial = name.charAt(0).toUpperCase();

  const sizeClasses = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  return (
    <div className={`relative inline-flex items-center justify-center rounded-full bg-[#6B3037] text-white font-semibold flex-shrink-0 ${sizeClasses[size]} ${className}`}>
      {initial}
      {online && (
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-white rounded-full" />
      )}
    </div>
  );
}
