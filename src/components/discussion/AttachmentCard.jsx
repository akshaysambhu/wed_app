/**
 * AttachmentCard.jsx
 * Renders an inline attachment card inside a chat message bubble.
 * Supports: vendor, venue, story, inspiration, package
 */
import React from 'react';
import { Link } from 'react-router-dom';

function VendorAttachment({ item }) {
  const link = item.slug ? `/vendor/${item.slug}` : item.id === 'vendor-1' ? '/vendor/stories-by-amal' : `/vendor/${item.id}`;
  return (
    <Link to={link} className="block group">
      <div className="flex gap-3 items-center bg-white/80 rounded-xl overflow-hidden border border-black/10 hover:border-[#6B3037]/40 transition-colors">
        <div className="w-14 h-14 flex-shrink-0 overflow-hidden">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        <div className="py-2 pr-3 min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8E4A49] truncate">{item.category}</p>
          <p className="font-semibold text-sm text-[#1C1917] truncate">{item.name}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[10px] text-[#78716C]">📍 {item.location}</span>
            {item.rating && <span className="text-[10px] text-[#6B3037]">★ {item.rating}</span>}
          </div>
          {(item.startingPrice || item.priceFormatted) && (
            <p className="text-[10px] font-medium text-[#1C1917] mt-0.5">{item.startingPrice || item.priceFormatted}</p>
          )}
        </div>
        <span className="text-[#A39081] text-xs pr-3 flex-shrink-0 group-hover:text-[#6B3037] transition-colors">→</span>
      </div>
    </Link>
  );
}

function VenueAttachment({ item }) {
  return (
    <div className="flex gap-3 items-center bg-white/80 rounded-xl overflow-hidden border border-black/10">
      <div className="w-14 h-14 flex-shrink-0 overflow-hidden">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
      </div>
      <div className="py-2 pr-3 min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#6B3037]">Venue</p>
        <p className="font-semibold text-sm text-[#1C1917] truncate">{item.name}</p>
        <p className="text-[10px] text-[#78716C]">📍 {item.location}</p>
        {item.capacity && <p className="text-[10px] text-[#78716C]">👥 {item.capacity}</p>}
        {item.priceFormatted && <p className="text-[10px] font-medium text-[#1C1917] mt-0.5">{item.priceFormatted}</p>}
      </div>
    </div>
  );
}

function StoryAttachment({ item }) {
  return (
    <div className="bg-white/80 rounded-xl overflow-hidden border border-black/10">
      <div className="h-20 overflow-hidden relative">
        <img src={item.heroImage || item.image} alt={item.couple} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <p className="absolute bottom-2 left-3 text-white font-semibold text-xs">{item.couple}</p>
      </div>
      <div className="px-3 py-2">
        <p className="text-[10px] text-[#78716C]">📍 {item.location} · {item.season}</p>
      </div>
    </div>
  );
}

function InspirationAttachment({ item }) {
  return (
    <div className="bg-white/80 rounded-xl overflow-hidden border border-black/10">
      <div className="h-20 overflow-hidden">
        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
      </div>
      <div className="px-3 py-2">
        <p className="font-medium text-xs text-[#1C1917] truncate">{item.title}</p>
        <p className="text-[10px] text-[#78716C]">{item.category}</p>
      </div>
    </div>
  );
}

function PackageAttachment({ item }) {
  return (
    <div className="bg-white/80 rounded-xl px-3 py-2.5 border border-black/10">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8E4A49]">Package</p>
      <p className="font-semibold text-sm text-[#1C1917]">{item.emoji} {item.name}</p>
      <p className="text-[10px] text-[#78716C] mt-0.5">{item.tagline}</p>
      <p className="text-xs font-semibold text-[#1C1917] mt-1">{item.price} · {item.duration}</p>
    </div>
  );
}

export default function AttachmentCard({ attachment }) {
  if (!attachment) return null;
  const { type, item } = attachment;

  return (
    <div className="mt-2 max-w-[220px]">
      {type === 'vendor'      && <VendorAttachment item={item} />}
      {type === 'venue'       && <VenueAttachment item={item} />}
      {type === 'story'       && <StoryAttachment item={item} />}
      {type === 'inspiration' && <InspirationAttachment item={item} />}
      {type === 'package'     && <PackageAttachment item={item} />}
    </div>
  );
}
