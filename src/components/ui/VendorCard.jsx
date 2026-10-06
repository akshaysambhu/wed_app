/**
 * VendorCard.jsx — Reusable vendor card component
 * Used across: VendorDiscovery, ShortlistPage, FinalisedPage, SearchOverlay
 */
import React from 'react';
import { Link } from 'react-router-dom';
import ShortlistButton from './ShortlistButton.jsx';
import DiscussButton from './DiscussButton.jsx';
import StatusBadge from './StatusBadge.jsx';

export default function VendorCard({ vendor, showStatus = false, showActions = true, compact = false }) {
  const profileLink = vendor.slug
    ? `/vendor/${vendor.slug}`
    : vendor.id === 'vendor-1'
    ? '/vendor/stories-by-amal'
    : `/vendor/${vendor.id}`;

  if (compact) {
    return (
      <div className="flex items-center gap-3 bg-[#FDFBF7] border border-[#EAE3DA] rounded-xl p-3 hover:shadow-sm transition-shadow">
        <img src={vendor.image} alt={vendor.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-sm text-[#1C1917] truncate">{vendor.name}</p>
          <p className="text-xs text-[#78716C]">{vendor.category} · {vendor.location}</p>
        </div>
        <Link to={profileLink} className="text-xs text-[#6B3037] font-medium hover:underline flex-shrink-0">
          View →
        </Link>
      </div>
    );
  }

  return (
    <div className="group bg-[#FDFBF7] border border-[#EAE3DA] rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#F4EFEA]">
        <img
          src={vendor.image}
          alt={vendor.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#FAF8F5]/90 backdrop-blur-sm text-[#1C1917] border border-white/40">
            {vendor.category}
          </span>
        </div>
        {/* Status badge (for finalised/shortlist views) */}
        {showStatus && vendor.status && (
          <div className="absolute top-3 right-3">
            <StatusBadge status={vendor.status} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center justify-between text-xs text-[#8C7E72] mb-1.5">
          <span>📍 {vendor.location}</span>
          <div className="flex items-center text-[#8E4A49] font-medium">
            <span className="mr-1">★</span>
            <span>{vendor.rating}</span>
            <span className="text-[#8C7E72] ml-1">({vendor.reviewsCount})</span>
          </div>
        </div>

        <h3 className="font-serif text-xl text-[#1C1917] mb-2">{vendor.name}</h3>

        <p className="text-xs text-[#57534E] leading-relaxed line-clamp-2 mb-3 flex-1">
          {vendor.description}
        </p>

        <div className="flex items-center justify-between text-xs mb-4 bg-[#FAF8F5] border border-[#EAE3DA] rounded-lg px-3 py-2">
          <span className="text-[#8C7E72]">Starting from</span>
          <span className="font-semibold text-[#1C1917]">{vendor.priceFormatted}</span>
        </div>

        {/* Action buttons */}
        {showActions && (
          <div className="flex items-center gap-2">
            <ShortlistButton vendor={vendor} className="flex-1" />
            <DiscussButton item={vendor} type="vendor" className="flex-1" />
            <Link
              to={profileLink}
              className="flex-1 py-2 px-3 text-xs font-medium rounded-xl bg-[#1C1917] hover:bg-[#34302C] text-white transition-colors text-center"
            >
              View Profile
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
