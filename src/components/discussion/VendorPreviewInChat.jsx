/**
 * VendorPreviewInChat.jsx
 * In-discussion scrollable vendor preview sheet.
 * Opens when partner or user clicks the attached card or "View" button.
 * Users scroll through:
 *  1. Hero
 *  2. Price
 *  3. About
 *  4. Services
 *  5. Portfolio
 *  6. Packages
 *  7. Reviews
 *  8. Availability
 * They do NOT have to leave the discussion just to understand the vendor.
 * Includes prominent "Back to Discussion" button.
 */
import React, { useState } from 'react';
import { usePlanning } from '../../context/PlanningContext.jsx';
import { STORIES_BY_AMAL } from '../../data/vendorData.js';
import { VENDORS, VENUES, REAL_WEDDINGS, INSPIRATIONS } from '../../data/mockData.js';

export default function VendorPreviewInChat({ attachment, onBack }) {
  const { isShortlisted, toggleShortlist, isFinalised, finaliseVendor, showToast } = usePlanning();
  const [activePackageTab, setActivePackageTab] = useState(1);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  if (!attachment || !attachment.item) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center bg-white">
        <p className="text-sm text-[#78716C]">Attachment details not available.</p>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-[#1C1917] text-white text-xs font-semibold rounded-xl hover:bg-[#6B3037] transition-colors"
        >
          Back to Discussion
        </button>
      </div>
    );
  }

  const { type, item } = attachment;

  // Resolve vendor data: if Stories by Amal or similar, use full rich vendor object
  const isAmal = item.id === 'stories-by-amal' || item.slug === 'stories-by-amal' || item.name?.toLowerCase().includes('amal');
  const matchedVendor = isAmal ? STORIES_BY_AMAL : (VENDORS.find(v => v.id === item.id || v.name === item.name) || item);
  const vendor = {
    ...STORIES_BY_AMAL,
    ...matchedVendor,
    name: item.name || matchedVendor.name || STORIES_BY_AMAL.name,
    category: item.category || matchedVendor.category || STORIES_BY_AMAL.category,
    location: item.location || matchedVendor.location || STORIES_BY_AMAL.location,
    rating: item.rating || matchedVendor.rating || STORIES_BY_AMAL.rating,
    startingPrice: item.startingPrice || item.priceFormatted || matchedVendor.priceFormatted || matchedVendor.startingPrice || STORIES_BY_AMAL.startingPrice,
    image: item.image || item.heroImage || matchedVendor.image || matchedVendor.heroImage || STORIES_BY_AMAL.heroImage,
  };

  const isShort = isShortlisted(vendor.id || 'stories-by-amal');
  const isFinal = isFinalised(vendor.id || 'stories-by-amal');

  // If viewing a Venue
  if (type === 'venue') {
    const venue = VENUES.find(v => v.id === item.id || v.name === item.name) || item;
    return (
      <div className="h-full flex flex-col bg-white overflow-hidden animate-fadeIn">
        {/* Sticky Header */}
        <div className="bg-[#1C1917] text-white px-4 py-3 flex items-center justify-between flex-shrink-0 z-10 shadow-md">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#EAE3DA] hover:text-white transition-colors bg-white/10 hover:bg-white/20 px-2.5 py-1.5 rounded-lg"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Discussion
          </button>
          <span className="text-xs font-semibold truncate max-w-[150px]">{venue.name}</span>
          <button
            onClick={() => {
              toggleShortlist({ id: venue.id, name: venue.name, category: 'Venue', location: venue.location, image: venue.image });
            }}
            className="text-xs text-[#EAE3DA] hover:text-white"
            title="Shortlist"
          >
            {isShortlisted(venue.id) ? '★ Saved' : '☆ Save'}
          </button>
        </div>

        {/* Scrollable Venue Body */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#EAE3DA] bg-[#FAF8F5]">
          {/* Hero */}
          <div className="relative h-44 bg-[#1C1917]">
            <img src={venue.image} alt={venue.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 text-white">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#6B3037] px-2 py-0.5 rounded-full inline-block mb-1">
                Venue Preview
              </span>
              <h2 className="text-lg font-bold">{venue.name}</h2>
              <p className="text-xs text-stone-200">📍 {venue.location} · 👥 {venue.capacity || '200–800 guests'}</p>
            </div>
          </div>

          {/* Price & Key Info */}
          <div className="p-4 bg-white">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#8E4A49]">Rental Pricing</p>
            <p className="text-xl font-bold text-[#1C1917] mt-0.5">{venue.priceFormatted || 'From ₹2,20,000'}</p>
            <p className="text-xs text-[#78716C] mt-1">Full-day private property hire with waterfront access & lawn setup.</p>
          </div>

          {/* About */}
          <div className="p-4 bg-white">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1C1917] mb-2">About the Venue</h3>
            <p className="text-xs text-[#57534E] leading-relaxed">
              {venue.description || 'Tranquil backwaters setting with manicured waterfront lawns, teak pavilion, and sunset vistas designed for authentic celebrations.'}
            </p>
            {venue.features && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {venue.features.map((f, i) => (
                  <span key={i} className="text-[10px] bg-[#F4EFEA] text-[#1C1917] px-2.5 py-1 rounded-full border border-[#EAE3DA]">
                    ✓ {f}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Availability */}
          <div className="p-4 bg-[#FDFBF7]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-[#1C1917]">Dates Available for 2026/2027</span>
            </div>
            <p className="text-[11px] text-[#78716C] mt-1">Accepting private wedding inquiries with outside caterer options.</p>
          </div>
        </div>

        {/* Bottom Back Button */}
        <div className="p-3 bg-white border-t border-[#EAE3DA] flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-full py-2.5 bg-[#1C1917] hover:bg-[#6B3037] text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            ← Back to Discussion
          </button>
        </div>
      </div>
    );
  }

  // ── FULL VENDOR PREVIEW (All 8 Required Sections) ─────────────────────────
  return (
    <div className="h-full flex flex-col bg-white overflow-hidden animate-fadeIn">
      {/* ── STICKY TOP BAR ──────────────────────────────────────────────── */}
      <div className="bg-[#1C1917] text-white px-4 py-2.5 flex items-center justify-between flex-shrink-0 z-20 shadow-md">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#EAE3DA] hover:text-white transition-colors bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg active:scale-95"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Discussion
        </button>

        <div className="text-center min-w-0 px-2">
          <p className="text-xs font-bold text-white truncate">{vendor.name}</p>
          <p className="text-[10px] text-amber-300 font-medium">★ {vendor.rating} · {vendor.reviewsCount || 128} reviews</p>
        </div>

        <button
          onClick={() => {
            toggleShortlist({
              id: vendor.id,
              name: vendor.name,
              category: vendor.category,
              location: vendor.location,
              rating: vendor.rating,
              image: vendor.heroImage || vendor.image,
              priceFormatted: vendor.startingPrice,
            });
          }}
          className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 ${
            isShort ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40' : 'bg-white/10 text-white hover:bg-white/20'
          }`}
          title={isShort ? 'Shortlisted' : 'Add to Shortlist'}
        >
          {isShort ? '✓ Saved' : '+ Shortlist'}
        </button>
      </div>

      {/* ── SCROLLABLE BODY ─────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto bg-[#FAF8F5] divide-y divide-[#EAE3DA] text-[#1C1917]">

        {/* 1. HERO SECTION */}
        <section className="relative bg-[#1C1917]">
          <div className="h-44 sm:h-48 w-full overflow-hidden relative">
            <img
              src={vendor.heroImage || vendor.image}
              alt={vendor.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute top-3 left-3 flex gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-700/90 text-white px-2.5 py-0.5 rounded-full backdrop-blur-xs flex items-center gap-1">
                ✓ Verified Partner
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white px-2 py-0.5 rounded-full backdrop-blur-xs">
                {vendor.category || 'Photography'}
              </span>
            </div>

            <div className="absolute bottom-3 left-4 right-4 text-white">
              <h2 className="text-xl sm:text-2xl font-bold leading-tight drop-shadow-md">
                {vendor.name}
              </h2>
              <div className="flex items-center gap-2 mt-1 text-xs text-stone-200">
                <span>📍 {vendor.location}</span>
                <span>•</span>
                <span className="text-amber-300 font-bold">★ {vendor.rating}</span>
                <span className="text-stone-300">({vendor.reviewsCount || 128} reviews)</span>
              </div>
            </div>
          </div>

          {vendor.tagline && (
            <div className="bg-[#1C1917] px-4 py-2.5 text-stone-300 text-xs italic border-t border-white/10">
              "{vendor.tagline}"
            </div>
          )}
        </section>

        {/* 2. PRICE SECTION */}
        <section className="p-4 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#8E4A49]">Starting Price</p>
              <h3 className="text-xl font-extrabold text-[#1C1917] mt-0.5">{vendor.startingPrice || 'From ₹45,000'}</h3>
              <p className="text-[11px] text-[#78716C] mt-0.5">Average couple spend: ₹75,000 – ₹1,20,000</p>
            </div>
            <div className="bg-[#FAF6F0] border border-[#EAE3DA] rounded-xl px-3 py-2 text-right">
              <p className="text-[10px] text-[#78716C]">Payment Terms</p>
              <p className="text-xs font-bold text-[#1C1917]">20% Advance</p>
              <p className="text-[10px] text-emerald-700 font-medium">No hidden Kerala travel fee</p>
            </div>
          </div>
        </section>

        {/* 3. ABOUT SECTION */}
        <section className="p-4 bg-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1C1917]">About {vendor.name}</h3>
            <span className="text-[11px] text-[#8E4A49] font-semibold">{vendor.experience || '8+ years'} in weddings</span>
          </div>

          <p className="text-xs text-[#57534E] leading-relaxed whitespace-pre-line">
            {typeof vendor.about === 'string'
              ? vendor.about
              : 'Amal Rajan is a Kochi-based wedding photographer with eight years of quiet observation behind the lens. His approach is simple: stay present, never force a moment, and trust that the real story will unfold.\n\nEvery frame is driven by light, raw emotion, and genuine moments rather than stiff staged poses.'}
          </p>

          <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
            <div className="bg-[#FAF8F5] p-2.5 rounded-xl border border-[#EAE3DA]">
              <p className="text-[10px] text-[#78716C] font-semibold uppercase">Style</p>
              <p className="font-medium text-[#1C1917] mt-0.5">Candid, Editorial, Natural Light</p>
            </div>
            <div className="bg-[#FAF8F5] p-2.5 rounded-xl border border-[#EAE3DA]">
              <p className="text-[10px] text-[#78716C] font-semibold uppercase">Languages</p>
              <p className="font-medium text-[#1C1917] mt-0.5">English, Malayalam, Hindi</p>
            </div>
          </div>
        </section>

        {/* 4. SERVICES SECTION */}
        <section className="p-4 bg-[#FDFBF7]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#1C1917] mb-2.5">Services & Coverage</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { title: 'Candid Photography', desc: 'Unscripted, natural light emotional moments' },
              { title: 'Traditional & Family', desc: 'Graceful group portraits with gentle direction' },
              { title: 'Pre-Wedding Sessions', desc: 'Intimate couple shoot at scenic outdoor locations' },
              { title: 'Drone Cinematography', desc: '4K aerial perspectives of venue & landscape' },
              { title: 'Handcrafted Albums', desc: 'Lay-flat linen albums on archival paper' },
              { title: 'Destination Coverage', desc: 'Multi-day travel kit across India & SE Asia' },
            ].map((srv, idx) => (
              <div key={idx} className="bg-white p-2.5 rounded-xl border border-[#EAE3DA]">
                <p className="text-xs font-semibold text-[#1C1917] flex items-center gap-1.5">
                  <span className="text-[#6B3037]">✓</span> {srv.title}
                </p>
                <p className="text-[10px] text-[#78716C] mt-0.5">{srv.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. PORTFOLIO SECTION */}
        <section className="p-4 bg-white">
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1C1917]">Portfolio Gallery</h3>
            <span className="text-[11px] text-[#78716C]">12 featured shots</span>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {(vendor.gallery || [
              { url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=400&q=80', alt: 'Mandap' },
              { url: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=400&q=80', alt: 'Couple' },
              { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80', alt: 'Reception' },
              { url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=400&q=80', alt: 'Laughter' },
              { url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80', alt: 'Bridal' },
              { url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=400&q=80', alt: 'Floral' },
            ]).slice(0, 6).map((img, i) => (
              <div
                key={i}
                onClick={() => setSelectedPhoto(img.url)}
                className="h-20 sm:h-24 rounded-lg overflow-hidden relative cursor-pointer group bg-[#F4EFEA]"
              >
                <img
                  src={img.url}
                  alt={img.alt || 'Portfolio'}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs">
                  🔍
                </div>
              </div>
            ))}
          </div>

          {selectedPhoto && (
            <div
              onClick={() => setSelectedPhoto(null)}
              className="mt-3 p-2 bg-[#1C1917] rounded-xl text-center text-white text-xs cursor-pointer"
            >
              <img src={selectedPhoto} alt="Selected" className="max-h-48 mx-auto rounded-lg object-contain mb-2" />
              <p className="text-[11px] text-stone-300">Tap to close photo preview</p>
            </div>
          )}
        </section>

        {/* 6. PACKAGES SECTION */}
        <section className="p-4 bg-[#FAF8F5]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#1C1917] mb-2.5">Packages & Tiers</h3>

          {/* Package Tabs */}
          <div className="flex gap-1.5 mb-3 bg-[#EAE3DA] p-1 rounded-xl">
            {(vendor.packages || [
              { id: 'p1', name: 'Story', price: '₹45,000', popular: false },
              { id: 'p2', name: 'Chapter', price: '₹75,000', popular: true },
              { id: 'p3', name: 'Legacy', price: '₹1,20,000', popular: false },
            ]).map((pkg, idx) => (
              <button
                key={pkg.id || idx}
                onClick={() => setActivePackageTab(idx)}
                className={`flex-1 py-1.5 px-2 text-xs font-semibold rounded-lg transition-all ${
                  activePackageTab === idx
                    ? 'bg-white text-[#6B3037] shadow-xs'
                    : 'text-[#78716C] hover:text-[#1C1917]'
                }`}
              >
                {pkg.name} {pkg.popular && '★'}
              </button>
            ))}
          </div>

          {/* Active Package Card */}
          {(() => {
            const pkgs = vendor.packages || [
              {
                name: 'Story',
                emoji: '📖',
                price: '₹45,000',
                duration: '6 hours',
                tagline: 'For intimate celebrations',
                inclusions: ['6 hours coverage', '300+ edited photographs', 'Private online gallery (1 year)', '48-hour preview gallery'],
              },
              {
                name: 'Chapter',
                emoji: '📚',
                price: '₹75,000',
                duration: 'Full day (10–12 hrs)',
                tagline: 'Most loved full-day experience',
                inclusions: ['10–12 hours coverage', '2 photographers (lead + second)', '600+ edited photographs', 'Handcrafted lay-flat linen album (30 pages)', 'Pre-wedding consultation session'],
              },
              {
                name: 'Legacy',
                emoji: '👑',
                price: '₹1,20,000',
                duration: '3-Day Multi-Event',
                tagline: 'Complete heirloom chronicle',
                inclusions: ['Multi-day event coverage', '3 photographers + 4K drone cinematography', '1000+ edited photographs', '2 luxury heirloom albums', 'Pre-wedding outdoor couple shoot included'],
              },
            ];
            const p = pkgs[activePackageTab] || pkgs[0];
            return (
              <div className="bg-white p-3.5 rounded-xl border border-[#EAE3DA] shadow-xs">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-[#1C1917]">{p.emoji || '📦'} {p.name} Package</h4>
                    <p className="text-[11px] text-[#78716C]">{p.duration || 'Full day'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-extrabold text-[#6B3037]">{p.price}</p>
                    <p className="text-[10px] text-[#78716C]">inclusive of edits</p>
                  </div>
                </div>

                <div className="mt-3 space-y-1.5 border-t border-[#F4EFEA] pt-2.5">
                  {p.inclusions?.map((inc, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#57534E]">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </section>

        {/* 7. REVIEWS SECTION */}
        <section className="p-4 bg-white">
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1C1917]">Couple Reviews</h3>
            <span className="text-xs font-bold text-amber-700">★ 4.9 out of 5</span>
          </div>

          <div className="space-y-2.5">
            {[
              {
                couple: 'Anjali & Rohan',
                date: 'Winter Wedding · Kumarakom',
                text: 'Amal was a calm presence throughout our day. When we looked at the photos, we cried — he caught all the quiet glances nobody else saw.',
              },
              {
                couple: 'Priya & Dev',
                date: 'Beach Wedding · Kochi',
                text: 'Zero awkward posing! The candid pictures of our families laughing are our absolute favorites. Delivered within 3 weeks!',
              },
              {
                couple: 'Meera & Arjun',
                date: 'Heritage Venue · Fort Kochi',
                text: 'Worth every single rupee. The lay-flat album is a family treasure.',
              },
            ].map((rev, i) => (
              <div key={i} className="bg-[#FAF8F5] p-3 rounded-xl border border-[#EAE3DA]">
                <div className="flex items-center justify-between text-xs mb-1">
                  <p className="font-semibold text-[#1C1917]">{rev.couple}</p>
                  <span className="text-amber-600 font-bold">★★★★★</span>
                </div>
                <p className="text-[10px] text-[#8C7E72] mb-1.5">{rev.date}</p>
                <p className="text-xs text-[#57534E] italic leading-relaxed">"{rev.text}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. AVAILABILITY SECTION */}
        <section className="p-4 bg-[#FDFBF7]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#1C1917] mb-2">Live Availability</h3>
          <div className="bg-white p-3 rounded-xl border border-[#EAE3DA]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-xs font-bold text-emerald-800">
                Accepting bookings for 2026 – 2027 season
              </p>
            </div>
            <p className="text-xs text-[#78716C] mt-1.5 leading-relaxed">
              Winter dates (November–February) are 75% booked. Peak weekend dates fill 6–9 months in advance.
            </p>
            <div className="mt-2.5 pt-2 border-t border-[#F4EFEA] flex items-center justify-between text-[11px] text-[#78716C]">
              <span>Response time: <strong className="text-[#1C1917]">Within 2 hours</strong></span>
              <span className="text-emerald-700 font-medium">98% response rate</span>
            </div>
          </div>
        </section>

      </div>

      {/* ── STICKY BOTTOM BAR ───────────────────────────────────────────── */}
      <div className="p-3 bg-white border-t border-[#EAE3DA] flex items-center gap-2 flex-shrink-0 z-10 shadow-lg">
        <button
          onClick={onBack}
          className="flex-1 py-2.5 bg-[#1C1917] hover:bg-[#6B3037] text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm active:scale-98"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Discussion
        </button>

        <button
          onClick={() => {
            if (isFinal) {
              showToast(`${vendor.name} is already in your Final Crew`);
            } else {
              finaliseVendor({
                id: vendor.id,
                name: vendor.name,
                category: vendor.category,
                location: vendor.location,
                rating: vendor.rating,
                image: vendor.heroImage || vendor.image,
                priceFormatted: vendor.startingPrice,
              });
            }
          }}
          className={`py-2.5 px-3 text-xs font-semibold rounded-xl transition-all border ${
            isFinal
              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
              : 'bg-[#F4EFEA] hover:bg-[#EAE3DA] text-[#1C1917] border-[#D4C5B9]'
          }`}
          title="Add to Finalised Crew"
        >
          {isFinal ? '✓ Finalised' : 'Add to Crew'}
        </button>
      </div>
    </div>
  );
}
