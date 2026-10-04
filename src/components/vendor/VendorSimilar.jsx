import React from 'react';
import { Link } from 'react-router-dom';

export default function VendorSimilar({ vendors }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-[#8E4A49] mb-2">More to explore</p>
      <h2 className="font-serif text-3xl md:text-4xl text-[#1C1917] mb-10">Similar Photographers</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {vendors.map(vendor => (
          <div
            key={vendor.id}
            className="group bg-[#FDFBF7] border border-[#EAE3DA] rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Image */}
            <div className="aspect-[4/3] overflow-hidden bg-[#EAE3DA]">
              <img
                src={vendor.image}
                alt={vendor.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Content */}
            <div className="p-5">
              <p className="text-xs text-[#8E4A49] font-medium mb-1">{vendor.category}</p>
              <h3 className="font-serif text-lg text-[#1C1917] mb-1">{vendor.name}</h3>
              <p className="text-xs text-[#78716C] mb-3">📍 {vendor.location}</p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  <span className="text-[#6B3037] text-sm">★</span>
                  <span className="font-semibold text-sm text-[#1C1917]">{vendor.rating}</span>
                  <span className="text-xs text-[#A39081]">({vendor.reviewsCount})</span>
                </div>
                <span className="text-xs text-[#6B5E53] bg-[#F4EFEA] px-2.5 py-1 rounded-full border border-[#EAE3DA]">
                  {vendor.style}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-[#1C1917]">{vendor.startingPrice}</p>
                <Link
                  to={`/vendor/${vendor.id}`}
                  className="text-sm text-[#6B3037] font-medium hover:underline"
                >
                  View Profile →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
