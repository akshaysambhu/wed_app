import React, { useState } from 'react';
import { usePlanning } from '../../context/PlanningContext.jsx';

export default function VendorHero({ vendor, savedStatus, onSave, onEnquire }) {
  const [activeImg, setActiveImg] = useState(0);
  const thumbImages = vendor.gallery.slice(0, 5).map(g => g.url);
  const { openDiscussion } = usePlanning();

  const handleDiscuss = () => {
    openDiscussion({
      type: 'vendor',
      item: {
        id: vendor.id,
        name: vendor.name,
        category: vendor.category,
        location: vendor.location,
        image: vendor.heroImage,
        rating: vendor.rating
      }
    });
  };

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
              <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-[#6B3037] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Verified
              </div>
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
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#8E4A49] bg-[#F5ECE8] px-3 py-1.5 rounded-full border border-[#E8D4CF]">
                📷 {vendor.category}
              </span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl text-[#1C1917] leading-tight">
              {vendor.name}
            </h1>

            <div className="flex items-center gap-1.5 text-[#78716C] text-sm">
              <span>📍 {vendor.location} · {vendor.serviceArea}</span>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className="text-[#6B3037]">★</span>
                <span className="font-semibold text-[#1C1917]">{vendor.rating}</span>
                <a href="#reviews" className="text-[#78716C] text-sm hover:text-[#6B3037] transition-colors">
                  ({vendor.reviewsCount} reviews)
                </a>
              </div>
            </div>

            {/* Tagline */}
            <blockquote className="border-l-2 border-[#8E4A49] pl-4 italic font-serif text-[#44403C] text-base leading-relaxed">
              "{vendor.tagline}"
            </blockquote>

            {/* Price */}
            <div className="bg-[#FDFBF7] border border-[#EAE3DA] rounded-xl px-5 py-4">
              <p className="text-xs text-[#78716C] mb-0.5">Starting from</p>
              <p className="text-2xl font-serif font-semibold text-[#1C1917]">{vendor.startingPrice.replace('From ', '')}</p>
            </div>

            {/* 4 EXACT ACTIONS REQUESTED BY CLIENT */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={onSave}
                className={`flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-medium border-2 transition-all duration-200 ${
                  savedStatus
                    ? 'bg-[#F5ECE8] border-[#8E4A49] text-[#6B3037]'
                    : 'bg-white border-[#D4C5B9] text-[#44403C] hover:border-[#8E4A49] hover:text-[#6B3037]'
                }`}
              >
                <span className="text-base">{savedStatus ? '♥' : '♡'}</span>
                {savedStatus ? 'Shortlisted' : 'Shortlist'}
              </button>
              
              <button
                onClick={handleDiscuss}
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-medium border-2 border-[#1C1917] bg-[#1C1917] text-white hover:bg-[#34302C] transition-all duration-200"
              >
                <span>💬</span> Discuss
              </button>

              <button
                onClick={onEnquire}
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-medium border-2 border-[#D4C5B9] bg-white text-[#44403C] hover:border-[#8E4A49] transition-all duration-200"
              >
                ✉️ Request Quote
              </button>

              <button
                onClick={() => document.getElementById('availability')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-medium border-2 border-[#D4C5B9] bg-white text-[#44403C] hover:border-[#8E4A49] transition-all duration-200"
              >
                🗓 Check Availability
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
