import React, { useState } from 'react';

export default function VendorHero({ vendor, savedStatus, compareStatus, onSave, onCompare, onEnquire }) {
  const [activeImg, setActiveImg] = useState(0);
  const thumbImages = vendor.gallery.slice(0, 5).map(g => g.url);

  return (
    <section className="bg-[#FAF8F5] py-10 border-b border-[#EAE3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-10 items-start">

          {/* Left — Image Panel */}
          <div className="space-y-3">
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#EAE3DA] group">
              <img
                src={thumbImages[activeImg]}
                alt={vendor.name}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.02]"
              />
              {/* Verified badge */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-[#6B3037] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Verified Vendor
              </div>
              {/* Image counter */}
              <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-2.5 py-1 rounded-lg backdrop-blur-sm">
                {activeImg + 1} / {vendor.gallery.length}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2">
              {thumbImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`flex-1 aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                    activeImg === i ? 'border-[#6B3037] shadow-md' : 'border-transparent hover:border-[#D4C5B9]'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
              {/* View all button */}
              <button
                onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex-1 aspect-square rounded-xl bg-[#1C1917] text-white text-xs font-medium flex items-center justify-center hover:bg-[#52242A] transition-colors"
              >
                +{vendor.gallery.length - 5}<br />more
              </button>
            </div>
          </div>

          {/* Right — Info Panel */}
          <div className="space-y-5 lg:pt-2">
            {/* Category pill */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#8E4A49] bg-[#F5ECE8] px-3 py-1.5 rounded-full border border-[#E8D4CF]">
                📷 {vendor.category}
              </span>
            </div>

            {/* Name */}
            <div>
              <h1 className="font-serif text-4xl md:text-5xl text-[#1C1917] leading-tight">
                {vendor.name}
              </h1>
            </div>

            {/* Location */}
            <div className="flex items-center gap-1.5 text-[#78716C] text-sm">
              <span>📍</span>
              <span>{vendor.location}</span>
              <span className="text-[#D4C5B9] mx-1">·</span>
              <span className="text-[#8C7E72]">{vendor.serviceArea}</span>
            </div>

            {/* Rating + Experience */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className="text-[#6B3037]">★</span>
                <span className="font-semibold text-[#1C1917]">{vendor.rating}</span>
                <a href="#reviews" className="text-[#78716C] text-sm hover:text-[#6B3037] transition-colors">
                  ({vendor.reviewsCount} reviews)
                </a>
              </div>
              <div className="h-4 w-px bg-[#D4C5B9]" />
              <span className="text-sm text-[#78716C] bg-[#F4EFEA] px-3 py-1 rounded-full">
                {vendor.experience}
              </span>
            </div>

            {/* Style Tags */}
            <div className="flex flex-wrap gap-2">
              {vendor.styles.map(style => (
                <span
                  key={style}
                  className="text-xs text-[#6B5E53] bg-[#F4EFEA] border border-[#EAE3DA] px-3 py-1.5 rounded-full font-medium"
                >
                  {style}
                </span>
              ))}
            </div>

            {/* Tagline */}
            <blockquote className="border-l-2 border-[#8E4A49] pl-4 italic font-serif text-[#44403C] text-base leading-relaxed">
              "{vendor.tagline}"
            </blockquote>

            {/* Price */}
            <div className="bg-[#FDFBF7] border border-[#EAE3DA] rounded-xl px-5 py-4">
              <p className="text-xs text-[#78716C] mb-0.5">Starting from</p>
              <p className="text-2xl font-serif font-semibold text-[#1C1917]">{vendor.startingPrice.replace('From ', '')}</p>
              <p className="text-xs text-[#A39081] mt-0.5">Pricing varies by package & date</p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                onClick={onEnquire}
                className="flex-1 bg-[#6B3037] hover:bg-[#52242A] text-white font-medium py-3.5 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg text-sm"
              >
                Send Enquiry →
              </button>
              <button
                onClick={onSave}
                className={`flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-medium border-2 transition-all duration-200 ${
                  savedStatus
                    ? 'bg-[#F5ECE8] border-[#8E4A49] text-[#6B3037]'
                    : 'bg-white border-[#D4C5B9] text-[#44403C] hover:border-[#8E4A49] hover:text-[#6B3037]'
                }`}
              >
                <span className="text-base">{savedStatus ? '♥' : '♡'}</span>
                {savedStatus ? 'Saved' : 'Save'}
              </button>
              <button
                onClick={onCompare}
                className={`flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-medium border-2 transition-all duration-200 ${
                  compareStatus
                    ? 'bg-[#1C1917] border-[#1C1917] text-white'
                    : 'bg-white border-[#D4C5B9] text-[#44403C] hover:border-[#1C1917]'
                }`}
              >
                <span>⊕</span>
                {compareStatus ? 'In Tray' : 'Compare'}
              </button>
            </div>

            {/* Quick stats row */}
            <div className="grid grid-cols-3 gap-3 pt-1">
              {[
                { icon: '⚡', label: 'Response', value: vendor.responseTime },
                { icon: '💒', label: 'Weddings', value: `${vendor.weddingsDone}+` },
                { icon: '📸', label: 'Followers', value: vendor.instagramFollowers },
              ].map(s => (
                <div key={s.label} className="bg-[#FDFBF7] border border-[#EAE3DA] rounded-xl px-3 py-3 text-center">
                  <p className="text-base">{s.icon}</p>
                  <p className="font-semibold text-sm text-[#1C1917]">{s.value}</p>
                  <p className="text-[10px] text-[#78716C] mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
