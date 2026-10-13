/**
 * AttachmentCard.jsx
 * Inline attachment card inside a chat message bubble.
 * Belongs directly to the message it was sent with.
 * Supports: vendor, venue, story, inspiration, package, photo
 * Includes explicit "View" action button that opens in-discussion preview.
 */
import React from 'react';

export default function AttachmentCard({ attachment, onView }) {
  if (!attachment || !attachment.item) return null;
  const { type, item } = attachment;

  const handleView = (e) => {
    e.stopPropagation();
    if (onView) {
      onView(attachment);
    }
  };

  // ── VENDOR ATTACHMENT CARD ────────────────────────────────────────────────
  // Example from client spec:
  // Stories by Amal
  // Photography
  // Kochi
  // ★ 4.9
  // “View”
  if (type === 'vendor') {
    const name = item.name || 'Vendor';
    const category = item.category || item.subCategory || 'Wedding Vendor';
    const location = item.location ? item.location.split(',')[0].trim() : 'Kerala';
    const rating = item.rating || 4.9;
    const price = item.startingPrice || item.priceFormatted || (item.priceRaw ? `From ₹${item.priceRaw.toLocaleString('en-IN')}` : null);
    const image = item.image || item.heroImage || 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=400&q=80';

    return (
      <div
        onClick={handleView}
        className="mt-2.5 bg-white text-[#1C1917] rounded-xl p-2.5 border border-[#EAE3DA] shadow-sm hover:border-[#6B3037]/50 hover:shadow-md transition-all cursor-pointer group text-left max-w-full"
      >
        <div className="flex gap-2.5 items-center">
          <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-[#F4EFEA]">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="flex-1 min-w-0 pr-1">
            <h4 className="font-semibold text-xs sm:text-sm text-[#1C1917] truncate leading-tight group-hover:text-[#6B3037] transition-colors">
              {name}
            </h4>
            <p className="text-[11px] text-[#78716C] truncate mt-0.5">
              {category}
            </p>
            <div className="flex items-center gap-2 mt-0.5 text-[11px]">
              <span className="text-[#78716C] truncate">{location}</span>
              <span className="text-amber-700 font-semibold flex items-center gap-0.5 flex-shrink-0">
                ★ {rating}
              </span>
            </div>
            {price && (
              <p className="text-[11px] font-medium text-[#1C1917] mt-0.5">
                {price}
              </p>
            )}
          </div>

          <div className="flex-shrink-0 self-center">
            <button
              type="button"
              onClick={handleView}
              className="bg-[#1C1917] hover:bg-[#6B3037] text-white text-[11px] font-medium px-3 py-1.5 rounded-lg shadow-sm transition-all group-hover:bg-[#6B3037]"
            >
              View
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── VENUE ATTACHMENT CARD ─────────────────────────────────────────────────
  if (type === 'venue') {
    const name = item.name || 'Wedding Venue';
    const location = item.location ? item.location.split(',')[0].trim() : 'Kerala';
    const rating = item.rating || 4.9;
    const capacity = item.capacity || '200–800 guests';
    const price = item.priceFormatted || (item.priceRaw ? `From ₹${item.priceRaw.toLocaleString('en-IN')}` : null);
    const image = item.image || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80';

    return (
      <div
        onClick={handleView}
        className="mt-2.5 bg-white text-[#1C1917] rounded-xl p-2.5 border border-[#EAE3DA] shadow-sm hover:border-[#6B3037]/50 hover:shadow-md transition-all cursor-pointer group text-left max-w-full"
      >
        <div className="flex gap-2.5 items-center">
          <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-[#F4EFEA]">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="flex-1 min-w-0 pr-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B3037] block">Venue</span>
            <h4 className="font-semibold text-xs sm:text-sm text-[#1C1917] truncate leading-tight group-hover:text-[#6B3037] transition-colors">
              {name}
            </h4>
            <div className="flex items-center gap-2 mt-0.5 text-[11px] text-[#78716C]">
              <span>{location}</span>
              {rating && <span className="text-amber-700 font-semibold">★ {rating}</span>}
            </div>
            {price && <p className="text-[11px] font-medium text-[#1C1917] mt-0.5">{price}</p>}
          </div>

          <div className="flex-shrink-0 self-center">
            <button
              type="button"
              onClick={handleView}
              className="bg-[#1C1917] hover:bg-[#6B3037] text-white text-[11px] font-medium px-3 py-1.5 rounded-lg shadow-sm transition-all"
            >
              View
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── STORY ATTACHMENT CARD ─────────────────────────────────────────────────
  if (type === 'story') {
    const couple = item.couple || 'Real Wedding';
    const location = item.location || 'Kerala';
    const season = item.season || 'Celebration';
    const image = item.heroImage || item.image || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80';

    return (
      <div
        onClick={handleView}
        className="mt-2.5 bg-white text-[#1C1917] rounded-xl overflow-hidden border border-[#EAE3DA] shadow-sm hover:border-[#6B3037]/50 hover:shadow-md transition-all cursor-pointer group text-left max-w-full"
      >
        <div className="h-20 w-full relative overflow-hidden">
          <img src={image} alt={couple} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-white">
            <p className="font-semibold text-xs leading-tight drop-shadow">{couple}</p>
            <span className="text-[10px] bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full">Story</span>
          </div>
        </div>
        <div className="p-2.5 flex items-center justify-between gap-2">
          <p className="text-[11px] text-[#78716C] truncate">📍 {location} · {season}</p>
          <button
            type="button"
            onClick={handleView}
            className="bg-[#1C1917] hover:bg-[#6B3037] text-white text-[11px] font-medium px-2.5 py-1 rounded-lg flex-shrink-0"
          >
            View
          </button>
        </div>
      </div>
    );
  }

  // ── PACKAGE ATTACHMENT CARD ───────────────────────────────────────────────
  if (type === 'package') {
    const name = item.name || 'Package';
    const price = item.price || 'Custom quote';
    const duration = item.duration || '';
    const tagline = item.tagline || (item.vendorName ? `By ${item.vendorName}` : 'Service Package');

    return (
      <div
        onClick={handleView}
        className="mt-2.5 bg-white text-[#1C1917] rounded-xl p-2.5 border border-[#EAE3DA] shadow-sm hover:border-[#6B3037]/50 hover:shadow-md transition-all cursor-pointer group text-left max-w-full"
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B3037] block">Package</span>
            <h4 className="font-semibold text-xs sm:text-sm text-[#1C1917] leading-tight">
              {item.emoji || '📦'} {name}
            </h4>
            <p className="text-[11px] text-[#78716C] mt-0.5 line-clamp-1">{tagline}</p>
            <p className="text-[11px] font-semibold text-[#1C1917] mt-1">{price} {duration && `· ${duration}`}</p>
          </div>
          <button
            type="button"
            onClick={handleView}
            className="bg-[#1C1917] hover:bg-[#6B3037] text-white text-[11px] font-medium px-2.5 py-1 rounded-lg flex-shrink-0 mt-1"
          >
            View
          </button>
        </div>
      </div>
    );
  }

  // ── INSPIRATION ATTACHMENT CARD ───────────────────────────────────────────
  if (type === 'inspiration') {
    const title = item.title || 'Inspiration';
    const category = item.category || 'Moodboard';
    const image = item.image || 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=400&q=80';

    return (
      <div
        onClick={handleView}
        className="mt-2.5 bg-white text-[#1C1917] rounded-xl overflow-hidden border border-[#EAE3DA] shadow-sm hover:border-[#6B3037]/50 hover:shadow-md transition-all cursor-pointer group text-left max-w-full"
      >
        <div className="h-24 w-full overflow-hidden bg-[#F4EFEA]">
          <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        <div className="p-2.5 flex items-center justify-between gap-2">
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B3037] block">{category}</span>
            <p className="font-semibold text-xs text-[#1C1917] truncate leading-tight">{title}</p>
          </div>
          <button
            type="button"
            onClick={handleView}
            className="bg-[#1C1917] hover:bg-[#6B3037] text-white text-[11px] font-medium px-2.5 py-1 rounded-lg flex-shrink-0"
          >
            View
          </button>
        </div>
      </div>
    );
  }

  // ── PHOTO ATTACHMENT CARD ─────────────────────────────────────────────────
  if (type === 'photo') {
    const url = item.url || item.image;
    const caption = item.caption || item.alt || 'Attached photo';

    return (
      <div
        onClick={handleView}
        className="mt-2.5 bg-white text-[#1C1917] rounded-xl overflow-hidden border border-[#EAE3DA] shadow-sm hover:border-[#6B3037]/50 hover:shadow-md transition-all cursor-pointer group text-left max-w-full"
      >
        <div className="h-28 w-full overflow-hidden bg-[#F4EFEA]">
          <img src={url} alt={caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        <div className="p-2 flex items-center justify-between gap-2">
          <p className="text-[11px] text-[#78716C] truncate flex-1">{caption}</p>
          <button
            type="button"
            onClick={handleView}
            className="bg-[#1C1917] hover:bg-[#6B3037] text-white text-[11px] font-medium px-2.5 py-1 rounded-lg flex-shrink-0"
          >
            View
          </button>
        </div>
      </div>
    );
  }

  return null;
}
